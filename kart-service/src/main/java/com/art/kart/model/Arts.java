package com.art.kart.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "arts")
@Setter
@Getter
public class Arts extends BaseEntity {

    private String customName;

    private String originalFileName;

    private String description;

    private String extension;

    private Double price;

    private String currency;

    @Indexed
    private String userId;


}
