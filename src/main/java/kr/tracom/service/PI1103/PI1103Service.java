package  kr.tracom.service.PI1103;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.PI1103.PI1103Mapper;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.Result;

@Service
public class PI1103Service extends ServiceSupport {

	@Autowired
	private PI1103Mapper pi1103Mapper;
	
	public List PI1103G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return pi1103Mapper.PI1103G0R0(map);
	}
	
	public List PI1103SHI0() throws Exception {
		return pi1103Mapper.PI1103SHI0();
	}
	
	public Map PI1103G0K0() throws Exception {
		return pi1103Mapper.PI1103G0K0(); 
	}
	
	public Map PI1103G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_TRAN_INFO");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += pi1103Mapper.PI1103G0I0(data);
				} else if (rowStatus.equals("U")) {
					uCnt += pi1103Mapper.PI1103G0U0(data);
				} else if (rowStatus.equals("D")) {
					dCnt += pi1103Mapper.PI1103G0D0(data);
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
}
