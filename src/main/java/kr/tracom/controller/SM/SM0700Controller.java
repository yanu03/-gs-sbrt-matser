package kr.tracom.controller.SM;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0101.SI0101Service;
import kr.tracom.service.SM0700.SM0700Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SM0700Controller extends ControllerSupport {
	
	@Autowired
	private SM0700Service sm0700Service;
	
	@RequestMapping("/sm/SM0700G0R0")
	public @ResponseBody Map<String, Object> SM0700G0R0() throws Exception {
		result.setData("dlt_SM_INTG_MST", sm0700Service.SM0700G0R0());
		return result.getResult();
	}
	
	@RequestMapping(value = "/sm/SM0700G0S0")
	public @ResponseBody Map<String, Object> SM0700G0S0() throws Exception {
		result.setData("dma_result", sm0700Service.SM0700G0S0());

		return result.getResultSave();
	}	
	
	@RequestMapping("/sm/SM0700G0K0")
	public @ResponseBody Map<String, Object> SM0700G0K0() throws Exception {
		result.setData("dma_SEQ_SM_INTG_MST_0", sm0700Service.SM0700G0K0());
		return result.getResult();
	}

	@RequestMapping("/sm/SM0700SHI0")
	public @ResponseBody Map<String, Object> SM0700SHI0() throws Exception {
		result.setData("dlt_searchItem", sm0700Service.SM0700SHI0());
		return result.getResult();
	}
}
