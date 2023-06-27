package  kr.tracom.service.SI0200;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.SI0200.SI0200Mapper;
import kr.tracom.platform.common.util.CommonUtil;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.Constants;
import kr.tracom.util.Result;

@Service
public class SI0200Service extends ServiceSupport {

	@Autowired
	private SI0200Mapper si0200Mapper;
	
	public List SI0200G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0200Mapper.SI0200G0R0(map);
	}
	
	public List SI0200G0_exlDownload() throws Exception {
		String param = (String)request.getAttribute("param");
		Map<String, Object> map = new HashMap<String, Object>();
		if(CommonUtil.empty(param)) {
			map.put("TYPE", "ALL");
			map.put("CONTENT", "");
		}
		else {
			map.put("TYPE", "ALL");
			map.put("CONTENT", param);
		}

		return si0200Mapper.SI0200G0R0(map);
	}
	
	public List SI0200SHI0() throws Exception {
		return si0200Mapper.SI0200SHI0();
	}
	
	public List SI0200P0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0200Mapper.SI0200P0R0(map);
	}

	public Map SI0200G0K0() throws Exception {
		return si0200Mapper.SI0200G0K0(); 
	}
	
	public Map SI0200G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_VHC_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += si0200Mapper.SI0200G0I0(data);
				} else if (rowStatus.equals("U")) {
					uCnt += si0200Mapper.SI0200G0U0(data);
				} else if (rowStatus.equals("D")) {
					si0200Mapper.SI0200G0D1(data);
					dCnt += si0200Mapper.SI0200G0D0(data);
				} 
			}			
		} catch(Exception e) {
			if (e instanceof DuplicateKeyException)
			{
				throw new MessageException(Result.ERR_KEY, "중복된 키값의 데이터가 존재합니다.");
			}
			else
			{
				throw e;
			}		
		}

		
		Map result = saveResult(iCnt, uCnt, dCnt);
		
		return result;		
		
		
	}
	
	public List SI0200SHI1() throws Exception {
		return si0200Mapper.SI0200SHI1();
	}

	public List SI0200G0_exlDownload() throws Exception {
		String param = (String)request.getAttribute("param");
		Map<String, Object> map = new HashMap<String, Object>();
		if(CommonUtil.empty(param)){
			map.put("TYPE", "ALL");
			map.put("CONTENT", "");
		}
		else{
			map.put("TYPE", "ALL");
			map.put("CONTENT", param);
		}

		return si0200Mapper.SI0200G0R0(map);
	}
}
