package kr.tracom.service.VH0203;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.VH0203.VH0203Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class VH0203Service extends ServiceSupport{
	
	@Autowired
	private VH0203Mapper vh0203Mapper;
	
	public List<Map> VH0203G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return vh0203Mapper.VH0203G0R0(param);
	}
	
}
