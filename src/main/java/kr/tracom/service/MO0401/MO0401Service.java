package kr.tracom.service.MO0401;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import kr.tracom.mapper.MO0401.MO0401Mapper;

import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.DateUtil;
import kr.tracom.util.Result;

@Service
public class MO0401Service extends ServiceSupport{

	@Autowired
	private MO0401Mapper MO0401Mapper;
		
	public List MO0401G0R0() throws Exception {
			Map<String, Object> map = getSimpleDataMap("dma_search");
		return MO0401Mapper.MO0401G0R0(map);
	}
	
	public List MO0401SHI0() throws Exception {
		return MO0401Mapper.MO0401SHI0();
	}
	
	public Map MO0401G0K0() throws Exception {
		return MO0401Mapper.MO0401G0K0();
	}
	
	public Map MO0401G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;

		List<Map<String, Object>> param = getSimpleList("dlt_BMS_OPER_INST_MSG_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map<String, Object> data = param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				
				if (rowStatus.equals("C")) {

					uCnt += MO0401Mapper.MO0401G0I0(data);

				}
				
				else if (rowStatus.equals("U")) {

					uCnt += MO0401Mapper.MO0401G0U0(data);

				}
				
				else if (rowStatus.equals("D")) { 
					
					dCnt += MO0401Mapper.MO0401G0D0(data); 
					
				}
				 
			}
		} catch (Exception e) {
			if (e instanceof DuplicateKeyException) {
				throw new MessageException(Result.ERR_KEY, "중복된 키값의 데이터가 존재합니다.");
			} else {
				throw e;
			}
		}

		Map result = saveResult(iCnt, uCnt, dCnt);

		return result;

	}
	
	
	/*
	public List<Map> PI0205G0R0() throws Exception{
		Map<String, Object> param = getSimpleDataMap("dma_search");
		List returnList = PI0205Mapper.PI0205G0R0(param);
		
		Map<String, Object> AUDIO_INFO = getSimpleDataMap("dma_AUDIO_INFO");
		for(Object obj:returnList) {
			
			Map<String, Object> temp = (Map<String, Object>)obj;
			temp.put("VOC_PATH", "/fileUpload/audio/"+AUDIO_INFO.get("AUDIO_NM"));			
		}
		
		return returnList;
		
	}
	
	public Map PI0205G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_VOC_INFO");
        Map<String, Object> AUDIO_INFO = getSimpleDataMap("dma_AUDIO_INFO");
        
        try {
        	for (int i = 0; i < param.size(); i++) {
    			Map<String, Object> data = param.get(i);
    			String rowStatus = (String) data.get("rowStatus");
    			// 데이터베이스 date 타입일때 공백으로 들어가면 에러나는 사항 임시 수정
    			for (String key : data.keySet()) {
    				if (data.get(key).equals("")) {
    					data.put(key, null);
    				}
    			}			
    			if (rowStatus.equals("U")) {
    				if((data.get("VOC_ID") != null)&&(data.get("VOC_ID").toString().isEmpty()==false))
    					{
    						uCnt += PI0205Mapper.PI0205G0U0(data);
    					}
    				else if((data.get("VOC_ID") == null)||(data.get("VOC_ID").toString().isEmpty()==true)) 
    					{
    						iCnt += PI0205Mapper.PI0205G0I0(data);
    					}
    				
   
    				if((AUDIO_INFO.get("AUDIO_NM")!=null)&&(AUDIO_INFO.get("AUDIO_NM").toString().isEmpty()==false))
						{
    						doMoveFile("up/", "audio/", AUDIO_INFO.get("AUDIO_NM").toString(), AUDIO_INFO.get("AUDIO_NM").toString());
						}
                    
    				
    			} else if (rowStatus.equals("D")) {
    				dCnt += PI0205Mapper.PI0205G0D0(data);
    			}
    		}
		} catch (Exception e) {
			if (e instanceof DuplicateKeyException) {
				throw new MessageException(Result.ERR_KEY, "중복된 키값의 데이터가 존재합니다.");
			} else {
				throw e;
			}
		}
		
		Map result = saveResult(iCnt, uCnt, dCnt);
		
		return result;
	}
	
	
	
	
		*/
	
	
}
