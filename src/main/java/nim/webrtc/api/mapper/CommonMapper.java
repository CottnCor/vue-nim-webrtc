package nim.webrtc.api.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CommonMapper {

    List<Map> selectRegionByLevel(@Param("level") Short level);

    List<Map> selectRegionByParent(@Param("xzqdm") String xzqdm);

    List<Map> selectRegionByBounds(@Param("level") Short level, @Param("wkt") String wkt);

    Map selectRegionByCoord(@Param("lng") Double lng, @Param("lat") Double lat);

    Map selectRegionByXzqdm(@Param("xzqdm") String xzqdm);

    Map selectRegionWktByXzqdm(@Param("xzqdm") String xzqdm);

    Map selectRegionTagByXzqdm(@Param("xzqdm") String xzqdm);

    Map selectJctbInfo(@Param("taskid") String taskid, @Param("jctbId") String jctbId);

    List<Map> selectJctbAffix(@Param("taskid") String taskid, @Param("jctbId") String jctbId);

    void insertJctbAffix(@Param("record") Map record);

    void updateJctbInfo(@Param("record") Map record);

    Map selectStorageAddress(@Param("id") String xzqdm);
}
