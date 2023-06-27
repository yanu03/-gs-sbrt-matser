package kr.tracom.service.tims.handler;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;

import kr.tracom.beans.BeanUtil;
import kr.tracom.service.tims.OperDtUtil;
import  kr.tracom.mapper.cm.Common.CommonMapper;
import kr.tracom.mapper.cm.Rout.RoutMapper;
import kr.tracom.mapper.tims.CurInfoMapper;
import kr.tracom.mapper.tims.HistoryMapper;
import kr.tracom.service.tims.kafka.KafkaProducer;
import kr.tracom.platform.attribute.BrtAtCode;
import kr.tracom.platform.attribute.brt.AtBusArrivalInfo;
import kr.tracom.platform.attribute.brt.AtBusArrivalInfoItem;
import kr.tracom.platform.attribute.brt.AtBusInfo;
import kr.tracom.platform.attribute.brt.AtBusOperEvent;
import kr.tracom.platform.attribute.brt.AtDispatch;
import kr.tracom.platform.attribute.brt.AtTrafficLightStatusResponse;
import kr.tracom.platform.attribute.brt.AtTrafficModule2;
import kr.tracom.platform.attribute.brt.AtTrafficModule3;
import kr.tracom.platform.net.protocol.TimsMessage;
import kr.tracom.platform.net.protocol.TimsPayload;
import kr.tracom.platform.net.protocol.attribute.AtMessage;
import kr.tracom.platform.net.protocol.payload.PlCode;
import kr.tracom.platform.net.protocol.payload.PlEventRequest;
import kr.tracom.platform.net.protocol.payload.PlGetResponse;
import kr.tracom.platform.service.kafka.model.KafkaMessage;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Constants;
import kr.tracom.ws.WsClient;

public class EventThread extends Thread {

	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	private String staticVariableTime;

	private ConcurrentLinkedQueue<KafkaMessage> kafkaQ = new ConcurrentLinkedQueue<>();
	//private String sessionId;

	private boolean bRunning = true;

	RoutMapper routMapper;
	
	// @Autowired
	HistoryMapper historyMapper;

	// @Autowired
	CurInfoMapper curInfoMapper;

	// @Autowired
	CommonMapper commonMapper;

	// @Autowired
	WsClient webSocketClient;
	
	// @Autowired
	KafkaProducer kafkaProducer;

	private static Map<String, Object> g_busOperInfoMap = new HashMap<>();

	private static Map<String, Object> g_busOperEventMap = new HashMap<>();

	private static Map<String, Object> g_busIdMap = new HashMap<>();

	private static Map<String, Object> g_vhcInfoMap = new HashMap<>();

	private static Map<String, Object> g_routMap = new HashMap<>();
	
	//private static Map<String, Object> g_operStsMap  = new HashMap<>();
	
	private static Map<String, Object> g_operEventCodeMap = new HashMap<>();
	
	private static Map<String, Object> g_vhcOperInfo = new HashMap<>();
	
	private static Map<String, Object> g_operVhcSttnInfoMap = new HashMap<>();
	
	private static Map<String, Object> g_routNodeMap = new HashMap<>();
	
	@PostConstruct
	public void initialize() {
		try {
			initNodeList();
		} catch (Exception e) {
			logger.error("select IntgNodeList Error ", e);
		}

		try {

		} catch (Exception e) {

			logger.error("  ", e);
		}
	}
	
	public EventThread(String sessionId) {
		//this.sessionId = sessionId;

		routMapper = (RoutMapper) BeanUtil.getBean(RoutMapper.class);
		
		historyMapper = (HistoryMapper) BeanUtil.getBean(HistoryMapper.class);
		curInfoMapper = (CurInfoMapper) BeanUtil.getBean(CurInfoMapper.class);
		commonMapper = (CommonMapper) BeanUtil.getBean(CommonMapper.class);
		webSocketClient = (WsClient) BeanUtil.getBean(WsClient.class);
		kafkaProducer = (KafkaProducer) BeanUtil.getBean(KafkaProducer.class);
		staticVariableTime = BeanUtil.getProperty("server.static.variable.init.time");
	}
	
	public void stop(boolean bStop) {
		bRunning = false;
	}

	@Override
	public void run() {

		while (bRunning) {

			if(getKafkaSize()>0)
			logger.debug("HandleThread Running...kafkaQ.size:{}", getKafkaSize());

			try {
				KafkaMessage msg = getKafkaMessage();

				if (msg != null) {

					 //logger.info("===================== START >> sessionId:{}", sessionId);

					Map<String, Object> map = null;

					String sessionId = msg.getSessionId();
					TimsMessage timsMessage = msg.getTimsMessage();

					handle(timsMessage, sessionId);

					 //logger.info("===================== END >> sessionId:{}", sessionId);
					initStaticVariableByTime();
				}

				Thread.sleep(1);

			} catch (InterruptedException e) {
				logger.error("Exception {}", e);
			}
		}

	}
	
	//특정 시간에 전역변수 초기화
	private void initStaticVariableByTime() {
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		if(formatter.format(date).equals(staticVariableTime)) {
			g_busOperInfoMap.clear();
			g_busOperEventMap.clear();
			g_busIdMap.clear();
			g_vhcInfoMap.clear();
			g_routMap.clear();
			g_operEventCodeMap.clear();
			g_vhcOperInfo.clear();
			g_operVhcSttnInfoMap.clear();
			g_routNodeMap.clear();
		}
	}
	private void initNodeList() {
		Map<String, Object> param = new HashMap<String, Object>();



		List<Map<String, Object>> routList = routMapper.selectRoutList(param);
		if (g_routNodeMap == null) {
			g_routNodeMap = new HashMap<>();
		}
		// 전체 노드 리스트를 가져옵니다.
		for (Map<String, Object> rout : routList) {
			List<Map<String, Object>> nodeList = new ArrayList<>();
			nodeList = curInfoMapper.selectIntgNodeList((String) rout.get("ROUT_ID"));

			g_routNodeMap.put((String) rout.get("ROUT_ID"), nodeList);
		}
	}

	private List<Map<String, Object>> getNodeList(Map<String, Object> eventInfo) {
		String routId = (String) eventInfo.get("ROUT_ID");
		if (CommonUtil.empty(routId))
			return null;

		if (g_routNodeMap == null) {
			initNodeList();
		}

		if ((List<Map<String, Object>>) g_routNodeMap.get(routId) == null) {
			List<Map<String, Object>> nodeList = new ArrayList<>();
			nodeList = curInfoMapper.selectIntgNodeList(routId);
			g_routNodeMap.put(routId, nodeList);
		}

		return (List<Map<String, Object>>) g_routNodeMap.get(routId);
	}

	private Map<String, Object> getCurNodeByLinkSn(Map<String, Object> eventInfo) {
		try {
			// String routId = (String) eventInfo.get("ROUT_ID");
			List<Map<String, Object>> nodeList = getNodeList(eventInfo);
			if (nodeList == null)
				return null;

			for (Map<String, Object> node : nodeList) {
				double nodeSn = CommonUtil.stringToDouble(node.getOrDefault("NODE_SN", 0).toString());
				double eventLinkSn = CommonUtil.stringToDouble(eventInfo.getOrDefault("LINK_SN", 0).toString());
				if ((nodeSn >= eventLinkSn) && node.get("NODE_ID").equals(eventInfo.get("NODE_ID"))) {
					// logger.debug("getCurNodeByLinkSn node={} ", node);
					// logger.debug("getCurNodeByLinkSn nodeSn= " + nodeSn + eventLinkSn);
					return node;
				}
			}
		} catch (Exception e) {
			logger.error("Exception {}", e);
		}
		return null;
	}

	private Map<String, Object> getCurSttnNode(Map<String, Object> eventInfo) {
		try {
			// String routId = (String) eventInfo.get("ROUT_ID");
			List<Map<String, Object>> nodeList = getNodeList(eventInfo);
			if (nodeList == null)
				return null;

			for (int i = nodeList.size() - 1; i >= 0; i--) {
				Map<String, Object> node = nodeList.get(i);
				double nodeSn = CommonUtil.stringToDouble(node.getOrDefault("NODE_SN", 0).toString());
				double eventNodeSn = CommonUtil.stringToDouble(eventInfo.getOrDefault("NODE_SN", 0).toString());
				if ((nodeSn <= eventNodeSn) && node.get("NODE_TYPE").equals(Constants.NODE_TYPE_BUSSTOP)) {
					// logger.debug("getCurSttnNode node={} ", node);
					// logger.debug("getCurSttnNode nodeSn= " + nodeSn + eventNodeSn);
					return node;
				}
			}
		} catch (Exception e) {
			logger.error("Exception {}", e);
		}
		return null;
	}

	private Map<String, Object> getNextSttnNode(Map<String, Object> eventInfo) {
		try {
			// String routId = (String) eventInfo.get("ROUT_ID");
			List<Map<String, Object>> nodeList = getNodeList(eventInfo);
			if (nodeList == null)
				return null;

			for (Map<String, Object> node : nodeList) {
				double nodeSn = CommonUtil.stringToDouble(node.getOrDefault("NODE_SN", 0).toString());
				double eventNodeSn = CommonUtil.stringToDouble(eventInfo.getOrDefault("NODE_SN", 0).toString());
				if ((nodeSn > eventNodeSn) && node.get("NODE_TYPE").equals(Constants.NODE_TYPE_BUSSTOP)) {
					// logger.debug("getCurSttnNode node={} ", node);
					// logger.debug("getCurSttnNode nodeSn= " + nodeSn + eventNodeSn);
					return node;
				}
			}
		} catch (Exception e) {
			logger.error("Exception {}", e);
		}
		return null;
	}

	/*
	 * private Map<String, Object> getCurSttnCrsNode(Map<String, Object> eventInfo)
	 * { String routId = (String)eventInfo.get("ROUT_ID"); List<Map<String, Object>>
	 * nodeList = getNodeList(eventInfo);
	 * 
	 * for(Map<String, Object> node : nodeList) {
	 * if((int)node.get("LINK_SN")>=(int)eventInfo.get("LINK_SN")
	 * &&(node.get("NODE_TYPE").equals(Constants.NODE_TYPE_BUSSTOP))
	 * ||(node.get("NODE_TYPE").equals(Constants.NODE_TYPE_CROSS))) {
	 * 
	 * return node; } } return null; }
	 */

	private Map<String, Object> getVhcInfo(Map<String, Object> paramMap) {
		String impID = (String) paramMap.get("MNG_ID");
		logger.debug("getVhcInfo() impID=" + impID);
		Map<String, Object> vhcInfo;
		if (g_vhcInfoMap == null) {
			g_vhcInfoMap = new HashMap<>();
			vhcInfo = curInfoMapper.selectVhcInfo(paramMap);
			g_vhcInfoMap.put(impID, vhcInfo);
			return vhcInfo;
		}

		if ((impID != null) && (impID.isEmpty() == false)) {
			vhcInfo = (Map<String, Object>) g_vhcInfoMap.get(impID);
			if ((vhcInfo != null)) {
				return vhcInfo;
			} else {
				vhcInfo = curInfoMapper.selectVhcInfo(paramMap);
				g_vhcInfoMap.put(impID, vhcInfo);
				return vhcInfo;
			}
		} else {
			return null;
		}
	}
	
	

	
	private boolean checkChangeBusOperInfo(Map<String, Object> busInfo) {
		String impId = (String) busInfo.get("MNG_ID");
		if ((impId != null) && (impId.isEmpty() == false)) {
			Map<String, Object> oldBusOperInfo = (Map<String, Object>) g_busOperInfoMap.get(impId);
			if (oldBusOperInfo == null || oldBusOperInfo.get("OPER_STS") != busInfo.get("OPER_STS")
					|| busInfo.get("EVENT_CD") != null && oldBusOperInfo.get("EVENT_CD") != busInfo.get("EVENT_CD")
					|| oldBusOperInfo.get("LATITUDE") != busInfo.get("LATITUDE")
					|| oldBusOperInfo.get("LONGITUDE") != busInfo.get("LONGITUDE")) {
				if (busInfo != null && oldBusOperInfo != null) {
					logger.debug("checkChangeBusOperInfo not equal busInfo: {}, oldBusOperInfo: {}", busInfo,
							oldBusOperInfo);
				}
				setBusOperInfo(busInfo);
				/*
				 * if(g_busOperInfoMap!=null) { g_busOperInfoMap.put(impId, busInfo); } else{
				 * g_busOperInfoMap = new HashMap<>(); g_busOperInfoMap.put(impId, busInfo); }
				 */
				return true;
			} else {
				if (busInfo != null && oldBusOperInfo != null) {
					logger.debug("checkChangeBusOperInfo equal busInfo: {}, oldbusInfo: {}", busInfo, oldBusOperInfo);
				}
			}
			return false;
		}
		return false;
	}

	private void setBusOperInfo(Map<String, Object> busInfo) {
		String impId = (String) busInfo.get("MNG_ID");
		if ((impId != null) && (impId.isEmpty() == false)) {
			busInfo.put("GPS_X", busInfo.get("LONGITUDE"));
			busInfo.put("GPS_Y", busInfo.get("LATITUDE"));
			if (g_busOperInfoMap != null) {
				g_busOperInfoMap.put(impId, CommonUtil.deepCopy(busInfo));
			} else {
				g_busOperInfoMap = new HashMap<>();
				g_busOperInfoMap.put(impId, CommonUtil.deepCopy(busInfo));
			}
		}
	}

	private Map<String, Object> getBusOperInfo(Map<String, Object> busInfo) {
		String impId = (String) busInfo.get("MNG_ID");
		if (CommonUtil.empty(g_busOperInfoMap.get(impId)))
			return curInfoMapper.selectCurOperInfo(busInfo);
		else
			return (Map<String, Object>) g_busOperInfoMap.get(impId);
	}

	// 이벤트의 노드 변경이 있는지 체크
	private boolean checkRoutChangeBusOperEvent(Map<String, Object> operEvent) {
		String impId = (String) operEvent.get("MNG_ID");
		if ((impId != null) && (impId.isEmpty() == false)) {
			Map<String, Object> oldOperEvent = (Map<String, Object>) g_busOperEventMap.get(impId);
			if (oldOperEvent != null && ((short) operEvent.get("NODE_SN") < 10
					&& (short) oldOperEvent.get("NODE_SN") > (short) operEvent.get("NODE_SN"))) {
				if (operEvent != null && oldOperEvent != null) {
					logger.debug("checkRoutChangeBusOperEvent operEvent: {}, oldOperEvent: {}", operEvent,
							oldOperEvent);
				}
				if (g_busOperEventMap != null) {
					g_busOperEventMap.put(impId, CommonUtil.deepCopy(operEvent));
				} else {
					g_busOperEventMap = new HashMap<>();
					g_busOperEventMap.put(impId, CommonUtil.deepCopy(operEvent));
				}
				return true;
			}
			if (g_busOperEventMap != null) {
				g_busOperEventMap.put(impId, CommonUtil.deepCopy(operEvent));
			} else {
				g_busOperEventMap = new HashMap<>();
				g_busOperEventMap.put(impId, CommonUtil.deepCopy(operEvent));
			}
			return false;
		}
		return false;
	}

	private String getBusId(Map<String, Object> paramMap) {
		String busNo = (String) paramMap.get("BUS_NO");
		logger.debug("getBusId() busNo=" + busNo);
		String busId = null;
		if (g_busIdMap == null) {
			g_busIdMap = new HashMap<>();
			busId = curInfoMapper.getBusId(paramMap);
			g_busIdMap.put(busNo, busId);
			return busId;
		}

		if ((busNo != null) && (busNo.isEmpty() == false)) {
			busId = (String) g_busIdMap.get(busNo);
			if ((busId != null) && (busId.isEmpty() == false)) {
				return busId;
			} else {
				busId = curInfoMapper.getBusId(paramMap);
				g_busIdMap.put(busNo, busId);
				return busId;
			}
		} else {
			return null;
		}
	}

	private Map<String, Object> getRoutMst(Map<String, Object> paramMap) {
		String routId = (String) paramMap.get("ROUT_ID");
		logger.debug("getRoutMst() routId=" + routId);
		Map<String, Object> routInfo = null;

		if (routId == null)
			return null;

		if (g_routMap == null) {
			g_routMap = new HashMap<>();
			routInfo = getRoutMst(paramMap);
			g_routMap.put(routId, routInfo);
			return routInfo;
		}

		if ((routId != null) && (routId.isEmpty() == false)) {
			routInfo = (Map<String, Object>) g_routMap.get(routId);
			if ((routInfo != null)) {
				return routInfo;
			} else {
				routInfo = curInfoMapper.getRoutMst(paramMap);
				g_routMap.put(routId, routInfo);
				return routInfo;
			}
		} else {
			return null;
		}
	}

	/*
	 * private String getOperSts(Map<String, Object> paramMap) { String runType =
	 * paramMap.get("RUN_TYPE")+""; logger.debug("getOperSts() runType="+runType);
	 * Map<String, Object> param = new HashMap<>(); param.put("CO_CD", "OPER_STS");
	 * param.put("NUM_VAL4", paramMap.get("RUN_TYPE"));
	 * 
	 * Map<String, Object> operSts = null; if(g_operStsMap==null) { g_operStsMap =
	 * new HashMap<>(); operSts = curInfoMapper.getEventCode(param);
	 * if(operSts!=null) { g_operStsMap.put(runType, operSts); return (String)
	 * operSts.get("DL_CD"); } }
	 * 
	 * if ((runType != null) && (runType.isEmpty() == false)) { operSts =
	 * (Map<String, Object>)g_operStsMap.get(runType); if ((operSts != null)) {
	 * return (String) operSts.get("DL_CD"); } else { operSts =
	 * curInfoMapper.getEventCode(param); g_operStsMap.put(runType, operSts); return
	 * (String) operSts.get("DL_CD"); } } else { return null; } }
	 */

	private Map<String, Object> getCommonCode(String coCd, String ValType, String value) {
		// String eventCd = paramMap.get("EVENT_CD")+"";
		logger.debug("getEventCode() coCd=" + coCd + ", eventCd=" + value);
		Map<String, Object> param = new HashMap<>();
		String key = coCd + value;
		param.put("CO_CD", coCd);
		param.put("VAL_TYPE", ValType);
		param.put("VAL", value);

		Map<String, Object> eventCodeMap = null;
		if (g_operEventCodeMap == null) {
			g_operEventCodeMap = new HashMap<>();
			eventCodeMap = curInfoMapper.getEventCode(param);
			if (eventCodeMap != null) {
				g_operEventCodeMap.put(key, eventCodeMap);
				return eventCodeMap;
			}
		}

		eventCodeMap = (Map<String, Object>) g_operEventCodeMap.get(key);
		if ((eventCodeMap != null)) {
			return eventCodeMap;
		} else {
			eventCodeMap = curInfoMapper.getEventCode(param);
			g_operEventCodeMap.put(key, eventCodeMap);
			return eventCodeMap;
		}
	}
	
	private Map<String, Object> getVhcSttnInfo(Map<String, Object> paramMap) {
		String impId = (String) paramMap.get("MNG_ID");
		String evtType = (String) paramMap.get("EVT_TYPE");
		String evtData = (String) paramMap.get("EVENT_DATA");
		String updDtm = (String) paramMap.get("UPD_DTM");
		String nodeNm = (String) paramMap.get("NODE_NM");

		logger.debug("getVhcSttnInfo() impId=" + impId + ",evtType=" + evtType + ",evtData=" + evtData + ",updDtm="
				+ updDtm);

		if (Constants.OPER_EVENT_ARRIVAL.equals(evtType) == false
				&& Constants.OPER_EVENT_DEPART.equals(evtType) == false) {
			return null;
		}

		Map<String, Object> vhcSttnInfo = null;

		if (impId == null || impId.isEmpty())
			return null;

		String sttnLinkId = curInfoMapper.getSttnLinkId(paramMap);
		if (g_operVhcSttnInfoMap == null) {
			g_operVhcSttnInfoMap = new HashMap<>();
			vhcSttnInfo = new HashMap<>();
			vhcSttnInfo.put("ROUT_STTN_LINK_ID", sttnLinkId);
			vhcSttnInfo.put("EVT_TYPE", evtType);
			vhcSttnInfo.put("STTN_ID", evtData);
			vhcSttnInfo.put("UPD_DTM", updDtm);
			vhcSttnInfo.put("STOP_TM", 0);
			vhcSttnInfo.put("NODE_NM", nodeNm);

			g_operVhcSttnInfoMap.put(impId, vhcSttnInfo);
			return vhcSttnInfo;
		}

		if ((impId != null) && (impId.isEmpty() == false)) {

			vhcSttnInfo = (Map<String, Object>) g_operVhcSttnInfoMap.get(impId);
			logger.debug("getVhcSttnInfo() {}", vhcSttnInfo);
			if (vhcSttnInfo == null) {
				g_operVhcSttnInfoMap = new HashMap<>();
				vhcSttnInfo = new HashMap<>();
				vhcSttnInfo.put("ROUT_STTN_LINK_ID", sttnLinkId);
				vhcSttnInfo.put("EVT_TYPE", evtType);
				vhcSttnInfo.put("STTN_ID", evtData);
				vhcSttnInfo.put("UPD_DTM", updDtm);
				vhcSttnInfo.put("STOP_TM", 0);
				vhcSttnInfo.put("NODE_NM", nodeNm);

				g_operVhcSttnInfoMap.put(impId, vhcSttnInfo);
				return vhcSttnInfo;
			} else {
				if (Constants.OPER_EVENT_ARRIVAL.equals(evtType)) {
					vhcSttnInfo.put("ROUT_STTN_LINK_ID", sttnLinkId);
					vhcSttnInfo.put("EVT_TYPE", evtType);
					vhcSttnInfo.put("STTN_ID", evtData);
					vhcSttnInfo.put("UPD_DTM", updDtm);
					vhcSttnInfo.put("STOP_TM", 0);
					vhcSttnInfo.put("NODE_NM", nodeNm);
				} else {

					String oldSttnId = (String) vhcSttnInfo.get("STTN_ID");
					String oldEvtType = (String) vhcSttnInfo.get("EVT_TYPE");
					String oldUpdDtm = (String) vhcSttnInfo.get("UPD_DTM");
					logger.debug("getVhcSttnInfo() {}", vhcSttnInfo);
					if (Constants.OPER_EVENT_DOOR_OPEN.equals(oldEvtType)
							&& Constants.OPER_EVENT_DOOR_CLOSE.equals(evtType)) {
						try {
							long time = CommonUtil.stringToDate((String) updDtm).getTime()
									- CommonUtil.stringToDate(oldUpdDtm).getTime();
							logger.debug("getVhcSttnInfo() time = " + time);
							vhcSttnInfo.put("STOP_TM", time / 1000);
						} catch (Exception e) {
							logger.error("Exception {}", e);
						}
					} else {
						vhcSttnInfo.put("STOP_TM", 0);
					}
					vhcSttnInfo.put("ROUT_STTN_LINK_ID", sttnLinkId);
					vhcSttnInfo.put("EVT_TYPE", evtType);
					vhcSttnInfo.put("STTN_ID", evtData);
					vhcSttnInfo.put("UPD_DTM", oldUpdDtm);
					vhcSttnInfo.put("NODE_NM", nodeNm);
				}
			}
		}
		return vhcSttnInfo;
	}
	
	/*
	 * private void insertCurAllocPlInfo(Map<String, Object> map) { Map<String,
	 * Object> param = new HashMap<>(); param.put("OPER_DT", map.get("OPER_DT"));
	 * param.put("ROUT_GRP", map.get("ROUT_GRP")); param.put("ALLOC_NO",
	 * map.get("ALLOC_NO")); param.put("WAY_DIV", map.get("WAY_DIV"));
	 * param.put("OPER_VHC_ID", map.get("OPER_VHC_ID"));
	 * curInfoMapper.insertCurAllocPlInfo(param); }
	 */	
	
	private void setVhcOperInfo(Map<String, Object> eventInfo) {
		if(eventInfo==null)return;
		logger.debug("setVhcOperInfo() eventInfo=" + eventInfo);
		String vhcId = (String)eventInfo.get("VHC_ID");
		Map<String, Object> tmpEventInfo = CommonUtil.deepCopy(eventInfo);
		curInfoMapper.insertCurVhcOperInfo(eventInfo);
		g_vhcOperInfo.put(vhcId, tmpEventInfo);
	}
	
	private Map<String, Object> getVhcOperInfo(String vhcId) {
		
		logger.debug("getVhcOperInfo() vhcId=" + vhcId);
		Map<String, Object> vhcOperInfo = null;
		if (g_vhcOperInfo == null) {
			Map param = new HashMap<>();
			param.put("VHC_ID", vhcId);
			vhcOperInfo = curInfoMapper.selectCurVhcOperInfo(param);
			if (vhcOperInfo != null) {
				g_vhcOperInfo = new HashMap<>();
				g_vhcOperInfo.put(vhcId, vhcOperInfo);
				return vhcOperInfo;
			}
		}

		vhcOperInfo = (Map<String, Object>) g_vhcOperInfo.get(vhcId);
		if ((vhcOperInfo != null)) {
			return vhcOperInfo;
		} else {
			Map param = new HashMap<>();
			param.put("VHC_ID", vhcId);
			vhcOperInfo = curInfoMapper.selectCurVhcOperInfo(param);
			if (vhcOperInfo != null) {
				g_vhcOperInfo.put(vhcId, vhcOperInfo);
				return vhcOperInfo;
			}
		}
		return vhcOperInfo;
	}

	public void addKafkaMessage(KafkaMessage kafkaMessage) {
		kafkaQ.offer(kafkaMessage);
	}

	public KafkaMessage getKafkaMessage() {
		while (kafkaQ.peek() != null) {
			return kafkaQ.poll();
		}
		 return null;
	}

	public int getKafkaSize() {
		return kafkaQ.size();
	}

	//static public Map<String, Object> busInfoMap = new HashMap<>();
    
	public void handle(TimsMessage timsMessage, String sessionId) {
		// Map<String, Object> wsDataMap = null;

		// 쿼리용 파라미터 맵
		Map<String, Object> paramMap = null;

		// Map<String, Object> vhcInfo = null;

		TimsPayload timsPayload = timsMessage.getPayload();

		byte opCode = timsPayload.OpCode;

		if (opCode == PlCode.OP_EVENT_REQ) {
			PlEventRequest request = (PlEventRequest) timsPayload;
			for (int i = 0; i < request.getAttrCount(); i++) {
				AtMessage atMessage = request.getAttrList().get(i);
				short attrId = atMessage.getAttrId();

				switch (attrId) {
				case BrtAtCode.BUS_INFO: // 정주기 버스 정보

					logger.info("BUS_INFO >> {}", atMessage);
					try {
						AtBusInfo busInfo = (AtBusInfo) atMessage.getAttrData();
	
						// insert to BMS_CUR_OPER_INFO
						Map<String, Object> busInfoMap = busInfo.toMap();
	
						busInfoMap.put("OCR_DTM", busInfoMap.get("UPD_DTM")); //발생일시가 UPD DTM으로 넘으로 와서 OCR_DTM에 넣어서 처리함
					
						busInfoMap.put("MNG_ID", sessionId);

			            Map vhcInfo = getVhcInfo(busInfoMap);
			            busInfoMap.put("VHC_ID", String.valueOf(vhcInfo.get("VHC_ID")));
			            busInfoMap.put("VHC_NO", String.valueOf(vhcInfo.get("VHC_NO")));
			            busInfoMap.put("BUS_NO", String.valueOf(vhcInfo.get("VHC_NO")));
						if (CommonUtil.empty(busInfoMap.get("VHC_ID")))
							break;
					
						Map<String, Object> routMap = getRoutMst(busInfoMap);
						if(routMap!=null) {
							busInfoMap.put("ROUT_GRP", routMap.get("ROUT_GRP"));
							busInfoMap.put("WAY_DIV", routMap.get("WAY_DIV"));
							busInfoMap.put("ROUT_NM", routMap.get("ROUT_NM"));
							busInfoMap.put("ROUT_GRP_NM", routMap.get("ROUT_GRP_NM"));
						}
						if (CommonUtil.empty(busInfoMap.get("OPER_DT"))) {
							busInfoMap.put("OPER_DT", CommonUtil.getOperDt());
						}
		
						//busInfoMap.put("OPER_STS", getOperSts(busInfoMap));
						Map<String, Object> operSts = getCommonCode("OPER_STS", "NUM_VAL4",
								busInfoMap.get("RUN_TYPE") + "");
	
						try {
							Map<String, Object> curAllocPlInfo = getVhcOperInfo((String)busInfoMap.get("VHC_ID"));
							if (curAllocPlInfo == null) {
								return;
							}
							else {
								busInfoMap.put("ALLOC_ID", curAllocPlInfo.get("ALLOC_ID"));
								busInfoMap.put("ALLOC_NO", curAllocPlInfo.get("ALLOC_NO"));
								busInfoMap.put("OPER_SN", curAllocPlInfo.get("OPER_SN"));
							}
						
							busInfoMap.put("EVENT_CD", null);
							setOperEventData(busInfoMap);
							//if(checkChangeRunTypeBusOperInfo(busInfo)==true) { //운행상태 변경이 있을때 체크하면 부분 필요하면 주석을 제거하면 됨
								insertCurOperInfo(busInfoMap);
							//}

						} catch (Exception e) {
							logger.error("Exception {}", e);
						}
					} catch (Exception e) {
						logger.error("Exception {}", e);
					}
					break;

				case BrtAtCode.BUS_ARRIVAL_INFO: // 차량 도착정보

					logger.info("BUS_ARRIVAL_INFO >> {}", atMessage);
					try {
						AtBusArrivalInfo busArrivalInfo = (AtBusArrivalInfo) atMessage.getAttrData();

						/* 모니터링용 데이터 생성 */
						/*
						 * wsDataMap = new HashMap<>(); wsDataMap.put("ATTR_ID", attrId);
						 * wsDataMap.put("STTN_ID", busArrivalInfo.getStopId());
						 */

						List<AtBusArrivalInfoItem> arrivalInfoList = busArrivalInfo.getList();
						List<HashMap<String, Object>> arrivalInfoMapList = new ArrayList<>();

						for (AtBusArrivalInfoItem arrivalInfoItem : arrivalInfoList) {
							HashMap<String, Object> arrivalInfoMap = new HashMap<>();

							String routId = arrivalInfoItem.getRoutId();
							int loc = arrivalInfoItem.getLocation();
							long remainSec = arrivalInfoItem.getTime();

							String routNm = curInfoMapper.selectRoutName(routId);

							arrivalInfoMap.put("ROUT_ID", routId);
							arrivalInfoMap.put("ROUT_NM", routNm);
							arrivalInfoMap.put("VHC_TYPE", "VT" + arrivalInfoItem.getBusType());
							arrivalInfoMap.put("REMAIN_STTN", loc);
							arrivalInfoMap.put("REMAIN_TM", remainSec);

							arrivalInfoMapList.add(arrivalInfoMap);
						}

						// wsDataMap.put("LIST", arrivalInfoMapList);
					} catch (Exception e) {
						logger.error("Exception {}", e);
					}
					break;

				case BrtAtCode.BUS_OPER_EVENT: // 운행 이벤트 정보

					logger.info(".BUS_OPER_EVENT >> {}", atMessage);

					// 이벤트 이력정보에 insert

					// String eventData = "";
					try {
						String eventCd = "";
						String eventCdName = "";
						AtBusOperEvent busEvent = (AtBusOperEvent) atMessage.getAttrData();
						String eventData = busEvent.getEventData();
						Map<String, Object> busEventMap = busEvent.toMap();
						busEventMap.put("MNG_ID", sessionId);
						byte eventCode = busEvent.getEventCode();

						Map<String, Object> eventCodeMap = getCommonCode("OPER_EVT_TYPE", "NUM_VAL4", eventCode + "");
						eventCd = (String) eventCodeMap.get("DL_CD");
						eventCdName = (String) eventCodeMap.get("DL_CD_NM");

						busEventMap.put("EVT_TYPE", eventCd);
			            Map vhcInfo = getVhcInfo(busEventMap);
			            busEventMap.put("VHC_ID", String.valueOf(vhcInfo.get("VHC_ID")));
			            busEventMap.put("VHC_NO", String.valueOf(vhcInfo.get("VHC_NO")));
			            busEventMap.put("BUS_NO", String.valueOf(vhcInfo.get("VHC_NO")));
			            
						if (CommonUtil.empty(busEventMap.get("VHC_ID")))
							break;
						logger.info("VHC_ID= {}", busEventMap.get("VHC_ID"));
						Map<String, Object> routMap2 = getRoutMst(busEventMap);
						busEventMap.put("OCR_DTM", busEventMap.get("UPD_DTM")); //발생일시가 UPD DTM으로 넘으로 와서 OCR_DTM에 넣어서 처리함
						if(routMap2!=null) {
							busEventMap.put("ROUT_GRP", routMap2.get("ROUT_GRP"));
							busEventMap.put("WAY_DIV", routMap2.get("WAY_DIV"));
							busEventMap.put("ROUT_NM", routMap2.get("ROUT_NM"));
							busEventMap.put("ROUT_GRP_NM", routMap2.get("ROUT_GRP_NM"));
							busEventMap.put("ST_STTN_ID", routMap2.get("ST_STTN_ID"));
							busEventMap.put("ED_STTN_ID", routMap2.get("ED_STTN_ID"));
						}
						
					
						// busEventMap.put("OPER_STS", getOperSts(busEventMap));
						Map<String, Object> operSts = getCommonCode("OPER_STS", "NUM_VAL4",
								busEventMap.get("RUN_TYPE") + "");
						if (operSts != null) {
							busEventMap.put("OPER_STS", operSts.get("DL_CD"));
						}
	
						if (CommonUtil.empty(busEventMap.get("OPER_DT"))) {
							busEventMap.put("OPER_DT", CommonUtil.getOperDt());
						}
	
						try {
							if (eventCode == (byte) 0x03 || eventCode == (byte) 0x04) {
								String curNearStr = curInfoMapper.selectCurNearAllocOperPlByRout(busEventMap);
								String curNearArr[] = curNearStr.split(",");
								if(curNearArr.length==3) {
									busEventMap.put("ALLOC_ID", curNearArr[0]);
									busEventMap.put("ALLOC_NO", curNearArr[1]);
									busEventMap.put("OPER_SN", curNearArr[2]);
									setVhcOperInfo(busEventMap);
								}
							}
							else {
								Map<String, Object> curAllocPlInfo = getVhcOperInfo((String)busEventMap.get("VHC_ID"));
								if(curAllocPlInfo==null) { //운행 정보를 못찾을 경우 10회가
									String curNearStr = curInfoMapper.selectCurNearAllocOperPlByRout(busEventMap);
									String curNearArr[] = curNearStr.split(",");
									if(curNearArr.length==3) {
										busEventMap.put("ALLOC_ID", curNearArr[0]);
										busEventMap.put("ALLOC_NO", curNearArr[1]);
										busEventMap.put("OPER_SN", curNearArr[2]);
										setVhcOperInfo(busEventMap);
									}
								}
								else {
									busEventMap.put("ALLOC_ID", curAllocPlInfo.get("ALLOC_ID"));
									busEventMap.put("ALLOC_NO", curAllocPlInfo.get("ALLOC_NO"));
									busEventMap.put("OPER_SN", curAllocPlInfo.get("OPER_SN"));
								}
							}
	
							if (CommonUtil.empty(busEventMap.get("ALLOC_NO")) == false
									&& CommonUtil.empty(busEventMap.get("ROUT_GRP")) == false) {
								logger.debug("[" + busEventMap.get("ALLOC_NO") + "," + busEventMap.get("ROUT_GRP") + ","
										+ busEventMap.get("WAY_DIV") + "] In BusOperEvent alloc no");
								//insertCurOperInfo(busEventMap);
							}
						
						} catch (Exception e) {
							logger.error("Exception {}", e);
						} 
	
							// 이력 insert
						try {
							Map<String, Object> vhcSttnInfo = getVhcSttnInfo(busEventMap);
							if (vhcSttnInfo != null) {
								busEventMap.put("STOP_TM", vhcSttnInfo.get("STOP_TM"));
								busEventMap.put("ROUT_STTN_LINK_ID", vhcSttnInfo.get("ROUT_STTN_LINK_ID"));
							}

							// 이력 insert
							historyMapper.insertEventHistory(busEventMap);
						} catch (Exception e) {
							logger.error("Exception {}", e);
						}
	
						switch (eventCode) {
						/** 운행 이벤트 **/
						case 0x01: // 정류장 도착
						case 0x02: // 정류장 출발
						case 0x03: // 기점 도착
						case 0x04: // 기점 출발
						case 0x05: // 종점 도착
						case 0x06: // 종점 출발
						case 0x07: // 노드 통과
							// 통플에서 정류장통과시에도 노드 통과 이벤트를 준다?
							// brtMapper.insertLinkSpeed(busEventMap);
						case 0x08: // 음성 출력
						case 0x09: // 차고지 도착
						case 0x0a: // 차고지 출발
	
							/** 특정 이벤트 **/
						case 0x11: // 문 열림
						case 0x12: // 문 닫힘
							/*
							 * paramMap = new HashMap<>();
							 * 
							 * paramMap.put("COL", "DL_CD"); paramMap.put("CO_CD", "OPER_EVT_TYPE");
							 * paramMap.put("COL3", "NUM_VAL4"); paramMap.put("COL_VAL3", (int) eventCode);
							 * eventCd = commonMapper.selectDlCdCol(paramMap);
							 * 
							 * paramMap.put("COL", "DL_CD_NM"); paramMap.put("CO_CD", "OPER_EVT_TYPE");
							 * paramMap.put("COL3", "NUM_VAL4"); paramMap.put("COL_VAL3", (int) eventCode);
							 * eventCdName = commonMapper.selectDlCdCol(paramMap);
							 */
	
							// eventDesc = curInfoMapper.selectNodeInfo(paramMap);
	
							break;
	
						/** 운행위반 이벤트 **/
						case 0x21: // 무정차 주행
						case 0x22: // 과속 주행
						case 0x23: // 급가속
						case 0x24: // 급감속
						case 0x25: // 급출발
						case 0x26: // 급정지
						case 0x27: // 개문주행
						case 0x28: // 노선이탈
							logger.info("운행위반 발생!! [IMP ID : " + busEvent.getImpId() + "]");
	
							try {
								/*
								 * paramMap = new HashMap<>(); paramMap.put("COL", "DL_CD");
								 * paramMap.put("CO_CD", "OPER_EVT_TYPE"); paramMap.put("COL3", "NUM_VAL4");
								 * paramMap.put("COL_VAL3", (int) eventCode); eventCd =
								 * commonMapper.selectDlCdCol(paramMap);
								 * 
								 * paramMap.put("COL", "DL_CD_NM"); paramMap.put("CO_CD", "OPER_EVT_TYPE");
								 * paramMap.put("COL3", "NUM_VAL4"); paramMap.put("COL_VAL3", (int) eventCode);
								 * eventCdName = commonMapper.selectDlCdCol(paramMap);
								 */
								Map<String, Object> violtMap = getCommonCode("VIOLT_TYPE", "NUM_VAL4", eventCode + "");
								if (violtMap != null) {
									busEventMap.put("VIOLT_TYPE", (String) violtMap.get("DL_CD"));
								}
								historyMapper.insertOperVioltHistory(busEventMap); // 운행위반이력 insert
							} catch (Exception e) {
								logger.error("Exception {}", e);
							}
	
							break;
	
						/** 돌발 **/ // 2021.10.26일자 적용
						case 0x31: // 사고
						case 0x32: // 낙하
						case 0x33: // 고장
						case 0x34: // 기타
							// case 0x35: //테러
							logger.info("돌발 발생!! [IMP ID : " + busEvent.getImpId() + "]");
	
							try {
								/*
								 * paramMap = new HashMap<>(); paramMap.put("COL", "DL_CD");
								 * paramMap.put("CO_CD", "INCDNT_TYPE"); paramMap.put("COL3", "NUM_VAL4");
								 * paramMap.put("COL_VAL3", (int) eventCode); eventCd =
								 * commonMapper.selectDlCdCol(paramMap);
								 * 
								 * paramMap.put("COL", "DL_CD_NM"); paramMap.put("CO_CD", "INCDNT_TYPE");
								 * paramMap.put("COL3", "NUM_VAL4"); paramMap.put("COL_VAL3", (int) eventCode);
								 * eventCdName = commonMapper.selectDlCdCol(paramMap);
								 */
								Map<String, Object> incdntMap = getCommonCode("INCDNT_TYPE", "NUM_VAL4",
										eventCode + "");
								if (incdntMap != null) {
									busEventMap.put("INCDNT_TYPE", (String) incdntMap.get("DL_CD"));
								}
								curInfoMapper.insertIncidentInfo(busEventMap); // 돌발정보 insert
							} catch (Exception e) {
								logger.error("Exception {}", e);
							}
	
							break;
	
						}
	
						// 모니터링용 웹소켓 데이터
						paramMap = new HashMap<>();
						paramMap.put("MNG_ID", sessionId);

					} catch (Exception e) {
						logger.error("Exception {}", e);
					}
					break;

				case BrtAtCode.DISPATCH:

					AtDispatch dispatch = (AtDispatch) atMessage.getAttrData();
					Map<String, Object> curInfo = null;
					String routId = "";
					String vhcId = "";
					String vhcNo = "";
					String dpDiv = "";
					String dpLv = "";
					String drvId = "";
					String routNm = "";
					String routGrpNm = "";

					logger.info("디스패치 수신. {}", dispatch);

					try {
						String udpDtm = dispatch.getUpdateTm().toString();
						int msgType = (int) dispatch.getMessageType();
						if (msgType > 3)
							return;
						int msgLv = (int) dispatch.getMessageLevel();

						// 차량정보 가져오기
						paramMap = new HashMap<>();
						paramMap.put("MNG_ID", sessionId);
						// paramMap.put("IMP_ID", sessionId);

						// vhcInfo = curInfoMapper.selectVhcInfo(paramMap);
						Map<String, Object> vhcInfo = getVhcInfo(paramMap);
						vhcId = String.valueOf(vhcInfo.get("VHC_ID"));
						vhcNo = String.valueOf(vhcInfo.get("VHC_NO"));
					
						curInfo = getVhcOperInfo(vhcId);

						// 디스패치 이력 생성
						// 버스의 현재 정보 가져오기 //BMS_CUR_OPER_INFO
						paramMap.put("UPD_DTM", udpDtm);
						paramMap.put("VHC_ID", vhcId);

						// 운행일 생성. 시간에 따라 0시(24시) ~ 02시까지는 이전 날짜로 운행일 설정
						String operDt = OperDtUtil.convertTimeToOperDt(udpDtm, "yyyy-MM-dd HH:mm:ss");
						paramMap.put("OPER_DT", operDt);

						//curInfo = curInfoMapper.selectCurOperInfo(paramMap);

						// if(curInfo != null) {

						routId = String.valueOf(curInfo.get("ROUT_ID"));
						routNm = String.valueOf(curInfo.get("ROUT_NM"));
						routGrpNm = String.valueOf(curInfo.get("ROUT_GRP_NM"));
						drvId = String.valueOf(curInfo.get("DRV_ID"));

						// 디스패치 이력 넣기
						// 디스패치 구분코드 가져오기
						paramMap = new HashMap<>();
						/*
						 * paramMap.put("CO_CD", "DISPATCH_DIV"); paramMap.put("COL", "DL_CD");
						 * paramMap.put("COL3", "TXT_VAL1"); paramMap.put("COL_VAL3", msgType); dpDiv =
						 * commonMapper.selectDlCdCol(paramMap);
						 */
						Map<String, Object> divMap = getCommonCode("DISPATCH_DIV", "TXT_VAL1", msgType + "");
						if (divMap != null) {
							dpDiv = (String) divMap.get("DL_CD");
						}
						/*
						 * paramMap.put("CO_CD", "DISPATCH_KIND"); paramMap.put("COL", "DL_CD");
						 * paramMap.put("COL3", "TXT_VAL1"); paramMap.put("COL_VAL3", msgLv); dpLv =
						 * commonMapper.selectDlCdCol(paramMap);
						 */
						Map<String, Object> kindMap = getCommonCode("DISPATCH_KIND", "TXT_VAL1", msgLv + "");
						if (kindMap != null) {
							dpLv = (String) kindMap.get("DL_CD");
						}

							HashMap<String, Object> dispatchLog = new HashMap<String, Object>(curInfo);
							dispatchLog.put("VHC_NO", vhcNo);
						dispatchLog.put("OPER_DT", operDt);
						dispatchLog.put("SEND_DATE", udpDtm);
						dispatchLog.put("DSPTCH_DIV", dpDiv);
						dispatchLog.put("DSPTCH_KIND", dpLv);
						dispatchLog.put("DRV_ID", drvId);
						dispatchLog.put("DSPTCH_CONTS", dispatch.getMessage());
						dispatchLog.put("ROUT_NM", routNm);
						dispatchLog.put("ROUT_GRP_NM", routGrpNm);

						historyMapper.insertDispatchHistory(dispatchLog);

						// } else {
						// logger.info("디스패치 무시됨(현재 운행중인 차량정보 없음) : udpDtm:{}, vhcId:{}", udpDtm,
						// vhcId);
						// }

						if (curInfo != null) {
							// 웹소켓용 데이터 생성

							// 디스패치 메시지 넣기
							/*
							 * wsDataMap = new HashMap<>();
							 * 
							 * wsDataMap.put("ATTR_ID", attrId); wsDataMap.put("VHC_ID", vhcId);
							 * wsDataMap.put("VHC_NO", vhcNo); wsDataMap.put("ROUT_ID", routId);
							 * wsDataMap.put("ROUT_NM", routNm); wsDataMap.put("DSPTCH_DIV", dpDiv);
							 * 
							 * wsDataMap.put("DSPTCH_KIND", dpLv); wsDataMap.put("GPS_X",
							 * curInfo.get("GPS_X")); wsDataMap.put("GPS_Y", curInfo.get("GPS_X"));
							 * wsDataMap.put("MESSAGE", dispatch.getMessage());
							 */
						}
						// logger.info("디스패치 전송 {}", wsDataMap);
					} catch (DuplicateKeyException e) {
						logger.error("Exception {}", e);
					} catch (Exception e) {
						logger.error("Exception {}", e);
					}

					break;

				default:
					break;
				}
			}
		} else if (opCode == PlCode.OP_GET_RES) {
			PlGetResponse payload = (PlGetResponse) timsMessage.getPayload();

			for (AtMessage atMessage : payload.getAttrList()) {
				short attrId = atMessage.getAttrId();
				switch (attrId) {

				// 신호정보
				case BrtAtCode.TRAFFIC_LIGHT_STATUS_RESPONSE:

					List<HashMap<String, Object>> phaseInfoMapList = new ArrayList<>();
					AtTrafficLightStatusResponse lightStatus = (AtTrafficLightStatusResponse) atMessage.getAttrData();

					String crsId = lightStatus.getCrossNodeId(); // 교차로id
					int contSt = lightStatus.getControllerStatus(); // 제어기상태
					int conMode = lightStatus.getControlMode(); // 신호제어 모드
					int phaseNoA = lightStatus.getPhaseNumA(); // 현시 A
					int phaseNoB = lightStatus.getPhaseNumB(); // 현지 B
					short pahseTmA = lightStatus.getPhaseTimeA(); // 현시 진행시간 A
					short pahseTmB = lightStatus.getPhaseTimeB(); // 현시 진행시간 B

					HashMap<String, Object> phaseInfoMap = new HashMap<>();
					phaseInfoMap.put("CRS_ID", crsId);
					phaseInfoMap.put("CONT_ST", contSt);
					phaseInfoMap.put("CONT_MODE", conMode);
					phaseInfoMap.put("PHASE_NO", phaseNoA);
					phaseInfoMap.put("PHASE_NO_B", phaseNoB);
					phaseInfoMap.put("PHASE_TM_A", pahseTmA);
					phaseInfoMap.put("PHASE_TM_B", pahseTmB);
					// historyMapper.updateSigFcltCondParamInfo(phaseInfoMap);

					break;
				case BrtAtCode.TRAFFIC_MODULE_TWO:
					try {
						AtTrafficModule2 trafficModule2 = (AtTrafficModule2) atMessage.getAttrData();
						logger.info("TRAFFIC_MODULE_TWO : {}", trafficModule2);
						HashMap<String, Object> moduleTwoMap = new HashMap<>();
						moduleTwoMap.put("VHC_NO", trafficModule2.getBusNum());
						moduleTwoMap.put("BUS_NO", trafficModule2.getBusNum());
						moduleTwoMap.put("OPER_DT", CommonUtil.getOperDt());
						moduleTwoMap.put("NODE_ID", trafficModule2.getStationNodeId());
						
						
						Map<String, Object> result1 = getVhcOperInfo(getBusId(moduleTwoMap));
						if (result1 != null) {
							moduleTwoMap.put("ROUT_ID", result1.get("ROUT_ID"));
							Map<String, Object> result2 = getRoutMst(result1);
							moduleTwoMap.put("ROUT_GRP", result2.get("ROUT_GRP"));
							
						}
						moduleTwoMap.put("CTRL_LV", 2);
						moduleTwoMap.put("STOP_SEC", trafficModule2.getWaitTm());
						moduleTwoMap.put("OCR_DTM", trafficModule2.getUpdateTm().toString());

						curInfoMapper.insertOrUpdateSigOperEventInfo(moduleTwoMap);
					} catch (Exception e) {
						logger.error("Exception {}", e);
					}
					break;
				case BrtAtCode.TRAFFIC_MODULE_THREE:
					try {
						AtTrafficModule3 trafficModule3 = (AtTrafficModule3) atMessage.getAttrData();
						logger.info("TRAFFIC_MODULE_THREE : {}", trafficModule3);

						HashMap<String, Object> moduleThreeMap = new HashMap<>();
						moduleThreeMap.put("VHC_NO", trafficModule3.getBusNum());
						moduleThreeMap.put("BUS_NO", trafficModule3.getBusNum());
						moduleThreeMap.put("OPER_DT", CommonUtil.getOperDt());
						moduleThreeMap.put("NODE_ID", trafficModule3.getCrossNodeId());
						Map<String, Object> result1 = getVhcOperInfo(getBusId(moduleThreeMap));
						if (result1 != null) {
							moduleThreeMap.put("ROUT_ID", result1.get("ROUT_ID"));
							Map<String, Object> result2 = getRoutMst(result1);
							moduleThreeMap.put("ROUT_GRP", result2.get("ROUT_GRP"));
						}
						moduleThreeMap.put("CTRL_LV", 3);
						moduleThreeMap.put("CTRL_TYPE",
								getCommonCode("SIG_CTL_TYPE", "TXT_VAL1", trafficModule3.getControlType() + "")
										.get("DL_CD"));

						moduleThreeMap.put("CTRL_PHASE_NO", trafficModule3.getControlPhaseNum());
						moduleThreeMap.put("OCR_DTM", trafficModule3.getUpdateTm().toString());

						curInfoMapper.insertOrUpdateSigOperEventInfo(moduleThreeMap);
					} catch (Exception e) {
						logger.error("Exception {}", e);
					}
					break;

				default:
					break;
				}
			}
		}
		// return wsDataMap;
	}

	private void setOperEventData(Map<String, Object> operEventMap) {

		try {

			// 운행일 생성. 시간에 따라 0시(24시) ~ 02시까지는 이전 날짜로 운행일 설정
			operEventMap.put("OPER_DT",
					OperDtUtil.convertTimeToOperDt(operEventMap.get("UPD_DTM").toString(), "yyyy-MM-dd HH:mm:ss"));

			operEventMap.put("LINK_SN", operEventMap.get("NODE_SN")); // 통합 플랫폼의 노드 순번은 링크 순번임

			// 다음노드(교차로 or 정류소)
			// Map<String, Object> realNodeInfo =
			// curInfoMapper.selectNodeByLinkSn(operEventMap); // 통플에서 넘어온 노드순번(실제로는 링크순번)
			// // 으로 실제 노드순번 구하기

			Map<String, Object> realNodeInfo = getCurNodeByLinkSn(operEventMap);
			if (realNodeInfo != null) {
				// operEventMap.put("ROUT_NM", realNodeInfo.get("ROUT_NM"));
				// operEventMap.put("NODE_TYPE", realNodeInfo.get("NODE_TYPE"));
				// operEventMap.put("NODE_NM", realNodeInfo.get("NODE_NM"));
				operEventMap.put("NODE_SN", realNodeInfo.get("NODE_SN"));
			}

			// Map<String, Object> curSttnInfo = curInfoMapper.selectCurSttnInfo(operEventMap);
			Map<String, Object> curSttnInfo = getCurSttnNode(operEventMap);
			if (curSttnInfo != null) {
				operEventMap.put("CUR_NODE_TYPE", curSttnInfo.get("NODE_TYPE"));
				// operEventMap.put("CUR_NODE_ID", curSttnInfo.get("CUR_STTN_ID"));
				// operEventMap.put("CUR_NODE_NM", curSttnInfo.get("CUR_STTN_NM"));
				operEventMap.put("CUR_NODE_ID", curSttnInfo.get("NODE_ID"));
				operEventMap.put("CUR_NODE_NM", curSttnInfo.get("NODE_NM"));
				operEventMap.put("CUR_NODE_SN", curSttnInfo.get("NODE_SN"));
				operEventMap.put("NEXT_NODE_ID", curSttnInfo.get("NEXT_STTN_ID"));
				operEventMap.put("NEXT_NODE_NM", curSttnInfo.get("NEXT_STTN_NM"));
				operEventMap.put("NEXT_NODE_TYPE", curSttnInfo.get("NODE_TYPE"));

				logger.debug("getCurSttnNode after operEventMap = {}", operEventMap);
			}

			// Map<String, Object> nextNodeInfo =
			// curInfoMapper.selectNextSttnCrsInfo(operEventMap);
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("OPER_DT", operEventMap.get("OPER_DT"));
			param.put("BUS_NO", operEventMap.get("BUS_NO"));
			param.put("ROUT_ID", operEventMap.get("ROUT_ID"));
			param.put("NODE_SN", operEventMap.get("CUR_NODE_SN"));
			operEventMap.put("PRV_PLCE_NM", operEventMap.get("CUR_NODE_NM"));
			operEventMap.put("PREV_NODE_NM", operEventMap.get("NODE_NM"));

			// Map<String, Object> nextSttnInfo = curInfoMapper.selectNextSttnInfo(param);
			/*
			 * Map<String, Object> nextSttnInfo = getNextSttnNode(param); if (nextSttnInfo
			 * != null) { //operEventMap.put("NEXT_NODE_ID",
			 * nextSttnInfo.get("CUR_STTN_ID")); //operEventMap.put("NEXT_NODE_NM",
			 * nextSttnInfo.get("CUR_STTN_NM")); operEventMap.put("NEXT_NODE_ID",
			 * nextSttnInfo.get("NODE_ID")); operEventMap.put("NEXT_NODE_NM",
			 * nextSttnInfo.get("NODE_NM")); operEventMap.put("NEXT_NODE_TYPE",
			 * nextSttnInfo.get("NODE_TYPE")); }
			 */

		} catch (Exception e) {
			logger.error("Exception {}", e);
		}

	}

	private int insertCurOperInfo(Map<String, Object> curOperInfo) {

		/*
		 * try { //운행일 생성. 시간에 따라 0시(24시) ~ 02시까지는 이전 날짜로 운행일 설정
		 * curOperInfo.put("OPER_DT",
		 * OperDtUtil.convertTimeToOperDt(curOperInfo.get("UPD_DTM").toString(),
		 * "yyyy-MM-dd HH:mm:ss"));
		 * 
		 * 
		 * //다음노드(교차로 or 정류소) Map<String, Object> realNodeInfo =
		 * curInfoMapper.selectNodeByLinkSn(curOperInfo); //통플에서 넘어온 노드순번(실제로는 링크순번) 으로 실제
		 * 노드순번 구하기 if(realNodeInfo != null) { curOperInfo.put("ROUT_NM",
		 * realNodeInfo.get("ROUT_NM")); curOperInfo.put("NODE_TYPE",
		 * realNodeInfo.get("NODE_TYPE")); curOperInfo.put("NODE_NM",
		 * realNodeInfo.get("NODE_NM")); curOperInfo.put("NODE_SN",
		 * realNodeInfo.get("NODE_SN")); }
		 * 
		 * Map<String, Object> nextNodeInfo =
		 * curInfoMapper.selectNextSttnCrsInfo(curOperInfo); if(nextNodeInfo != null) {
		 * curOperInfo.put("PREV_NODE_NM", nextNodeInfo.get("PREV_NODE_NM"));
		 * curOperInfo.put("NEXT_NODE_ID", nextNodeInfo.get("NEXT_NODE_ID"));
		 * curOperInfo.put("NEXT_NODE_NM", nextNodeInfo.get("NEXT_NODE_NM"));
		 * curOperInfo.put("NEXT_NODE_TYPE", nextNodeInfo.get("NEXT_NODE_TYPE")); } }
		 * catch (Exception e) {
		 * 
		 * }
		 */

		// 좌표값 튀는거 insert/update 방지
		if ((float) (curOperInfo.get("LONGITUDE")) < 120 || (float) (curOperInfo.get("LONGITUDE")) > 130) {
			return 0;
		}

		if ((float) (curOperInfo.get("LATITUDE")) < 30 || (float) (curOperInfo.get("LATITUDE")) > 40) {
			return 0;
		}
		
		//부하가 많이 걸리면 하기 2라인 주석처리후 변경이 있을때만 정주기 정보 DB에 저장 사용
		setOperEventData(curOperInfo); 
		return curInfoMapper.insertCurOperInfo(curOperInfo);
		
		/*try { //변경이 있을때만 정주기 정보 DB에 저장
			if (checkChangeBusOperInfo(curOperInfo) == true) {
				return curInfoMapper.insertCurOperInfo(curOperInfo);
			}
		} catch (Exception e) {
			logger.error("Exception {}", e);
		}*/
	}

}
