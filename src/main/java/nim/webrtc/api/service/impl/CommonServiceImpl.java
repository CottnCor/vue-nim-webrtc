package nim.webrtc.api.service.impl;

import nim.webrtc.api.mapper.CommonMapper;
import nim.webrtc.api.service.ICommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author CottnCor
 */
@Service
public class CommonServiceImpl implements ICommonService {

    @Autowired
    private CommonMapper commonMapper;

    @Override
    public List<Map> getRegionByLevel(Short level) {
        try {
            return commonMapper.selectRegionByLevel(level);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public List<Map> getRegionByParent(String xzqdm) {
        try {
            return commonMapper.selectRegionByParent(xzqdm);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public List<Map> getRegionByBounds(Short level, String wkt) {
        try {
            return commonMapper.selectRegionByBounds(level, wkt);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getRegionByCoord(Double lng, Double lat) {
        try {
            return commonMapper.selectRegionByCoord(lng, lat);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getRegionByXzqdm(String xzqdm) {
        try {
            return commonMapper.selectRegionByXzqdm(xzqdm);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getRegionWktByXzqdm(String xzqdm) {
        try {
            return commonMapper.selectRegionWktByXzqdm(xzqdm);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getRegionTagByXzqdm(String xzqdm) {
        try {
            return commonMapper.selectRegionTagByXzqdm(xzqdm);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Map getJctbInfo(String taskid, String jctbId) {
        try {
            return commonMapper.selectJctbInfo(taskid, jctbId);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public List<Map> getJctbAffix(String taskid, String jctbId) {
        try {
            return commonMapper.selectJctbAffix(taskid, jctbId);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public void addJctbAffix(Map record) throws Exception {
        commonMapper.insertJctbAffix(record);
    }

    @Override
    public void editJctbInfo(Map record) throws Exception {
        commonMapper.updateJctbInfo(record);
    }

    @Override
    public Map getStorageAddress(String id) {
        try {
            return commonMapper.selectStorageAddress(id);
        } catch (Exception ex) {
            return null;
        }
    }
}
