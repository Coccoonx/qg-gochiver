package com.qgtechs.qgcloud.goarchive.service;


import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;

import java.util.List;


public interface DocumentService {

    Document create(Document document);
    Document update(Document document);
    Document findByName(String name);
    List<Document> findAll();
    List<Document> findByCustomer(Customer customer);
    void delete(Long Id);

}
