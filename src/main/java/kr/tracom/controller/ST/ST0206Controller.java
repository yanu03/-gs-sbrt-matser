package kr.tracom.controller.ST;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.ST0206.ST0206Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class ST0206Controller extends ControllerSupport {

	@Autowired
	private ST0206Service st0206Service;
	
	@RequestMapping("/st/ST0206G0R0")
	public @ResponseBody Map<String, Object> ST0206G0R0() throws Exception {
		result.setData("rows", st0206Service.ST0206G0R0());
		//st0206Service.ST0206PROC();
		return result.getResult();
	}
	
	@RequestMapping("/st/ST0206G1R0")
	public @ResponseBody Map<String, Object> ST0206G1R0() throws Exception {
		result.setData("rows", st0206Service.ST0206G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/st/ST0206G1R1")
	public @ResponseBody Map<String, Object> ST0206G1R1() throws Exception {
		result.setData("rows", st0206Service.ST0206G1R1());
		return result.getResult();
	}
	
}
