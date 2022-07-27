package com.company.naspolke.controller;

import com.company.naspolke.config.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

public class UserPageController {

    private final JwtUtil jwtUtil;

    public UserPageController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(value = "/get-companies")
    public ResponseEntity<String> getUserCompanies(HttpServletResponse request) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT, "działa");
    }

}
