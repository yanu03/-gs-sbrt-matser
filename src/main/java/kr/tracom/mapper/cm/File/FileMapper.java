package kr.tracom.mapper.cm.File;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface FileMapper {

    /**
     * 파일에 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectFileInfs(FileVO fvo) throws Exception;

    /**
     * 이미지파일을 제외한 첨부파일 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectNotImageFileInfs(FileVO fvo) throws Exception;

    /**
     * 하나의 파일에 대한 정보(속성 및 상세)를 등록한다.
     *
     * @param fvo
     * @throws Exception
     */
    public void insertFileInf(FileVO fvo) throws Exception;
    
    public void insertFileDetail(FileVO fvo) throws Exception;

    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 등록한다.
     *
     * @param fvoList
     * @throws Exception
     */
    public String insertFileInfs(List<?> fvoList) throws Exception;

    public String selectAttachId() throws Exception;
    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 수정한다.
     *
     * @param fvoList
     * @throws Exception
     */
    public void updateFileInfs(List<?> fvoList) throws Exception;

    /**
     * 여러 개의 파일을 삭제한다.
     *
     * @param fvoList
     * @throws Exception
     */
    public void deleteFileInfs(List<?> fvoList) throws Exception;

    /**
     * 하나의 파일을 삭제한다.
     *
     * @param fvo
     * @throws Exception
     */
    public void deleteFileInf(FileVO fvo) throws Exception;

    /**
     * 파일에 대한 상세정보를 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectFileInf(FileVO fvo) throws Exception;
    
    /**
     * 컨설팅 필수다운로드 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormCnt() throws Exception;
    /**
     * 테스팅 필수다운로드 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormTst() throws Exception;
    /**
     * 인증지원 필수다운로드 신청서 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut1() throws Exception;
    /**
     * 인증지원 필수다운로드 첫번째 첨부파일 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut2() throws Exception;
    /**
     * 인증지원 필수다운로드 두번째 첨부파일 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut3() throws Exception;
    /**
     * 인증지원 필수다운로드 세번째 첨부파일 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut4() throws Exception;
    /**
     * 파일 구분자에 대한 최대값을 구한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public int getMaxFileSN(FileVO fvo) throws Exception;

    /**
     * 전체 파일을 삭제한다.
     *
     * @param fvo
     * @throws Exception
     */
    public void deleteAllFileInf(FileVO fvo) throws Exception;

    /**
     * 파일명 검색에 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public Map<String, Object> selectFileListByFileNm(FileVO fvo) throws Exception;

    /**
     * 이미지 파일에 대한 목록을 조회한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectImageFileList(FileVO vo) throws Exception;

    /**
     * 비디오 파일에 대한 목록을 조회한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectVideoFileList(FileVO vo) throws Exception;
    /**
     * 파일사이즈의 합계를 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public int selectSumFileSize(String atchFileId) throws Exception;

    /**
     * 컨설팅지원서비스 신청서 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupporConsultFile() throws Exception;

    /**
     * 테스팅지원서비스 신청서 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportTestFile() throws Exception;

    /**
     * 인증지원서비스 신청서 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile() throws Exception;
    
   
    /**
     * 인증지원서비스  필수첨부파일1 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile1() throws Exception;
    
    /**
     * 인증지원서비스  필수첨부파일2 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile2() throws Exception;

    /**
     * 인증지원서비스  필수첨부파일3 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile3() throws Exception;
}
