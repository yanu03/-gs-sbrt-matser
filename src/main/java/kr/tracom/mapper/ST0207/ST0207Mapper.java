package kr.tracom.mapper.ST0207;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ST0207Mapper {

	public List ST0207G0R0();
	
	public List ST0207G1R0(Map param);
	public List ST0207G2R1(Map param);
	
}
