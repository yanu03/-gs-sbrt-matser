package kr.tracom.service.cm;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.cm.Common.CommonMapper;
import kr.tracom.ws.WsClient;

@Service
public class Scheduler {
	
	@Autowired
	WsClient webSocketClient;
	
	@Autowired
	CommonMapper commonMapper;

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	private static Map<String, Object> g_operCodeMap = new HashMap<>();
	
	
	
	private Map<String, Object> getCommonCode( String coCd,String ValType, String value) {
		//String eventCd = paramMap.get("EVENT_CD")+"";
		logger.debug("getCommonCode() coCd="+coCd +", eventCd="+value);
		Map<String, Object> param = new HashMap<>();
		String key = coCd+value;
		param.put("CO_CD", coCd);
		param.put("VAL_TYPE", ValType);
		param.put("VAL", value);
		
		Map<String, Object> eventCodeMap = null;
		if(g_operCodeMap==null) {
			g_operCodeMap = new HashMap<>();
			eventCodeMap = commonMapper.getCommonCode(param);
			if(eventCodeMap!=null) {
				g_operCodeMap.put(key, eventCodeMap);
				return eventCodeMap;
			}
		}
		
		eventCodeMap = (Map<String, Object>)g_operCodeMap.get(key); 
		if ((eventCodeMap != null)) {
			return eventCodeMap;
		}
		else {
			eventCodeMap = commonMapper.getCommonCode(param);
			g_operCodeMap.put(key, eventCodeMap);
			return eventCodeMap;
		}
	}
	
	
	@Scheduled(fixedDelay = 60000)
	public void schedule_60sec() {
		try {
				
		} catch (Exception e) {
			logger.error("schedule_10sec Exception!!! {}", e);
		}
	}
	
	
	@Scheduled(fixedDelay = 10000)
	public void schedule_10sec() {
		//Map<String, Object> paramMap = new HashMap<>();
		//paramMap.put("COL", "TXT_VAL1");
		//paramMap.put("CO_CD", "SCHEDULE_TEST");
		//paramMap.put("COL3", "DL_CD_NM");
		//paramMap.put("COL_VAL3", "10sec");
		//String scheduleOnOff = commonMapper.selectDlCdCol(paramMap);
				
		Map<String, Object> commonCode = getCommonCode("SCHEDULE_TEST","DL_CD_NM","10sec");
		String scheduleOnOff = (String)commonCode.get("TXT_VAL1");
		//logger.info("schedule_10sec");
		try {
			if (scheduleOnOff.equals("off") == true) {
				return;
			}	
		} catch (Exception e) {
			logger.error("schedule_10sec Exception!!! {}", e);
		}
	}
}
