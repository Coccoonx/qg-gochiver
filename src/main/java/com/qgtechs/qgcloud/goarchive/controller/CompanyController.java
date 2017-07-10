package com.qgtechs.qgcloud.goarchive.controller;

import com.qgtechs.qgcloud.goarchive.domain.Company;
import com.qgtechs.qgcloud.goarchive.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @RequestMapping(value = "/company/", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    public Company createCompany(@RequestBody Company company) {
        return companyService.create(company);
    }

    @RequestMapping(value = "/company/", method = RequestMethod.PUT)
    @ResponseBody
    @Transactional
    public Company updateCompany(@RequestBody Company company) {
        return companyService.update(company);
    }

    @RequestMapping(value = "/company/", method = RequestMethod.GET)
    @ResponseBody
    @Transactional
    public List<Company> findAll() {
        return companyService.findAll();
    }


    @RequestMapping(value = "/company/{memberId}", method = RequestMethod.DELETE)
    @ResponseBody
    @Transactional
    public void deleteCompany(@PathVariable long memberId) {
        companyService.delete(memberId);
    }

    
}
