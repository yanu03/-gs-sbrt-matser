package kr.tracom.util;


import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class ExcelUtil {
	public static Workbook getWorkbook(String filePath) {
		/*
         * FileInputStream은 파일의 경로에 있는 파일을 읽어서 Byte로 가져온다.
         * 파일이 존재하지 않는다면은 RuntimeException이 발생된다.
         */
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(filePath);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        Workbook wb = null;

        /*
         * 파일의 확장자를 체크해서 .XLS 라면 HSSFWorkbook에 .XLSX라면 XSSFWorkbook에 각각 초기화 한다.
         */
        if (filePath.toUpperCase().endsWith(".XLS")) {
            try {
                wb = new HSSFWorkbook(fis);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
        } else if (filePath.toUpperCase().endsWith(".XLSX")) {
            try {
                wb = new XSSFWorkbook(fis);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
        }

        return wb;
	}

	public static Workbook getWorkbook(MultipartFile file) {
		Workbook wb = null;

		String fileName = file.getOriginalFilename();

        /*
         * 파일의 확장자를 체크해서 .XLS 라면 HSSFWorkbook에 .XLSX라면 XSSFWorkbook에 각각 초기화 한다.
         */
        if (fileName.toUpperCase().endsWith(".XLS")) {
            try {
                wb = new HSSFWorkbook(file.getInputStream());
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
        } else if (fileName.toUpperCase().endsWith(".XLSX")) {
            try {
                wb = new XSSFWorkbook(file.getInputStream());
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
        }

        return wb;
	}

	public static String cellValue(Cell cell) {
		String value = null;
		if (cell == null) {
			value = "";
		} else {
			if(cell.getCellType().equals(CellType.FORMULA)) {
				value = cell.getCellFormula();
			} else if(cell.getCellType().equals(CellType.NUMERIC)) {
				if (DateUtil.isCellDateFormatted(cell)) {
                	// you should change this to your application date format
                    SimpleDateFormat objSimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    value = "" + objSimpleDateFormat.format(cell.getDateCellValue());
                } else {
                    value = ""+ String.format("%.0f",new Double(cell.getNumericCellValue()));
                }
			} else if(cell.getCellType().equals(CellType.STRING)) {
				value = "" + cell.getStringCellValue();
			} else if(cell.getCellType().equals(CellType.BOOLEAN)) {
				value = "" + cell.getBooleanCellValue();
			} else if(cell.getCellType().equals(CellType.ERROR)) {
				value = "" + cell.getErrorCellValue();
			} else {
				value = "";
			}
		}
		return value.trim();
	}

	/**
	 * cell FillForegroundColorARGBHex 값 가져오기 (셀의 백그라운드 컬러)
	 * @param cell
	 * @return
	 */
	public static String getFillForegroundColorARGBHex(Cell cell) {
		String fillColorString = "";
		if(cell != null) {
			CellStyle cellStyle = cell.getCellStyle();
			if(cellStyle.getFillForegroundColorColor() != null) {
				if(cellStyle.getFillForegroundColorColor() instanceof XSSFColor) {
					XSSFColor color = (XSSFColor) cellStyle.getFillForegroundColorColor();
					byte[] rgb = null;
					byte[] argb = color.getARGB();
					if (color.hasTint()) {
						rgb = color.getRGBWithTint();
						fillColorString = String.format("%02X%02X%02X", (rgb[0]&0xFF), (rgb[1]&0xFF), (rgb[2]&0xFF));
					} else {
						rgb = color.getARGB();
						fillColorString = String.format("%02X%02X%02X", (rgb[1]&0xFF), (rgb[2]&0xFF), (rgb[3]&0xFF));
					}
				} else if(cellStyle.getFillForegroundColorColor() instanceof HSSFColor) {
					HSSFColor hssfColor = (HSSFColor) cellStyle.getFillForegroundColorColor();
				    short[] rgb = hssfColor.getTriplet();
				    fillColorString = "[" + rgb[0] + ", " + rgb[1] + ", "  + rgb[2] + "]";
				    //new Loggable().logging(fillColorString);
				    fillColorString = String.format("#%02X%02X%02X", rgb[0], rgb[1], rgb[2]);
				}
			}
		}

		return fillColorString;
	}
/*	public static String getFillForegroundColorARGBHex(Cell cell) {
		String fillColorString = "";
		if(cell != null) {
			CellStyle cellStyle = cell.getCellStyle();
			if(cellStyle.getFillForegroundColorColor() != null) {
				if(cellStyle.getFillForegroundColorColor() instanceof XSSFColor) {
					XSSFColor color = (XSSFColor) cellStyle.getFillForegroundColorColor();
					byte[] argb = color.getARGB();
					fillColorString = "[" + (argb[0]&0xFF) + ", " + (argb[1]&0xFF) + ", " + (argb[2]&0xFF) + ", " + (argb[3]&0xFF) + "]";
					if (color.hasTint()) {
						fillColorString += " * " + color.getTint();
						byte[] rgb = color.getRGBWithTint();
						fillColorString += " = [" + (argb[0]&0xFF) + ", " + (rgb[0]&0xFF) + ", " + (rgb[1]&0xFF) + ", " + (rgb[2]&0xFF) + "]" ;
						new Loggable().logging(fillColorString);
						fillColorString = String.format("%02X%02X%02X%02X", (argb[0]&0xFF), (rgb[0]&0xFF), (rgb[1]&0xFF), (rgb[2]&0xFF));
					} else {
						fillColorString = color.getARGBHex();
					}
				} else if(cellStyle.getFillForegroundColorColor() instanceof HSSFColor) {
					HSSFColor hssfColor = (HSSFColor) cellStyle.getFillForegroundColorColor();
					short[] rgb = hssfColor.getTriplet();
					fillColorString = "[" + rgb[0] + ", " + rgb[1] + ", "  + rgb[2] + "]";
					new Loggable().logging(fillColorString);
					fillColorString = String.format("#%02X%02X%02X", rgb[0], rgb[1], rgb[2]);
				}
			}
		}

		return fillColorString;
	}
*/}
