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
			List<Map<String, Object>> routNodeList = si0402Mapper.SI0402G1R1(map);
			
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
					oldNodeSn = CommonUtil.decimalToDouble(oldNodeSn);
				}
				String nextNodeType = null;
				if(i < param.size()-1) {
					Map data2 = (Map) param.get(i+1);
					nextNodeType = (String) data2.get("NODE_TYPE"); //다음 노드유형
				}
				
				//추가한 데이터의 처응의 이전 정류장의 순번을 찾음 start[
				if(routNodeList.size()>0) {
					if(beforeSttnNodeSn >0 && routNodeList.size()>0) {
						for(int j=routNodeList.size()-1; j>=0;j--) {
							beforeSttnNodeSn = CommonUtil.decimalToDouble(routNodeList.get(j).get("NODE_SN"));
							if(beforeSttnNodeSn < curNodeSn) {
								//beforeSttnData = routNodeList.get(j);
								break;
							}							
						}
					}
				}
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

					if((Constants.NODE_TYPE_BUSSTOP.equals(nodeType)||Constants.NODE_TYPE_CROSS.equals(nodeType))
						&&(CommonUtil.notEmpty(sttnId)||CommonUtil.notEmpty(crsId))){
						if(Constants.NODE_TYPE_BUSSTOP.equals(nodeType)&&CommonUtil.notEmpty(sttnId)){
							data.put("TYPE","STTN_ID");	
							routMapper.updateSttn(data); //타입이 정류소로 변경된경우
						}
						else if(Constants.NODE_TYPE_CROSS.equals(nodeType)&&CommonUtil.notEmpty(crsId)){
							data.put("TYPE","CRS_ID");
							routMapper.updateCrs(data); //타입이 교차로로 변경된경우
						}
					}
				} else if (rowStatus.equals("U")) {
					if((curNodeSn>0)&&(oldNodeSn>0)&&(curNodeSn!=oldNodeSn)) {
						isLinkChange = true;
					}
					data.put("LINK_NODE_YN","Y");

					if((Constants.NODE_TYPE_BUSSTOP.equals(nodeType)||Constants.NODE_TYPE_CROSS.equals(nodeType))
						&&(CommonUtil.notEmpty(sttnId)||CommonUtil.notEmpty(crsId))){
						
						if(Constants.NODE_TYPE_BUSSTOP.equals(nodeType)&&CommonUtil.notEmpty(sttnId)){
							data.put("TYPE","STTN_ID");
							routMapper.updateSttn(data); //타입이 정류소로 변경된경우
						}
						else if(Constants.NODE_TYPE_CROSS.equals(nodeType)&&CommonUtil.notEmpty(crsId)){
							data.put("TYPE","CRS_ID");
							routMapper.updateCrs(data); //타입이 교차로로 변경된경우
						}					
						
						if(CommonUtil.notEmpty(oldNodeId)){ //일반노드에서 정류소/교차로 노드로 변경시 NODE_ID를 변경해야함
							Map delParam = new HashMap();
							delParam.put("ROUT_ID", data.get("ROUT_ID"));
							delParam.put("NODE_ID", oldNodeId);
							delParam.put("OLD_NODE_SN", oldNodeSn);
							si0402Mapper.SI0402G1D0(delParam); //이전노드 삭제
							uCnt += si0402Mapper.SI0402G1I0(data); //새로운 노드 생성
						}
						else {
							uCnt += si0402Mapper.SI0402G1U0(data);
						}
					}
					else {
						data.put("TYPE","NODE_ID");
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
				
				map.put("LINK_SN",beforeSttnNodeSn);
				routMapper.deleteRoutLinkCmpstnSnMore(map);
				routMapper.deleteRoutSttnLinkCmpstnSnMore(map);
				
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
						
						if(!Constants.NODE_TYPE_BUSSTOP.equals(nodeType)||curSttnNodeSn<beforeSttnNodeSn){
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
							
							len += DataInterface.getDistanceBetween(CommonUtil.decimalToDouble(stGpsX), CommonUtil.decimalToDouble(stGpsY), 
									CommonUtil.decimalToDouble(edGpsX), CommonUtil.decimalToDouble(edGpsY));
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
						
						Map<Object, Object> sttnLink = si0402Mapper.getSttnLinkIdByNode(sttnData);
						
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
						if(curNodeSn<beforeSttnNodeSn){
							continue;
						}
						
						Map nextData = routNodeList.get(i+1);
						if(Constants.NODE_TYPE_BUSSTOP.equals(nodeType)){
							sttnCnt++;
						}

						if(CommonUtil.empty(data.get("LINK_ID"))) { //링크가 없는 경우
							Map linkKeyMap = si0402Mapper.SI0402G1K1(); //링크아이디 생성
							data.put("LINK_ID", linkKeyMap.get("SEQ"));
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
						
						double len = DataInterface.getDistanceBetween(CommonUtil.decimalToDouble(stGpsX), CommonUtil.decimalToDouble(stGpsY), 
								CommonUtil.decimalToDouble(edGpsX), CommonUtil.decimalToDouble(edGpsY));
						short bearing = DataInterface.bearingP1toP2(CommonUtil.decimalToDouble(stGpsX), CommonUtil.decimalToDouble(stGpsY), 
								CommonUtil.decimalToDouble(edGpsX), CommonUtil.decimalToDouble(edGpsY));
						data.put("BEARING",bearing);
						
						data.put("LEN",CommonUtil.pointRound(len,3));
						routLen += len;
						
						si0402Mapper.SI0402G1I1(data); //링크 insert
						
						
						nextData.put("ACCRU_LEN",(int)routLen);
						si0402Mapper.updateLengthRoutNodeCmpstn(nextData);
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
		
		List<Map<String, Object>> linkList = si0402Mapper.selectLinkMst();
		
		for (Map<String, Object> data:linkList) {
			if(CommonUtil.notEmpty(data.get("ST_GPS_X"))&&CommonUtil.notEmpty(data.get("ST_GPS_Y"))
					&&CommonUtil.notEmpty(data.get("ED_GPS_X"))&&CommonUtil.notEmpty(data.get("ED_GPS_Y"))){
				short bearing = DataInterface.bearingP1toP2(CommonUtil.decimalToDouble(data.get("ST_GPS_X")), CommonUtil.decimalToDouble(data.get("ST_GPS_Y")), 
						CommonUtil.decimalToDouble(data.get("ED_GPS_X")), CommonUtil.decimalToDouble(data.get("ED_GPS_Y")));
				data.put("BEARING",bearing);
				si0402Mapper.updateBearingLinkMst(data);
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
}
