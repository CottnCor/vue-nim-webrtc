package nim.webrtc.api.service;

public interface IAuthService {

    String accessToken(String appkey, String username, String password) throws Exception;

    Boolean verifyToken(String token) throws Exception;

}
