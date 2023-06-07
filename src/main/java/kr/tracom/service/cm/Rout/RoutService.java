package kr.tracom.service.cm.Rout;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.cm.Rout.RoutMapper;
import kr.tracom.support.ServiceSupport;


@Service
public class RoutService extends ServiceSupport {

	@Autowired
	private RoutMapper routMapper;

	public List<Map<String, Object>> selectRoutList() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectRoutList(map);
	}
	
	public List<Map<String, Object>> selectRoutListWithGps() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectRoutListWithGps(map);
	}		
	
	public List<Map<String, Object>> selectRoutListByRoutGrp() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectRoutListByRoutGrp(map);
	}
	
	public List<Map<String, Object>> selectRoutItem() throws Exception {
		Map<String, Object> map = null;
		try {
			map = getSimpleDataMap("dma_search");
		}
		catch(Exception e) {
				
		}
		if(map==null) map = new HashMap<String, Object>();
		return routMapper.selectRoutItem(map);
	}
	
	public List<Map<String, Object>> selectNodeListByRouts() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		String temp[] = map.get("ROUT_IDS").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("ROUT_IDS", temp);
		return routMapper.selectNodeListByRouts(map);
	}
	
	public List<Map<String, Object>> selectNodeListByRout() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return routMapper.selectNodeListByRout(map);
	}
	
	public List<Map<String, Object>> selectNodeListByRoutGrp() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectNodeListByRoutGrp(map);
	}
	
	public List<Map<String, Object>> selectNodeListByRoutGrps() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		String temp[] = map.get("ROUT_GRPS").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("ROUT_GRPS", temp);
		return routMapper.selectNodeListByRoutGrps(map);
	}
	
	public List<Map<String, Object>> selectNodeDispListByRouts() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		String temp[] = map.get("ROUT_IDS").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("ROUT_IDS", temp);
		return routMapper.selectNodeDispListByRouts(map);
	}
	
	public List<Map<String, Object>> selectNodeDispListByRout() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return routMapper.selectNodeDispListByRout(map);
	}
	
	public List<Map<String, Object>> selectNodeDispListByRoutGrp() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectNodeDispListByRoutGrp(map);
	}
	
	public List<Map<String, Object>> selectNodeDispListByRoutGrps() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		String temp[] = map.get("ROUT_GRPS").toString().replace("[","").replace("]","").replace(" ","").split(",");
		map.put("ROUT_GRPS", temp);
		return routMapper.selectNodeDispListByRoutGrps(map);
	}
	
	public List<Map<String, Object>> selectMainNodeListByRout() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return routMapper.selectMainNodeListByRout(map);
	}

	public List<Map<String, Object>> selectSttnList() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectSttnList(map);
	}
	
	public List<Map<String, Object>> selectSttnItem() throws Exception {
		return routMapper.selectSttnItem();
	}
	
	public List<Map<String, Object>> selectSttnCrsList() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectSttnCrsList(map);
	}
	
	public List<Map<String, Object>> selectSttnCrsDispList() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectSttnCrsDispList(map);
	}
	
	public List<Map<String, Object>> selectSttnCrsLink() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return routMapper.selectSttnCrsLink(map);
	}
}
