package kr.tracom.mapper.cm.Vhc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VhcMapper {
	
	public List<Map<String, Object>> selectVhcList(Map param);
	
	public List<Map<String, Object>> selectAllocVhcList(Map param);
	
	public List<Map<String, Object>> selectCurOperVhcList(Map param);
	
	public Map<String, Object> selectVhcDvcInfo(Map param);
	
	public List<Map<String, Object>> selectVhcDvcInfoList(Map param);
	
	public List<Map<String, Object>> selectVhcItem();
	
	public Map<String, Object> selectVhcByVhcNo(Map param);
	
	
	/*public int updateSttn(Map param);
	public int updateCrs(Map param);
	public int updateRout(Map param);
	public int updateRoutNodeToAnotherRoute(Map param); //BMS_ROUT_NODE_CMPSTN에서 다른 route id의 정류소 위치 정보 갱신
	public int updateMainRoutNodeToAnotherRoute(Map param); //BMS_MAIN_ROUT_NODE_INFO에서 다른 route id의 정류소 위치 정보 갱신
	public List<Map<String, Object>> selectRoutList(Map param);
	public List<Map<String, Object>> selectRoutItem();
	public List<Map<String, Object>> selectNodeListByRouts(Map param);
	public List<Map<String, Object>> selectNodeListByRout(Map param);
	public List<Map<String, Object>> selectNodeListByRoutGrp(Map param);
	public List<Map<String, Object>> selectSttnList(Map param);
	public List<Map<String, Object>> selectSttnItem();*/
}
