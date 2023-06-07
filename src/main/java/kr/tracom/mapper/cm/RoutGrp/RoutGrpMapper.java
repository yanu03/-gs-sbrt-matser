package kr.tracom.mapper.cm.RoutGrp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoutGrpMapper {
	public List<Map<String, Object>> selectRoutGrpList(Map param);
	
	public List<Map<String, Object>> selectRoutGrpItem();
	
	public List<Map<String, Object>> selectRoutGrpListByNode(Map param);
	
}
