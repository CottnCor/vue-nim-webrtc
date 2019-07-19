package nim.webrtc.api.service.impl;

import nim.webrtc.api.mapper.CommonMapper;
import nim.webrtc.api.mapper.FaceTimeMapper;
import nim.webrtc.api.service.IFaceTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FaceTimeServiceImpl implements IFaceTimeService {

    @Autowired
    private FaceTimeMapper FaceTimeMapper;

    @Autowired
    private CommonMapper commonMapper;

    @Override
    public List<Map> getTaskType(){
        try {
            return FaceTimeMapper.selectTaskType();
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public List<Map> getFaceTimeOverview(Short state, String taskid){
        try {
            return FaceTimeMapper.selectFaceTimeOverview(state, taskid);
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public List<Map> getFaceTimeRecord(Short limit, Short page){
        try {
            List<Map> FaceTimeRecord = FaceTimeMapper.selectFaceTimeRecord(limit, page);
            for (Map record : FaceTimeRecord) {
                Map  regionTag = commonMapper.selectRegionTagByXzqdm(record.get("to_xzqdm").toString());
                record.put("to_xzqmc", regionTag.get("xzqmc").toString());
                regionTag = commonMapper.selectRegionTagByXzqdm(record.get("from_xzqdm").toString());
                record.put("from_xzqmc", regionTag.get("xzqmc").toString());
            }
            return FaceTimeRecord;
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public List<Map> getFaceTimeList(Short state, String taskid, Short limit, Short page){
        try {
            return FaceTimeMapper.selectFaceTimeList(state, taskid, limit, page);
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public void editFaceTimeState(String id, Short state) throws Exception{
        FaceTimeMapper.updateFaceTimeState(id, state);
    }

}
