package com.masoud.bpms.Controller;

import com.masoud.bpms.Exception.AuthException;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.ProcessEntity;
import com.masoud.bpms.Model.Organization.User;
import com.masoud.bpms.Service.Auth.AuthService;
import com.masoud.bpms.Service.BpmsNode.NodeService;
import com.masoud.bpms.Service.Entity.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping(path = "login")
    private ResponseEntity<?> login(@RequestBody User body) {

        try {
            return ResponseEntity.ok(service.login(body));
        } catch (AuthException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("username or password incorrect");
        }
    }


    @PostMapping(path = "signup")
    private ResponseEntity<?> signup(@RequestBody User body) {
        try {
            return ResponseEntity.ok(service.signup(body));
        } catch (AuthException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("user exist");
        }
    }

}
