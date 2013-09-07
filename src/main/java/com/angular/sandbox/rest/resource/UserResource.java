package com.angular.sandbox.rest.resource;

import com.angular.sandbox.rest.dto.User;
import com.angular.sandbox.rest.security.exception.AccessNotAllowedException;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * UserResource -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
@Component
@Path("/user")
@Produces({MediaType.APPLICATION_JSON})
public class UserResource {

    @GET
    public User getUser() {
        throw new AccessNotAllowedException();

        // return new User(1, "Admin");
    }

    @POST
    @Path("/authenticate")
    public User authenticate(@FormParam("username") String username, @FormParam("password") String password) {
        return new User(1, "Admin");
    }

}
