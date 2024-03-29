package  kr.tracom.service.SI0402;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.SI0402.SI0402Mapper;
import  kr.tracom.mapper.cm.Rout.RoutMapper;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Constants;
import kr.tracom.util.DataInterface;
import kr.tracom.util.Result;

@Service
public class SI0402Service extends ServiceSupport {

	Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private SI0402Mapper si0402Mapper;
	
	@Autowired
	private RoutMapper routMapper;
	
	public List SI0402G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0402Mapper.SI0402G0R0(map);
	}

	public Map SI0402G0K0() throws Exception {
		return si0402Mapper.SI0402G0K0(); 
	}
	
	public List SI0402SHI0() throws Exception {
		return si0402Mapper.SI0402SHI0();
	}
	
	public Map SI0402G1S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;
		boolean isLinkChange = false; //링크가 추가되거나, 변경되었는지 체크
		double beforeSttnNodeSn = 0;
		//Map<String, Object> beforeSttnData = null;

		List<Map<String, Object>> param = getSimpleList("dlt_BMS_ROUT_NODE_CMPSTN");
		Map<String, Object> map = null;
		if(param.size()>0) {
			map = param.get(0);
		}
		
		try {
			//List<Map<String, Object>> routNodeList = routMapper.selectRoutNodeCmpstn(map);
			
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				String nodeType = (String) data.get("NODE_TYPE");
				String nodeId = (String)data.get("NODE_ID");
				String oldNodeId = (String)data.get("OLD_NODE_ID");
				String sttnId = (String)data.get("STTN_ID");
				String crsId = (String)data.get("CRS_ID");
				double curNodeSn = 0; 
				if(CommonUtil.notEmpty(data.get("NODE_SN"))) {
					curNodeSn = CommonUtil.decimalToDouble(data.get("NODE_SN"));
				}
				double oldNodeSn = 0;
				if(CommonUtil.notEmpty(oldNodeSn)) {
					oldNodeSn = CommonUtil.decimalToDouble(data.get("OLD_NODE_SN"));
				}
				/*String nextNodeType = null;
				if(i < param.size()-1) {
					Map data2 = (Map) param.get(i+1);
					nextNodeType = (String) data2.get("NODE_TYPE"); //다음 노드유형
				}*/
				
				//추가한 데이터의 처응의 이전 정류장의 순번을 찾음 start[
				/*if(routNodeList.size()>0) {
					if(beforeSttnNodeSn >0 && routNodeList.size()>0) {
						for(int j=routNodeList.size()-1; j>=0;j--) {
							beforeSttnNodeSn = CommonUtil.decimalToDouble(routNodeList.get(j).get("NODE_SN"));
							if(beforeSttnNodeSn < curNodeSn) {
								//beforeSttnData = routNodeList.get(j);
								break;
							}							
						}
					}
				}*/
				//추가한 데이터의 처응의 이전 정류장의 순번을 찾음 end]
				
				//노드가 추가되거나, 변경되었을때 링크 변경 상태로 함.
				//String lastNodeId = (String) map.get("LAST_NODE_ID");
				if (rowStatus.equals("C")) {
					Map key = null;
					
					isLinkChange = true;
					
					if(CommonUtil.empty(nodeId)){
						key = si0402Mapper.SI0402G1K0();
					}
					data.put("LINK_NODE_YN","Y");
					
					if(key!=null)data.put("NODE_ID",key.get("SEQ"));
					
					if(oldNodeSn==0){ //이전 노드 순번이 없을때(새로 생성)
						iCnt += si0402Mapper.SI0402G1I0(data);
					}
					else {
						uCnt += si0402Mapper.SI0402G1U0(data);
					}
				} else if (rowStatus.equals("U")) {
					if((curNodeSn>0)&&(oldNodeSn>0)&&(curNodeSn!=oldNodeSn)) {
						isLinkChange = true;
					}
					data.put("LINK_NODE_YN","Y");
					if(oldNodeSn==0){ //이전 노드 순번이 없을때(새로 생성)
						iCnt += si0402Mapper.SI0402G1I0(data);
					}
					else {
						uCnt += si0402Mapper.SI0402G1U0(data);
					}
				} else if (rowStatus.equals("D")) {
					isLinkChange = true;
					dCnt += si0402Mapper.SI0402G1D0(data);
				}
			}
			
			
			//링크가 변경되었을때 링크를 재 구성함
			if((isLinkChange==true)&&(param.size()>0)) {
				int sttnCnt = 0;
				double routLen = 0;
				int sttnIndex = 0;
				
				map.put("NODE_TYPE", "");
				map.put("NODE_SN", "");
				List<Map<String, Object>> routNodeList = routMapper.selectRoutNodeCmpstn(map);
				
				//map.put("NODE_SN",beforeSttnNodeSn);
				//routNodeList = routMapper.selectRoutNodeCmpstn(map);				
				//map.put("LINK_SN",beforeSttnNodeSn);
				//routMapper.deleteRoutLinkCmpstnSnMore(map);
				//routMapper.deleteRoutSttnLinkCmpstnSnMore(map);
				
				si0402Mapper.SI0402G1DA1(map);
				si0402Mapper.SI0402G1DA2(map);
				
				List<Object> routSttnLinkIdKeysList = new ArrayList();
				List<Object> routSttnLinkIdValuesList = new ArrayList();
				
				if(routNodeList.size()>0) {
					
					//정류소별 링크
					for (int i = 0; i < routNodeList.size()-1; i++) {
						Map sttnData = routNodeList.get(i);
						
						String nodeType = (String) sttnData.get("NODE_TYPE");
						
						double curSttnNodeSn = 0; 
						if(CommonUtil.notEmpty(sttnData.get("NODE_SN"))) {
							curSttnNodeSn = CommonUtil.decimalToDouble(sttnData.get("NODE_SN"));
						}
						
						if(!Constants.NODE_TYPE_BUSSTOP.equals(nodeType)/*||curSttnNodeSn<beforeSttnNodeSn*/){
							continue;
						}
						//sttnData.put("ROUT_LINK_ID", sttnData.get("LINK_ID"));
						
						double len = 0;
						Map nextSttnData = null;
						
						Map tmpBeforeNode = sttnData;
						for(int j = i+1; j < routNodeList.size(); j++ ) { //다음 
							Map tmpNode = routNodeList.get(j);
							double stGpsX = CommonUtil.decimalToDouble(tmpBeforeNode.get("GPS_X"));
							double stGpsY = CommonUtil.decimalToDouble(tmpBeforeNode.get("GPS_Y"));
							double edGpsX = CommonUtil.decimalToDouble(tmpNode.get("GPS_X"));
							double edGpsY = CommonUtil.decimalToDouble(tmpNode.get("GPS_Y"));
							
							String tmpNodeType = (String) tmpNode.get("NODE_TYPE");
							
							len += DataInterface.getDistanceBetween(stGpsX, stGpsY, 
									edGpsX, edGpsY);
							if(Constants.NODE_TYPE_BUSSTOP.equals(tmpNodeType)) {
								nextSttnData = tmpNode;
								break;
							}
							tmpBeforeNode = tmpNode;
						}
						
						if(nextSttnData == null) {
							continue;
						}
						
						//매핑링크 List 
						Map<Object, Object> routSttnLinkIdMap = new HashMap<>();
						routSttnLinkIdValuesList.add(nextSttnData.get("NODE_ID")); //도착 정류소ID
						
						sttnData.put("LINK_SN",(i+1));
						sttnData.put("ST_NODE_ID",sttnData.get("NODE_ID"));
						sttnData.put("ED_NODE_ID",nextSttnData.get("NODE_ID"));
						String linkNm = sttnData.get("NODE_NM") + "-" + nextSttnData.get("NODE_NM");
						sttnData.put("LINK_NM",linkNm);
						
						sttnData.put("LEN",CommonUtil.pointRound(len,3));
						
						Map<Object, Object> sttnLink = routMapper.getSttnLinkIdByNode(sttnData);
						
						if(sttnLink!=null&&CommonUtil.notEmpty(sttnLink.get("LINK_ID"))) { //링크가 있는 경우 기존 링크 사용함
							routSttnLinkIdKeysList.add(sttnLink.get("LINK_ID")); //ROUT_STTN_LINK_ID
							sttnData.put("STTN_LINK_ID",sttnLink.get("LINK_ID"));
							si0402Mapper.SI0402G1I2_2(sttnData); //링크 insert
						}
						else {
							Map linkKeyMap = si0402Mapper.SI0402G1K2(); //정류소 링크아이디 생성
							routSttnLinkIdKeysList.add(linkKeyMap.get("SEQ")); //ROUT_STTN_LINK_ID
							sttnData.put("STTN_LINK_ID",linkKeyMap.get("SEQ"));
							si0402Mapper.SI0402G1I2(sttnData); //링크 insert
						}
					}					
					
					for (int i = 0; i < routNodeList.size()-1; i++) {
						
						Map data = routNodeList.get(i);
						String nodeType = (String) data.get("NODE_TYPE");
						double curNodeSn = 0; 
						if(CommonUtil.notEmpty(data.get("NODE_SN"))) {
							curNodeSn = CommonUtil.objectToDouble(data.get("NODE_SN"));
						}
						/*if(curNodeSn<beforeSttnNodeSn){
							continue;
						}*/
						
						Map nextData = routNodeList.get(i+1);
						if(Constants.NODE_TYPE_BUSSTOP.equals(nodeType)){
							sttnCnt++;
						}

						if(CommonUtil.empty(data.get("LINK_ID"))) { //링크가 없는 경우
							Map linkKeyMap = si0402Mapper.SI0402G1K1(); //링크아이디 생성
							data.put("LINK_ID", linkKeyMap.get("SEQ"));
							routMapper.updateLinkIdRoutNodeCmpstn(data);
						}
						
						if(sttnIndex<routSttnLinkIdKeysList.size()) {
							data.put("ROUT_STTN_LINK_ID", routSttnLinkIdKeysList.get(sttnIndex));
							if(nextData.get("NODE_ID") == routSttnLinkIdValuesList.get(sttnIndex)) {
								sttnIndex++;
							}
						}
						
						data.put("LINK_SN",(i+1));
						data.put("ST_NODE_ID",data.get("NODE_ID"));
						data.put("ED_NODE_ID",nextData.get("NODE_ID"));
						String linkNm = data.get("NODE_NM") + "-" + nextData.get("NODE_NM");
						data.put("LINK_NM",linkNm);
						
						double stGpsX = CommonUtil.decimalToDouble(data.get("GPS_X"));
						double stGpsY = CommonUtil.decimalToDouble(data.get("GPS_Y"));
						double edGpsX = CommonUtil.decimalToDouble(nextData.get("GPS_X"));
						double edGpsY = CommonUtil.decimalToDouble(nextData.get("GPS_Y"));
						
						double len = DataInterface.getDistanceBetween(stGpsX, stGpsY, edGpsX, edGpsY);
						short bearing = DataInterface.bearingP1toP2(stGpsX, stGpsY, edGpsX, edGpsY);
						data.put("BEARING",bearing);
						
						data.put("LEN",CommonUtil.pointRound(len,3));
						routLen += len;
						
						si0402Mapper.SI0402G1I1(data); //링크 insert
						
						
						nextData.put("ACCRU_LEN",(int)routLen);
						routMapper.updateLengthRoutNodeCmpstn(nextData);
					}
				}
				Map routMap = new HashMap();
				if(routNodeList!=null&&routNodeList.size()>0) {
					try {
						double routStrtLen = DataInterface.getDistanceBetween(CommonUtil.decimalToDouble(routNodeList.get(0).get("GPS_X")), CommonUtil.decimalToDouble(routNodeList.get(0).get("GPS_Y")), 
								CommonUtil.decimalToDouble(routNodeList.get(routNodeList.size()-1).get("GPS_X")), CommonUtil.decimalToDouble(routNodeList.get(routNodeList.size()-1).get("GPS_Y")));
								
						routMap.put("ROUT_ID", (String)routNodeList.get(0).get("ROUT_ID"));
						
						routMap.put("ROUT_LEN", CommonUtil.pointRound(routLen,3));
						routMap.put("ROUT_STRT_LEN", CommonUtil.pointRound(routStrtLen,3));
						routMap.put("STTN_CNT", sttnCnt);
						routMapper.updateRout(routMap);
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
				logger.error("Excetion {}", e);
				throw e;
			}		
		}

		
		Map result = saveResult(iCnt, uCnt, dCnt);
		
		return result;		
		
		
	}
	
	//데이터 생성용으로 사용함
	public Map updateBearing() throws Exception { 
		
		List<Map<String, Object>> linkList = routMapper.selectLinkMst();
		
		for (Map<String, Object> data:linkList) {
			if(CommonUtil.notEmpty(data.get("ST_GPS_X"))&&CommonUtil.notEmpty(data.get("ST_GPS_Y"))
					&&CommonUtil.notEmpty(data.get("ED_GPS_X"))&&CommonUtil.notEmpty(data.get("ED_GPS_Y"))){
				short bearing = DataInterface.bearingP1toP2(CommonUtil.decimalToDouble(data.get("ST_GPS_X")), CommonUtil.decimalToDouble(data.get("ST_GPS_Y")), 
						CommonUtil.decimalToDouble(data.get("ED_GPS_X")), CommonUtil.decimalToDouble(data.get("ED_GPS_Y")));
				data.put("BEARING",bearing);
				routMapper.updateBearingLinkMst(data);
			}
		}
		
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;
		Map result = saveResult(iCnt, uCnt, dCnt);
		
		return result;		
	}
	
	public List SI0402G1R0() throws Exception {
		// TODO Auto-generated method stub
		Map param = getSimpleDataMap("dma_sub_search");
		return si0402Mapper.SI0402G1R0(param);
	}
	
	public List SI0402P0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0402Mapper.SI0402P0R0(map);
	}
	
	public List SI0402P1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0402Mapper.SI0402P1R0(map);
	}
	
	public List SI0402P2R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0402Mapper.SI0402P2R0(map);
	}
		
	public Map SI0402P2S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_STTN_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += si0402Mapper.SI0402P2I0(data);
				} else if (rowStatus.equals("U")) {
					uCnt += si0402Mapper.SI0402P2U0(data);
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
	
	public Map SI0402P2K0() throws Exception {
		return si0402Mapper.SI0402P2K0(); 
	}
	
	public List SI0402P3R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0402Mapper.SI0402P3R0(map);
	}
	
	public Map SI0402P3S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_CRS_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += si0402Mapper.SI0402P3I0(data);
				} else if (rowStatus.equals("U")) {
					uCnt += si0402Mapper.SI0402P3U0(data);
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
	
	public Map SI0402P3K0() throws Exception {
		return si0402Mapper.SI0402P3K0(); 
	}
	
	public List SI0402P5R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0402Mapper.SI0402P5R0(map);
	}
	
	public Map SI0402G1K0() throws Exception {
		return si0402Mapper.SI0402G1K0();
	}	

	public List SI0402G1_exlDownload(String parameter) throws Exception {
		String param = parameter; //(String)request.getAttribute("param");
		Map<String, Object> map = new HashMap<String, Object>();
		if(CommonUtil.empty(param)){
			map.put("TYPE", "ALL");
			map.put("ROUT_ID", "");
		}
		else{
			map.put("TYPE", "ALL");
			map.put("ROUT_ID", param);
		}
		System.out.println(map);
		return si0402Mapper.SI0402G1R0(map);
	}
	
	public String SI0402G1_exlUploadCheck(String value, int valueLength, String id) throws Exception{
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
	public List<Map<String, Object>> SI0402G1_exlUpload(List<Map<String, Object>> data) throws Exception{
		String [] keys = {"ROUT_ID", "NODE_ID", "NODE_SN", "NODE_NM"};
		List<Map<String, Object>> list = data;
		Map<Integer, Object> map2 = new HashMap<Integer, Object>(); 
		
		Map<String, Object> resultMap = new HashMap<String,Object>(); // error message
		List<String> array = new ArrayList<String>(); // contain NODE_SN 
		
		String value;
		String resultMsg = "";
		int cnt = 0; // 빈column갯수 새기
		int index = 0; 
		
		
		// checking to data type
		loop1:
		for(Map<String, Object> map : list) {
			map.put("USE_YN", "Y");
			map.put("LINK_NODE_YN", "Y");
			for(Map.Entry<String, Object> entry : map.entrySet()) {
				value = entry.getValue().toString();
				if(entry.getKey() == "ROUT_ID") {
					resultMsg = SI0402G1_exlUploadCheck(value, 10, "노선ID");
				}
				else if(entry.getKey() == "NODE_ID") {
					resultMsg = SI0402G1_exlUploadCheck(value, 10, "노드ID");
				}
				else if(entry.getKey() == "NODE_SN") {
					resultMsg = SI0402G1_exlUploadCheck(value, 12, "노드순번");
					array.add(value);
				}
				else if(entry.getKey() == "WAY_DIV") {
					resultMsg = SI0402G1_exlUploadCheck(value, 5, "상하행구분");
				}
				else if(entry.getKey() == "LINK_ID") {
					resultMsg = SI0402G1_exlUploadCheck(value, 10, "링크ID");
				}
				else if(entry.getKey() == "STTN_ID") {
					resultMsg = SI0402G1_exlUploadCheck(value, 10, "정류소ID");
				}
				else if(entry.getKey() == "CRS_ID") {
					resultMsg = SI0402G1_exlUploadCheck(value, 10, "교차로ID");
				}
				else if(entry.getKey() == "GPS_X") {
					resultMsg = SI0402G1_exlUploadCheck(value, 18, "경도");
				}
				else if(entry.getKey() == "GPS_Y") {
					resultMsg = SI0402G1_exlUploadCheck(value, 18, "위도");
				}
				else if(entry.getKey() == "NODE_NM") {
					resultMsg = SI0402G1_exlUploadCheck(value, 30, "노드명");
				}
				else if(entry.getKey() == "NODE_TYPE") {
					resultMsg = SI0402G1_exlUploadCheck(value, 5, "노드유형");
				}
				else if(entry.getKey() == "REMARK") {
					resultMsg = SI0402G1_exlUploadCheck(value, 200, "비고");
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
