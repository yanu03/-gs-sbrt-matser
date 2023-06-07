package  kr.tracom.service.cm.Crs;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.cm.Crs.CrsMapper;
import kr.tracom.support.ServiceSupport;

@Service
public class CrsService extends ServiceSupport{

	@Autowired
	private CrsMapper crsMapper;
	
	public List<Map<String, Object>> selectCrsItem() throws Exception {
		return crsMapper.selectCrsItem();
	}	
	
	
	public List<Map<String, Object>> selectGrpCrsItem() throws Exception {
		return crsMapper.selectGrpCrsItem();
	}	
	
}
