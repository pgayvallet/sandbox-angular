package com.angular.sandbox.rest.components;

/**
 * ServerException -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
public interface ServerException {

    int getStatusCode();

    int getErrorCode();

    Object getErrorDetails();

}
