package com.art.kart.ctrl;

import com.art.kart.model.Users;
import com.art.kart.service.UsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/users")
public class UsersController {

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UsersService usersService;

    @GetMapping
    public Flux<Users> findAll() {
        return  usersService.findAll();
    }

}