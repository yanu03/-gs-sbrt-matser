package kr.tracom.service.cm.Excel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExcelUpload {

	public List<Map<String, Object>> excelToList(MultipartFile file, String[] getValues) throws Exception{
		ExcelData excelData = new ExcelData();
		Map<String, Object> failMsg = new HashMap<String, Object>();
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		
        if(!excelData.isExcelFile(file)){
        	failMsg.put("msg","엑셀파일만 업로드 해주세요.");
            list.add(failMsg);
        }else {
        	excelData.initExcelData(file);
            excelData.setExcelSize();
            list = excelData.getWorkData(1,getValues);
        }

        //workDailyData = workDailyExcelDataAddCodeNmAndCodeValue(workDailyData, null);

        //System.out.println(list);

        return list;
    }
}
