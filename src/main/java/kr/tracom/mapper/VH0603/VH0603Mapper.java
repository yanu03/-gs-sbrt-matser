package kr.tracom.mapper.VH0603;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VH0603Mapper {
	
	public List<Map> VH0603G0R0(Map param);
	
}
