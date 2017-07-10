package com.qgtechs.qgcloud.goarchive.repository;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends CrudRepository<Document, Long> {

    Document findByName(@Param("name") String name);
    Document findByCode(@Param("code") String registrationNumber);
    List<Document> findByCustomer(@Param("customer") Customer owner);

}
