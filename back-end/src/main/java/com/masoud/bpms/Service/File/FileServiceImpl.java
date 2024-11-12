package com.masoud.bpms.Service.File;

import com.masoud.bpms.Model.Bpms.Process;
import com.masoud.bpms.Model.File;
import com.masoud.bpms.Service.BaseService;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Service
public class FileServiceImpl extends BaseService implements FileService {


    @Override
    public String upload(MultipartFile file) {
        try {
            File saveFile = new File();
            saveFile.setContentType(file.getContentType());
            saveFile.setContent(new SerialBlob(file.getBytes()));
            Integer fileId = (Integer) getSession().save(saveFile);

            return String.format("file/download/%d", fileId);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public Map upload(byte[] file) {

        try {
            File saveFile = new File();
            saveFile.setContentType("image/png");
            saveFile.setContent(new SerialBlob(file));
            Integer fileId = (Integer) getSession().save(saveFile);

            String url= String.format("/file/download/%d", fileId);
            Map data=new HashMap();
            data.put("url",url);
            return data;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return null;
        }
    }

    @Override
    public File download(Integer id) {
        return (File) getSession()
                .createCriteria(File.class)
                .add(Restrictions.eq("id", id))
                .uniqueResult();


    }
}
