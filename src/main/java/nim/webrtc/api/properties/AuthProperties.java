package nim.webrtc.api.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author CottnCor
 */
@Component
@ConfigurationProperties(prefix="auth")
@PropertySource("classpath:auth.properties")
public class AuthProperties {

//    private List<String> appkey;
//
//    private List<String> appsecret;
//
//    private String tokenEndpoint;
//
//    public List<String> getAppkey() {
//        return appkey;
//    }
//
//    public List<String> getAppsecret() {
//        return appsecret;
//    }
//
//    public String getTokenEndpoint() {
//        return tokenEndpoint;
//    }

}
