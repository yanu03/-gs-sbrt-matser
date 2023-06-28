package kr.tracom.service.tims.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import  kr.tracom.mapper.cm.Common.CommonMapper;
import kr.tracom.mapper.tims.CurInfoMapper;
import kr.tracom.mapper.tims.HistoryMapper;
import kr.tracom.service.tims.eventHandler.EventThread;
import kr.tracom.service.tims.eventHandler.MorEventThread;
import kr.tracom.service.tims.manager.ThreadManager;
import kr.tracom.platform.service.kafka.model.KafkaMessage;
import kr.tracom.ws.WsClient;

@Component
public class EventRequest {

    Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    HistoryMapper historyMapper;
    
    @Autowired
    CurInfoMapper curInfoMapper;
    
    @Autowired
    CommonMapper commonMapper;
    
    @Autowired
	WsClient webSocketClient;
    
    @Autowired
    ThreadManager threadManager;


	public void receiveKafka(KafkaMessage kafkaMessage) {		
		//this.addKafkaMessage(kafkaMessage);
		
		//thread 로 하나씩 돌리기
		String sessionId = kafkaMessage.getSessionId();
		
		logger.debug("<== receiveKafka message:{}, sessionId:{}", kafkaMessage.getTimsMessage(), sessionId);
		
		
		//sessionId 에 따라
		EventThread eventThread = threadManager.getEventThread(sessionId);
		eventThread.addKafkaMessage(kafkaMessage);
		MorEventThread morEventThread = threadManager.getMorEventThread(sessionId);
		morEventThread.addKafkaMessage(kafkaMessage);
		
	}
	

    
}
