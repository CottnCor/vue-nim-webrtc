package nim.webrtc.api.service.impl;

import nim.webrtc.api.base.ResultStatus;
import nim.webrtc.api.properties.AuthProperties;
import nim.webrtc.api.mapper.CommonMapper;
import nim.webrtc.api.mapper.PeopleMapper;
import nim.webrtc.api.service.IPeopleService;

import com.alibaba.fastjson.JSONObject;
import nim.webrtc.api.util.ProxyUtil;
import org.apache.http.entity.StringEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author CottnCor
 */
@Service
public class PeopleServiceImpl implements IPeopleService {

    @Autowired
    private PeopleMapper peopleMapper;

    @Autowired
    private CommonMapper commonMapper;

    @Autowired
    private AuthProperties authProperties;

    @Override
    public List<Map> getPeopleTree(String token, String organizationid, Short page, Short limit) {
        try {
            JSONObject params = new JSONObject();
            params.put("token", token);
            params.put("organizationid", organizationid);
            params.put("recursive", false);
            params.put("pageIndex", page);
            params.put("pageSize", limit);
            params.put("appkey", authProperties.getAppAppkey());
            StringEntity entity = new StringEntity(params.toJSONString());
            String url = authProperties.getEndpoint() + "getSimpleUserList";
            JSONObject result = ProxyUtil.post(url, entity);
            if(result != null && ResultStatus.OK.toString().equals(result.getString("status"))){
                List<Map> peopleTree = result.getJSONObject("data").getJSONArray("data").toJavaList(Map.class);
                return peopleTree;
            }
            return null;
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public List<Map> getPeopleCoords(Short level, String bounds) {
        try {
            List<Map> result = new ArrayList<>();
            List<Map> temp = new ArrayList<>();
            if (1 == level) {
                temp = peopleMapper.selectPeopleCluster(level, null);
            } else {
                JSONObject obj = JSONObject.parseObject(bounds);
                String minLng = obj.getString("minLng");
                String minLat = obj.getString("minLat");
                String maxLng = obj.getString("maxLng");
                String maxLat = obj.getString("maxLat");
                String wktStr = String.format("POLYGON((%s %s,%s %s,%s %s,%s %s,%s %s))"
                        , minLng, minLat
                        , minLng, maxLat
                        , maxLng, maxLat
                        , maxLng, minLat
                        , minLng, minLat);
                List<Map> regions = commonMapper.selectRegionByBounds(level, wktStr);
                if (2 == level) {
                    String filter = "";
                    for (Map region : regions) {
                        String xzqdm = region.get("xzqdm").toString().substring(0, 2);
                        if (xzqdm != null && xzqdm != "") {
                            filter = String.format("%s OR f_xzqdm LIKE '%s%%'", filter, xzqdm);
                        }
                    }
                    filter = filter.substring(4, filter.length());
                    temp = peopleMapper.selectPeopleCluster(level, filter);
                } else if (3 == level) {
                    List<Map> users = new ArrayList<>();
                    if (regions.size() > 0) {
                        for (Map region : regions) {
                            Map wkt = commonMapper.selectRegionWktByXzqdm(region.get("xzqdm").toString());
                            if (wkt != null) {
                                users.addAll(peopleMapper.selectPeopleCoords(wkt.get("wkt").toString()));
                            }
                        }
                    } else {
                        users.addAll(peopleMapper.selectPeopleCoords(wktStr));
                    }
                    return users;
                }
            }
            for (Map item : temp) {
                if (Integer.parseInt(item.get("count").toString()) == 1) {
                    Map<String, Object> verifyed = getUsersCoords(item.get("xzqdm").toString());
                    if (verifyed != null) {
                        verifyed.put("count", 1);
                        verifyed.put("xzqdm", item.get("xzqdm").toString());
                        verifyed.put("xzqmc", item.get("xzqmc").toString());
                        result.add(verifyed);
                    }
                } else {
                    result.add(item);
                }
            }
            return result;
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getYxInfo(String username) {
        try {
            return peopleMapper.selectYxInfo(username);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getUserInfo(String token) {
        try {
            JSONObject params = new JSONObject();
            params.put("token", token);
            StringEntity entity = new StringEntity(params.toJSONString());
            String url = authProperties.getEndpoint() + "getUserInfo";
            JSONObject result = ProxyUtil.post(url, entity);
            if(result != null && ResultStatus.OK.toString().equals(result.getString("status"))){
                Map userInfo = result.getJSONArray("data").toJavaList(Map.class).get(0);
                return userInfo;
            }
            return null;
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getUserState(String token, String username) {
        try {
            JSONObject params = new JSONObject();
            params.put("token", token);
            params.put("username", username);
            StringEntity entity = new StringEntity(params.toJSONString());
            String url = authProperties.getEndpoint() + "getSimpleUserInfo";
            JSONObject result = ProxyUtil.post(url, entity);
            if(result != null && ResultStatus.OK.toString().equals(result.getString("status"))){
                Map userState = result.getJSONObject("data");
                return userState;
            }
            return null;
        } catch (Exception ex) {
            return null;
        }
    }

    private Map getUsersCoords(String xzqdm) {
        try {
            Map<String, Object> verifyed = new HashMap<String, Object>();
            List<Map> users = new ArrayList<>();
            Map wkt = commonMapper.selectRegionWktByXzqdm(xzqdm);
            if (wkt != null) {
                String filter = wkt.get("wkt").toString();
                users.addAll(peopleMapper.selectPeopleCoords(filter));
                if (users.size() > 0) {
                    verifyed.put("lng", users.get(0).get("lng"));
                    verifyed.put("lat", users.get(0).get("lat"));
                    return verifyed;
                }
            }
            return null;
        } catch (Exception ex) {
            return null;
        }
    }
}
