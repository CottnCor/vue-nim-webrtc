package nim.webrtc.api;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("nim.webrtc.api.mapper")
public class NimWebrtcApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(NimWebrtcApiApplication.class, args);
    }

}
