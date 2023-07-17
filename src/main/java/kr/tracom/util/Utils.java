package kr.tracom.util;

import java.io.File;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import org.apache.commons.io.FileUtils;

import ws.schild.jave.AudioAttributes;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncodingAttributes;
import ws.schild.jave.MultimediaObject;

public class Utils {
	static Map<String, Object> ProgramToTable = null;
	static Map<String, Object> TableToProgramNm = null;
	private Utils() {
		initProgramToTable();
		initTableToProgramNm();
	}
	
	private static void initProgramToTable() {
		ProgramToTable = new HashMap<String, Object>() {{
    	    put("SI0102", "BMS_TRANSCOMP_MST");
    	    put("SI0200", "BMS_VHC_MST");
    	    put("SI0102", "BMS_DRV_MST");
    	    put("VD0100", "BMS_DVC_INFO");
    	    put("SI0401", "BMS_ROUT_MST");
    	    put("SI0501", "BMS_STTN_MST");
    	    put("SI0503", "BMS_CRS_MST");
    	    put("SI0402", "BMS_ROUT_NODE_CMPSTN");
    	    put("AL0104", "BMS_ALLOC_VHC_CMPSTN");
    	    put("AL0105", "BMS_ALLOC_DRV_CMPSTN");
    	    put("AL0202", "BMS_ALLOC_OPER_MST");
    	    put("AL0202_2", "BMS_OPER_ALLOC_PL_ROUT_INFO");
    	    put("AL0203", "BMS_OPER_ALLOC_PL_NODE_INFO");
    	    put("AL0302", "BMS_ALLOC_PL_INFO");
    	}};
	}
	private static void initTableToProgramNm() {
		TableToProgramNm = new HashMap<String, Object>() {{
    	    put("BMS_ROUT_NODE_CMPSTN", "노선 경로정보 관리");
    	    put("BMS_VHC_MST", "차량 관리");
    	    put("BMS_DRV_MST", "운전자 관리");
    	    put("BMS_VHC_DVC_CMPSTN", "차내장치 정보관리");
    	    put("BMS_ROUT_COMP_CMPSTN", "노선 기초정보 관리(운수사정보)");
    	    put("BMS_ALLOC_OPER_MST", "운행계획 관리(배차정보)");
    	    put("BMS_OPER_ALLOC_PL_ROUT_INFO", "운행계획 관리(운행계획)");
    	    put("BMS_OPER_ALLOC_PL_NODE_INFO", "운행계획 세부 관리");
    	    put("BMS_ALLOC_VHC_CMPSTN", "배차별 차량 관리");
    	    put("BMS_ALLOC_DRV_CMPSTN", "배차별 운전자 관리");
    	}};
	}	
	
	public static String getProgramToTable(String progId) {
		if(ProgramToTable==null) {
			initProgramToTable();
		}
		return (String)ProgramToTable.get(progId);
	}
	
	public static String getTableToProgramNm(String table) {
		if(TableToProgramNm==null) {
			initTableToProgramNm();
		}
		return (String)TableToProgramNm.get(table);
	}
	
	public static boolean checkIe(String userAgent) {
		return userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1;
	}
	
	public static boolean checkChrome(String userAgent) {
		return userAgent.indexOf("Chrome") > -1;
	}
	
	public static boolean checkOpera(String userAgent) {
		return userAgent.indexOf("Opera") > -1;
	}
	
	public static int getAudioTotalTime(File file) throws Exception {
		AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(file);
		AudioFormat format = audioInputStream.getFormat();
		long audioFileLength = file.length();
		int frameSize = format.getFrameSize();
		float frameRate = format.getFrameRate();
		float durationInSeconds = (audioFileLength / (frameSize * frameRate));
		
		return (int)durationInSeconds;
	}
	
	public static void wavToMp3(File source, File target) throws Exception {
		AudioAttributes audio = new AudioAttributes();
		audio.setCodec("libmp3lame");
		audio.setBitRate(new Integer(128000));
		audio.setChannels(new Integer(1));
		audio.setSamplingRate(new Integer(44100));
		
		EncodingAttributes attrs = new EncodingAttributes();
		attrs.setFormat("mp3");
		attrs.setAudioAttributes(audio);
		
		Encoder encoder = new Encoder();
		encoder.encode(new MultimediaObject(source), target, attrs);
	}
	
	/*
	 * public static void createCSV(File file, String content) throws Exception {
	 * //FileUtils.writeStringToFile(file, content, Charsets.ISO_8859_1);
	 * FileUtils.writeStringToFile(file, content, Charset.forName("CP949")); }
	 */
	
	public static <T> Predicate<T> distinctByKeys(Function<? super T, ?>... keyExtractors) {
		final Map<List<?>, Boolean> seen = new ConcurrentHashMap<>();
	   
		return t -> {
			final List<?> keys = Arrays.stream(keyExtractors)
	                .map(ke -> ke.apply(t))
	                .collect(Collectors.toList());
	     
			return seen.putIfAbsent(keys, Boolean.TRUE) == null;
		};
	}
}
