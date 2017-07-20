package com.qgtechs.qgcloud.goarchive.controller;

import com.qgtechs.qgcloud.goarchive.domain.Document;
import com.qgtechs.qgcloud.goarchive.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    DocumentService documentService;

    @RequestMapping(value = "/document/upload", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    public Document createDocument(@RequestParam("email") String email,
    		@RequestParam("file") MultipartFile file, 
    		@RequestParam("name") String name,
    		@RequestParam("extension") String extension,
    		@RequestParam("description") String description,
    		@RequestParam("type") String type) {
    	Document document = new Document();
    	document.setName(name);
    	document.setExtension(extension);
    	document.setType(type);
    	document.setDescription(description);
        return documentService.create(email, file, document);
    }

    @RequestMapping(value = "/document/", method = RequestMethod.PUT)
    @ResponseBody
    @Transactional
    public Document updateDocument(@RequestBody Document document) {
        return documentService.update(document);
    }

//    @RequestMapping(value = "/document/", method = RequestMethod.GET)
//    @ResponseBody
//    @Transactional
//    public List<Document> findAll() {
//        return documentService.findAll();
//    }

    @RequestMapping(value = "/document/", method = RequestMethod.GET)
    @ResponseBody
    @Transactional
    public List<Document> getAllDocument() {
        return documentService.findAll();
    }
    
    @RequestMapping(value = "/document/{email}", method = RequestMethod.GET)
    @ResponseBody
    @Transactional
    public List<Document> getAllDocument(@PathVariable(value="email") String email) {
        return documentService.findByCustomer(email);
    }

    @RequestMapping(value = "/document/{memberId}", method = RequestMethod.DELETE)
    @ResponseBody
    @Transactional
    public void deleteDocument(@PathVariable long memberId) {
        documentService.delete(memberId);
    }


}
