package com.masoud.bpms.Service.File;

import com.masoud.bpms.Model.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface FileService {

    public String upload(MultipartFile file);

    public Map upload(byte[] file);

    public File download(Integer id);
}
