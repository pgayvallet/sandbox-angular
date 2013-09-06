package com.angular.sandbox.rest.components;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

import javax.ws.rs.ext.Provider;

/**
 * WrapperResponseFilter -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
@Provider
public class WrapperResponseFilter implements ContainerResponseFilter {

    @Override
    public ContainerResponse filter(ContainerRequest containerRequest, ContainerResponse containerResponse) {
        WrappedEntityResponse wrappedResponse = new WrappedEntityResponse(containerResponse.getEntity());
        containerResponse.setEntity(wrappedResponse);
        return containerResponse;
    }

}
