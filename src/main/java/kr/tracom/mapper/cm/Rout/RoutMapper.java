package kr.tracom.mapper.cm.Rout;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoutMapper {
	public int updateSttn(Map param);
	public int updateCrs(Map param);
	public int updateRout(Map param);
	public int updateRoutNodeToAnotherRoute(Map param); //BMS_ROUT_NODE_CMPSTN에서 다른 route id의 정류소 위치 정보 갱신
	public int updateMainRoutNodeToAnotherRoute(Map param); //BMS_MAIN_ROUT_NODE_INFO에서 다른 route id의 정류소 위치 정보 갱신
	public int updateStSttnEdSttnRout(Map param);
	public List<Map<String, Object>> selectRoutList(Map param);
	public List<Map<String, Object>> selectRoutListWithGps(Map param);
	public List<Map<String, Object>> selectRoutListByRoutGrp(Map param);
	public List<Map<String, Object>> selectRoutItem(Map param);
	public List<Map<String, Object>> selectNodeListByRouts(Map param);
	public List<Map<String, Object>> selectNodeListByRout(Map param);
	public List<Map<String, Object>> selectNodeListByRoutGrp(Map param);
	public List<Map<String, Object>> selectNodeListByRoutGrps(Map param);
	public List<Map<String, Object>> selectNodeDispListByRouts(Map param);
	public List<Map<String, Object>> selectNodeDispListByRout(Map param);
	public List<Map<String, Object>> selectNodeDispListByRoutGrp(Map param);
	public List<Map<String, Object>> selectNodeDispListByRoutGrps(Map param);	
	public List<Map<String, Object>> selectMainNodeListByRout(Map param);
	public List<Map<String, Object>> selectSttnList(Map param);
	public List<Map<String, Object>> selectSttnCrsList(Map param);
	public List<Map<String, Object>> selectSttnItem();
	public List<Map<String, Object>> selectSttnCrsDispList(Map param);
	public List<Map<String, Object>> selectSttnCrsLink(Map param);
	public Map<String, Object> cntNodeOfRout(Map param); //특정노선의 노드 개수
	public Map<String, Object> cntLinkOfRout(Map param); //특정노선의 링크 개수
}
