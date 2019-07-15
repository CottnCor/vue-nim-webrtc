package nim.webrtc.api.service;

import java.util.List;
import java.util.Map;

public interface IPeopleService {

    Map getYxInfo(Long userid);

    Map getUserInfo(Long userid);

    Map getUserState(Long userid);

    Map getUserCoords(Long userid);

    List<Map> getPeopleTree(String xzqdm);

    List<Map> getPeopleCoords(Short level, String bounds);
}
