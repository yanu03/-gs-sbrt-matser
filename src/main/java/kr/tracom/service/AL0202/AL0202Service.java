package kr.tracom.service.AL0202;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.AL0201.AL0201Mapper;
import kr.tracom.mapper.AL0202.AL0202Mapper;
import kr.tracom.mapper.cm.OperPlan.OperPlanMapper;
import  kr.tracom.service.cm.OperPlan.OperPlanService;
import kr.tracom.service.tims.TimsService;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Result;


@Service
public class AL0202Service extends ServiceSupport {
	
	private static final Logger logger = LoggerFactory.getLogger(ServiceSupport.class);
	

	@Autowired
	private OperPlanService operPlanService;
	
	@Autowired
	private AL0202Mapper al0202Mapper;
	
	@Autowired
	private OperPlanMapper operPlanMapper;
	
	@Autowired
	private AL0201Mapper al0201Mapper;
	
	
	@Autowired
	TimsService TimsService;
	
	
	public List AL0202G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		List list = al0202Mapper.AL0202G0R0(map);
		
		/*for (int i = 0; i < list.size(); i++) {
			Map<String, Object> data = (Map<String, Object>)list.get(i);
			
			String wayAscNm = CommonUtil.objectToString(data.get("WAY_ASC_NM"));
			String wayDescNm = CommonUtil.objectToString(data.get("WAY_DESC_NM"));
			String stSttnNm = CommonUtil.objectToString(data.get("ST_STTN_NM"));
			String edSttnNm = CommonUtil.objectToString(data.get("ED_STTN_NM"));
			if(CommonUtil.notEmpty(stSttnNm)&&CommonUtil.notEmpty(edSttnNm)) {
				data.put("WAY_ASC_STR", stSttnNm+" → "+edSttnNm);
				data.put("WAY_DESC_STR", edSttnNm+" → "+stSttnNm);
			}
		}*/

		 
		 return list;
	}
	
	public List AL0202G0R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		List list = al0202Mapper.AL0202G0R1(map);
		 return list;
	}	
	
	public List AL0202G1R0() throws Exception {
		Map param = getSimpleDataMap("dma_sub_search");
		return al0202Mapper.AL0202G1R0(param);
	}
	
	public List AL0202G1CNT() throws Exception {
		Map param = getSimpleDataMap("dma_sub_search");
		return al0202Mapper.AL0202G1CNT(param);
	}
	
	public List AL0202P0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return al0202Mapper.AL0202P0R0(map);
	}
	
	public List AL0202P0R1() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_param_AL0202P0R1");
		return al0202Mapper.AL0202P1R0(map);
	}
	
	public List selectCorCnt() throws Exception {
		return al0202Mapper.selectCorCnt();
	}
	
	public Map AL0202G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		//Map type = getSimpleDataMap("dma_save");
		
		List<Map<String, Object>> param3 = getSimpleList("dlt_BMS_OPER_PL_MST");
		
		
		try {
			for (int i = 0; i < param3.size(); i++) {
				Map data = (Map) param3.get(i);
				
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					al0201Mapper.AL0201G0I0(data);
				} else if (rowStatus.equals("U")) {
					al0201Mapper.AL0201G0U0(data);
				} else if (rowStatus.equals("D")) {
					//al0201Mapper.AL0201G0D0(data);
					al0201Mapper.AL0201G0U0(data);
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
		
		//운행계획 생성되었다고 BRT 서비스에 알림
		//TimsService.notifyOperAllocCompleted();
		
		return result;		
	}
	
	public Map AL0202G1S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		//Map type = getSimpleDataMap("dma_save");
		
		List<Map<String, Object>> param = getSimpleList("dlt_OPER_ALLOC_PL_ROUT_INFO");
		//List<Map<String, Object>> param2 = getSimpleList("dlt_BMS_OPER_ALLOC_PL_COR_INFO");
		//List<Map<String, Object>> param3 = getSimpleList("dlt_BMS_OPER_PL_MST");
		try {
			
			/*if(param.size()>0&&"ALL".equals(type.get("TYPE"))){
				al0202Mapper.AL0202G1DA0(param.get(0));
			}*/
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				if(CommonUtil.empty(data.get("ROUT_ID")))break;
				
				String rowStatus = (String) data.get("rowStatus");
				
				String allocId = data.get("ALLOC_ID").toString();
				String routId = data.get("ROUT_ID").toString();
				//String dayDiv = data.get("DAY_DIV").toString();
				//if(CommonUtil.empty(data.get("OPER_SN")))break;
				//int operSn = Integer.valueOf(data.get("OPER_SN").toString());
				
				if (rowStatus.equals("C")) {
					iCnt += al0202Mapper.AL0202G1I0(data);
					//iCnt += al0201Mapper.AL0201G1I0(data);
					//operPlanService.makeOperAllocPlNodeInfo(allocId, routId, dayDiv, operSn, true);
				} else if (rowStatus.equals("U")) {
					uCnt += al0202Mapper.AL0202G1U0(data);
					//iCnt += al0201Mapper.AL0201G1U0(data);
					//operPlanService.makeOperAllocPlNodeInfo(allocId, routId, dayDiv, operSn, true);
				} else if (rowStatus.equals("D")) {
					//dCnt += al0201Mapper.AL0201G1D0(data);
					dCnt += al0202Mapper.AL0202G1D0(data);
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
		
		//운행계획 생성되었다고 BRT 서비스에 알림
		//TimsService.notifyOperAllocCompleted();
		
		return result;		
	}
	public Map AL0202G0K0() throws Exception {
		return al0202Mapper.AL0202G0K0(); 
	}
	
	public Map AL0202G1K0() throws Exception {
		return al0202Mapper.AL0202G1K0(); 
	}
	
   public List AL0202G1_exlDownload(String parameter) throws Exception {
      String param = parameter;
      Map<String, Object> map = new HashMap<String, Object>();
      if(CommonUtil.empty(param)){
         map.put("TYPE", "ALL");
         map.put("ALLOC_ID", "");
      }
      else{
         map.put("TYPE", "ALL");
         map.put("ALLOC_ID", param);
      }

      return al0202Mapper.AL0202G1R0(map);
   }	
	
	public String AL0202G1_exlUploadCheck(String value, int valueLength, String id) throws Exception{
		String result = "";
		String date1 = "";
		// Required input check
		if(id == "노선ID" || id == "노드ID" || id == "노드순번" || id == "노드명") {
			if(value == "" || value == null) {
				result =  id + "을(를) 작성 후 업로드 해주세요.";
			}
		}
		// checking data length
		if(value.length() > valueLength) {
			result = id + "을(를) 데이터 형식에 맞게 입력 해주세요.";
		}
		
		return result;
	}
	
	// 기능: excel upload validate
	public List<Map<String, Object>> AL0202G1_exlUpload(List<Map<String, Object>> data) throws Exception{
		String [] keys = {"ALLOC_ID", "SN", "ALLOC_NO", "ROUT_ID"};
		List<Map<String, Object>> list = data;
		Map<Integer, Object> map2 = new HashMap<Integer, Object>(); 
		
		Map<String, Object> resultMap = new HashMap<String,Object>(); // error message
		List<String> array = new ArrayList<String>(); // contain SN 
		
		String value;
		String resultMsg = "";
		int cnt = 0; // 빈column갯수 새기
		int index = 0; 
		
		
		// checking to data type
		loop1:
		for(Map<String, Object> map : list) {
			for(Map.Entry<String, Object> entry : map.entrySet()) {
				value = entry.getValue().toString();
				if(entry.getKey() == "ALLOC_ID") {
					resultMsg = AL0202G1_exlUploadCheck(value, 10, "배차ID");
				}
				else if(entry.getKey() == "SN") {
					resultMsg = AL0202G1_exlUploadCheck(value, 5, "순번");
				}
				else if(entry.getKey() == "ALLOC_NO") {
					resultMsg = AL0202G1_exlUploadCheck(value, 2, "배차번호");
//					array.add(value);
				}
				else if(entry.getKey() == "ROUT_ID") {
					resultMsg = AL0202G1_exlUploadCheck(value, 10, "노선ID");
				}
				else if(entry.getKey() == "OPER_SN") {
					resultMsg = AL0202G1_exlUploadCheck(value, 3, "운행순번");
				}
				else if(entry.getKey() == "COR_ID") {
					resultMsg = AL0202G1_exlUploadCheck(value, 10, "코스ID");
				}
				else if(entry.getKey() == "ROUT_ST_TM") {
					resultMsg = AL0202G1_exlUploadCheck(value, 8, "노선시작시간");
				}
				else if(entry.getKey() == "ROUT_ED_TM") {
					resultMsg = AL0202G1_exlUploadCheck(value, 8, "노선종료시간");
				}
				else if(entry.getKey() == "REST_TM") {
					resultMsg = AL0202G1_exlUploadCheck(value, 8, "휴게시간");
				}
				else if(entry.getKey() == "VHC_ID") {
					resultMsg = AL0202G1_exlUploadCheck(value, 10, "차량ID");
				}
				else if(entry.getKey() == "DRV_ID") {
					resultMsg = AL0202G1_exlUploadCheck(value, 10, "운전자ID");
				}
				if(resultMsg != "") {
					resultMap.put("errorMsg",resultMsg);
					for(int i=0; i < keys.length; i++) {
						if(entry.getKey() == keys[i]) {
							list.clear();
							list.add(resultMap);
							break loop1;
						}
					}
					map2.put(index, resultMsg);
				}
			}
			index++;
		}
		
		for(Map.Entry<Integer, Object> entry : map2.entrySet()) {
			for(int i=0; i < list.size(); i++) {
				if(entry.getKey() == i) {
					Map<String, Object> listValue = list.get(i);
					//System.out.println(entry.getValue());
					listValue.put("msg", entry.getValue());
					list.add(i, listValue);
				}
			}
		}
		
		// find NODE_SN duplication
		loop2:
		for(int i=0; i < array.size(); i++) {
			for(Map<String, Object> map : list){
				if(array.get(i) == map.get("NODE_SN")) {
					cnt++;
				}
			}
			if(cnt > 1) {
				resultMsg = "노드순번 "+ array.get(i) +"은 중복된 순번입니다.";
				resultMap.put("errorMsg",resultMsg);
				list.clear();
				list.add(resultMap);
				break loop2;
			}
			cnt = 0;
		}
	
		if(list.isEmpty()) {
			resultMsg = "일치하는 데이터가 존재하지 않습니다.";
			resultMap.put("errorMsg",resultMsg);
			list.clear();
			list.add(resultMap);
		}
		
		return list;
	}
}
