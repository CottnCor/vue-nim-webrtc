package nim.webrtc.api.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface FaceTimeMapper {

    List<Map> selectObjectType();

    Map selectOrderDate(@Param("bizId") String bizId, @Param("date") String date);

    List<Map> selectTimeSegments(@Param("dateId") String dateId);

    List<Map> selectFaceTimeOverview(@Param("bizId") String bizId);

    List<Map> selectFaceTimeRecord(@Param("limit") Short limit, @Param("page") Short page);

    List<Map> selectFaceTimeList(@Param("state") Short state, @Param("segmentId") String segmentId, @Param("limit") Short limit, @Param("page") Short page);

    List<Map> selectFaceTimeCoords(@Param("id") String id);

    Boolean insertFaceTimeRecord(@Param("record") Map record);

    Boolean updateFaceTimeState(@Param("id") String id, @Param("state") Short state, @Param("connState") Short connState);

    Boolean lockFaceTime(@Param("id") String id);

    Boolean unlockFaceTime(@Param("id") String id);
    
}
