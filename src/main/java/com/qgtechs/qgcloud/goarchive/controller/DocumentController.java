package com.qgtechs.qgcloud.goarchive.controller;

import com.qgtechs.qgcloud.goarchive.domain.Document;
import com.qgtechs.qgcloud.goarchive.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by lyonnel on 02/09/16.
 */
@Controller
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @RequestMapping(value = "/document/create", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    public Document createDocument(@RequestBody Document document) {
        return documentService.create(document);
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

    @RequestMapping(value = "/document/{memberId}", method = RequestMethod.DELETE)
    @ResponseBody
    @Transactional
    public void deleteDocument(@PathVariable long memberId) {
        documentService.delete(memberId);
    }


}
