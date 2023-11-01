package com.pamquestions.pam.controller;

import com.pamquestions.pam.dto.UserReqDto;
import com.pamquestions.pam.model.User;
import com.pamquestions.pam.repository.UserRepository;
import com.pamquestions.pam.service.user.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping(value = "/register")
    public ResponseEntity<?> create(@RequestBody  UserReqDto userReq) {
        userService.createAccount(userReq);
        return new ResponseEntity<>("Tạo tài khoản thành công", HttpStatus.CREATED);
    }
    @GetMapping("/user")
    public ResponseEntity<?> getUserDetailsAfterLogin(Authentication authentication, HttpServletResponse response) {

        if(authentication.getName() == null){
            return  new ResponseEntity<String>("", HttpStatus.OK);
        }

        return new ResponseEntity<String>(response.getHeader("Authorization"), HttpStatus.OK);

    }
 /*   @PostMapping("/user")
    public String*/

}
