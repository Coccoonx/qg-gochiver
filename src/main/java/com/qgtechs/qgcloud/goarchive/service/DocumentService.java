package com.qgtechs.qgcloud.goarchive.service;


import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface DocumentService {

    Document create(String email, MultipartFile file, Document document);
    Document update(Document document);
    Document findByName(String name);
    List<Document> findAll();
    List<Document> findByCustomer(Customer customer);
    List<Document> findByCustomer(String email);
    void delete(Long Id);

}
