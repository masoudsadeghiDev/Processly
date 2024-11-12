package com.masoud.bpms.Exception;

public class AuthException extends RuntimeException {

    private AuthExceptionType type;

    public AuthException(AuthExceptionType type) {
        super(type.toString());
        this.type = type;
    }

    public AuthExceptionType getType() {
        return type;
    }

    public enum AuthExceptionType {
        PASSWORD_INCORRECT,
        USER_NOTFOUND,
        USER_EXIST;
    }
}
