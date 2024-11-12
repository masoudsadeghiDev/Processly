package com.masoud.bpms.Utility.Security.Config;

import com.masoud.bpms.Utility.Security.AccessDeniedExceptionHandler;
import com.masoud.bpms.Utility.Security.JwtAuthenticationEntryPoint;
import com.masoud.bpms.Utility.Security.JwtAuthenticationFilter;
import com.masoud.bpms.Utility.Security.Service.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true)

public class JwtAuthenticationConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint entryPoint;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtUserService service;

    @Autowired
    private AccessDeniedExceptionHandler accessDeniedExceptionHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .exceptionHandling().authenticationEntryPoint(entryPoint).and()
                .exceptionHandling().accessDeniedHandler(accessDeniedExceptionHandler).and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/process").permitAll()
                .antMatchers(HttpMethod.POST,"/auth/**").permitAll()
                .antMatchers(HttpMethod.GET,"/auth/**").permitAll()
                .antMatchers(HttpMethod.GET,"/file/download/**").permitAll()
                .anyRequest().authenticated();
        http.headers().cacheControl().disable();
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(this.service)
                .passwordEncoder(passwordEncoder());

    }




}
