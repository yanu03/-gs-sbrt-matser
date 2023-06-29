package kr.tracom.service.tims.handler;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.tracom.platform.attribute.AtCode;
import kr.tracom.platform.attribute.common.AtBrtAction;
import kr.tracom.platform.attribute.common.AtServiceLogInOut;
import kr.tracom.platform.attribute.common.AtTimeStamp;
import kr.tracom.platform.net.config.TimsConfig;
import kr.tracom.platform.net.protocol.TimsMessage;
import kr.tracom.platform.net.protocol.TimsMessageBuilder;
import kr.tracom.platform.net.protocol.attribute.AtMessage;
import kr.tracom.platform.net.protocol.payload.PlActionRequest;
import kr.tracom.platform.service.TService;
import kr.tracom.platform.service.config.KafkaTopics;
import kr.tracom.service.cm.OperPlan.OperPlanService;
import kr.tracom.service.tims.kafka.KafkaProducer;
import kr.tracom.service.tims.manager.ThreadManager;
import kr.tracom.util.DateUtil;
import kr.tracom.ws.WsClient;

@Component
public class ActionRequest {

    Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    OperPlanService operPlanService;
    
    @Autowired
    KafkaProducer kafkaProducer;

    
    @Autowired
    ThreadManager threadManager;
    
    @Autowired
	WsClient webSocketClient;
    
    //@Autowired
    //private SltMapper sltMapper;

    public Map<String, Object> handle(TimsMessage timsMessage, String sessionId){
    	
    	logger.info("<== PlCode.OP_ACTION_REQ message:{}, sessionId:{}", timsMessage, sessionId);
    	
    	Map<String, Object> resultMap = null;
    	
        PlActionRequest request = (PlActionRequest) timsMessage.getPayload();
        //PlActionResponse response = new PlActionResponse();

        AtMessage atMessage = request.getAtMessage();
        short attrId = atMessage.getAttrId();

        switch(attrId){
            case AtCode.SERVICE_LOGINOUT :
                AtServiceLogInOut atData = (AtServiceLogInOut) atMessage.getAttrData();
                byte inOut = atData.getInOut();

                if(inOut == (byte)0) {
                    logger.info("login {}", sessionId);
                    
                    threadManager.getEventThread(sessionId);
                    threadManager.getMorEventThread(sessionId);
                }
                else if(inOut == (byte)1){
                    logger.info("logout");
                    
                    threadManager.removeEventThread(sessionId);
                    threadManager.removeMorEventThread(sessionId);
                }

                break;
                
            case AtCode.BRT_ACTION :
        		AtBrtAction brtAction = (AtBrtAction) atMessage.getAttrData();
        		byte actionCode = brtAction.getActionCode();
            	
        		if(actionCode == AtBrtAction.changeOperRequest) { //변경운행 요청 수신
            		//변경운행 생성
            		String actionData = brtAction.getReserved();        		
            		String dataArr[] = actionData.split(",");
            		
            		logger.info("======== 변경운행 요청 수신 : {}", actionData);
            		
            		if(dataArr.length == 17) {
	            		String operDt = dataArr[0];
	            		String allocId = dataArr[1];
	            		String busId = dataArr[2];
	            		//String repRoutId = dataArr[3];
	            		//String courseId = dataArr[4];
	            		String routId = dataArr[5];
	            		String allocNo = dataArr[6];
	            		int operSn = Integer.valueOf(dataArr[7]);
	            		int orgOperSn = Integer.valueOf(dataArr[8]);
	            		String stNodeId = dataArr[9];
	            		int stNodeSn = Integer.valueOf(dataArr[10]);
	            		String linkId = String.valueOf(dataArr[11]);
	            		int timeDiff = Integer.valueOf(dataArr[12]);
	            		String timeMin = String.valueOf(dataArr[13]);
	            		String timeMax = String.valueOf(dataArr[14]);
	            		String gps_x = String.valueOf(dataArr[15]);
	            		String gps_y = String.valueOf(dataArr[16]);
	            		
	            		List<Map<String, Object>> operPlanList = 
	            				operPlanService.makeChgOperAllocPlNodeInfo(allocId, busId, routId, operDt, operSn, orgOperSn, stNodeId
	            								, stNodeSn, timeDiff, timeMin, timeMax, true);
	            		
            		} else {
            			//변경운행 데이터 오류
            			logger.info("변경운행 데이터 오류!! dataArr.length:{}", dataArr.length);
            		}
            		
            		
            		//변경운행 생성 후 완료 전송
            		//logger.info("======== 변경운행 생성완료 : {}", operPlanList);
            		AtBrtAction brtRequest = new AtBrtAction();

            		brtRequest.setTimeStamp(new AtTimeStamp(DateUtil.now("yyyyMMddHHmmssSSS")));
            		brtRequest.setActionCode(AtBrtAction.changeOperResponse);
            		brtRequest.setData("");
            		brtRequest.setReserved(actionData);

                    
                    TimsConfig timsConfig = TService.getInstance().getTimsConfig();
                    TimsMessageBuilder builder = new TimsMessageBuilder(timsConfig);
                    TimsMessage tMessage = builder.actionRequest(brtRequest);
                    
                    logger.info("======== 변경운행 결과 전송 : {}", tMessage);
            		
                    
                    kafkaProducer.sendKafka(KafkaTopics.T_BRT, tMessage, "");	
            		

            	}
        		
                break;                
                
            /*case SltAtCode.FACILITY_PARAM_ACTION_RESPONSE :
                AtFacilityParamActionResponse atPramData = (AtFacilityParamActionResponse) atMessage.getAttrData();
                
                
                //paramKind �ڵ尪 select
                Map param = new HashMap();
                param.put("VAL_TYPE", "NUM_VAL4");
                
                param.put("CO_CD", "DVC_KIND");
                param.put("VAL", atPramData.toMap().get("DVC_KIND"));

                Map Kind = sltMapper.selectDetailCode(param);

                param.put("CO_CD", "PARAM_DIV");
                param.put("VAL", atPramData.toMap().get("PARAM_DIV"));
                Map paramDiv = sltMapper.selectDetailCode(param);
                
                param.put("CO_CD", "PARAM_KIND");
                param.put("VAL", atPramData.toMap().get("PARAM_KIND"));
                Map paramKind = sltMapper.selectDetailCode(param);
                
                
                Map socketMap = new HashMap();
                socketMap.putAll((Map) atPramData.toMap());
                socketMap.put("DVC_KIND", Kind);
                socketMap.put("PARAM_DIV", paramDiv);
                socketMap.put("PARAM_KIND", paramKind);
    	        if(param != null) {
    	    		webSocketClient.sendMessage(socketMap);
    	        }
                break;*/
        }
        
        
        return resultMap;
        
    }
    
    
}
