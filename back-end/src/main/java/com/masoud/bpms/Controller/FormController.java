package com.masoud.bpms.Controller;

import com.masoud.bpms.Model.Form.Form;
import com.masoud.bpms.Service.Form.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "form")
public class FormController {

    @Autowired
    private FormService formService;

    @PostMapping(path = "save")
    private ResponseEntity<?> save(@RequestBody Form form) {
        formService.create(form);
        return ResponseEntity.ok("");
    }

    @GetMapping(path = "{activityId}")
    private ResponseEntity<?> get(@PathVariable Integer activityId) {
        return ResponseEntity.ok(formService.getFormByActivityId(activityId));
    }
}
