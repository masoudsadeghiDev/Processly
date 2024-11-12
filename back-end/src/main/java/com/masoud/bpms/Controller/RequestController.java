package com.masoud.bpms.Controller;

import com.masoud.bpms.Service.Request.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("request")
public class RequestController {

    @Autowired
    private RequestService service;

    @GetMapping(path = "my")
    public ResponseEntity<?> getMyRequest(
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "page", defaultValue = "1") Integer page
    ) {
        return ResponseEntity.ok(service.getUserSendRequests(page, size));
    }

    @GetMapping(path = "received")
    public ResponseEntity<?> getUserReceivedRequests(
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "page", defaultValue = "1") Integer page
    ) {
        return ResponseEntity.ok(service.getUserReceivedRequests(page, size));
    }

    @GetMapping(path = "statistics")
    public ResponseEntity<?> getStatistics(
            @RequestParam(value = "app") Integer app,
            @RequestParam(value = "all", defaultValue = "false") Boolean allUser
    ) {
        return ResponseEntity.ok(service.getRequestStatistic(app, allUser));
    }
}
