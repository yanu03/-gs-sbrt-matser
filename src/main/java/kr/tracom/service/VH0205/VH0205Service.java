package kr.tracom.service.VH0205;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.VH0205.VH0205Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class VH0205Service extends ServiceSupport{
	
	@Autowired
	private VH0205Mapper vh0205Mapper;
	
	public List<Map> VH0205G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return vh0205Mapper.VH0205G0R0(param);
	}
	
	public List<Map> selectFcltItem() throws Exception{
		return vh0205Mapper.selectFcltItem();
	}
	
	public List<Map> selectParamItem() throws Exception{
		Map param = getSimpleDataMap("dma_sub_search");
		return vh0205Mapper.selectParamItem(param);
	}
}
