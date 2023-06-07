package kr.tracom.controller.cm;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import  kr.tracom.service.cm.Rout.RoutService;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class RoutController extends ControllerSupport {

	@Autowired
	private RoutService routService;

	@RequestMapping("/rout/selectRoutItem")
	public @ResponseBody Map<String, Object> selectRoutItem() throws Exception {
		result.setData("dlt_routItem", routService.selectRoutItem());
		return result.getResult();
	}

	@RequestMapping("/rout/selectRoutList")
	public @ResponseBody Map<String, Object> selectRoutList() throws Exception {
		result.setData("dlt_BMS_ROUT_MST", routService.selectRoutList());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectRoutListWithGps")
	public @ResponseBody Map<String, Object> selectRoutListWithGps() throws Exception {
		result.setData("dlt_BMS_ROUT_MST", routService.selectRoutListWithGps());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectRoutListByRoutGrp")
	public @ResponseBody Map<String, Object> selectRoutListByRoutGrp() throws Exception {
		result.setData("dlt_BMS_ROUT_MST", routService.selectRoutListByRoutGrp());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectNodeListByRouts")
	public @ResponseBody Map<String, Object> selectNodeListByRouts() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_CMPSTN", routService.selectNodeListByRouts());
		return result.getResult();
	}
	
	
	@RequestMapping("/rout/selectNodeListByRout")
	public @ResponseBody Map<String, Object> selectNodeListByRout() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_CMPSTN", routService.selectNodeListByRout());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectNodeListByRoutGrp")
	public @ResponseBody Map<String, Object> selectNodeListByRoutGrp() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_CMPSTN", routService.selectNodeListByRoutGrp());
		return result.getResult();
	}
	

	@RequestMapping("/rout/selectNodeListByRoutGrps")
	public @ResponseBody Map<String, Object> selectNodeListByRoutGrps() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_CMPSTN", routService.selectNodeListByRoutGrps());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectNodeDispListByRouts")
	public @ResponseBody Map<String, Object> selectNodeDispListByRouts() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_DISP_VW", routService.selectNodeDispListByRouts());
		return result.getResult();
	}
	
	
	@RequestMapping("/rout/selectNodeDispListByRout")
	public @ResponseBody Map<String, Object> selectNodeDispListByRout() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_DISP_VW", routService.selectNodeDispListByRout());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectNodeDispListByRoutGrp")
	public @ResponseBody Map<String, Object> selectNodeDispListByRoutGrp() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_DISP_VW", routService.selectNodeDispListByRoutGrp());
		return result.getResult();
	}
	

	@RequestMapping("/rout/selectNodeDispListByRoutGrps")
	public @ResponseBody Map<String, Object> selectNodeDispListByRoutGrps() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_DISP_VW", routService.selectNodeDispListByRoutGrps());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectMainNodeListByRout")
	public @ResponseBody Map<String, Object> selectMainNodeListByRout() throws Exception {
		result.setData("dlt_BMS_MAIN_ROUT_NODE_INFO", routService.selectMainNodeListByRout());
		return result.getResult();
	}
		
	@RequestMapping("/rout/selectSttnList")
	public @ResponseBody Map<String, Object> selectSttnList() throws Exception {
		result.setData("dlt_BMS_STTN_MST", routService.selectSttnList());
		return result.getResult();
	}

	@RequestMapping("/rout/selectSttnItem")
	public @ResponseBody Map<String, Object> selectSttnItem() throws Exception {
		result.setData("dlt_sttnItem", routService.selectSttnItem());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectSttnCrsList")
	public @ResponseBody Map<String, Object> selectSttnCrsList() throws Exception {
		result.setData("dlt_BMS_NODE_MST", routService.selectSttnCrsList());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectSttnCrsDipsList")
	public @ResponseBody Map<String, Object> selectSttnCrsDispList() throws Exception {
		result.setData("dlt_BMS_ROUT_NODE_DISP_VW", routService.selectSttnCrsDispList());
		return result.getResult();
	}
	
	@RequestMapping("/rout/selectSttnCrsLink")
	public @ResponseBody Map<String, Object> selectSttnCrsLink() throws Exception {
		result.setData("dlt_BMS_STTNCRS_LINK_CMPSTN", routService.selectSttnCrsLink());
		return result.getResult();
	}
	
}