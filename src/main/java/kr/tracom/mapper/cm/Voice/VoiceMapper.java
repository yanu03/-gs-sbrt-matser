package kr.tracom.mapper.cm.Voice;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VoiceMapper {
	int checkVoiceOrganization(String vocId);
	List<Map<String, Object>> selectTtsHelp();
}
