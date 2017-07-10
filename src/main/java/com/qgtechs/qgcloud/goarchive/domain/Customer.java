package com.qgtechs.qgcloud.goarchive.domain;

import java.util.Date;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String registrationNumber;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String phoneNumber;

    private long quotaMax;
    private long quotaCurrent;

    @CreatedDate
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate = new Date();

    @LastModifiedDate
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModificationDate = new Date();

    @ManyToOne
    private Company company;
}
