package com.qgtechs.qgcloud.goarchive.service.impl;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;
import com.qgtechs.qgcloud.goarchive.repository.CustomerRepository;
import com.qgtechs.qgcloud.goarchive.repository.DocumentRepository;
import com.qgtechs.qgcloud.goarchive.service.DocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;

/**
 * Created by lyonnel on 02/09/16.
 */
@Component
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    DocumentRepository documentRepository;
    
    @Autowired
    CustomerRepository customerRepository;

    @Override
    public Document create(String email, MultipartFile file, Document document) {
    	
    	
    	Customer customer = customerRepository.findByEmail(email);
    	
    	if(customer!=null){
    		Document exist = documentRepository.findByName(document.getName());
            if (exist != null) {
                throw new IllegalArgumentException("document.already.exists");
            }

            exist = new Document();
            exist.setName(document.getName());
            exist.setSize(file.getSize());
            String code = UUID.randomUUID().toString();
            exist.setCode(code);
            exist.setDescription(document.getDescription());
            exist.setExtension(document.getExtension());
            exist.setType(document.getType());
            File fileTmp = new File(customer.getFolder(), code+"."+document.getExtension());
            exist.setLink("ftp://192.168.1.246/"+customer.getFolder()+"/"+code+"."+document.getExtension());
            exist.setCustomer(customer);
            

            if (!file.isEmpty()) {
                try {
                    byte[] bytes = file.getBytes();
                    BufferedOutputStream stream =
                            new BufferedOutputStream(new FileOutputStream(fileTmp));
                    stream.write(bytes);
                    stream.close();
                    return documentRepository.save(exist);
                } catch (Exception e) {
                    return null;
                }
            } else {
            	 throw new IllegalArgumentException("file.not.exists");
            }
    	}
    	
    	throw new IllegalArgumentException("customer.not.exists");

        

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
    public List<Document> findByCustomer(String email) {
    	Customer customer = customerRepository.findByEmail(email);
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
