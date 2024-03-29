package  kr.tracom.service.PI0302;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.platform.attribute.common.AtBrtAction;
import kr.tracom.platform.attribute.common.AtTimeStamp;
import kr.tracom.platform.net.config.TimsConfig;
import kr.tracom.platform.net.protocol.TimsMessage;
import kr.tracom.platform.net.protocol.TimsMessageBuilder;
import kr.tracom.platform.service.TService;
import kr.tracom.platform.service.config.KafkaTopics;
import kr.tracom.service.tims.kafka.KafkaProducer;
import kr.tracom.util.DateUtil;
import kr.tracom.util.Result;

import  kr.tracom.mapper.PI0302.PI0302Mapper;

@Service
public class PI0302Service extends ServiceSupport{

	@Autowired
	KafkaProducer kafkaProducer;
	
	@Autowired
	private PI0302Mapper PI0302Mapper;
		
	public List<Map> PI0302G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return PI0302Mapper.PI0302G0R0(param);
	}
	
	public List<Map> PI0302G1R0() throws Exception{
		return PI0302Mapper.PI0302G1R0();
	}
	
	public List PI0302SHI0() throws Exception {
		return PI0302Mapper.PI0302SHI0();
	}
	
	public Map PI0302G0K0() throws Exception {
		return PI0302Mapper.PI0302G0K0();
	}	
	
	public Map PI0302G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;
		List<Map<String, Object>> param = getSimpleList("dlt_SM_NEWS_INFO");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("U")) {
					uCnt += PI0302Mapper.PI0302G0U0(data);
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
	
	public Map AL0302G0SEND() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;
	
		
		TimsConfig timsConfig = TService.getInstance().getTimsConfig();
		TimsMessageBuilder builder = new TimsMessageBuilder(timsConfig);

		AtBrtAction brtRequest = new AtBrtAction();

		brtRequest.setTimeStamp(new AtTimeStamp(DateUtil.now("yyyyMMddHHmmssSSS")));
		brtRequest.setActionCode(AtBrtAction.allocChangeRequest);
		brtRequest.setData("");
		TimsMessage timsMessage = builder.actionRequest(brtRequest);
		kafkaProducer.sendKafka(KafkaTopics.T_BRT, timsMessage, "");
		
		Map result = saveResult(iCnt, uCnt, dCnt);
		
		return result;	
	}
}
