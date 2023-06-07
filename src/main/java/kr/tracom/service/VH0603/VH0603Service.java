package kr.tracom.service.VH0603;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.VH0603.VH0603Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class VH0603Service extends ServiceSupport{
	
	@Autowired
	private VH0603Mapper vh0603Mapper;
	
	public List<Map> VH0603G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return vh0603Mapper.VH0603G0R0(param);
	}
	
}
