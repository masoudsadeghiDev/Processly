package com.masoud.bpms.Service.User;

import com.masoud.bpms.Model.Organization.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<User> getUserList();

    Map<String, Object> getUserInfo(Integer userId);

    public void changeStatus(Integer status, Integer userId);

    boolean register(Map<String, Object> user);

    User getUser(Integer userId);

    void createDefaultUser();
}
