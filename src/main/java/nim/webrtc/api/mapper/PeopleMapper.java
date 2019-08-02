package nim.webrtc.api.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PeopleMapper {

    Map selectYxInfo(@Param("username")String username);

    List<Map> selectPeopleCoords(@Param("wkt")String wkt);

    List<Map> selectPeopleCluster(@Param("level")Short level, @Param("filter")String filter);
}
