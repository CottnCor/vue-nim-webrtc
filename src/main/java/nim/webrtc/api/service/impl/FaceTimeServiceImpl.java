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
    public List<Map> getObjectType(){
        try {
            return FaceTimeMapper.selectObjectType();
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public Map getOrderDate(String bizId, String date){
        try {
            return FaceTimeMapper.selectOrderDate(bizId, date);
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public List<Map> getTimeSegments(String dateId){
        try {
            return FaceTimeMapper.selectTimeSegments(dateId);
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public List<Map> getFaceTimeOverview(String bizId){
        try {
            return FaceTimeMapper.selectFaceTimeOverview(bizId);
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
    public List<Map> getFaceTimeList(Short state, String segmentId, Short limit, Short page){
        try {
            return FaceTimeMapper.selectFaceTimeList(state, segmentId, limit, page);
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public List<Map> getFaceTimeCoords(String id){
        try {
            return FaceTimeMapper.selectFaceTimeCoords(id);
        } catch (Exception ex){
            return null;
        }
    }

    @Override
    public void addFaceTimeRecord(Map record) throws Exception{
        FaceTimeMapper.insertFaceTimeRecord(record);
    }

    @Override
    public void editFaceTimeState(String id, Short state, Short connState) throws Exception{
        FaceTimeMapper.updateFaceTimeState(id, state, connState);
    }

    @Override
    public void lockFaceTime(String id) throws Exception{
        FaceTimeMapper.lockFaceTime(id);
    }

    @Override
    public void unlockFaceTime(String id) throws Exception{
        FaceTimeMapper.unlockFaceTime(id);
    }
}
