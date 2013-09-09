package com.angular.sandbox.service.impl;

import com.angular.sandbox.service.TranslationService;
import com.google.common.collect.Maps;
import org.springframework.stereotype.Component;

import java.util.Enumeration;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * TranslationServiceImpl -
 */
@Component
public class TranslationServiceImpl implements TranslationService {

    private static final String BUNDLE_NAME = "translations/translations";

    @Override
    public Map<String, String> getMessages(Locale locale) {
        ResourceBundle bundle = ResourceBundle.getBundle(BUNDLE_NAME, locale);
        return bundleToMap(bundle);
    }

    private Map<String, String> bundleToMap(ResourceBundle bundle) {
        Map<String, String> map = Maps.newHashMap();
        Enumeration<String> keys = bundle.getKeys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            map.put(key, bundle.getString(key));
        }
        return map;
    }

}
