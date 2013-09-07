package com.angular.sandbox.rest.security.exception;

import com.angular.sandbox.rest.components.RuntimeServerException;

import javax.ws.rs.core.Response;

/**
 * AuthenticationFailureException -
 */
public class AuthenticationFailureException extends RuntimeServerException {

    private int errorCode;

    public AuthenticationFailureException(int errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public int getErrorCode() {
        return errorCode;
    }

    @Override
    public int getStatusCode() {
        return Response.Status.FORBIDDEN.getStatusCode();
    }

}
