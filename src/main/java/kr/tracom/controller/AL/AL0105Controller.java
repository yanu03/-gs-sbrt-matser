package kr.tracom.controller.AL;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.AL0105.AL0105Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class AL0105Controller extends ControllerSupport{

	@Autowired
	private AL0105Service al0105service;
	
	@RequestMapping("/al/AL0105G1R0")
	public @ResponseBody Map<String, Object> AL0105G0R0() throws Exception {
		result.setData("dlt_BMS_DRV_MST", al0105service.AL0105G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0105G2R0")
	public @ResponseBody Map<String, Object> AL0105G2R0() throws Exception {
		result.setData("dlt_BMS_ROUT_GRP_DRV_CMPSTN", al0105service.AL0105G2R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0105G2S0")
	public @ResponseBody Map<String, Object> AL0105G2S0() throws Exception {
		Map map = al0105service.AL0105G2S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}
	
}
