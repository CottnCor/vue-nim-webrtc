package nim.webrtc.api.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author CottnCor
 */
@Component
@ConfigurationProperties(prefix="business")
@PropertySource("classpath:business.properties")
public class BusinessProperties {
//
//    private String orgid;
//
//    private String xzqdm;
//
//    public String getOrgid() {
//        return orgid;
//    }
//
//    public String getXzqdm() {
//        return xzqdm;
//    }

}
