package kr.tracom.controller.cm;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import  kr.tracom.service.cm.OperPlan.OperPlanService;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class OperPlanController extends ControllerSupport {

	@Autowired
	private OperPlanService operPlanService;
	
	@RequestMapping("/operPlan/selectOperPlanRoutList")
	public @ResponseBody Map<String, Object> selectOperPlanRoutList() throws Exception {
		result.setData("dlt_BMS_OPER_PL_ROUT_INFO", operPlanService.selectOperPlanRoutList());
		return result.getResult();
	}
	
	@RequestMapping("/operPlan/selectOperPlanRout")
	public @ResponseBody Map<String, Object> selectOperPlanRout() throws Exception {
		result.setData("dlt_BMS_OPER_PL_ROUT_INFO", operPlanService.selectOperPlanRout());
		return result.getResult();
	}
	

	@RequestMapping("/operPlan/selectOperAllocPlanNode")
	public @ResponseBody Map<String, Object> selectOperAllocPlanNode() throws Exception {
		result.setData("dlt_BMS_OPER_ALLOC_PL_NODE_INFO", operPlanService.selectOperAllocPlanNode());
		return result.getResult();
	}
	
	@RequestMapping("/operPlan/selectOperAllocRealNode")
	public @ResponseBody Map<String, Object> selectOperAllocRealNode() throws Exception {
		result.setData("dlt_BMS_OPER_ALLOC_RL_NODE_INFO", operPlanService.selectOperAllocRealNode());
		return result.getResult();	
	}
	
	@RequestMapping("/operPlan/selectOperAllocRealNodeCnt")
	public @ResponseBody Map<String, Object> selectOperAllocRealNodeCnt() throws Exception {
		result.setData("dlt_BMS_OPER_ALLOC_PL_NODE_CNT", operPlanService.selectOperAllocRealNodeCnt());
		return result.getResult();	
	}
	
	@RequestMapping("/operPlan/selectAvgOperAllocRealNode")
	public @ResponseBody Map<String, Object> selectAvgOperAllocRealNode() throws Exception {
		result.setData("dlt_BMS_OPER_ALLOC_RL_NODE_INFO", operPlanService.selectAvgOperAllocRealNode());
		return result.getResult();	
	}
	
	@RequestMapping("/operPlan/selectAvgOperAllocRealNodeCnt")
	public @ResponseBody Map<String, Object> selectAvgOperAllocRealNodeCnt() throws Exception {
		result.setData("dlt_BMS_OPER_ALLOC_PL_NODE_CNT", operPlanService.selectAvgOperAllocRealNodeCnt());
		return result.getResult();	
	}
	
	@RequestMapping("/operPlan/makeOperAllocPlNodeInfo")
	public @ResponseBody Map<String, Object> makeOperAllocPlNodeInfo() throws Exception {
		Map map = operPlanService.makeOperAllocPlNodeInfo();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	
	/*@RequestMapping("/operPlan/selectOperPlanRout2")
	public @ResponseBody Map<String, Object> selectOperPlanRout2() throws Exception {
		result.setData("dlt_BMS_OPER_PL_ROUT_INFO_ASC", operPlanService.selectOperPlanRoutAsc());
		result.setData("dlt_BMS_OPER_PL_ROUT_INFO_DESC", operPlanService.selectOperPlanRoutDesc());
		return result.getResult();
	}*/
	
	@RequestMapping("/operPlan/selectOperPlanRoutAsc")
	public @ResponseBody Map<String, Object> selectOperPlanRoutAsc() throws Exception {
		result.setData("dlt_BMS_OPER_PL_ROUT_INFO_ASC", operPlanService.selectOperPlanRoutAsc());
		return result.getResult();
	}
	
	@RequestMapping("/operPlan/selectOperPlanRoutDesc")
	public @ResponseBody Map<String, Object> selectOperPlanRoutDesc() throws Exception {
		result.setData("dlt_BMS_OPER_PL_ROUT_INFO_DESC", operPlanService.selectOperPlanRoutDesc());
		return result.getResult();
	}
	
	@RequestMapping("/operPlan/selectCourseList")
	public @ResponseBody Map<String, Object> selectCourseList() throws Exception {
		result.setData("dlt_BMS_COR_MST", operPlanService.selectCourseList());
		return result.getResult();
	}
	
	@RequestMapping("/operPlan/selectOperAllocPlanCourseList")
	public @ResponseBody Map<String, Object> selectOperAllocPlanCourseList() throws Exception {
		result.setData("dlt_BMS_OPER_ALLOC_PL_COR_DTL_INFO", operPlanService.selectOperAllocPlanCourseList());
		return result.getResult();
	}
	
	@RequestMapping("/operPlan/selectCourseDtlList")
	public @ResponseBody Map<String, Object> selectCourseDtlList() throws Exception {
		result.setData("dlt_BMS_COR_DTL_INFO", operPlanService.selectCourseDtlList());
		return result.getResult();
	}
	
	@RequestMapping("/operPlan/selectTargetCourseDtlList")
	public @ResponseBody Map<String, Object> dlt_BMS_TARGET_COR_DTL_INFO() throws Exception {
		result.setData("dlt_BMS_TARGET_COR_DTL_INFO", operPlanService.selectTargetCourseDtlList());
		return result.getResult();
	}
}