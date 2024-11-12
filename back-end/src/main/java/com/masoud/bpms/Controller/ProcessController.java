package com.masoud.bpms.Controller;

import com.masoud.bpms.Model.Bpms.Application;
import com.masoud.bpms.Model.Bpms.Process;
import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Service.BpmsNode.NodeService;
import com.masoud.bpms.Service.Process.ProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "process")
public class ProcessController {

    @Autowired
    private ProcessService service;

    @PostMapping(path = "{applicationId}")
    private ResponseEntity<?> save(@RequestBody Process process, @PathVariable Integer applicationId) {
        Application app = new Application(applicationId);
        process.setApplication(app);
        process.setStatus(ProcessStatus.PROCESS_DESIGN);
        Integer processId = service.save(process);
        Map<String, Object> map = new HashMap<>();
        map.put("id", processId);
        return ResponseEntity.ok(map);
    }

    @PostMapping(path = "xml")
    private ResponseEntity<?> saveXml(@RequestBody Process process) {
        service.saveXml(process);
        service.submitProcess(process.getId());
        return ResponseEntity.ok("");
    }

    @GetMapping
    private ResponseEntity<?> list(
            @RequestParam("appId") Integer appId,
            @RequestParam(value = "status",required = false) ProcessStatus status,
            @RequestParam(value = "justOneStatus",required = false) ProcessStatus justOneStatus) {
        List process = service.getApplicationProcessList(new Application(appId), status, justOneStatus);
        return ResponseEntity.ok(process);
    }

    @GetMapping(path = "xml/{processId}")
    private ResponseEntity<?> getXml(@PathVariable Integer processId) {
        return ResponseEntity.ok(service.getXml(processId));
    }

    @GetMapping(path = "wizard/{appId}")
    private ResponseEntity<?> getWizardProcess(@PathVariable Integer appId) {
        return ResponseEntity.ok(service.getWizardProcess(appId));
    }

    @GetMapping(path = "addToWizard/{processId}")
    private ResponseEntity<?> setAddToWizardProcess(@PathVariable Integer processId) {
        return ResponseEntity.ok(service.addToWizard(processId));
    }

    @PutMapping(path = "changeStatus")
    private ResponseEntity<?> changeStatus(@RequestBody Map<String, Object> body) {
        Integer processId = (Integer) body.get("processId");
        ProcessStatus status = ProcessStatus.valueOf((String) body.get("status"));
        service.changeStatus(processId, status);
        return ResponseEntity.ok("");
    }

}
