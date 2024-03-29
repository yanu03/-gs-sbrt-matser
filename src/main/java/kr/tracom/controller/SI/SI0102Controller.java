package kr.tracom.controller.SI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0102.SI0102Service;
import kr.tracom.support.ControllerSupport;


@Controller
@Scope("request")
public class SI0102Controller extends ControllerSupport{

	@Autowired
	private SI0102Service si0102Service;
	
	@RequestMapping("/si/SI0102G0R0")
	public @ResponseBody Map<String, Object> SI0102G0R0() throws Exception {
		result.setData("rows", si0102Service.SI0102G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0102G0K0")
	public @ResponseBody Map<String, Object> SI0102G0R1() throws Exception {
		result.setData("dma_SEQ_BMS_TRANSCOMP_MST_0", si0102Service.SI0102G0K0());
		return result.getResult();
	}

	@RequestMapping("/si/SI0102SHI0")
	public @ResponseBody Map<String, Object> SI0102G0R2() throws Exception {
		result.setData("dlt_transcompSearchItem", si0102Service.SI0102SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0102G1R0")
	public @ResponseBody Map<String, Object> SI0102G1R0() throws Exception {
		result.setData("dlt_BMS_GRG_MST", si0102Service.SI0102G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0102P0R0")
	public @ResponseBody Map<String, Object> SI0102G2R0() throws Exception {
		result.setData("rows", si0102Service.SI0102P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0102G0S0")
	public @ResponseBody Map<String, Object> SI0102G0S0() throws Exception {
		Map map = si0102Service.SI0102G0S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0102G1S0")
	public @ResponseBody Map<String, Object> SI0102G1S0() throws Exception {
		Map map = si0102Service.SI0102G1S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}		
	
}
