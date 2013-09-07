package com.angular.sandbox.rest.components;

import javax.ws.rs.core.Response;

/**
 * RuntimeServerException -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
public abstract class RuntimeServerException extends RuntimeException implements ServerException {

    @Override
    public int getStatusCode() {
        return Response.Status.INTERNAL_SERVER_ERROR.getStatusCode();
    }

    @Override
    public int getErrorCode() {
        return -1;
    }

}
