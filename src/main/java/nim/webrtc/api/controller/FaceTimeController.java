package nim.webrtc.api.controller;

import nim.webrtc.api.service.IFaceTimeService;
import nim.webrtc.api.util.GlobalUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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
    public String getFaceTimeOverview(@RequestParam(name="state")Short state, @RequestParam(name="taskid")String taskid) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeOverview(state, taskid);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeRecord")
    public String getFaceTimeRecord(@RequestParam(name="limit")Short limit, @RequestParam(name="page")Short page) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeRecord(limit, page);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getFaceTimeList")
    public String getFaceTimeList(@RequestParam(name="state")Short state, @RequestParam(name="taskid")String taskid, @RequestParam(name="limit")Short limit, @RequestParam(name="page")Short page) throws Exception{
        List<Map> maps = FaceTimeService.getFaceTimeList(state, taskid, limit, page);
        return GlobalUtil.PackResponse(maps);
    }

    @PostMapping("/editFaceTimeState")
    public void editFaceTimeState(@RequestParam(name="id")String id, @RequestParam(name="state")Short state) throws Exception{
        FaceTimeService.editFaceTimeState(id, state);
    }

}

