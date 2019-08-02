package nim.webrtc.api.service;

import java.util.List;
import java.util.Map;

public interface IPeopleService {

    Map getYxInfo(String username);

    Map getUserInfo(String token);

    Map getUserState(String userid);

    Map getUserCoords(String userid);

    List<Map> getPeopleTree(String token, String organizationid, Short page, Short limit);

    List<Map> getPeopleCoords(Short level, String bounds);
}
