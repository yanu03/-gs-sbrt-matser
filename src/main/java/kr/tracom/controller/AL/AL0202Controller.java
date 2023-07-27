package kr.tracom.controller.AL;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.tracom.service.AL0202.AL0202Service;
import kr.tracom.service.cm.Excel.ExcelUpload;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class AL0202Controller extends ControllerSupport {

   @Autowired
   private AL0202Service al0202Service;
   
   @Autowired
   private ExcelUpload excelUploadService;
   
   @RequestMapping("/AL/AL0202G0R0")
   public @ResponseBody Map<String, Object> AL0202G0R0() throws Exception {
      result.setData("rows", al0202Service.AL0202G0R0());
      return result.getResult();
   }
   
   @RequestMapping("/AL/AL0202G0R1")
   public @ResponseBody Map<String, Object> AL0202G0R1() throws Exception {
	   result.setData("rows", al0202Service.AL0202G0R1());
	   return result.getResult();
   }
   
   @RequestMapping("/AL/AL0202G1R0")
   public @ResponseBody Map<String, Object> AL0301G1R0() throws Exception {
      result.setData("rows", al0202Service.AL0202G1R0());
      //result.setData("dlt_OPER_ALLOC_PL_ROUT_CNT", al0202Service.AL0202G1CNT());
      return result.getResult();
   }

   @RequestMapping("/AL/AL0202G1R0_CNT")
   public @ResponseBody Map<String, Object> AL0202G1R0_CNT() throws Exception {
      result.setData("rows", al0202Service.AL0202G1CNT());
      return result.getResult();
   }
   
   @RequestMapping("/AL/AL0202P0R0")
   public @ResponseBody Map<String, Object> AL0202P0R0() throws Exception {
      result.setData("rows", al0202Service.AL0202P0R0());
      return result.getResult();
   }
   
   @RequestMapping("/AL/AL0202P0R1")
   public @ResponseBody Map<String, Object> AL0202P0R1() throws Exception {
      result.setData("rows", al0202Service.AL0202P0R1());
      return result.getResult();
   }
   
   @RequestMapping("/AL/selectCorCnt")
   public @ResponseBody Map<String, Object> selectCorCnt() throws Exception {
      result.setData("rows", al0202Service.selectCorCnt());
      return result.getResult();
   }

   @RequestMapping("/al/AL0202G0S0")
   public @ResponseBody Map<String, Object> AL0202G0S0() throws Exception {
      Map map = al0202Service.AL0202G0S0();
      result.setData("rows", map);
      return result.getResultSave();
   }   
   
   @RequestMapping("/al/AL0202G1S0")
   public @ResponseBody Map<String, Object> AL0202G1S0() throws Exception {
      Map map = al0202Service.AL0202G1S0();
      result.setData("rows", map);
      return result.getResultSave();
   }   
   
   @RequestMapping("/AL/AL0202G0K0")
   public @ResponseBody Map<String, Object> AL0202G0K0() throws Exception {
      result.setData("rows", al0202Service.AL0202G0K0());
      return result.getResult();
   }

//	 SN�� INSERT�Ҷ� �����ϴ°ɷ� ����   
//   @RequestMapping("/AL/AL0202G1K0")
//   public @ResponseBody Map<String, Object> AL0202G1K0() throws Exception {
//      result.setData("rows", al0202Service.AL0202G1K0());
//      return result.getResult();
//   }
   
   /*@RequestMapping("/AL/AL0202G1CNT")
   public @ResponseBody Map<String, Object> AL0202G1CNT() throws Exception {
      result.setData("dlt_OPER_ALLOC_PL_ROUT_CNT", al0202Service.AL0202G1CNT());
      return result.getResult();
   }*/
   
   @RequestMapping("/al/AL0202G1_exlDownload")
    public String  AL0202G0_exlDownload(HttpServletRequest req , Model model) throws Exception {
	   String allocId = req.getParameter("param");
	   String[] getValues = {"ALLOC_NO","ALLOC_ID", "ROUT_ID", "ROUT_NM", "WAY_DIV", "WAY_DIV_NM", "ROUT_ST_TM", "ROUT_ED_TM", "SN"};
	   String[] headerTitle = {"������ȣ", "����ID", "�뼱ID", "�뼱��", "�����౸��", "�����౸�� ��", "���۽ð�(�ú�)", "����ð�(�ú�)", "����"};
      
	   model.addAttribute("title", "�����ȹ����");
	   model.addAttribute("headerTitle", headerTitle);
	   model.addAttribute("getValues", getValues);
	   model.addAttribute("excelList", al0202Service.AL0202G1_exlDownload(allocId));
	   return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
   }
   
   
   @RequestMapping("/al/AL0202G1_exlUpload")
    public @ResponseBody  Map<String, Object> AL0202G1_exlUpload(@RequestParam("excelinputfile")MultipartFile file) throws Exception {

      String[] getValues = {"ALLOC_NO",  "ALLOC_ID", "ROUT_ID", "ROUT_NM", "WAY_DIV", "WAY_DIV_NM", 
    		  "ROUT_ST_TM","ROUT_ED_TM", "SN", "DRV_ID", "VHC_ID",  "COR_ID", "REST_TM", "OPER_SN" };
   
      
      List<Map<String, Object>> list = excelUploadService.excelToList(file, getValues);
      List<Map<String, Object>> resultList = al0202Service.AL0202G1_exlUpload(list);
      
      result.setData("rows", resultList);
      
      return result.getResult();
   }
}