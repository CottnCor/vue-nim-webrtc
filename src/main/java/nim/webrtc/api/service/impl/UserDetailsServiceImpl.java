package nim.webrtc.api.service.impl;

import nim.webrtc.api.base.ResultCode;
import nim.webrtc.api.domain.User;
import nim.webrtc.api.entity.HttpResult;
import nim.webrtc.api.entity.JwtUser;
import nim.webrtc.api.properties.AuthProperties;
import nim.webrtc.api.service.IAuthService;
import nim.webrtc.api.service.IUserRepository;
import nim.webrtc.api.util.HttpsClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author CottnCor
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService, IAuthService {

    @Autowired
    private AuthProperties auth;

    @Autowired
    private IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        return new JwtUser(user);
    }

    @Override
    public String accessToken(String appkey, String username, String password) throws Exception {
//        if (!auth.getAppkey().contains(appkey)){
//            return ResultCode.UNAUTHORIZED.toString();
//        }
//        String appsecret = "";
//        for (int i = 0; i < auth.getAppkey().size(); i++) {
//            if (auth.getAppkey().get(i).equals(appkey)){
//                appsecret = auth.getAppsecret().get(i);
//            }
//        }
//        Map<String, Object> params = new HashMap<>();
//        String url = auth.getTokenEndpoint(); 
//        params.put("username", username); 
//        params.put("password", password); 
//        params.put("appkey", appkey); 
//        params.put("appsecret", appsecret); 
//        params.put("grant_type", "password"); 
//        HttpResult httpResult = HttpsClientUtil.post(url, params);

        return "";
    }

    @Override
    public Boolean verifyToken(String token) throws Exception {
//        Map<String, Object> params = new HashMap<>();
//        String url = auth.getTokenEndpoint(); 
//        params.put("token", token); 
//        HttpResult httpResult = HttpsClientUtil.post(url, params);

        return false;
    }
}