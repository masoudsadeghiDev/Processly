package com.masoud.bpms.Controller;

import com.masoud.bpms.Service.Task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping(path = "filter")
    private ResponseEntity<?> addFilter(@RequestBody Map<String, Object> body) {
        taskService.addFilter(body);
        return ResponseEntity.ok("");
    }


    @GetMapping(path = "canCreate")
    private ResponseEntity<?> getTaskUserCanStart() {
        return ResponseEntity.ok(taskService.getTaskUserCanCreate());
    }

    @GetMapping(path = "form/{activityId}")
    private ResponseEntity<?> getTaskForm(@PathVariable("activityId") Integer activityId) {
        return ResponseEntity.ok(taskService.getTaskForm(activityId));
    }


}
