package com.art.kart.repo;

import com.art.kart.model.Users;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface UsersRepository extends ReactiveCrudRepository<Users, String> {

    Flux<Users> findByUsername(String username);

}
