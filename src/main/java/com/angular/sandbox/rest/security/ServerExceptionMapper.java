package com.angular.sandbox.rest.security;

import com.angular.sandbox.rest.components.RuntimeServerException;
import com.angular.sandbox.rest.components.WrappedEntityResponse;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * ServerExceptionMapper -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
@Provider
public class ServerExceptionMapper implements ExceptionMapper<RuntimeServerException> {

    @Override
    public Response toResponse(RuntimeServerException exception) {
        return Response
                .status(exception.getStatusCode())
                .entity(new WrappedEntityResponse(exception.getErrorCode()))
                .build();
    }

}
