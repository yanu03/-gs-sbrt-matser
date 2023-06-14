package kr.tracom.controller.VD;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.VD0100.VD0100Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class VD0100Controller extends ControllerSupport {

	@Autowired
	private VD0100Service vd0100Service;
	
	/*@RequestMapping("/vd/VD0100G0R0")
	public @ResponseBody Map<String, Object> VD0100G0R0() throws Exception {
		result.setData("dlt_BMS_VHC_MST", vd0100Service.VD0100G0R0());
		return result.getResult();
	}*/
	
	@RequestMapping("/vd/VD0100SHI0")
	public @ResponseBody Map<String, Object> VD0100SHI0() throws Exception {
		result.setData("dlt_searchitem", vd0100Service.VD0100SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100SHI1")
	public @ResponseBody Map<String, Object> VD0100SHI1() throws Exception {
		result.setData("dlt_searchitem2", vd0100Service.VD0100SHI1());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100G0R0")
	public @ResponseBody Map<String, Object> VD0100G0R0() throws Exception {
		result.setData("dlt_BMS_DVC_INFO", vd0100Service.VD0100G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100G0K0")
	public @ResponseBody Map<String, Object> VD0100G0K0() throws Exception {
		result.setData("dma_SEQ_BMS_DVC_INFO_0", vd0100Service.VD0100G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100G0S0")
	public @ResponseBody Map<String, Object> VD0100G0S0() throws Exception {
		Map map = vd0100Service.VD0100G0S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}	
	
}