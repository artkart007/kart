package com.art.kart.ctrl;

import com.art.kart.model.Arts;
import com.art.kart.service.ArtsService;
import com.art.kart.service.UsersService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/arts")
public class ArtsController {

    @Value("${UPLOADED_FOLDER}")
    private String UPLOADED_FOLDER ;

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ArtsService artsService;


    @Autowired
    private UsersService usersService;

    @GetMapping
    public Flux<Arts> findAll() {
        log.debug("findAll Arts");
        return artsService.findAll();
    }

    @GetMapping("/find")
    public Flux<Arts> findByTitle(@RequestParam String artsTitle) {
        log.debug("findByTitle Arts with artsTitle : {}", artsTitle);
        return artsService.findByTitle(artsTitle);
    }

    @GetMapping("/{id}")
    public Mono<Arts> findOne(@PathVariable String id) {
        log.debug("findOne Arts with id : {}", id);
        return artsService.findOne(id);
    }

//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public Mono<Arts> create(@RequestBody Arts arts) {
//        log.debug("create Arts with arts : {}", arts);
//        return artsService.createArts(arts);
//    }


    @PostMapping("/upload")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> uploadFile(
            @RequestParam("userId")  String userId,
            @RequestParam("customName")  String customName,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile uploadfile) {


        if (uploadfile.isEmpty()) {
            return new ResponseEntity("please select a file!", HttpStatus.OK);
        }

        try {
           if(usersService.findOne(userId).flux().toStream().count() > 0) {

               saveUploadedFiles(Arrays.asList(uploadfile));

               Arts arts = new Arts();
               arts.setCustomName(customName);
               arts.setDescription(description);
               arts.setUserId(userId);
               arts.setOriginalFileName(uploadfile.getOriginalFilename());
               artsService.createArts(arts).subscribe().dispose();

               return new ResponseEntity(artsService.findAll().toStream().toArray() , HttpStatus.CREATED);

           }else {
               return new ResponseEntity<>(HttpStatus.FORBIDDEN);

           }
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }
    //save file
    private void saveUploadedFiles(List<MultipartFile> files) throws IOException {

        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue; //next pls
            }

            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

        }

    }

    @DeleteMapping("/{id}")
    public Mono<Boolean> delete(@PathVariable String id) {
        log.debug("delete Arts with id : {}", id);
        return artsService.delete(id);
    }

    @PutMapping("/{id}")
    public Mono<Arts> updateArts(@RequestBody Arts arts, @PathVariable String id) {
        log.debug("updateArts Arts with id : {} and arts : {}", id, arts);
        return artsService.updateArts(arts, id);
    }
}