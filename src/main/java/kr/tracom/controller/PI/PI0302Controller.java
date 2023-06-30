package kr.tracom.controller.PI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.PI0302.PI0302Service;
import kr.tracom.support.ControllerSupport;


@Controller
@Scope("request")
public class PI0302Controller extends ControllerSupport {

	@Autowired
	private PI0302Service PI0302Service;

	@RequestMapping("/pi/PI0302G0R0")
	public @ResponseBody Map<String, Object> PI0302G0R0() throws Exception {
		result.setData("rows", PI0302Service.PI0302G0R0());
		return result.getResult();
	}	
	
	@RequestMapping("/pi/PI0302SHI0")
	public @ResponseBody Map<String, Object> PI0302SHI0() throws Exception {
		result.setData("rows", PI0302Service.PI0302SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/pi/PI0302G0S0")
	public @ResponseBody Map<String, Object> PI0302G0S0() throws Exception {
		Map map = PI0302Service.PI0302G0S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/pi/PI0302G1R0")
	public @ResponseBody Map<String, Object> PI0302G1R0() throws Exception {
		result.setData("rows", PI0302Service.PI0302G1R0());
		return result.getResult();
	}	
	
	@RequestMapping("/al/AL0302G0SEND")
	public @ResponseBody Map<String, Object> AL0305G0SEND() throws Exception {
		Map map = PI0302Service.AL0302G0SEND();
		result.setData("rows", map);
		return result.getResultSave();
	}	
}
