package nim.webrtc.api.service;

import java.util.List;
import java.util.Map;

/**
 * @author CottnCor
 */
public interface ICommonService {

    List<Map> getRegionByLevel(Short level);

    List<Map> getRegionByParent(String xzqdm);

    List<Map> getRegionByBounds(Short level, String wkt);

    Map getRegionByCoord(Double lng, Double lat);

    Map getRegionByXzqdm(String xzqdm);

    Map getRegionWktByXzqdm(String xzqdm);

    Map getRegionTagByXzqdm(String xzqdm);

    Map getJctbInfo(String taskid, String jctbId);

    List<Map> getJctbAffix(String taskid, String jctbId);

    void addJctbAffix(Map record) throws Exception;

    void editJctbInfo(Map record) throws Exception;

    Map getStorageAddress(String id);
}
