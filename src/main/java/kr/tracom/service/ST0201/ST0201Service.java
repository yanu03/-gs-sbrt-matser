package kr.tracom.service.ST0201;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.ST0201.ST0201Mapper;
import  kr.tracom.mapper.cm.Rout.RoutMapper;
import kr.tracom.support.ServiceSupport;

@Service
public class ST0201Service extends ServiceSupport {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceSupport.class);

	@Autowired
	private ST0201Mapper st02010Mapper;
	
	@Autowired
	RoutMapper routMapper;

	public List ST0201G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return st02010Mapper.ST0201G0R0(map);
	}
	
	public List ST0201SHI1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return st02010Mapper.ST0201SHI1(map);
	}

	public Map selectRout() throws Exception {
		Map map = getSimpleDataMap("dma_sub_search");

		map.put("TYPE", "ROUT_ID");
		map.put("CONTENT", map.get("ROUT_ID"));

		List routList = this.routMapper.selectRoutList(map);

		Map result = new HashMap();
		if (routList.size() > 0) {
			result.put("ROUT_ID", ((Map) routList.get(0)).get("ROUT_ID"));
			result.put("ST_NODE_ID", ((Map) routList.get(0)).get("ST_STTN_ID"));
			result.put("ED_NODE_ID", ((Map) routList.get(0)).get("ED_STTN_ID"));
		}
		return result;
	}

	public Map ST0201G1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search2");
		return st02010Mapper.ST0201G1R0(map);
	}
	
	public Map ST0201G1R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search2");
		return st02010Mapper.ST0201G1R1(map);
	}
	
	public List ST0201G2R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		Map<String, Object> map1 = getSimpleDataMap("dma_sub_search3");
		map.putAll(map1);
		return st02010Mapper.ST0201G2R0(map);
	}
	
	
}
