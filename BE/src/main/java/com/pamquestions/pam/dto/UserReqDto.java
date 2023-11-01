package com.pamquestions.pam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserReqDto {
    private String email;
    private String username;
    private String password;
    private String repeatPassword;

}
