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
    public String getPeopleTree(@RequestParam(name="token")String token, @RequestParam(name="organizationid")String organizationid, @RequestParam(name="page")Short page, @RequestParam(name="limit")Short limit) {
        List<Map> maps = peopleService.getPeopleTree(token, organizationid, page, limit);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getPeopleCoords")
    public String getPeopleCoords(@RequestParam(name="level")Short level, @RequestParam(name="bounds",required=false)String bounds) {
        List<Map> maps = peopleService.getPeopleCoords(level, bounds);
        return GlobalUtil.PackResponse(maps);
    }

    @GetMapping("/getYxInfo")
    public String getYxAccount(@RequestParam(name="username")String username) {
        Map map = peopleService.getYxInfo(username);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/getUserInfo")
    public String getUserInfo(@RequestParam(name="token")String token) {
        Map map = peopleService.getUserInfo(token);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/getUserState")
    public String getUserState(@RequestParam(name="userid")String userid) {
        Map map = peopleService.getUserState(userid);
        return GlobalUtil.PackResponse(map);
    }

    @GetMapping("/getUserCoords")
    public String getUserLocation(@RequestParam(name="userid")String userid) {
        Map map = peopleService.getUserCoords(userid);
        return GlobalUtil.PackResponse(map);
    }
}

