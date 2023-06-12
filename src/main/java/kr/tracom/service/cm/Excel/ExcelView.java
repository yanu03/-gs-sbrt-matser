package kr.tracom.service.cm.Excel;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Component("ExcelView")
public class ExcelView extends AbstractView implements ExcelInterface{
	 @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HSSFWorkbook workbook = null;
        workbook = new HSSFWorkbook();

        //Map<String, Object> map = (Map<String, Object>) model.get("map");
	
        List<Map<String, Object>> list = (List<Map<String, Object>>) model.get("excelList");

        String title = (String)model.get("title");
        HSSFSheet sheet = workbook.createSheet(title);
        CellStyle style = workbook.createCellStyle();

        String[] headerTitle = (String[])model.get("headerTitle");
        String[] getValues = (String[])model.get("getValues");
        
        setExcelHeader(headerTitle, sheet, style);
        setExcelBodyHashMap(getValues, sheet, style, list);
        downloadExcel(title, response, workbook, getContentType());
    }
}
