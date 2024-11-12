package com.masoud.bpms.Utility.Security;

import com.masoud.bpms.Utility.Security.Model.JwtUser;
import com.masoud.bpms.Utility.Security.Model.TokenAuthenticationDetailsSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class TokenPrinciple {


    public String getUserName() {
        JwtUser jwtUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwtUser.getUsername();
    }

    public Integer getUserId() {
        String token = this.getToken();
        return (Integer) JwtTokenUtil.getTokenClaims(token).get("userId");
    }

    public String getToken() {
        return ((TokenAuthenticationDetailsSource) SecurityContextHolder.getContext().getAuthentication().getDetails()).token.replace("Bearer", "");
    }
}
