package com.art.kart.service;

import com.art.kart.model.Arts;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ArtsService {


    Flux<Arts> findAll();

    Flux<Arts> findByTitle(String artsTitle);

    Mono<Arts> createArts(Arts arts);

    Mono<Arts> findOne(String id);

    Mono<Boolean> delete(String id);

    Mono<Arts> updateArts(Arts arts, String id);

    Mono<Void> deleteAll();
}
