package  kr.tracom.service.SI0300;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import kr.tracom.handler.FTPHandler;
import kr.tracom.mapper.SI0300.SI0300Mapper;
import kr.tracom.support.ServiceSupport;
import kr.tracom.support.exception.MessageException;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Result;

@Service
public class SI0300Service extends ServiceSupport{

	@Autowired
	private SI0300Mapper si0300Mapper;
	
	@Autowired
	FTPHandler ftpHandler;
	
	@Value("${fileupload.up.directory}")
	private String UPLOAD_DIR;

	@Value("${fileupload.employee.directory}")
	private String UPLOAD_EMPLOYEE_DIR;

	
	public List SI0300G0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		List returnList = si0300Mapper.SI0300G0R0(map);
		
		for(Object obj:returnList) {
			Map<String, Object> temp = (Map<String, Object>)obj;
			temp.put("FILE_PATH", "/fileUpload/common/employee/"+temp.get("DRV_ID")+".png");
		}
		
		return returnList;
	}
	
	public List SI0300P0R0() throws Exception {
		Map<String, Object> map = getSimpleDataMap("dma_search");
		return si0300Mapper.SI0300P0R0(map);
	}
	
	public List SI0300SHI0() throws Exception {
		return si0300Mapper.SI0300SHI0();
	}	

	public Map SI0300G0K0() throws Exception {
		return si0300Mapper.SI0300G0K0(); 
	}
	
	public Map SI0300G0S0() throws Exception {
		int iCnt = 0;
		int uCnt = 0;
		int dCnt = 0;		
		
		List<Map<String, Object>> param = getSimpleList("dlt_BMS_DRV_MST");
		try {
			for (int i = 0; i < param.size(); i++) {
				Map data = (Map) param.get(i);
				String rowStatus = (String) data.get("rowStatus");
				if (rowStatus.equals("C")) {
					iCnt += si0300Mapper.SI0300G0I0(data);
					if((data.get("FILE_NM")!=null)&&(data.get("FILE_NM").toString().isEmpty()==false)
							&&(data.get("DRV_ID").equals(data.get("FILE_NM"))==false)) {
						
						
						doMoveFile(UPLOAD_DIR, UPLOAD_EMPLOYEE_DIR,data.get("FILE_NM").toString(),data.get("DRV_ID").toString()+".png");
						
						
			    		/*  2020-09-29 추가
			    		 *  설명: .jpg 이미지와 CERTI 이미지가 없을 경우 운전자 단말기에서 로그인이 되지 않음. 따라서 아래 코드 추가함
			    		 */
						String imgFileName = data.get("DRV_ID").toString();
						String pngExtName = ".png";
						doCopyFile(UPLOAD_EMPLOYEE_DIR, UPLOAD_EMPLOYEE_DIR, imgFileName+pngExtName, imgFileName+".jpg");
						doCopyFile(UPLOAD_EMPLOYEE_DIR, UPLOAD_EMPLOYEE_DIR, imgFileName+pngExtName, imgFileName+"_CERTI.jpg");
						
						//ftp sync
						ftpHandler.uploadSI0300();
						
					}
				} else if (rowStatus.equals("U")) {
					uCnt += si0300Mapper.SI0300G0U0(data);
					if((data.get("FILE_NM")!=null)&&(data.get("FILE_NM").toString().isEmpty()==false)
							&&(data.get("DRV_ID").equals(data.get("FILE_NM"))==false)) {
						doMoveFile(UPLOAD_DIR,UPLOAD_EMPLOYEE_DIR,data.get("FILE_NM").toString(),data.get("DRV_ID").toString()+".png");
						
						
						/*  2020-09-29 추가
			    		 *  설명: .jpg 이미지와 CERTI 이미지가 없을 경우 운전자 단말기에서 로그인이 되지 않음. 따라서 아래 코드 추가함
			    		 */
						String imgFileName = data.get("DRV_ID").toString();
						String pngExtName = ".png";
						doCopyFile(UPLOAD_EMPLOYEE_DIR, UPLOAD_EMPLOYEE_DIR, imgFileName+pngExtName, imgFileName+".jpg");
						doCopyFile(UPLOAD_EMPLOYEE_DIR, UPLOAD_EMPLOYEE_DIR, imgFileName+pngExtName, imgFileName+"_CERTI.jpg");
						
						//ftp sync
						ftpHandler.uploadSI0300();
						
					}
				} else if (rowStatus.equals("D")) {
					//si0300Mapper.SI0300G0D1(data); //배차 삭제
					dCnt += si0300Mapper.SI0300G0D0(data);
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

	public List SI0300G0_exlDownload() throws Exception {
		String param = (String)request.getAttribute("param");
		Map<String, Object> map = new HashMap<String, Object>();
		if(CommonUtil.empty(param)){
			map.put("TYPE", "ALL");
			map.put("CONTENT", "");
		}
		else{
			map.put("TYPE", "ALL");
			map.put("CONTENT", param);
		}

		return si0300Mapper.SI0300G0R0(map);
	}
	
}
