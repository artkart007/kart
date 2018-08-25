package com.art.kart;

import com.art.kart.model.Users;
import com.art.kart.service.ArtsService;
import com.art.kart.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@EnableMongoAuditing
@EnableReactiveMongoRepositories
@SpringBootApplication
public class KartApplication implements CommandLineRunner {

    @Autowired
    private UsersService usersService;

    @Autowired
    private ArtsService artsService;

    public static void main(String[] args) {
        SpringApplication.run(KartApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        //db clean up
		artsService.deleteAll().subscribe().dispose();
		usersService.deleteAll().subscribe().dispose();

		Users users = new Users();
		users.setUsername("vishnu007");
		users.setFullName("Vishnu Kulkarni");
		usersService.save(users).subscribe().dispose();

		users = new Users();
		users.setUsername("pappu007");
        users.setFullName("Pappu Kumar");
        usersService.save(users).subscribe().dispose();


    }
}
