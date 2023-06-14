package  kr.tracom.service.SI0800;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.SI0800.SI0800Mapper;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.DateUtil;
import kr.tracom.util.Result;

@Service
public class SI0800Service extends ServiceSupport{

	@Autowired
	private SI0800Mapper si0800Mapper;
		
	public List<Map> SI0800G0R0() throws Exception{
		Map param = getSimpleDataMap("dma_search");
		return si0800Mapper.SI0800G0R0(param);
	}
	
	public List SI0800SHI0() throws Exception {
		return si0800Mapper.SI0800SHI0();
	}
	
	public Map SI0800G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;
		List param = getSimpleList("dlt_BMS_DVC_PARAM_CFG_INFO");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += si0800Mapper.SI0800G0I0(data);
				} else if (rowStatus.equals("U")) {
					uCnt += si0800Mapper.SI0800G0U0(data);
				} else if (rowStatus.equals("D")) {
					dCnt += si0800Mapper.SI0800G0D0(data);
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