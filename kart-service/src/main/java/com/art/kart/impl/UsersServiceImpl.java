package com.art.kart.impl;

import com.art.kart.model.Users;
import com.art.kart.repo.UsersRepository;
import com.art.kart.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public Mono<Void> deleteAll() {
        return usersRepository.deleteAll();
    }

    @Override
    public Mono<Users> save(Users users) {
        return usersRepository.save(users);
    }

    @Override
    public Mono<Users> findOne(String userId) {
        return usersRepository.findById(userId);
    }

    @Override
    public Flux<Users> findAll() {
        return usersRepository.findAll();
    }
}
