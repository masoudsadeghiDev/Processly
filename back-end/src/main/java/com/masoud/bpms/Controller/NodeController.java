package com.masoud.bpms.Controller;

import com.masoud.bpms.Service.BpmsNode.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("node")
public class NodeController {

    @Autowired
    private NodeService nodeService;

    @GetMapping(path = "byDiagramID/{diagramId}")
    private ResponseEntity<?> getWizardProcess(@PathVariable String diagramId) {
        return ResponseEntity.ok(nodeService.getNodeByDiagramId(diagramId));
    }

    @GetMapping(path = "next/byDiagramID/{diagramId}")
    private ResponseEntity<?> getNextNode(@PathVariable String diagramId) {
        return ResponseEntity.ok(nodeService.getNextNodeByDiagramId(diagramId));
    }

    @GetMapping(path = "flow/next/byDiagramID/{diagramId}")
    private ResponseEntity<?> getFlowNextNode(@PathVariable String diagramId) {
        return ResponseEntity.ok(nodeService.getFlowNextNodeByDiagramId(diagramId));
    }

    @GetMapping(path = "flow/connectedToGateway/{diagramId}")
    private ResponseEntity<?> connectedToGateway(@PathVariable String diagramId) {
        return ResponseEntity.ok(nodeService.connectedToGateway(diagramId));
    }

    @GetMapping(path = "test")
    private ResponseEntity<?> test() {
        return ResponseEntity.ok(nodeService.getCurrentStatus(11,100));
    }

    @PostMapping(path = "flow/setCondition")
    private ResponseEntity<?> setFlowCondition(@RequestBody Map<String, Object> body) {
        try {
            nodeService.setArrowCondition((Integer) body.get("flowId"), (String) body.get("condition"));
            return ResponseEntity.ok("");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

