package com.masoud.bpms.Controller;

import com.masoud.bpms.Model.File;
import com.masoud.bpms.Service.File.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.sql.Blob;
import java.util.Base64;


@RestController
@RequestMapping(path = "file")
public class FileController {

    @Autowired
    private FileService service;

    @RequestMapping(path = "/upload", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(service.upload(file));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/upload/base64", method = RequestMethod.POST)
    public ResponseEntity<?> uploadBase64(@RequestBody String image) {
        try {
            byte[] file = Base64.getDecoder().decode(image);
            return ResponseEntity.ok(service.upload(file));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @RequestMapping(path = "/download/{id}", method = RequestMethod.GET)
    public HttpEntity<byte[]> download(@PathVariable("id") Integer id) {
        HttpHeaders headers = new HttpHeaders();
        byte[] data = null;

        try {

            File file = service.download(id);
            headers.add("content-type", file.getContentType());
            Blob content = file.getContent();
            int size = (int) content.length();
            data = content.getBytes(1, size);

        } catch (Exception e) {
            return null;
        }
        return new HttpEntity<byte[]>(data, headers);
    }

}
