package kr.tracom.service.AL0302;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.mapper.AL0302.AL0302Mapper;
import kr.tracom.service.tims.TimsService;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Constants;
import kr.tracom.util.Result;

@Service
public class AL0302Service extends ServiceSupport {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());

	
	@Autowired
    TimsService timsService;
	
	@Autowired
	private AL0302Mapper al0302Mapper;
	
	
	public List AL0302G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return al0302Mapper.AL0302G0R0(map);
	}
	
	public List AL0302SHI0() throws Exception{
		Map param = getSimpleDataMap("dma_search");		
		return al0302Mapper.AL0302SHI0(param);
	}
	
	public List AL0302SHI1() throws Exception{
		Map param = getSimpleDataMap("dma_search");		
		return al0302Mapper.AL0302SHI1(param);
	}
	
	public List AL0302G1R0() throws Exception {
		// TODO Auto-generated method stub
		Map param = getSimpleDataMap("dma_param_AL0302G1");
		return al0302Mapper.AL0302G1R0(param);
	}
	
	public List AL0302P0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return al0302Mapper.AL0302P0R0(map);
	}
	
	public List AL0302P1R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return al0302Mapper.AL0302P1R0(map);
	}
	
	//저장
	public Map AL0302G1S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_ALLOC_PL_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += al0302Mapper.AL0302G1I2(data);
				}
				else if (rowStatus.equals("U")) {
					uCnt += al0302Mapper.AL0302G1U0(data);
					//uCnt += al0302Mapper.AL0302G1U1(data);
				}
				else if (rowStatus.equals("D")) {
					uCnt += al0302Mapper.AL0302G1D0(data);
					//uCnt += al0302Mapper.AL0302G1U1(data);
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
	
	//배포
	public Map AL0302G1S1() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_ALLOC_PL_MST");
		List<Map<String, Object>> mapList = getSimpleList("dma_search");
		//String temp[] = map.get("relDt").toString().replace("[","").replace("]","").replace(" ","").split(",");
		//String rel_way = (String) map.get("REL_WAY");
		
		//고정배포
		//if(rel_way.equals(Constants.VhcDistType.FIX))
		{
			for(int i=0; i<mapList.size(); i++) {
				try {
					for (int j = 0; j < param.size(); j++) {
						Map data = (Map) param.get(j);
						String rowStatus = (String) data.get("rowStatus");
						//if (rowStatus.equals("U") || rowStatus.equals("R")) {
							data.put("OPER_DT", mapList.get(i).get("OPER_DT"));
							//uCnt += al0302Mapper.AL0302G1I0(data);
							//uCnt += al0302Mapper.AL0302G1I1(data);
							iCnt += al0302Mapper.AL0302G1I3(data); //배포
						//}
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
				
			}
		}
		//순환배포(내림)
		/*else if(rel_way.equals(Constants.VhcDistType.DESC)) {
			for(int i=0; i<temp.length; i++) {
				try {
					for (int j = 0; j < param.size(); j++) {
						Map data = (Map) param.get(j);
						String rowStatus = (String) data.get("rowStatus");
						if (rowStatus.equals("U") || rowStatus.equals("R")) {
							data.put("OPER_DT", temp[i]);
							data.put("ALLOC_NO", j+1);
							uCnt += al0302Mapper.AL0302G1I0(data);
							uCnt += al0302Mapper.AL0302G1I1(data);
						}
					}			
					Collections.rotate(param, 1);
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
				
			}
		}*/
		//순환배포(오름)
		/*else if(rel_way.equals(Constants.VhcDistType.ASC)) {
			for(int i=0; i<temp.length; i++) {
				try {
					for (int j = 0; j < param.size(); j++) {
						Map data = (Map) param.get(j);
						String rowStatus = (String) data.get("rowStatus");
						if (rowStatus.equals("U") || rowStatus.equals("R")) {
							data.put("OPER_DT", temp[i]);
							data.put("ALLOC_NO", j+1);
							uCnt += al0302Mapper.AL0302G1I0(data);
							uCnt += al0302Mapper.AL0302G1I1(data);
						}
					}			
					Collections.rotate(param, -1);
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
				
			}
		}*/
		
		Map result = saveResult(iCnt, uCnt, dCnt);
		
		
		//차량배차 배포 시 운행계획 생성 완료되었다고 BRT서비스에 알림
		//timsService.notifyOperAllocCompleted();
		
		return result;	
	}
	
	public List AL0302G2R0() throws Exception {
		// TODO Auto-generated method stub
		Map param = getSimpleDataMap("dma_param_AL0302G1");
		return al0302Mapper.AL0302G2R0(param);
	}
	
	//운행일 선택해서 수정
	public Map AL0302G2S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_OPER_DT_ALLOC_PL_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("U")) {
					uCnt += al0302Mapper.AL0302G2U0(data);
					uCnt += al0302Mapper.AL0302G2U1(data);
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
	
	public List AL0302G1_exlDownload(String parameter) throws Exception {
	      String param = parameter;
	      Map<String, Object> map = new HashMap<String, Object>();
	      if(CommonUtil.empty(param)){
	         map.put("TYPE", "ALL");
	         map.put("ALLOC_ID", "");
	      }
	      else{
	         map.put("TYPE", "ALL");
	         map.put("ALLOC_ID", param);
	      }

	      return al0302Mapper.AL0302G1R0(map);
	   }	
}
