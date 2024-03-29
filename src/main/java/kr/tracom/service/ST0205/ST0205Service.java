package kr.tracom.service.ST0205;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.ST0205.ST0205Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class ST0205Service extends ServiceSupport {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceSupport.class);

	@Autowired
	private ST0205Mapper st0205Mapper;
	
	public List ST0205G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0205Mapper.ST0205G0R0(map);
	}
	
	public List ST0205G0R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0205Mapper.ST0205G0R1(map);
	}
	
	public List ST0205G1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0205Mapper.ST0205G1R0(map);
	}
	
	public List ST0205G1R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0205Mapper.ST0205G1R1(map);
	}
}
