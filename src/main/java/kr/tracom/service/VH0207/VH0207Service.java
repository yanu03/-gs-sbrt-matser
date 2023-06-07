package kr.tracom.service.VH0207;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.VH0207.VH0207Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class VH0207Service extends ServiceSupport {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceSupport.class);

	@Autowired
	private VH0207Mapper vh0207Mapper;
	
	public List VH0207G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return vh0207Mapper.VH0207G0R0(map);
	}
	
	public List VH0207G1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return vh0207Mapper.VH0207G1R0(map);
	}
	
	public List VH0207G2R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return vh0207Mapper.VH0207G2R0(map);
	}
	
	public List VH0207P0R0() throws Exception {
		return vh0207Mapper.VH0207P0R0();
	}
}
