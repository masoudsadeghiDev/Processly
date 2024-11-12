package com.masoud.bpms.Utility.Security;

import com.masoud.bpms.Service.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationInitializer {

    @Autowired
    public ApplicationInitializer(UserService userService) {
        try {
            Thread.sleep(2000);
            userService.createDefaultUser();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
