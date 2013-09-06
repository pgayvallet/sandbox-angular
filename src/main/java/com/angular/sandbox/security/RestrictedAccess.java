package com.angular.sandbox.security;

import java.lang.annotation.*;

/**
 * RestrictedAccess -
 *
 * @author spark <gayvallet@fullsix.com>
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Inherited
public @interface RestrictedAccess {
}
