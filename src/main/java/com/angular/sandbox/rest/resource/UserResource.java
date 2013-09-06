package com.angular.sandbox.rest.resource;

import com.angular.sandbox.rest.dto.User;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * UserResource -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
@Path("/user")
@Component
@Produces({MediaType.APPLICATION_JSON})
public class UserResource {


    @GET
    public User getUser() {
        return new User(1, "Admin");
    }


}
