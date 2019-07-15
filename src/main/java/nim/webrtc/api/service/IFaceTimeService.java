package nim.webrtc.api.service;

import java.util.List;
import java.util.Map;

public interface IFaceTimeService {

    List<Map> getObjectType();

    Map getOrderDate(String bizId, String date);

    List<Map> getTimeSegments(String dateId);

    List<Map> getFaceTimeOverview(String bizId);

    List<Map> getFaceTimeRecord(Short limit, Short page);

    List<Map> getFaceTimeList(Short state, String segmentId, Short limit, Short page);

    List<Map> getFaceTimeCoords(String id);

    void addFaceTimeRecord(Map record) throws Exception;

    void editFaceTimeState(String id, Short state, Short connState) throws Exception;

    void lockFaceTime(String id) throws Exception;

    void unlockFaceTime(String id) throws Exception;
}
