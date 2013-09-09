package com.angular.sandbox.rest.resource;

import com.angular.sandbox.rest.components.BaseResource;
import com.angular.sandbox.service.TranslationService;
import org.apache.commons.lang3.LocaleUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import java.util.Locale;
import java.util.Map;

/**
 * TranslationResource -
 */
@Path("/translations")
@Component
public class TranslationResource extends BaseResource {

    @Autowired
    private TranslationService translationService;

    @GET
    public Map<String, String> getTranslations(@QueryParam("lang") String lang) {
        Locale locale = LocaleUtils.toLocale(lang);
        return translationService.getMessages(locale);
    }

}
