package nim.webrtc.api.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PeopleMapper {

    List<Map> selectPeopleTree();

    Map selectYxInfo(@Param("userid")Long userid);

    Map selectUserInfo(@Param("userid")Long userid);

    Map selectUserState(@Param("userid")Long userid);

    Map selectUserCoords(@Param("userid")Long userid);

    List<Map> selectPeopleCoords(@Param("wkt")String wkt);

    List<Map> selectPeopleCluster(@Param("level")Short level, @Param("filter")String filter);
}
