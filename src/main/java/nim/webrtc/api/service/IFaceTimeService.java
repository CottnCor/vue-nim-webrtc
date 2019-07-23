package nim.webrtc.api.service;

import java.util.List;
import java.util.Map;

public interface IFaceTimeService {

    List<Map> getTaskType();

    List<Map> getFaceTimeOverview(List<Short> state, String taskid);

    List<Map> getFaceTimeRecord(Short limit, Short page);

    List<Map> getFaceTimeList(List<Short> state, String taskid, Short limit, Short page);

    void editFaceTimeState(String id, Short state) throws Exception;

    void setFaceTimeStaff(String id, Long userid) throws Exception;
}
