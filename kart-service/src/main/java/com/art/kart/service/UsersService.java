package com.art.kart.service;

import com.art.kart.model.Users;
import reactor.core.publisher.Mono;

public interface UsersService {


    Mono<Void> deleteAll();

    Mono<Users> save(Users users);

    Mono<Users> findOne(String userId);
}
