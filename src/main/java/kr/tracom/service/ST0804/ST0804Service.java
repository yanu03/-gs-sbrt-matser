package kr.tracom.service.ST0804;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.ST0804.ST0804Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class ST0804Service extends ServiceSupport {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceSupport.class);

	@Autowired
	private ST0804Mapper st0804Mapper;
	
	public List ST0804G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0804Mapper.ST0804G0R0(map);
	}
	
	public List ST0804G0R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0804Mapper.ST0804G0R1(map);
	}
	
	public List ST0804G1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0804Mapper.ST0804G1R0(map);
	}
	
	public List ST0804G1R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0804Mapper.ST0804G1R1(map);
	}
}
