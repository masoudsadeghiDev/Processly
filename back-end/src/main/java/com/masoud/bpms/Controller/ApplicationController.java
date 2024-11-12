package com.masoud.bpms.Controller;

import com.masoud.bpms.Model.Bpms.Application;
import com.masoud.bpms.Service.Application.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "application")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    @GetMapping
    private ResponseEntity<?> list(@RequestParam(required = false,defaultValue = "false") Boolean withProcess) {
        List applications;
        if (withProcess) {
            applications = service.getApplicationListWithProcess();
        } else {
            applications = service.getApplicationList();
        }
        return ResponseEntity.ok(applications);
    }

    @PostMapping
    private ResponseEntity<?> create(@RequestBody Application app) {
        service.save(app);
        return ResponseEntity.ok(true);
    }


}
