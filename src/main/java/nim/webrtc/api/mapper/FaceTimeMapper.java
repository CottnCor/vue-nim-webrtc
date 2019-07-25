package nim.webrtc.api.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface FaceTimeMapper {

    List<Map> selectTaskType();

    List<Map> selectFaceTimeOverview(@Param("state") List<Short> state, @Param("taskid") String taskid);

    List<Map> selectFaceTimeList(@Param("state") List<Short> state, @Param("taskid") String taskid, @Param("limit") Short limit, @Param("page") Short page);

    List<Map> selectFaceTimeRecord(@Param("limit") Short limit, @Param("page") Short page);

    Boolean updateFaceTimeState(@Param("id") String id, @Param("state") Short state);

    Boolean updateFaceTimeStaff(@Param("id") String id, @Param("userid") Long userid, @Param("username") String username);

    Boolean updateFaceTimeRandom(@Param("id") String id);

    List<Map> selectFaceTimeAll();
}
