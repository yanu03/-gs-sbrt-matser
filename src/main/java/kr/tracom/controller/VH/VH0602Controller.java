package kr.tracom.controller.VH;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.VH0602.VH0602Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class VH0602Controller extends ControllerSupport {

	@Autowired
	private VH0602Service vh0602Service;

	@RequestMapping("/vh/VH0602G0R0")
	public @ResponseBody Map<String, Object> VH0602G0R0() throws Exception {
		result.setData("rows", vh0602Service.VH0602G0R0());
		return result.getResult();
	}
	
}
