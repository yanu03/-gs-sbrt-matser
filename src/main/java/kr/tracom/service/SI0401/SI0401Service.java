package  kr.tracom.service.SI0401;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.handler.FTPHandler;
import kr.tracom.mapper.SI0401.SI0401Mapper;
import  kr.tracom.service.cm.OperPlan.OperPlanService;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Result;

@Service
public class SI0401Service extends ServiceSupport {

	@Autowired
	private SI0401Mapper si0401Mapper;
	
	@Autowired
	private OperPlanService operPlanService;

	@Autowired
	private FTPHandler ftpHandler;
	
	public List SI0401G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0401Mapper.SI0401G0R0(map);
	}

	public Map SI0401G0K0() throws Exception {
		return si0401Mapper.SI0401G0K0(); 
	}
	
	public List SI0401SHI0() throws Exception {
		return si0401Mapper.SI0401SHI0();
	}
	
	public Map SI0401G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_ROUT_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += si0401Mapper.SI0401G0I0(data);
				} else if (rowStatus.equals("U")) {
					uCnt += si0401Mapper.SI0401G0U0(data);
				} else if (rowStatus.equals("D")) {
					dCnt += si0401Mapper.SI0401G0D0(data);
					try {
						ftpHandler.deleteRoutList(data.get("ROUT_ID").toString(), "00000000");
						ftpHandler.deleteRoutemap(data.get("ROUT_ID").toString());
					} catch(Exception e) {	
					}
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
	
	public List SI0401G1R0() throws Exception {
		// TODO Auto-generated method stub
		Map param = getSimpleDataMap("dma_param_ROUTEID");
		return si0401Mapper.SI0401G1R0(param);
	}
	
	public List SI0401P0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0401Mapper.SI0401P0R0(map);
	}
	
	public List SI0401P1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_ROUT_GRP_MST");
		return si0401Mapper.SI0401P1R0(map);
	}
	
	public Map SI0401P1K0() throws Exception {
		return si0401Mapper.SI0401P1K0(); 
	}
	
	
	public Map SI0401P1S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_ROUT_GRP_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					operPlanService.insertSimpleOperPlan(data);
					iCnt += si0401Mapper.SI0401P1I0(data);
				} else if (rowStatus.equals("U")) {
					operPlanService.insertSimpleOperPlan(data);
					uCnt += si0401Mapper.SI0401P1U0(data);
				} else if (rowStatus.equals("D")) {
					dCnt += si0401Mapper.SI0401P1D0(data);
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
	
	public List SI0401P2R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_STTN_MST");
		return si0401Mapper.SI0401P2R0(map);
	}
	
	public List SI0401P3R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_TRANSCOMP_MST");
		return si0401Mapper.SI0401P3R0(map);
	}

	public Map SI0401G1S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_TRANSCOMP_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += si0401Mapper.SI0401G1I0(data);
				} else if (rowStatus.equals("D")) {
					dCnt += si0401Mapper.SI0401G1D0(data);
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

	public List SI0401G0_exlDownload() throws Exception {
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

		return si0401Mapper.SI0401G0R0(map);
	}
	
}
