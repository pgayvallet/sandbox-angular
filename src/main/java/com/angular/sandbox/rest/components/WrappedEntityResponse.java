package com.angular.sandbox.rest.components;

import javax.ws.rs.core.Response;

/**
 * WrappedEntityResponse -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
public class WrappedEntityResponse {

    private boolean error = false;
    private int status = Response.Status.OK.getStatusCode();
    private Object response;

    public WrappedEntityResponse(Object response) {
        this.response = response;
        this.error = false;
    }

    public WrappedEntityResponse(int statusCode) {
        this.error = true;
        this.status = statusCode;
    }

}
