package com.masoud.bpms.Controller;

import com.masoud.bpms.Model.Organization.Organization;
import com.masoud.bpms.Model.Organization.Position;
import com.masoud.bpms.Service.Organization.OrganizationService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("organization")
public class OrganizationController {

    @Autowired
    private OrganizationService service;

    @GetMapping()
    private ResponseEntity<?> list() {

        try {
            return ResponseEntity.ok(service.list());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping()
    private ResponseEntity<?> create(@RequestBody Organization organization) {

        try {
            service.create(organization);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "{subItem}/{organizationId}")
    private ResponseEntity<?> subItemList(@PathVariable String subItem, @PathVariable Integer organizationId) {

        try {
            return ResponseEntity.ok(service.subItemList(subItem, organizationId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "{subItem}/{organizationId}")
    private ResponseEntity<?> createSubItem(@RequestBody Map<String, Object> data, @PathVariable String subItem, @PathVariable Integer organizationId) {

        try {
            service.createSubItem(subItem, new JSONObject(data), organizationId);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "subItems/{organizationId}")
    private ResponseEntity<?> getAllSubItems(@PathVariable Integer organizationId) {

        try {
            return ResponseEntity.ok(service.getAllSubItemList(organizationId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "chart/{organizationId}")
    private ResponseEntity<?> getOrganChart(@PathVariable Integer organizationId) {

        try {
            return ResponseEntity.ok(service.getOrganChart(organizationId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "chart/menu/{organizationId}")
    private ResponseEntity<?> getOrganChartMenu(@PathVariable Integer organizationId) {

        try {
            return ResponseEntity.ok(service.getOrganChartMenu(organizationId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "chart/setParent")
    private ResponseEntity<?> getOrganChart(@RequestBody Map<String, Integer> body) {

        try {
            service.setParent(body.get("parentId"), body.get("id"));
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
