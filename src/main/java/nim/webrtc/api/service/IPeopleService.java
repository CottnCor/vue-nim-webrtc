package nim.webrtc.api.service;

import java.util.List;
import java.util.Map;

public interface IPeopleService {

    Map getYxInfo(String userid);

    Map getUserInfo(String userid);

    Map getUserState(String userid);

    Map getUserCoords(String userid);

    List<Map> getPeopleTree(String xzqdm);

    List<Map> getPeopleCoords(Short level, String bounds);
}
