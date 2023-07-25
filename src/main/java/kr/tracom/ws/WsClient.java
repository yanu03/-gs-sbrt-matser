package kr.tracom.ws;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import kr.tracom.platform.attribute.BrtAtCode;

@Component
public class WsClient {
	
	private static final Logger logger = LoggerFactory.getLogger(WsClient.class);
	
	@Autowired
	SimpMessageSendingOperations messagingTemplate;


	public void sendMessage(Map<String, Object> wsMap) {
	

		//logger.info("################# sendMessage : " + message);
		
		try {
			
			short attrId = (short) wsMap.get("ATTR_ID");

			switch (attrId) {
			case BrtAtCode.BUS_INFO: // 정주기 버스 정보
				messagingTemplate.convertAndSend("/subscribe/vhc", wsMap);
			break;
			case BrtAtCode.BUS_OPER_EVENT:
				messagingTemplate.convertAndSend("/subscribe/evt", wsMap);
			break;
			
			case BrtAtCode.DISPATCH:
				messagingTemplate.convertAndSend("/subscribe/dispatch", wsMap);
			break;

			case BrtAtCode.TRAFFIC_MODULE_TWO:
			case BrtAtCode.TRAFFIC_MODULE_THREE:
				messagingTemplate.convertAndSend("/subscribe/prioritysignal", wsMap);
			break;
			
			
			case BrtAtCode.BUS_ARRIVAL_INFO:
				messagingTemplate.convertAndSend("/subscribe/arrival", wsMap);
			break;
			case BrtAtCode.TRAFFIC_LIGHT_STATUS_RESPONSE:
				messagingTemplate.convertAndSend("/subscribe/signal", wsMap);
			break;
			default:
				messagingTemplate.convertAndSend("/subscribe/public", wsMap);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void sendMessageList(String topic,List<Map<String, Object>> wsMap) {
		

		//logger.info("################# sendMessage : " + message);
		
		try {
			messagingTemplate.convertAndSend(topic, wsMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void sendMessage2(String topic, Map<String, Object> wsMap) {
		

		//logger.info("################# sendMessage : " + message);
		
		try {
			messagingTemplate.convertAndSend(topic, wsMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
