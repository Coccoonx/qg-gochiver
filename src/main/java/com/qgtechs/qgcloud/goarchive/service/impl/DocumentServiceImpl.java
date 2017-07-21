package com.qgtechs.qgcloud.goarchive.service.impl;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;
import com.qgtechs.qgcloud.goarchive.repository.CustomerRepository;
import com.qgtechs.qgcloud.goarchive.repository.DocumentRepository;
import com.qgtechs.qgcloud.goarchive.service.DocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    
    @Value("${server.address}")
	String serverAddress;

    @Value("${root.directory}")
	String baseDirectory;
    
    @Override
    public Document create(Customer customer, MultipartFile file, Document document) {
    	
    	
    	Customer foundCustomer = customerRepository.findOne(customer.getId());
    	
    	if(foundCustomer!=null){
    		Document doc = documentRepository.findByName(document.getName());
            if (doc != null) {
                throw new IllegalArgumentException("document.already.exists");
            }

            doc = new Document();
            doc.setName(document.getName());
            doc.setSize(file.getSize());
            String code = UUID.randomUUID().toString();
            doc.setCode(code);
            doc.setDescription(document.getDescription());
            doc.setExtension(document.getExtension());
            doc.setType(document.getType());
            File fileTmp = new File(baseDirectory.concat(foundCustomer.getFolder()), code+"."+document.getExtension());
            doc.setLink("ftp://"+serverAddress+"/"+foundCustomer.getFolder()+"/"+code+"."+document.getExtension());
            doc.setCustomer(customer);
            

            if (!file.isEmpty()) {
                try {
                    byte[] bytes = file.getBytes();
                    BufferedOutputStream stream =
                            new BufferedOutputStream(new FileOutputStream(fileTmp));
                    stream.write(bytes);
                    stream.close();
                    return documentRepository.save(doc);
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
