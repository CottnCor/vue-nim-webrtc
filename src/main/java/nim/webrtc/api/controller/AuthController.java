package nim.webrtc.api.controller;

import nim.webrtc.api.base.Result;
import nim.webrtc.api.base.ResultCode;
import nim.webrtc.api.base.ResultGenerator;
import nim.webrtc.api.service.IAuthService;
import nim.webrtc.api.util.GlobalUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping(value = "/auth", produces = {"application/json;charset=UTF-8"})
public class AuthController {

    @Resource
    private IAuthService authService;

    @PostMapping("/accesstoken")
    public String accesstoken(@RequestParam(name = "appkey") String appkey, @RequestParam(name = "username") String username, @RequestParam(name = "password") String password) throws Exception {
        String result = authService.accessToken(appkey, username, password);
        if (ResultCode.UNAUTHORIZED.toString().equals(result)){
            return GlobalUtil.PackResponse(null);
        }
        return GlobalUtil.PackResponse(result);
    }

    @PostMapping("/verifyToken")
    public String verifyToken(@RequestParam(name="appkey")String appkey, @RequestParam(name="appkey")String token) throws Exception {
        Boolean status = authService.verifyToken(token);
        return GlobalUtil.PackResponse(status);
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Result result = ResultGenerator.genSuccessResult("已退出登陆！");
        return GlobalUtil.PackResponse(result);
    }

    @PostMapping("/login/info")
    public String info(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Result result = ResultGenerator.genForbiddenResult();
        return GlobalUtil.PackResponse(result);
    }
}

