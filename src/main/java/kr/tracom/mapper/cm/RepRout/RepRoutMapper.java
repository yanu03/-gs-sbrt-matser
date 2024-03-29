package kr.tracom.mapper.cm.RepRout;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RepRoutMapper {
	public List<Map<String, Object>> selectRepRoutList(Map param);
	
	public List<Map<String, Object>> selectRepRoutItem();
	
	public List<Map<String, Object>> selectRepRoutListByNode(Map param);
	
}
