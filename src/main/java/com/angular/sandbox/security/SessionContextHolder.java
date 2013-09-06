package com.angular.sandbox.security;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

/**
 * SessionContextHolder -
 *
 * @author spark <gayvallet@fullsix.com>
 */
final class SessionContextHolder {

    private SessionContextHolder() {
    }

    public static HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true);
    }

}
