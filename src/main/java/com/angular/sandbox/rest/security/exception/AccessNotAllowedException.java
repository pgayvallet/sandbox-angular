package com.angular.sandbox.rest.security.exception;

import com.angular.sandbox.rest.components.RuntimeServerException;

import javax.ws.rs.core.Response;

/**
 * AccessNotAllowedException -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
public class AccessNotAllowedException extends RuntimeServerException {

    @Override
    public int getStatusCode() {
        return Response.Status.UNAUTHORIZED.getStatusCode();
    }

    @Override
    public int getErrorCode() {
        return 1;
    }
}
