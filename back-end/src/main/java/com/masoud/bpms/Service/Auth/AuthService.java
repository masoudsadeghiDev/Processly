package com.masoud.bpms.Service.Auth;

import com.masoud.bpms.Exception.AuthException;
import com.masoud.bpms.Model.Organization.User;

import java.util.Map;

public interface AuthService {

    Map<String, Object> login(User user) throws AuthException;

    Map<String, Object> signup(User user) throws AuthException;

    User getOneUser(String username);
}
