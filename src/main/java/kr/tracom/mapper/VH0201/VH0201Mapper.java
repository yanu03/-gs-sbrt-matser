package kr.tracom.mapper.VH0201;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VH0201Mapper {
	
	public List<Map> VH0201G0R0(Map param);
	
}
