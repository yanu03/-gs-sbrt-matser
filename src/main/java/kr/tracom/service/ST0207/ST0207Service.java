package kr.tracom.service.ST0207;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.ST0207.ST0207Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class ST0207Service extends ServiceSupport {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceSupport.class);

	@Autowired
	private ST0207Mapper st0207Mapper;
	
	public List ST0207G0R0() throws Exception {
		return st0207Mapper.ST0207G0R0();
	}
	
	public List ST0207G1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		String temp[] = map.get("EVT_TYPE").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("EVT_TYPE", temp);
		return st0207Mapper.ST0207G1R0(map);
	}
	
	public List ST0207G2R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st0207Mapper.ST0207G2R1(map);
	}
	
}
