package kr.tracom.service.cm.File;

import java.io.File;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.tracom.mapper.cm.File.FileMapper;
import kr.tracom.mapper.cm.File.FileVO;
import kr.tracom.support.ServiceSupport;
import kr.tracom.util.CommonUtil;

@Service
public class FileService extends ServiceSupport {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private FileMapper fileMapper;
	
	public void uploadFile(MultipartHttpServletRequest multiRequest) throws Exception {
		
		Map<String, MultipartFile> files = multiRequest.getFileMap();
		
		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
		
		MultipartFile mFile;
		
		String filePath = "C:\\FileUpload";
		
		String saveFileName = "", savaFilePath = "";
		
		while(itr.hasNext()) {
			Entry<String, MultipartFile> entry = itr.next();
			
			mFile = entry.getValue();
			
			String fileName = mFile.getOriginalFilename();
			
			String fileCutName = fileName.substring(0, fileName.lastIndexOf("."));
			
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1);
			
			String saveFilePath = filePath + File.separator + fileName;
			
			File fileFolder = new File(filePath);
			
			if (!fileFolder.exists()) {
				if(fileFolder.mkdir()) {
					logger.info("[file.mkdirs] : Success");
				} else {
					logger.error("[file.mkdirs] : Fail");
				}
			}
			
			File saveFile = new File(saveFilePath);
			
			
			if(saveFile.isFile()) {
				boolean _exist = true;
				
				int index = 0;
				
				while (_exist) {
					index++;
					
					saveFileName = fileCutName + "(" + index + ")." + fileExt;
					
					String dictFile = filePath + File.separator + saveFileName;
					
					_exist = new File(dictFile).isFile();
					
					if(!_exist) {
						savaFilePath = dictFile;
					}
				}
				mFile.transferTo(new File(savaFilePath));
			} else {
				mFile.transferTo(saveFile);
			}
			
		}
	}
	
//	
//	public void getFileDownload(FileVO fvo, 
//	          HttpServletRequest request, 
//	          HttpServletResponse response) throws Exception {
//	       
//	       String fileExt = fvo.getFileExtsn();
//	       
//	       if(fileExt.equalsIgnoreCase("bat")||fileExt.equalsIgnoreCase("sh")||fileExt.equalsIgnoreCase("exe")){
//	          fvo.setFileNm(fvo.getFileNm()+"."+fileExt);
//	       }
//	       
//	       File uFile = new File(fvo.getFilePath(), fvo.getFileNm());
//	       int fSize = (int)uFile.length();
//
//	       if (fSize > 0) {
//	         String mimetype = "application/x-msdownload"; 
//	         //response.setBufferSize(fSize);   // OutOfMemeory 발생
//	         response.setContentType(mimetype);
//	         //response.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(fvo.getOriginalFileNm(), "utf-8") + "\"");
//	         setDisposition(fvo.getOriginalFileNm(), request, response);
//	         response.setContentLength(fSize);
//	 
//	         BufferedInputStream in = null;
//	         BufferedOutputStream out = null;
//	   
//	         try {
//	             in = new BufferedInputStream(new FileInputStream(uFile));
//	             out = new BufferedOutputStream(response.getOutputStream());
//	   
//	             FileCopyUtils.copy(in, out);
//	             out.flush();
//	         } catch (Exception ex) {
//	             //ex.printStackTrace();
//	             // 다음 Exception 무시 처리
//	             // Connection reset by peer: socket write error
//	        	 logger.debug("IGNORED: " + ex.getMessage());
//	         } finally {
//	             if (in != null) {
//	               try { in.close(); } 
//	               catch (Exception ignore) { logger.debug("IGNORED: " + ignore.getMessage()); }
//	             }
//	             if (out != null) {
//	               try { out.close(); } 
//	               catch (Exception ignore) { logger.debug("IGNORED: " + ignore.getMessage()); }
//	             }
//	         } 
//	       } else {
//	          setDownloadFail(fvo.getOriginalFileNm(), request, response); 
//	       }
//	    }	
//	
//	
	
	   /**
     * 파일에 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectFileInfs(FileVO fvo) throws Exception{
    	return fileMapper.selectFileInfs(fvo);
    };

    /**
     * 이미지파일을 제외한 첨부파일 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectNotImageFileInfs(FileVO fvo) throws Exception{
    	return fileMapper.selectNotImageFileInfs(fvo);
    };

    /**
     * 하나의 파일에 대한 정보(속성 및 상세)를 등록한다.
     *
     * @param fvo
     * @throws Exception
     */
    public void insertFileInf(FileVO fvo) throws Exception{
    	fileMapper.insertFileInf(fvo);
    };

    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 등록한다.
     *
     * @param fvoList
     * @throws Exception
     */
    public String insertFileInfs(List<FileVO> fvoList) throws Exception{
    	String atchFileId = "";
    	
    	for(FileVO fvo:fvoList) {
	    	if (fvoList.size() != 0) {
	    		if(CommonUtil.empty(fvo.getAtchFileId())){
	    			atchFileId = fileMapper.selectAttachId();
	    			fvo.setAtchFileId(atchFileId);
	    		}
	    		else {
	    			atchFileId = fvo.getAtchFileId();
	    		}
	    		
	    	    fileMapper.insertFileInf(fvo);
	    	    fileMapper.insertFileDetail(fvo);
	    	}
    	}
    	if(atchFileId.equals("")){
    		atchFileId = null;
    	}
    	return atchFileId;
    	
    };

    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 수정한다.
     *
     * @param fvoList
     * @throws Exception
     */
    public void updateFileInfs(List<?> fvoList) throws Exception{
    	fileMapper.updateFileInfs(fvoList);
    };

    /**
     * 여러 개의 파일을 삭제한다.
     *
     * @param fvoList
     * @throws Exception
     */
    public void deleteFileInfs(List<?> fvoList) throws Exception{
    	fileMapper.deleteFileInfs(fvoList);
    };

    /**
     * 하나의 파일을 삭제한다.
     *
     * @param fvo
     * @throws Exception
     */
    public void deleteFileInf(FileVO fvo) throws Exception{
    	fileMapper.deleteFileInf(fvo);
    };

    /**
     * 파일에 대한 상세정보를 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectFileInf(FileVO fvo) throws Exception{
    	return fileMapper.selectFileInf(fvo);
    };
    
    /**
     * 컨설팅 필수다운로드 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormCnt() throws Exception{
    	return fileMapper.selectAppFormCnt();
    };
    /**
     * 테스팅 필수다운로드 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormTst() throws Exception{
    	return fileMapper.selectAppFormTst();
    };
    /**
     * 인증지원 필수다운로드 신청서 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut1() throws Exception{
    	return fileMapper.selectAppFormAut1();
    };
    /**
     * 인증지원 필수다운로드 첫번째 첨부파일 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut2() throws Exception{
    	return fileMapper.selectAppFormAut2();
    };
    /**
     * 인증지원 필수다운로드 두번째 첨부파일 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut3() throws Exception{
    	return fileMapper.selectAppFormAut3();
    };
    /**
     * 인증지원 필수다운로드 세번째 첨부파일 파일을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public FileVO selectAppFormAut4() throws Exception{
    	return fileMapper.selectAppFormAut4();
    };
    /**
     * 파일 구분자에 대한 최대값을 구한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public int getMaxFileSN(FileVO fvo) throws Exception{
    	return fileMapper.getMaxFileSN(fvo);
    };

    /**
     * 전체 파일을 삭제한다.
     *
     * @param fvo
     * @throws Exception
     */
    public void deleteAllFileInf(FileVO fvo) throws Exception{
    	fileMapper.deleteAllFileInf(fvo);
    };

    /**
     * 파일명 검색에 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public Map<String, Object> selectFileListByFileNm(FileVO fvo) throws Exception{
    	return fileMapper.selectFileListByFileNm(fvo);
    };

    /**
     * 이미지 파일에 대한 목록을 조회한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectImageFileList(FileVO vo) throws Exception{
    	return fileMapper.selectImageFileList(vo);
    };

    /**
     * 비디오 파일에 대한 목록을 조회한다.
     *
     * @param vo
     * @return
     * @throws Exception
     */
    public List<FileVO> selectVideoFileList(FileVO vo) throws Exception{
    	return fileMapper.selectVideoFileList(vo);
    };
    /**
     * 파일사이즈의 합계를 조회한다.
     *
     * @param fvo
     * @return
     * @throws Exception
     */
    public int selectSumFileSize(String atchFileId) throws Exception{
    	return fileMapper.selectSumFileSize(atchFileId);
    };

    /**
     * 컨설팅지원서비스 신청서 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupporConsultFile() throws Exception{
    	return fileMapper.getSupporConsultFile();
    };

    /**
     * 테스팅지원서비스 신청서 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportTestFile() throws Exception{
    	return fileMapper.getSupportTestFile();
    };

    /**
     * 인증지원서비스 신청서 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile() throws Exception{
    	return fileMapper.getSupportAttestFile();
    };
    
   
    /**
     * 인증지원서비스  필수첨부파일1 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile1() throws Exception{
    	return fileMapper.getSupportAttestFile1();
    };
    
    /**
     * 인증지원서비스  필수첨부파일2 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile2() throws Exception{
    	return fileMapper.getSupportAttestFile2();
    };

    /**
     * 인증지원서비스  필수첨부파일3 양식 파일 정보 조회
     *
     * @param 
     * @return
     * @throws Exception
     */
    public String getSupportAttestFile3() throws Exception{
    	return fileMapper.getSupportAttestFile3();
    };	
	
}
