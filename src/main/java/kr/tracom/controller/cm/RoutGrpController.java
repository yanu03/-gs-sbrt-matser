package kr.tracom.controller.cm;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import  kr.tracom.service.cm.RoutGrp.RoutGrpService;
import kr.tracom.support.ControllerSupport;


@Controller
@Scope("request")
public class RoutGrpController extends ControllerSupport {

	@Autowired
	private RoutGrpService RoutGrpService;

	@RequestMapping("/repRout/selectRoutGrpItem")
	public @ResponseBody Map<String, Object> selectRoutGrpItem() throws Exception {
		result.setData("dlt_repRoutItem", RoutGrpService.selectRoutGrpItem());
		return result.getResult();
	}

	@RequestMapping("/repRout/selectRoutGrpList")
	public @ResponseBody Map<String, Object> selectRoutGrpList() throws Exception {
		result.setData("dlt_BMS_ROUT_GRP_MST", RoutGrpService.selectRoutGrpList());
		return result.getResult();
	}
	
	@RequestMapping("/repRout/selectRoutGrpListByNode")
	public @ResponseBody Map<String, Object> selectRoutGrpListByNode() throws Exception {
		result.setData("dlt_BMS_ROUT_GRP_MST", RoutGrpService.selectRoutGrpListByNode());
		return result.getResult();
	}
	
}
