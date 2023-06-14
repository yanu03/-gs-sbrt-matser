package kr.tracom.controller.cm;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.cm.RepRout.RepRoutService;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class RepRoutController extends ControllerSupport {

	@Autowired
	private RepRoutService reproutService;

	@RequestMapping("/repRout/selectRepRoutItem")
	public @ResponseBody Map<String, Object> selectRepRoutItem() throws Exception {
		result.setData("dlt_repRoutItem", reproutService.selectRepRoutItem());
		return result.getResult();
	}

	@RequestMapping("/repRout/selectRepRoutList")
	public @ResponseBody Map<String, Object> selectRepRoutList() throws Exception {
		result.setData("dlt_BMS_ROUT_GRP_MST", reproutService.selectRepRoutList());
		return result.getResult();
	}
	
	@RequestMapping("/repRout/selectRepRoutListByNode")
	public @ResponseBody Map<String, Object> selectRepRoutListByNode() throws Exception {
		result.setData("dlt_BMS_ROUT_GRP_MST", reproutService.selectRepRoutListByNode());
		return result.getResult();
	}
	
}
