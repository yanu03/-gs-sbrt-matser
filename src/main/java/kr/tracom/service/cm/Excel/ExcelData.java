package kr.tracom.service.cm.Excel;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.multipart.MultipartFile;

import kr.tracom.util.ExcelUtil;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExcelData {

    private Workbook wb;
    private Sheet sheet;
    private Row row;
    private Cell cell;
    private int firstRowNum;
    private int lastRowNum;
    private int firstCellNum;
    private int lastCellNum;

    private final int LAST_INDEX_ROW_NUM_INCLUDE_INDEX = 1;

    private final int DATE_INFO_CELL_INDEX = 0;

    public boolean isExcelFile(MultipartFile file) {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename()); // 3

        if (!extension.equals("xlsx") && !extension.equals("xls")) {
            return false;
        }

        return true;
    }

    public void initExcelData(MultipartFile file){
        initWorkBook(file);
        initSheet();
        initRow();
    }

    private void initWorkBook(MultipartFile file){
        wb = ExcelUtil.getWorkbook(file);
    }

    private void initSheet() {
        sheet = wb.getSheetAt(0);
    }

    private void initRow(){
        row = sheet.getRow(0);
    }

    public void setExcelSize(){
        setExcelRowNum();
        setExcelCellNum();
    }

    private void setExcelRowNum() {
        firstRowNum = sheet.getFirstRowNum();
        lastRowNum = sheet.getLastRowNum() + LAST_INDEX_ROW_NUM_INCLUDE_INDEX;
    }

    private void setExcelCellNum(){
        firstCellNum = row.getFirstCellNum() + DATE_INFO_CELL_INDEX;
        lastCellNum = row.getLastCellNum();
    }

    public List<Map<String, Object>> getWorkData(int firstIndex, String[] getValues){
    	int emptyCnt = 1;
    	List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        for(int i=firstIndex; i<lastRowNum; i++){
            row = sheet.getRow(i);
            Map<String, Object> workData = new HashMap<String, Object>();
            for(int j=firstCellNum; j<lastCellNum; j++){
            	//System.out.println(row.getCell(j));
                cell = row.getCell(j);
                
                if(lastCellNum>getValues.length) break;
                
                if(cell == null){
                	workData.put(getValues[j], ""); 
                	emptyCnt += 1;
                }else{
//                	System.out.println(cell.getStringCellValue());
                	workData.put(getValues[j], cell.getStringCellValue());
                }
                //String color = ExcelUtil.getFillForegroundColorARGBHex(cell);

                //workDailyData.put("workDate", getWorkDate());
                //workDailyData.put("workCode", cell.getStringCellValue());
                //workDailyData.put("amPmSe", colorToAmPm(color));
                //workDailyData.put("workOrdr", getWorkOrdr(j));

                //workMonthData.add(workDailyData);
               
            }
            // 기능 : 한 행 전채가 공백일 경우 배열에 데이터를 넣지 않는다.
            // 작성자 : 박원용
            if(emptyCnt != lastCellNum) {
            	// 기능 : Map이 비어있으면 배열에 추가가 되지 않는다
            	if(!workData.isEmpty()) list.add(workData);
            }
            
            emptyCnt = 1;
            
        }
        return list;
    }

    private String getWorkDate(){
        Cell dateCell = row.getCell(0);

        SimpleDateFormat objSimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String workDate = objSimpleDateFormat.format(dateCell.getDateCellValue());

        return workDate;
    }

    private String colorToAmPm(String color){
        if(color.equals("E7E6E6")){
            return "P";
        }else if(StringUtils.isEmpty(color)){
            return "A";
        }

        return "";
    }

    private int getWorkOrdr(int cellIndex){
        return cellIndex - DATE_INFO_CELL_INDEX;
    }
}
