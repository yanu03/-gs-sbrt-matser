package kr.tracom.controller.cm;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


import kr.tracom.service.cm.File.EgovFileMngUtil;
import kr.tracom.service.cm.File.FileService;
import kr.tracom.mapper.cm.File.FileVO;
import kr.tracom.support.ControllerSupport;
import kr.tracom.util.CommonUtil;

@Controller
@Scope("request")
public class FileController extends ControllerSupport {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name = "EgovFileMngUtil")
	private EgovFileMngUtil fileUtil;
	
	@Autowired
	private FileService fileService;	
	
	//private EgovFileMngService fileMngService;
	
//	@Resource(name = "fileService")
//	FileService fileService;
	
	@PostMapping("/cm/fileUploadAction")
	public @ResponseBody Map<String, Object> fileUploadAction(MultipartHttpServletRequest multiRequest) {
		try {
			String path = (String)multiRequest.getParameter("path");
			if(CommonUtil.empty(path)) {
				path = "FILE";
			}
			String atchFileId = (String)multiRequest.getParameter("attach_id");
			
			List<FileVO> resultValue = null;
			//fileService.uploadFile(multiRequest);
			
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
		    //  List<FileVO> resultValue = null;
		      //String atchFileId = "";
		      
		      if (!files.isEmpty()) {
		         //result =fileUtil.parseFileInf(files, "BBS_", 0, "", "NOTICE");
		         //atchFileId = fileMngService.insertFileInfs(result);
//		         String checkResult = fileUtil.checkUploadFile(files,"NOTICE");
		         String checkResult = fileUtil.checkUploadFile(files,path,0);
		           if(checkResult.contains("fail"))
		           {
//		              redirectAttr.addFlashAttribute("resultMsg", checkResult);
//		             if(request.getRequestURI().contains("/admin/"))
//		             {
//		                return "redirect:/admin/information/notice/addBoardArticle.do";
//		             }
//		             else
//		             {      
//		                return "redirect:/information/notice/addBoardArticle.do";
//		             }
		           }
		           if(CommonUtil.empty(checkResult)) {
		        	   resultValue = fileUtil.parseFileInf(files, "FILE_", 0, atchFileId, path);
		           }
		           else {
		        	   resultValue = fileUtil.parseFileInf(files, "FILE_", 0, atchFileId, path);
		           }
		           //atchFileId = fileMngService.insertFileInfs(result);   
		           atchFileId = fileService.insertFileInfs(resultValue);  
		           result.setData("rows", resultValue);
		           result.setMsg(result.STATUS_SUCESS, "Read rows");
		      }
		      
		      
		      //board.setAtchFileId(atchFileId);		
			
		} catch(Exception e) {
			if (logger.isErrorEnabled()) {
				logger.error("#Exception Message : {}", e.getMessage());
			}
		}
		
		return result.getResult();
	}	
	
	  @SuppressWarnings("resource")
	   @RequestMapping("/cmm/fms/getImage.do")
	    public void getImageInf(/* todo SessionVO sessionVO, */ ModelMap model, @RequestParam Map<String, Object> commandMap, HttpServletResponse response) throws Exception {

	      //@RequestParam("atchFileId") String atchFileId,
	      //@RequestParam("fileSn") String fileSn,
	      String atchFileId = (String)commandMap.get("atchFileId");
	      String fileSn = (String)commandMap.get("fileSn");

	      FileVO vo = new FileVO();

	      vo.setAtchFileId(atchFileId);
	      vo.setFileSn(fileSn);

	      //FileVO fvo = fileMngService.selectFileInf(vo);
	      FileVO fvo = fileService.selectFileInf(vo);

	      //String fileLoaction = fvo.getFileStreCours() + fvo.getStreFileNm();

	      File file = new File(fvo.getFileStreCours(), fvo.getStreFileNm());
	      FileInputStream fis = null;
	      new FileInputStream(file);

	      BufferedInputStream in = null;
	      ByteArrayOutputStream bStream = null;
	      try{
	         fis = new FileInputStream(file);
	         in = new BufferedInputStream(fis);
	         bStream = new ByteArrayOutputStream();
	         int imgByte;
	         while ((imgByte = in.read()) != -1) {
	             bStream.write(imgByte);
	         }

	         String type = "";

	         if (fvo.getFileExtsn() != null && !"".equals(fvo.getFileExtsn())) {
	             if ("jpg".equals(fvo.getFileExtsn().toLowerCase())) {
	            type = "image/jpeg";
	             } else {
	            type = "image/" + fvo.getFileExtsn().toLowerCase();
	             }
	             type = "image/" + fvo.getFileExtsn().toLowerCase();

	         } else {
	        	 logger.debug("Image fileType is null.");
	         }

	         response.setHeader("Content-Type", type);
	         response.setContentLength(bStream.size());

	         bStream.writeTo(response.getOutputStream());

	         response.getOutputStream().flush();
	         response.getOutputStream().close();


	      }catch(Exception e){
	         logger.debug("{}", e);
	      }finally{
	         if (bStream != null) {
	            try {
	               bStream.close();
	            } catch (Exception est) {
	            	logger.debug("IGNORED: {}", est.getMessage());
	            }
	         }
	         if (in != null) {
	            try {
	               in.close();
	            } catch (Exception ei) {
	            	logger.debug("IGNORED: {}", ei.getMessage());
	            }
	         }
	         if (fis != null) {
	            try {
	               fis.close();
	            } catch (Exception efis) {
	            	logger.debug("IGNORED: {}", efis.getMessage());
	            }
	         }
	      }
	    }	
	
	  
	  @SuppressWarnings("resource")
      @RequestMapping("/cmm/fms/getThumbImage.do")
       public void getThumbImage(/* todo SessionVO sessionVO, */ ModelMap model, @RequestParam Map<String, Object> commandMap, HttpServletResponse response) throws Exception {

         //@RequestParam("atchFileId") String atchFileId,
         //@RequestParam("fileSn") String fileSn,
         String atchFileId = (String)commandMap.get("atchFileId");
         String fileSn = (String)commandMap.get("fileSn");

         FileVO vo = new FileVO();

         vo.setAtchFileId(atchFileId);
         vo.setFileSn(fileSn);

         //FileVO fvo = fileMngService.selectFileInf(vo);
         FileVO fvo = fileService.selectFileInf(vo);

         //String fileLoaction = fvo.getFileStreCours() + fvo.getStreFileNm();

         File file = new File(fvo.getFileStreCours(), fvo.getStreFileNm()+"thumb.png");
         if(file.isFile()==false) {
            file = new File(fvo.getFileStreCours(), fvo.getStreFileNm()+"thumb.jpeg");
            if(file.isFile()==false) {
               file = new File(fvo.getFileStreCours(), fvo.getStreFileNm()+"thumb.jpg");
               if(file.isFile()==false) {
                     file = new File(fvo.getFileStreCours(), fvo.getStreFileNm()+"thumb.PNG");
                     if(file.isFile()==false) {
                           file = new File(fvo.getFileStreCours(), fvo.getStreFileNm()+"thumb.JPEG");
                           if(file.isFile()==false) {
                                 file = new File(fvo.getFileStreCours(), fvo.getStreFileNm()+"thumb.JPG");
                              }
                        }
                  }
            }
         }
         
         FileInputStream fis = null;
         new FileInputStream(file);

         BufferedInputStream in = null;
         ByteArrayOutputStream bStream = null;
         try{
            fis = new FileInputStream(file);
            in = new BufferedInputStream(fis);
            bStream = new ByteArrayOutputStream();
            int imgByte;
            while ((imgByte = in.read()) != -1) {
                bStream.write(imgByte);
            }

            String type = "";

            if (fvo.getFileExtsn() != null && !"".equals(fvo.getFileExtsn())) {
                if ("jpg".equals(fvo.getFileExtsn().toLowerCase())) {
               type = "image/jpeg";
                } else {
               type = "image/" + fvo.getFileExtsn().toLowerCase();
                }
                type = "image/" + fvo.getFileExtsn().toLowerCase();

            } else {
            	logger.debug("Image fileType is null.");
            }

            response.setHeader("Content-Type", type);
            response.setContentLength(bStream.size());

            bStream.writeTo(response.getOutputStream());

            response.getOutputStream().flush();
            response.getOutputStream().close();


         }catch(Exception e){
            logger.debug("{}", e);
         }finally{
            if (bStream != null) {
               try {
                  bStream.close();
               } catch (Exception est) {
            	   logger.debug("IGNORED: {}", est.getMessage());
               }
            }
            if (in != null) {
               try {
                  in.close();
               } catch (Exception ei) {
            	   logger.debug("IGNORED: {}", ei.getMessage());
               }
            }
            if (fis != null) {
               try {
                  fis.close();
               } catch (Exception efis) {
            	   logger.debug("IGNORED: {}", efis.getMessage());
               }
            }
         }
       }
	  
}
