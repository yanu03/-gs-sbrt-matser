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
			case BrtAtCode.BUS_INFO: // ���ֱ� ���� ����
				messagingTemplate.convertAndSend("/subscribe/vhc", wsMap);
			break;
			case BrtAtCode.BUS_OPER_EVENT:
				messagingTemplate.convertAndSend("/subscribe/evt", wsMap);
			break;
			case BrtAtCode.BUS_ARRIVAL_INFO: 
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
