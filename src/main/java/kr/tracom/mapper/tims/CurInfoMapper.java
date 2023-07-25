package kr.tracom.mapper.tims;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CurInfoMapper {
	
	int insertCurOperInfo(Map<String, Object> paramMap); //현재운행정보 insert	
	Map<String, Object> selectCurOperInfo(Map<String, Object> paramMap); //현재운행정보 가져오기
	
	//돌발정보 insert
	int insertIncidentInfo(Map<String, Object> paramMap);
	
	//현재운행계획정보 갱신
	void refreshCurOperAllocPLRoutInfo();
	void refreshCurOperAllocPLNodeInfo();
	
	String getBusId(Map<String, Object> paramMap);
    Map<String, Object> getRoutMst(Map<String, Object> paramMap);
    
	String selectCurNearAllocOperPlByRoutEvtData(Map<String, Object> paramMap);
	String selectCurNearAllocOperPlByRoutNodeId(Map<String, Object> paramMap);
    
    Map<String, Object> getEventCode(Map<String, Object> paramMap);
    
    public List selectIntgNodeList(String routId);
    
    Map<String, Object> selectCurVhcOperInfo(Map<String, Object> paramMap);
    
    int insertCurVhcOperInfo(Map<String, Object> paramMap);

    String selectSttnLinkId(Map<String, Object> paramMap);
    
	//차량정보 가져오기
	Map<String, Object> selectVhcInfo(Map<String, Object> paramMap);
	
	//노선이름 가져오기
	String selectRoutName(String routId);
	
	//노드정보 가져오기
	Map<String, Object> selectNodeInfo(Map<String, Object> paramMap);	

	//현재노드의 다음노드(교차로 or 정류장) 가져오기
	Map<String, Object> selectNextSttnCrsInfo(Map<String, Object> paramMap);

	
	//링크순번으로 노드정보 가져오기
	Map<String, Object> selectNodeByLinkSn(Map<String, Object> paramMap);
	
	String getSttnLinkId(Map<String, Object> paramMap);

	int insertOrUpdateSigOperEventInfo(Map<String, Object> paramMap);
}
