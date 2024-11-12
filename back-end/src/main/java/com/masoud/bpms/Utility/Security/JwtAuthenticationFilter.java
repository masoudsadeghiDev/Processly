package com.masoud.bpms.Utility.Security;


import com.masoud.bpms.Utility.Security.Model.TokenAuthenticationDetailsSource;
import com.masoud.bpms.Utility.Security.Service.JwtUserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter implements WebMvcConfigurer {


    @Autowired
    private JwtUserService userDetailsService;


    @Value("${jwt.header.key}")
    private String tokenHeaderKey;

    private static Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        String token = httpServletRequest.getHeader(tokenHeaderKey);

        if (token != null) {
            token = token.replace("Bearer ", "");

            try {

                String userName = JwtTokenUtil.getUserNameFromToken(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(userName);

                if (userDetails != null && JwtTokenUtil.validateToken(token, userDetails)) {


                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    userName,
                                    userDetails.getAuthorities());
                    httpServletRequest.setAttribute("token", token);

                    authentication.setDetails(new TokenAuthenticationDetailsSource(httpServletRequest).buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    logger.info("Invalid Token");

                }


            } catch (ExpiredJwtException e) {

                logger.info("Token Expired");
            } catch (MalformedJwtException e2) {
                logger.info("Malformed Done");

            }


        } else {


        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpServletResponse.setHeader("Access-Control-Max-Age", "3600");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "authorization, content-type, xsrf-token");
        httpServletResponse.addHeader("Access-Control-Expose-Headers", "xsrf-token");
        if ("OPTIONS".equals(httpServletRequest.getMethod())) {
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        } else {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        }


    }
}
