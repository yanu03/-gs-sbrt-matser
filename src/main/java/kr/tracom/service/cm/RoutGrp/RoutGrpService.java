package kr.tracom.service.cm.RoutGrp;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.cm.RoutGrp.RoutGrpMapper;
import kr.tracom.support.ServiceSupport;

@Service
public class RoutGrpService extends ServiceSupport {

	@Autowired
	private RoutGrpMapper reproutMapper;

	public List<Map<String, Object>> selectRoutGrpList() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return reproutMapper.selectRoutGrpList(map);
	}
	
	public List<Map<String, Object>> selectRoutGrpItem() throws Exception {
		return reproutMapper.selectRoutGrpItem();
	}

	public List<Map<String, Object>> selectRoutGrpListByNode() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_sub_search");
		return reproutMapper.selectRoutGrpListByNode(map);
	}
	
	
}
