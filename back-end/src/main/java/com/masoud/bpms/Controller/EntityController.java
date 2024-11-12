package com.masoud.bpms.Controller;

import com.masoud.bpms.Model.Bpms.BpmsDataModel.Attribute;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.AttributeType;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.EntityType;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.ProcessEntity;
import com.masoud.bpms.Model.Bpms.Process;
import com.masoud.bpms.Service.Entity.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Attr;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "entity")
public class EntityController {
    @Autowired
    private EntityService service;

    @PostMapping(path = "{processId}")
    public ResponseEntity<?> save(@RequestBody ProcessEntity entity, @PathVariable Integer processId) {
        try {
            entity.setProcess(new Process(processId));
            if (entity.getEntityType() == EntityType.PARAMETER) {
                Attribute value = new Attribute();
                value.setName("value");
                value.setDisplayName("value");
                value.setPrimitiveType("string");
                value.setType(AttributeType.PRIMITIVE);
                entity.setAttributes(Arrays.asList(value));
            }
            service.save(entity);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "bulk")
    public ResponseEntity<?> bulkSave(@RequestBody List<ProcessEntity> entities) {
        try {
            service.bulkSave(entities);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "data/first")
    public ResponseEntity<?> save(@RequestBody Map input) {
        try {
            if (!input.containsKey("currentStatus")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            service.saveData(input);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "data")
    public ResponseEntity<?> updateData(@RequestBody Map input) {
        try {
            if (!input.containsKey("requestId")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            service.updateData(input);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "submit")
    public ResponseEntity<?> submit(@RequestParam Integer processId) {
        try {
            service.submit(processId);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping(path = "{id}")
    public ResponseEntity<?> findOne(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.getOne(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping(path = "list/{processId}")
    public ResponseEntity<?> findList(@PathVariable Integer processId) {
        try {
            return ResponseEntity.ok(service.getList(processId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping(path = "list/form-design/{processId}")
    public ResponseEntity<?> getEntityListForFormDesign(@PathVariable Integer processId) {
        try {
            return ResponseEntity.ok(service.getEntityListForFormDesign(processId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping(path = "list/rule-design/{processId}")
    public ResponseEntity<?> getEntityListForRuleDesign(@PathVariable Integer processId) {
        try {
            return ResponseEntity.ok(service.getEntityListForRuleDesign(processId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping(path = "/data/{id}/{dataId}")
    public ResponseEntity<?> findOneData(@PathVariable Integer id, @PathVariable Integer dataId) {
        try {
            return ResponseEntity.ok(service.getOneData(id, dataId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "/data/last/{processId}/{requestId}")
    public ResponseEntity<?> findLastData(@PathVariable Integer processId, @PathVariable Integer requestId) {
        try {
            return ResponseEntity.ok(service.getLastData(processId, requestId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping(path = "/data/{id}")
    public ResponseEntity<?> findAllData(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.getAllData(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "connect/{source}/{target}")
    public ResponseEntity<?> connect(@PathVariable Integer source, @PathVariable Integer target) {
        try {
            service.connect(source, target);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "attribute/{entityId}")
    public ResponseEntity<?> post(@RequestBody Attribute attribute, @PathVariable Integer entityId) {
        try {
            service.createAttribute(attribute, entityId);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "attribute/{entityId}")
    public ResponseEntity<?> getAttributes(@PathVariable Integer entityId) {
        try {
            return ResponseEntity.ok(service.getAttributes(entityId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path = "parameter/data/{entityId}")
    public ResponseEntity<?> insertParameterAttributeValue(@RequestBody List<Map<String, Object>> data, @PathVariable Integer entityId) {
        try {
            service.insertParameterData(data, entityId);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "haveEntity/{processId}")
    public ResponseEntity<?> haveEntity(@PathVariable Integer processId) {
        try {
            return ResponseEntity.ok(service.haveEntity(processId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

}
