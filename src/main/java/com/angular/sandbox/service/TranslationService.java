package com.angular.sandbox.service;

import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.Map;

/**
 * TranslationService -
 */
@Component
public interface TranslationService {

    Map<String, String> getMessages(Locale locale);

}
