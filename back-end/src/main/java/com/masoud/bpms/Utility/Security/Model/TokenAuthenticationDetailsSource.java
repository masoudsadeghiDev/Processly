package com.masoud.bpms.Utility.Security.Model;

import org.springframework.security.authentication.AuthenticationDetailsSource;

import javax.servlet.http.HttpServletRequest;

public class TokenAuthenticationDetailsSource implements AuthenticationDetailsSource<HttpServletRequest, TokenAuthenticationDetailsSource> {
    public String token;
    public String ip;

    public TokenAuthenticationDetailsSource(HttpServletRequest httpServletRequest) {
        this.token = (String) httpServletRequest.getAttribute("token");
        this.ip =  httpServletRequest.getRemoteAddr();
    }

    @Override
    public TokenAuthenticationDetailsSource buildDetails(HttpServletRequest httpServletRequest) {
        return new TokenAuthenticationDetailsSource(httpServletRequest);
    }
}

