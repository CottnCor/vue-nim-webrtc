package nim.webrtc.api.controller;

import com.alibaba.fastjson.JSON;
import nim.webrtc.api.service.IFaceTimeService;
import nim.webrtc.api.util.GlobalUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/face-time", produces = { "application/json;charset=UTF-8" })
public class FaceTimeController {

    @Resource
    private IFaceTimeService FaceTimeService;

    @GetMapping("/getTaskType")
    public String getTaskType() throws Exception{
        List<Map> maps = FaceTimeService.getTaskType();
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeOverview")
    public String getFaceTimeOverview(@RequestParam(name="filter")String filter) throws Exception{
        filter = URLDecoder.decode(filter, "utf-8");
        String taskid = JSON.parseObject(filter).getString("taskid");
        List<Short> state = JSON.parseObject(filter).getJSONArray("state").toJavaList(Short.class);
        List<Map> maps = FaceTimeService.getFaceTimeOverview(state, taskid);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeList")
    public String getFaceTimeList(@RequestParam(name="filter")String filter) throws Exception{
        filter = URLDecoder.decode(filter, "utf-8");
        Short page = JSON.parseObject(filter).getShort("page");
        Short limit = JSON.parseObject(filter).getShort("limit");
        String taskid = JSON.parseObject(filter).getString("taskid");
        List<Short> state = JSON.parseObject(filter).getJSONArray("state").toJavaList(Short.class);
        List<Map> maps = FaceTimeService.getFaceTimeList(state, taskid, limit, page);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeRecord")
    public String getFaceTimeRecord(@RequestParam(name="limit")Short limit, @RequestParam(name="page")Short page) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeRecord(limit, page);
        return GlobalUtil.PackResponse(maps);
    }

    @PostMapping("/editFaceTimeState")
    public void editFaceTimeState(@RequestParam(name="id")String id, @RequestParam(name="state")Short state) throws Exception{
        FaceTimeService.editFaceTimeState(id, state);
    }

    @PostMapping("/setFaceTimeStaff")
    public void setFaceTimeStaff(@RequestParam(name="id")String id, @RequestParam(name="userid")Long userid) throws Exception{
        FaceTimeService.setFaceTimeStaff(id, userid);
    }

}

