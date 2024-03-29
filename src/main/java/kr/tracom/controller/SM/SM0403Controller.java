package kr.tracom.controller.SM;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SM0403.SM0403Service;
import kr.tracom.service.SM0601.SM0601Service;
import kr.tracom.support.ControllerSupport;


@Controller
@Scope("request")
public class SM0403Controller extends ControllerSupport {

	@Autowired
	private SM0403Service sm0403Service;

	@RequestMapping("/sm/SM0403G0R0")
	public @ResponseBody Map<String, Object> SM0403G0R0() throws Exception {
		result.setData("rows", sm0403Service.SM0403G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/sm/SM0403SHI0")
	public @ResponseBody Map<String, Object> SM0403SHI0() throws Exception {
		result.setData("rows", sm0403Service.SM0403SHI0());
		return result.getResult();
	}
}
