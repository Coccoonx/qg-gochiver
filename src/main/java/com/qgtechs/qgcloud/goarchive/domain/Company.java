package com.qgtechs.qgcloud.goarchive.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String code;
    private String name;
    private String link;
    private String phoneNumber;
    private String description;

    @CreatedDate
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate = new Date();

    @LastModifiedDate
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModificationDate = new Date();

}
