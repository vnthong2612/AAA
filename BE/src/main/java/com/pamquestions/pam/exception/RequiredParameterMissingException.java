package com.pamquestions.pam.exception;

public class RequiredParameterMissingException extends RuntimeException{
    public RequiredParameterMissingException(String message) {
        super(message);
    }
}
