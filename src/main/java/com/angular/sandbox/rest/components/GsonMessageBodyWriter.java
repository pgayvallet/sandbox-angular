package com.angular.sandbox.rest.components;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.ext.Providers;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;

/**
 * Message Body Writer that output a JSON payload using the google GSON library.
 *
 * <p>Payload is wrtitten with the UTF-8 charset.</p>
 *
 * <p>Note : {@link #gson} lazy initialization is not super thread safe, lazy holder pattern not really safe
 * either because instantiation could fail here. However the GsonBuilder config is pretty standardized and doesn't
 * mess with states across threads, and there is only one access in the
 * {@link #writeTo(Object, Class, java.lang.reflect.Type, java.lang.annotation.Annotation[], javax.ws.rs.core.MediaType, javax.ws.rs.core.MultivaluedMap, java.io.OutputStream)} method.
 * </p>
 */
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class GsonMessageBodyWriter implements MessageBodyWriter<Object> {

    public static final int UNDETERMINED = -1;
    private static final String CHARSET = "UTF-8";

    @Context
    public Providers providers;
    private Gson gson;

    public boolean isWriteable(Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType) {
        return true;
    }

    public long getSize(Object o, Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType) {
        return UNDETERMINED;
    }

    public void writeTo(Object object, Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType, MultivaluedMap<String, Object> httpHeaders, OutputStream entityStream) throws IOException, WebApplicationException {
        final OutputStreamWriter writer = new OutputStreamWriter(entityStream, CHARSET);
        try {
            getGson().toJson(object, type, writer);
        } finally {
            writer.close();
        }
    }

    /**
     * Lazy GSON instance creator.
     *
     * @return {@link com.google.gson.Gson} instance
     */
    private Gson getGson() {
        if (this.gson != null) {
            return this.gson;
        }
        final GsonBuilder gsonBuilder = new GsonBuilder();
        this.gson = gsonBuilder.setPrettyPrinting()
                .setDateFormat("dd-MM-yyyy")
                .serializeNulls()
                .create();

        return this.gson;
    }

}

