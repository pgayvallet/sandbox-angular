package com.angular.sandbox.security;

import com.angular.sandbox.BaseActionBean;
import net.sourceforge.stripes.controller.FlashScope;

/**
 * RestrictedActionBean - base, abstract class for action bean requiring authentication
 *
 * @author spark <gayvallet@fullsix.com>
 */
@RestrictedAccess
public abstract class RestrictedActionBean extends BaseActionBean {

    protected void setStatusMessage(String message) {
        FlashScope scope = FlashScope.getCurrent(getRequest(), true);
        scope.put("statusMessage", message);
    }

}
