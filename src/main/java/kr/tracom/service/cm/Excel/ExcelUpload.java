package kr.tracom.service.cm.Excel;

import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExcelUpload {

	public List<Map<String, Object>> excelToList(MultipartFile file, String[] getValues) throws Exception{
		ExcelData excelData = new ExcelData();
        if(!excelData.isExcelFile(file)){
            throw new Exception("엑셀파일만 업로드 해주세요.");
        }

        excelData.initExcelData(file);
        excelData.setExcelSize();
        List<Map<String, Object>> list = excelData.getWorkData(1,getValues);

        //workDailyData = workDailyExcelDataAddCodeNmAndCodeValue(workDailyData, null);

        //System.out.println(workDailyData.toString());

        return list;
    }
}
