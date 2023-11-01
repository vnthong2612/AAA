package com.pamquestions.pam.service.user;


import com.pamquestions.pam.dto.UserReqDto;

public interface UserService {
    void createAccount(UserReqDto userReq);
}
