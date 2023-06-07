package kr.tracom.service.MO0204;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.MO0204.MO0204Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class MO0204Service extends ServiceSupport{
	
	@Autowired
	private MO0204Mapper MO0204Mapper;
		
	public List<Map> MO0204G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return MO0204Mapper.MO0204G0R0(param);
	}

	public List<Map> MO0204G1R0() throws Exception{
		Map param = getSimpleDataMap("dma_sub_search");
		return MO0204Mapper.MO0204G1R0(param);
	}
	
	public List<Map> MO0204G1R1() throws Exception{
		Map param = getSimpleDataMap("dma_sub_search");
		return MO0204Mapper.MO0204G1R1(param);
	}
	
	public List<Map> MO0204SHI1() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return MO0204Mapper.MO0204SHI1(param);
	}
	
	public List MO0204G2R0() throws Exception {
		// TODO Auto-generated method stub
		Map param = getSimpleDataMap("dma_sub_search");
		return MO0204Mapper.MO0204G2R0(param);
	}
	
}
