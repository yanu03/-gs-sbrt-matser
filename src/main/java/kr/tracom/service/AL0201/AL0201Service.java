package kr.tracom.service.AL0201;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.AL0201.AL0201Mapper;
import  kr.tracom.service.cm.OperPlan.OperPlanService;
import kr.tracom.mapper.cm.Rout.RoutMapper;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Result;

@Service
public class AL0201Service extends ServiceSupport {


	@Autowired
	private AL0201Mapper AL0201Mapper;
	
	@Autowired
	private RoutMapper routMapper;
	
	@Autowired
	private OperPlanService operPlanService;
	
	public List AL0201G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return AL0201Mapper.AL0201G0R0(map);
	}
	
	public Map AL0201G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_OPER_PL_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += AL0201Mapper.AL0201G0I0(data);
				} else if (rowStatus.equals("U")) {
					uCnt += AL0201Mapper.AL0201G0U0(data);
				} else if (rowStatus.equals("D")) {
					//dCnt += AL0201Mapper.AL0201G0D0(data);
					//DEL_YN 처리하기 위함
					dCnt += AL0201Mapper.AL0201G0U0(data);
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
	
	public List AL0201G1R0() throws Exception {
		// TODO Auto-generated method stub
		Map param = getSimpleDataMap("dma_sub_search");
		return AL0201Mapper.AL0201G1R0(param);
	}
	
	public Map AL0201G1S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_OPER_PL_ROUT_INFO");
		try {
			Map<String, Object> map = getSimpleDataMap("dma_sub_search");
			String exl_update = (String) map.get("EXL_UPDATE");
			
			if(CommonUtil.notEmpty(exl_update)&&"true".equals(exl_update)) {
				AL0201Mapper.AL0201G1DA0(map);
				/*if(param.size()>0) {
					Map delParam = new HashMap();
					delParam.put("ROUT_ID", param.get(0).get("ROUT_ID"));
					AL0201Mapper.AL0201G1DA0(delParam);
				}*/
			}

			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				//List<Map<String, Object>> routList = routMapper.selectRoutListByRoutGrp(data);
				//if(routList.size()==1) { //노선 하나일때만 노선 ID 세팅
				//	data.put("ROUT_ID", routList.get(0).get("ROUT_ID"));
				//}
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					data.put("ROUT_ID", "RT00000003");
					data.put("ALLOC_NO", 1);
					String routId = (String)data.get("ROUT_ID");
					String dayDiv = (String)data.get("DAY_DIV");
					int operSn = Integer.valueOf(data.get("OPER_SN").toString());
					iCnt += AL0201Mapper.AL0201G1I0(data);
					operPlanService.makeOperAllocPlNodeInfo(null,routId, dayDiv, operSn, true, 0,null,null,null);
				} else if (rowStatus.equals("U")) {
					uCnt += AL0201Mapper.AL0201G1U0(data);
					String routId = (String)data.get("ROUT_ID");
					String dayDiv = (String)data.get("DAY_DIV");
					int operSn = Integer.valueOf(data.get("OPER_SN").toString());
					operPlanService.makeOperAllocPlNodeInfo(null,routId, dayDiv, operSn, true, 0,null,null,null);
				} else if (rowStatus.equals("D")) {
					dCnt += AL0201Mapper.AL0201G1D0(data);
				} 
			}	
			
			
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				List<Map<String, Object>> routList = routMapper.selectRoutListByRoutGrp(data);
				if(routList.size()==1) { //노선 하나일때만 노선 ID 세팅
					data.put("ROUT_ID", routList.get(0).get("ROUT_ID"));
				}
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("U")) {
					uCnt += AL0201Mapper.AL0201G1U0(data);
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
}
