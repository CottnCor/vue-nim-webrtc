package nim.webrtc.api.properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RestController;
/**
 * @author CottnCor
 */
@RestController
@PropertySource("classpath:auth.properties")
public class AuthProperties {

    @Value("${auth.web.appkey}")
    private String webAppkey;

    @Value("${auth.web.appsecret}")
    private String webAppsecret;

    @Value("${auth.app.appkey}")
    private String appAppkey;

    @Value("${auth.app.appsecret}")
    private String appAppsecret;

    @Value("${auth.endpoint}")
    private String endpoint;

    public String getWebAppkey() {
        return webAppkey;
    }

    public String getWebAppsecret() {
        return webAppsecret;
    }

    public String getAppAppkey() {
        return appAppkey;
    }

    public String getAppAppsecret() {
        return appAppsecret;
    }

    public String getEndpoint() {
        return endpoint;
    }
}
