package nim.webrtc.api.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface FaceTimeMapper {

    List<Map> selectTaskType();

    List<Map> selectFaceTimeOverview(@Param("taskid") String taskid);

    List<Map> selectFaceTimeRecord(@Param("limit") Short limit, @Param("page") Short page);

    List<Map> selectFaceTimeList(@Param("state") Short state, @Param("taskid") String taskid, @Param("limit") Short limit, @Param("page") Short page);

    List<Map> selectFaceTimeCoords(@Param("id") String id);

    Boolean insertFaceTimeRecord(@Param("record") Map record);

    Boolean updateFaceTimeState(@Param("id") String id, @Param("state") Short state);

    Boolean lockFaceTime(@Param("id") String id);

    Boolean unlockFaceTime(@Param("id") String id);
    
}
