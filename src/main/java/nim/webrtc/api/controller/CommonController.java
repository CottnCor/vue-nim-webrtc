package nim.webrtc.api.controller;

import com.alibaba.fastjson.JSONObject;
import nim.webrtc.api.service.IAuthService;
import nim.webrtc.api.service.ICommonService;
import nim.webrtc.api.util.GlobalUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/common", produces = { "application/json;charset=UTF-8" })
public class CommonController {

    @Resource
    private ICommonService commonService;

    @GetMapping("/region/getRegionByLevel")
    public String getRegionByLevel(@RequestParam(name="level")Short level) throws Exception {
        List<Map> maps = commonService.getRegionByLevel(level);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/region/getRegionByParent")
    public String getRegionByParent(@RequestParam(name="xzqdm")String xzqdm) throws Exception {
        List<Map> maps = commonService.getRegionByParent(xzqdm);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/region/getRegionByBounds")
    public String getRegionByBounds(@RequestParam(name="level")Short level, @RequestParam(name="wkt")String wkt) throws Exception {
        List<Map> maps = commonService.getRegionByBounds(level, wkt);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/region/getRegionByCoord")
    public String getRegionByCoord(@RequestParam(name="lng")Double lng, @RequestParam(name="lat")Double lat) throws Exception {
        Map map = commonService.getRegionByCoord(lng, lat);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/region/getRegionByXzqdm")
    public String getRegionByXzqdm(@RequestParam(name="xzqdm")String xzqdm) throws Exception {
        Map map = commonService.getRegionByXzqdm(xzqdm);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/region/getRegionWktByXzqdm")
    public String getRegionWktByXzqdm(@RequestParam(name="xzqdm")String xzqdm) throws Exception {
        Map map = commonService.getRegionWktByXzqdm(xzqdm);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/region/getRegionTagByXzqdm")
    public String getRegionTagByXzqdm(@RequestParam(name="xzqdm")String xzqdm) throws Exception {
        Map map = commonService.getRegionTagByXzqdm(xzqdm);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/config/getStorageAddress")
    public String getStorageAddress(@RequestParam(name="id")String id) throws Exception {
        Map map = commonService.getStorageAddress(id);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/spot/getJctbInfo")
    public String getJctbInfo(@RequestParam(name="taskid")String taskid, @RequestParam(name="jctbId")String jctbId) throws Exception {
        Map map = commonService.getJctbInfo(taskid, jctbId);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/spot/getJctbAffix")
    public String getJctbAffix(@RequestParam(name="taskid")String taskid, @RequestParam(name="jctbId")String jctbId) throws Exception {
        List<Map> maps = commonService.getJctbAffix(taskid, jctbId);
        return GlobalUtil.PackResponse(maps);
    }

    @PostMapping("/spot/addJctbAffix")
    public void addJctbAffix(@RequestParam(name="record")String record) throws Exception {
        commonService.addJctbAffix((Map) JSONObject.parse(record));
    }

    @PostMapping("/spot/editJctbInfo")
    public void editJctbInfo(@RequestParam(name="record")String record) throws Exception {
        commonService.editJctbInfo((Map) JSONObject.parse(record));
    }
}

