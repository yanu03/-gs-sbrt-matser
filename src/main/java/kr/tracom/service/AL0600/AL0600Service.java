package kr.tracom.service.AL0600;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.AL0600.AL0600Mapper;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.Result;

@Service
public class AL0600Service extends ServiceSupport {

	@Autowired
	private AL0600Mapper al0600Mapper;
	
	public List AL0600G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return al0600Mapper.AL0600G0R0(map);
	}
	
	
	public List AL0600SHI0() throws Exception {
		return al0600Mapper.AL0600SHI0();
	}
	
	public List AL0600SHI1() throws Exception{
		Map param = getSimpleDataMap("dma_search");		
		return al0600Mapper.AL0600SHI1(param);
	}	
	
	public List AL0600G1R0() throws Exception {
		// TODO Auto-generated method stub
		Map param = getSimpleDataMap("dma_sub_search");
		return al0600Mapper.AL0600G1R0(param);
	}
	
	public List AL0600G1CNT() throws Exception {
		Map param = getSimpleDataMap("dma_sub_search");
		return al0600Mapper.AL0600G1CNT(param);
	}
	
		
	
}
