package kr.tracom.controller.MO;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.MO0204.MO0204Service;
import kr.tracom.support.ControllerSupport;


@Controller
@Scope("request")
public class MO0204Controller extends ControllerSupport {

	@Autowired
	private MO0204Service MO0204Service;

	@RequestMapping("/mo/MO0204G0R0")
	public @ResponseBody Map<String, Object> MO0204G0R0() throws Exception {
		result.setData("rows", MO0204Service.MO0204G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/mo/MO0204G1R0")
	public @ResponseBody Map<String, Object> MO0204G1R0() throws Exception {
		result.setData("rows", MO0204Service.MO0204G1R0());
		//result.setData("rows", MO0204Service.MO0204G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/mo/MO0204G1R1")
	public @ResponseBody Map<String, Object> MO0204G1R1() throws Exception {
		result.setData("rows", MO0204Service.MO0204G1R1());
		return result.getResult();
	}
	
	@RequestMapping("/mo/MO0204SHI1")
	public @ResponseBody Map<String, Object> MO0204SHI0() throws Exception {
		result.setData("rows", MO0204Service.MO0204SHI1());
		return result.getResult();
	}
	
	@RequestMapping("/mo/MO0204G2R0")
	public @ResponseBody Map<String, Object> MO0204G2R0() throws Exception {
		result.setData("rows", MO0204Service.MO0204G2R0());
		return result.getResult();
	}
	
}
