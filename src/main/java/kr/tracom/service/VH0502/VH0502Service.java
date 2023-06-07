package kr.tracom.service.VH0502;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.VH0502.VH0502Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class VH0502Service extends ServiceSupport{
	
	@Autowired
	private VH0502Mapper vh0502Mapper;
	
	public List<Map> VH0502G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return vh0502Mapper.VH0502G0R0(param);
	}
	
	public List<Map> VH0502SHI0() throws Exception{
		return vh0502Mapper.VH0502SHI0();
	}
	
}
