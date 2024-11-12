package com.masoud.bpms.Utility.Security.Model;

import com.masoud.bpms.Model.Organization.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class JwtUser  implements UserDetails {

    private String userName;
    private String password;
    private List<? extends GrantedAuthority> authorities;
    
    public JwtUser(String userName, String password, List<? extends GrantedAuthority> authorities) {
        this.userName = userName;
        this.password = password;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public static JwtUser generate(User user){
        JwtUser jwtUser = new JwtUser(
                user.getUsername()
                ,user.getPassword(),new ArrayList<>());
        return jwtUser;
    }

   
}
