package com.masoud.bpms.Utility.Security.Service;

import com.masoud.bpms.Service.Auth.AuthService;
import com.masoud.bpms.Utility.Security.JwtUserFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserService implements UserDetailsService {


    @Autowired
    private AuthService service;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return JwtUserFactory.create(service.getOneUser(username));
    }

}
