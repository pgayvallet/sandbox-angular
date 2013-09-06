package com.angular.sandbox.persistence;

import java.io.Serializable;
import java.util.List;

/**
 * GenericDAO -
 *
 * @author spark <gayvallet@fullsix.com>
 */
public interface GenericDAO<K  extends Serializable, T> {

    T findById(K id);

    List<T> findAll();

    void delete(T obj);

    void saveOrUpdate(T obj);

}
