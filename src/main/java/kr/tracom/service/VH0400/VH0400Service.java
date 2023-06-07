package kr.tracom.service.VH0400;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.VH0400.VH0400Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class VH0400Service extends ServiceSupport {
	
	@Autowired
	private VH0400Mapper vh0400Mapper;
	
	public List<Map> VH0400G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return vh0400Mapper.VH0400G0R0(param);
	}
	
	public List<Map> VH0400EVT() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return vh0400Mapper.VH0400EVT(param);
	}
	
}
