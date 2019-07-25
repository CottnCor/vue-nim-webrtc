package nim.webrtc.api;

import nim.webrtc.api.service.IFaceTimeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NimWebrtcApiApplicationTests {

    @Resource
    private IFaceTimeService FaceTimeService;

    @Test
    public void editFaceTimeRandom() throws Exception {
        FaceTimeService.editFaceTimeRandom();
    }

}
