package com.qgtechs.qgcloud.goarchive.service.impl;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;
import com.qgtechs.qgcloud.goarchive.repository.DocumentRepository;
import com.qgtechs.qgcloud.goarchive.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by lyonnel on 02/09/16.
 */
@Component
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    DocumentRepository documentRepository;

    @Override
    public Document create(Document document) {
        Document exist = documentRepository.findByName(document.getName());
        if (exist != null) {
            throw new IllegalArgumentException("document.already.exists");
        }
        return documentRepository.save(document);
    }

    @Override
    public Document update(Document document) {
        Document exist = documentRepository.findByName(document.getName());
        if (exist == null) {
            throw new IllegalArgumentException("document.does.not.exist");
        }
        return documentRepository.save(document);
    }


    @Override
    public List<Document> findAll() {
        return (List<Document>) documentRepository.findAll();
    }

    @Override
    public List<Document> findByCustomer(Customer customer) {
        return documentRepository.findByCustomer(customer);
    }

    @Override
    public void delete(Long id) {
        Document exist = documentRepository.findOne(id);
        if (exist == null) {
            throw new IllegalArgumentException("document.does.not.exist");
        }
        documentRepository.delete(id);
    }

    @Override
    public Document findByName(String name) {
        return documentRepository.findByName(name);
    }


//@PostConstruct
    /*public void populate(){
        Document document = new Document();
        document.setNom("Kamga");
        document.setPrenom("Maurice");
        document.setAdresse("Makepe");
        document.setCni("125548518");
        document.setTelephone("688778899");
        documentRepository.save(document);

        document = new Document();
        document.setNom("Kemogne");
        document.setPrenom("Jean");
        document.setAdresse("Makepe");
        document.setCni("125548518");
        document.setTelephone("688778899");
        documentRepository.save(document);
    }*/
}
