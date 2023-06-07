package kr.tracom.controller.cm;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import  kr.tracom.service.cm.Intg.IntgService;
import kr.tracom.support.ControllerSupport;
import kr.tracom.util.Result;

@Controller
@Scope("request")
public class IntgController extends ControllerSupport {

	@Autowired
	private IntgService intgService;
	
	@RequestMapping("/intg/selectAirconIntgList")
	public @ResponseBody Map<String, Object> selectAirconIntgList() throws Exception {
		intgService.insertIntgList();
		result.setData("dlt_BMS_INTG_AIRCON_INFO", intgService.selectAirconIntgList());
		return result.getResult();
	}
	
	@RequestMapping(value="/intg/getIntgInfo")
    public  @ResponseBody Map<String, Object> getIntgInfo() throws Exception{
		result.setData("rows", intgService.getIntgInfo());
		return result.getResult();
    }
}