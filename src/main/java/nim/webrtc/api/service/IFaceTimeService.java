package nim.webrtc.api.service;

import java.util.List;
import java.util.Map;

public interface IFaceTimeService {

    List<Map> getTaskType();

    List<Map> getFaceTimeOverview(String taskid);

    List<Map> getFaceTimeRecord(Short limit, Short page);

    List<Map> getFaceTimeList(Short state, String taskid, Short limit, Short page);

    List<Map> getFaceTimeCoords(String id);

    void addFaceTimeRecord(Map record) throws Exception;

    void editFaceTimeState(String id, Short state) throws Exception;

    void lockFaceTime(String id) throws Exception;

    void unlockFaceTime(String id) throws Exception;
}
