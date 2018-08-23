package com.art.kart.impl;

import com.art.kart.model.Arts;
import com.art.kart.repo.ArtsRepository;
import com.art.kart.service.ArtsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ArtsServiceImpl implements ArtsService {

    @Autowired
    private ArtsRepository artsRepository;


    @Override
    public Flux<Arts> findAll() {
        return artsRepository.findAll();
    }

    @Override
    public Flux<Arts> findByTitle(String artsTitle) {
        return null;
    }

    @Override
    public Mono<Arts> createArts(Arts arts) {
        return artsRepository.save(arts);
    }

    @Override
    public Mono<Arts> findOne(String id) {
        return null;
    }

    @Override
    public Mono<Boolean> delete(String id) {
        return null;
    }

    @Override
    public Mono<Arts> updateArts(Arts arts, String id) {
        return null;
    }

    @Override
    public Mono<Void> deleteAll() {
        return artsRepository.deleteAll();
    }

    @Override
    public Flux<Arts> findByUserId(String userId) {
        return artsRepository.findByUserId(userId);
    }
}
