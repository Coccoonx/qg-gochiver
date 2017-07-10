package com.qgtechs.qgcloud.goarchive.service;


import com.qgtechs.qgcloud.goarchive.domain.Company;

import java.util.List;


public interface CompanyService {

    Company create(Company company);
    Company update(Company company);
    Company findByName(String name);
    Company findByCode(String code);
    List<Company> findAll();
    void delete(Long Id);

}
