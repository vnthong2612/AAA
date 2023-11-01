package com.pamquestions.pam.service.user;

import com.pamquestions.pam.dto.UserReqDto;
import com.pamquestions.pam.exception.AlreadyExistsException;
import com.pamquestions.pam.exception.RequiredParameterMissingException;
import com.pamquestions.pam.model.User;
import com.pamquestions.pam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static  final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public void createAccount(UserReqDto userReq) {
        if(userReq.getUsername().length() < 4){
            throw  new RequiredParameterMissingException("Tên đăng nhập cần ít nhất 4 kí tự");
        }
        if(userReq.getEmail().isBlank()){

            throw new RequiredParameterMissingException("Email không được để trống");
        }
        if(userReq.getUsername().isBlank()){
            throw new RequiredParameterMissingException("Tên đăng nhập không được để trống");
        }

        if(!userReq.getRepeatPassword().equals(userReq.getPassword())){
            throw new RequiredParameterMissingException("");
        }


        if (userRepository.existsByEmail(userReq.getEmail())) {
            LOGGER.info("Email already exists");
            throw new AlreadyExistsException("Email đã tồn tại");
        }

        if (userRepository.existsByUsername(userReq.getUsername())) {
            throw new AlreadyExistsException("Tài khoản đã tồn tại");
        }
        User user = new User();
        user.setUsername(userReq.getUsername());
        user.setEmail(userReq.getEmail());
        user.setPassword(passwordEncoder.encode(userReq.getPassword()));
        user.setScore(0);
        user.setTotal(0);
        userRepository.save(user);
    }


}
