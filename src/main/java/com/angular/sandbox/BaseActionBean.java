package com.angular.sandbox;

import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;

import javax.servlet.http.HttpServletRequest;

/**
 * BaseActionBean -
 *
 * @author spark <gayvallet@fullsix.com>
 */
public abstract class BaseActionBean implements ActionBean {

    protected ActionBeanContext context;

    @Override
    public void setContext(ActionBeanContext actionBeanContext) {
        this.context = actionBeanContext;
    }

    @Override
    public ActionBeanContext getContext() {
        return context;
    }

    protected HttpServletRequest getRequest() {
        return getContext().getRequest();
    }

    protected Resolution forwardTo(String path) {
        return new ForwardResolution(path);
    }

}
