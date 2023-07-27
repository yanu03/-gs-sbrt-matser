package  kr.tracom.service.SI0200;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.SI0200.SI0200Mapper;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.CommonUtil;
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
					//si0200Mapper.SI0200G0D1(data); //배차 삭제
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
	
	public String SI0200G0_exlUploadCheck(String value, int valueLength, String id) throws Exception{
		String result = "";
		String date1 = "";
		// Required input check
		if(id == "차량ID" || id == "차량번호" || id == "운수사ID" || id == "운수사명") {
			if(value == "" || value == null) {
				result =  id + "을(를) 작성 후 업로드 해주세요.";
			}
			if(id == "차량ID" && (value.length() != valueLength || !value.contains("VH"))) {
				result = id + "을(를) 데이터 형식에 맞게 입력 해주세요.";
			}
		}
		// checking data length
		if(value.length() > valueLength) {
			result = id + "을(를) 데이터 형식에 맞게 입력 해주세요.";
		}
		
		return result;
	}
	
	// 기능: excel upload validate
	public List<Map<String, Object>> SI0200G0_exlUpload(List<Map<String, Object>> data, String[] columns, String[] columnsNm) throws Exception{
		List<Map<String, Object>> list = data;
		String [] keys = {"VHC_ID", "VHC_NO", "COMP_ID", "COMP_NM"};
		
		Map<Integer, Object> map2 = new HashMap<Integer, Object>(); 
		Map<String, Object> resultMap = new HashMap<String,Object>(); // error message
		List<String> array = new ArrayList<String>(); // contain VHC_NO 
		
		String value;
		String resultMsg = "";
		int cnt = 0; // 빈column갯수 새기
		int index = 0; 
		
		
		// checking to data type
		loop1:
		for(Map<String, Object> map : list) {
			map.put("USE_YN", "Y");
			for(Map.Entry<String, Object> entry : map.entrySet()) {
				// 차량 관리의 데이터타입은 VARCHAR와 CHAR로 이루어져 있어 
				// 데이터 유형을 String으로 변경함
				value = entry.getValue().toString();
				if(entry.getKey() == "VHC_ID") {
					resultMsg = SI0200G0_exlUploadCheck(value, 10, "차량ID");
				}
				else if(entry.getKey() == "VHC_NO") {
					resultMsg = SI0200G0_exlUploadCheck(value, 9, "차량번호");
					array.add(value);
				}
				else if(entry.getKey() == "COMP_ID") {
					resultMsg = SI0200G0_exlUploadCheck(value, 10, "운수사ID");
				}
				else if(entry.getKey() == "COMP_NM") {
					resultMsg = SI0200G0_exlUploadCheck(value, 9, "운수사명");
				}
				else if(entry.getKey() == "AREA") {
					resultMsg = SI0200G0_exlUploadCheck(value, 5, "권역");
				}
				else if(entry.getKey() == "AREA_NM") {
					resultMsg = SI0200G0_exlUploadCheck(value, 20, "권역명");
				}
				else if(entry.getKey() == "CHAS_NO") {
					resultMsg = SI0200G0_exlUploadCheck(value, 17, "차대번호");
				}
				else if(entry.getKey() == "MAKER") {
					resultMsg = SI0200G0_exlUploadCheck(value, 5, "제조사");
				}
				else if(entry.getKey() == "MAKER_NM") {
					resultMsg = SI0200G0_exlUploadCheck(value, 20, "제조사명");
				}
				else if(entry.getKey() == "RELS_DT") {
					resultMsg = SI0200G0_exlUploadCheck(value, 10, "출고일자");
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
		
		// contains error message to return list
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
		
		// find VHC_NO duplication
		loop2:
		for(int i=0; i < array.size(); i++) {
			for(Map<String, Object> map : list){
				if(array.get(i) == map.get("VHC_NO")) {
					cnt++;
				}
			}
			if(cnt > 1) {
				resultMsg = "차량번호 "+ array.get(i) +"은 중복된 번호입니다.";
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
