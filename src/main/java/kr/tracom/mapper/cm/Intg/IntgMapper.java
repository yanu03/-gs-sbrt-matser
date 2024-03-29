package kr.tracom.mapper.cm.Intg;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IntgMapper {
	
	public List<Map<String, Object>> selectAirconIntgList(Map param);
	
	public List<Map<String, Object>> selectIntgMstList(Map param);
	
	public void insertAirconInfo(Map param);
	
	public List<Map<String, Object>> selectIntg(Map param);
	
}
