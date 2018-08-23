package com.art.kart.repo;

import com.art.kart.model.Arts;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ArtsRepository extends ReactiveCrudRepository<Arts, String> {

    Flux<Arts> findByUserId(String userId);

}