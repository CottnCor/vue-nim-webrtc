package nim.webrtc.api.exception;

import nim.webrtc.api.base.Result;
import nim.webrtc.api.base.ResultGenerator;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = BaseException.class)
    @ResponseBody
    public Result jsonErrorHandler(HttpServletRequest req, BaseException e) throws Exception {
        return ResultGenerator.genFailResult(e.getCode(), e.getMessage());
    }

}
