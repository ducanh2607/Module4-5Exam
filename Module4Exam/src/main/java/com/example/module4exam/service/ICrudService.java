package com.example.module4exam.service;

import java.util.Optional;

public interface ICrudService<T, K> {
    Iterable<T> findAll();

    Optional<T> findById(K k);

    T save(T t);

    void deleteById(K k);

}
