package kr.tracom.mapper.VH0207;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VH0207Mapper {

	public List VH0207G0R0(Map param);
	public List VH0207G1R0(Map param);
	public List VH0207G2R0(Map param);
	public List VH0207P0R0();
}
