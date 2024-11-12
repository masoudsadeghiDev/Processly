package com.masoud.bpms.Controller;

import com.masoud.bpms.Model.Organization.User;
import com.masoud.bpms.Service.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "user")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping(path = "list")
    private ResponseEntity<?> list() {
        try {

            return ResponseEntity.ok(service.getUserList());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "info/{id}")
    private ResponseEntity<?> getOne(@PathVariable Integer id) {
        try {

            return ResponseEntity.ok(service.getUserInfo(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "changeenable/{status}/{id}")
    private ResponseEntity<?> changeEnable(@PathVariable("status") Integer status,@PathVariable("id") Integer id) {
        try {
            service.changeStatus(status, id);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "register")
    private ResponseEntity<?> register(@RequestBody Map<String, Object> userInfo) {
        try {

            return ResponseEntity.ok(service.register(userInfo));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
