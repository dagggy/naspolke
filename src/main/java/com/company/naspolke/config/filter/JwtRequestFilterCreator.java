package com.company.naspolke.config.filter;

import com.company.naspolke.service.MyUserDetailsServiceImplementation;
import com.company.naspolke.config.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtRequestFilterCreator {

    private MyUserDetailsServiceImplementation userDetailsService;
    private JwtUtil jwtUtil;

    @Autowired
    public JwtRequestFilterCreator(MyUserDetailsServiceImplementation userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    public JwtRequestFilterCreator() {}

    @Bean
    public JwtRequestFilter createJwtRequestFilter() {
        return new JwtRequestFilter(userDetailsService, jwtUtil);
    }

    @Bean
    public FilterRegistrationBean<JwtRequestFilter> registration(JwtRequestFilter filter) {
        FilterRegistrationBean<JwtRequestFilter> registration = new FilterRegistrationBean<JwtRequestFilter>(filter);
        registration.setEnabled(false);
        return registration;
    }
}
