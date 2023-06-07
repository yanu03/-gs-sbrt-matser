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

import  kr.tracom.service.cm.Drv.DrvService;
import  kr.tracom.service.cm.Rout.RoutService;
import kr.tracom.support.ControllerSupport;
import kr.tracom.util.Result;

@Controller
@Scope("request")
public class DrvController extends ControllerSupport {

	@Autowired
	private DrvService drvService;
	
	@RequestMapping("/drv/selectAllocDrvList")
	public @ResponseBody Map<String, Object> selectAllocDrvList() throws Exception {
		result.setData("dlt_BMS_DRV_MST", drvService.selectAllocDrvList());
		return result.getResult();
	}

}