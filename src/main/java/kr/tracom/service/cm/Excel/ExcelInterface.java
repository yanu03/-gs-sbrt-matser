package kr.tracom.service.cm.Excel;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

public interface ExcelInterface {
    default void downloadExcel(String title, HttpServletResponse response, HSSFWorkbook workbook, String contentType) throws Exception{
        ServletOutputStream out = null;
        String excelFileName = java.net.URLEncoder.encode(title, "UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=" + "\"" + excelFileName + ".xls\"");
        response.setHeader("Set-Cookie", "fileDownload=true; path=/");
        response.setContentType(contentType);
        out = response.getOutputStream();
        workbook.write(out);
        out.flush();
    }

    default void setExcelHeader(String[] headerTitle, HSSFSheet sheet, CellStyle style){
        HSSFRow headerRow = sheet.createRow(0);

        //style.setAlignment(HorizontalAlignment.CENTER);

        for(int i=0; i<headerTitle.length; i++){
            HSSFCell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headerTitle[i]);
        }
    }

    default void setExcelBodyHashMap(String[] getterMethod, HSSFSheet sheet, CellStyle style, List<Map<String, Object>> dataList) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        for(int i=0; i<dataList.size(); i++){
            HSSFRow bodyRow = sheet.createRow(i + 1);
            Map<String, Object> data = dataList.get(i);

           //style.setAlignment(HorizontalAlignment.CENTER);

            for(int j=0; j<getterMethod.length; j++) {
                HSSFCell bodyCell = bodyRow.createCell(j);
                String value = data.get(getterMethod[j])+"";

                bodyCell.setCellValue(value.equals("null") ? "" : value);

                sheet.setColumnWidth(j, 5000);
            }
        }
    }
    
    default void setExcelBody(String[] getterMethod, HSSFSheet sheet, CellStyle style, List<?> dataList) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        for(int i=0; i<dataList.size(); i++){
            HSSFRow bodyRow = sheet.createRow(i + 1);
            Object data = dataList.get(i);

            style.setAlignment(HorizontalAlignment.CENTER);

            for(int j=0; j<getterMethod.length; j++) {
                HSSFCell bodyCell = bodyRow.createCell(j);
                String value = methodInvoke(data, getterMethod[j]);

                bodyCell.setCellValue(value.equals("null") ? "" : value);

                sheet.setColumnWidth(j, 5000);
            }
        }
    }

    default String methodInvoke(Object instance, String value) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String methodName = "get" + value;
        Class<?> clazz = instance.getClass();
        Method method = clazz.getMethod(methodName);

        return String.valueOf(method.invoke(instance));
    };
}

