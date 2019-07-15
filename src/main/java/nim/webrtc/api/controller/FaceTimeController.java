package nim.webrtc.api.controller;

import com.alibaba.fastjson.JSONObject;
import nim.webrtc.api.service.IAuthService;
import nim.webrtc.api.service.IFaceTimeService;
import nim.webrtc.api.util.GlobalUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/faca-time", produces = { "application/json;charset=UTF-8" })
public class FaceTimeController {

    @Resource
    private IAuthService authService;

    @Resource
    private IFaceTimeService FaceTimeService;

    @GetMapping("/getObjectType")
    public String getObjectType(@RequestParam(name="appkey")String appkey, @RequestParam(name="appkey")String token) throws Exception{
        List<Map> maps = FaceTimeService.getObjectType();
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getOrderDate")
    public String getOrderDate(@RequestParam(name="bizId")String bizId, @RequestParam(name="date")String date) throws Exception{
        Map map = FaceTimeService.getOrderDate(bizId, date);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/getTimeSegments")
    public String getTimeSegments(@RequestParam(name="dateId")String dateId) throws Exception{
        List<Map> maps = FaceTimeService.getTimeSegments(dateId);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeOverview")
    public String getFaceTimeOverview(@RequestParam(name="bizId")String bizId) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeOverview(bizId);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeRecord")
    public String getFaceTimeRecord(@RequestParam(name="limit")Short limit, @RequestParam(name="page")Short page) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeRecord(limit, page);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeList")
    public String getFaceTimeList(@RequestParam(name="state")Short state, @RequestParam(name="segmentId")String segmentId, @RequestParam(name="limit")Short limit, @RequestParam(name="page")Short page) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeList(state, segmentId, limit, page);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeCoords")
    public String getFaceTimeCoords(@RequestParam(name="id")String id) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeCoords(id);
        return GlobalUtil.PackResponse(maps);
    }

    @PostMapping("/addFaceTimeRecord")
    public void addFaceTimeRecord(@RequestParam(name="record")String record) throws Exception{
        FaceTimeService.addFaceTimeRecord((Map) JSONObject.parse(record));
    }

    @PostMapping("/editFaceTimeState")
    public void editFaceTimeState(@RequestParam(name="id")String id, @RequestParam(name="state")Short state, @RequestParam(name="connState")Short connState) throws Exception{
        FaceTimeService.editFaceTimeState(id, state, connState);
    }

    @PostMapping("/lockFaceTime")
    public void lockFaceTime(@RequestParam(name="id")String id) throws Exception{
        FaceTimeService.lockFaceTime(id);
    }

    @PostMapping("/unlockFaceTime")
    public void unlockFaceTime(@RequestParam(name="id")String id) throws Exception{
        FaceTimeService.unlockFaceTime(id);
    }

}

