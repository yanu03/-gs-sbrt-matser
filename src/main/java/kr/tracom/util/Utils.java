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
    	    put("SI0401", "BMS_ROUT_MST");
    	}};
	}
	private static void initTableToProgramNm() {
		TableToProgramNm = new HashMap<String, Object>() {{
    	    put("BMS_ROUT_NODE_CMPSTN", "노선 경로정보 관리");
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
