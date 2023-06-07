package kr.tracom.service.VH0604;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.VH0604.VH0604Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class VH0604Service extends ServiceSupport{
	
	@Autowired
	private VH0604Mapper vh0604Mapper;
	
	public List<Map> VH0604G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return vh0604Mapper.VH0604G0R0(param);
	}
	
}
