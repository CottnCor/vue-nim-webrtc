package nim.webrtc.api.controller;

import nim.webrtc.api.service.IPeopleService;
import nim.webrtc.api.util.GlobalUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/people", produces = { "application/json;charset=UTF-8" })
public class PeopleController {

    @Resource
    private IPeopleService peopleService;

    @GetMapping("/getPeopleTree")
    public String getPeopleTree(@RequestParam(name="xzqdm")String xzqdm) {
        List<Map> maps = peopleService.getPeopleTree(xzqdm);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getPeopleCoords")
    public String getPeopleCoords(@RequestParam(name="level")Short level, @RequestParam(name="bounds",required=false)String bounds) {
        List<Map> maps = peopleService.getPeopleCoords(level, bounds);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getYxInfo")
    public String getYxAccount(@RequestParam(name="userid")Long userid) {
        Map map = peopleService.getYxInfo(userid);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/getUserInfo")
    public String getUserInfo(@RequestParam(name="userid")Long userid) {
        Map map = peopleService.getUserInfo(userid);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/getUserState")
    public String getUserState(@RequestParam(name="userid")Long userid) {
        Map map = peopleService.getUserState(userid);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/getUserCoords")
    public String getUserLocation(@RequestParam(name="userid")Long userid) {
        Map map = peopleService.getUserCoords(userid);
        return GlobalUtil.PackResponse(map);
    }
}

