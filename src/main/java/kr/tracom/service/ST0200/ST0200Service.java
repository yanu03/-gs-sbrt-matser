package kr.tracom.service.ST0200;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.ST0200.ST0200Mapper;
import kr.tracom.support.ServiceSupport;

@Service
public class ST0200Service extends ServiceSupport {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceSupport.class);

	@Autowired
	private ST0200Mapper st0200Mapper;
	
	public List ST0200G0R0() throws Exception {
	
		Map<String, Object> map = getSimpleDataMap("dma_search");
		Map<String, Object> subMap = getSimpleDataMap("dma_sub_search");
		map.put("F_DATE", subMap.get("F_DATE"));
		map.put("L_DATE", subMap.get("L_DATE"));
		return st0200Mapper.ST0200G0R0(map);
	}
	
	public List ST0200PROC() throws Exception {
		return st0200Mapper.ST0200PROC();
	}
	
	public List ST0200G1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		String temp[] = map.get("ROUT_ID").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("ROUT_ID", temp);
		return st0200Mapper.ST0200G1R0(map);
	}
	
	public List ST0200G1R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		String temp[] = map.get("ROUT_ID").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("ROUT_ID", temp);
		return st0200Mapper.ST0200G1R1(map);
	}
	
	public List ST0200G1R2() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		String temp[] = map.get("ROUT_ID").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("ROUT_ID", temp);
		return st0200Mapper.ST0200G1R2(map);
	}
	
}
