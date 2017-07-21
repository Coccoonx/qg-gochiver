package com.qgtechs.qgcloud.goarchive.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;
import com.qgtechs.qgcloud.goarchive.service.DocumentService;
import com.qgtechs.qgcloud.goarchive.view.Views;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by lyonnel on 02/09/16.
 */
@Controller
public class DocumentController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    DocumentService documentService;

    @RequestMapping(value = "/document/upload", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    @JsonView(Views.Public.class)
    public Document createDocument(@AuthenticationPrincipal User principal,
    		@RequestParam("file") MultipartFile file, 
    		@RequestParam("name") String name,
    		@RequestParam("extension") String extension,
    		@RequestParam("description") String description,
    		@RequestParam("type") String type) {
    	
    	Customer customer = new Customer();
		customer.setId(Long.parseLong(principal.getUsername().toString()));
		
    	Document document = new Document();
    	document.setName(name);
    	document.setExtension(extension);
    	document.setType(type);
    	document.setDescription(description);
        return documentService.create(customer, file, document);
    }

    @RequestMapping(value = "/document/", method = RequestMethod.PUT)
    @ResponseBody
    @Transactional
    @JsonView(Views.Public.class)
    public Document updateDocument(@AuthenticationPrincipal User principal, 
    		@RequestBody Document document) {
        return documentService.update(document);
    }


    @RequestMapping(value = "/document/", method = RequestMethod.GET)
    @ResponseBody
    @Transactional
    @JsonView(Views.Public.class)
    public List<Document> getAllDocument(@AuthenticationPrincipal User principal) {
    	Customer customer = new Customer();
		customer.setId(Long.parseLong(principal.getUsername().toString()));
		logger.info("User: {}", principal.getUsername().toString());
        return documentService.findByCustomer(customer);
    }

    @RequestMapping(value = "/document/{memberId}", method = RequestMethod.DELETE)
    @ResponseBody
    @Transactional
    public void deleteDocument(@AuthenticationPrincipal User principal, @PathVariable long memberId) {
        documentService.delete(memberId);
    }
    
    
    @RequestMapping(value = "/admin/document/", method = RequestMethod.GET)
    @ResponseBody
    @Transactional
    @JsonView(Views.Private.class)
    public List<Document> getAdminAllDocument(@AuthenticationPrincipal User principal) {
        return documentService.findAll();
    }
    


}
