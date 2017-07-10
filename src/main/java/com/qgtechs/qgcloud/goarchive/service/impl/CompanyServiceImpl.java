package com.qgtechs.qgcloud.goarchive.service.impl;

import com.qgtechs.qgcloud.goarchive.domain.Company;
import com.qgtechs.qgcloud.goarchive.repository.CompanyRepository;
import com.qgtechs.qgcloud.goarchive.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by lyonnel on 02/09/16.
 */
@Component
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    CompanyRepository companyRepository;

    @Override
    public Company create(Company company) {
        Company exist = companyRepository.findByName(company.getName());
        if (exist != null) {
            throw new IllegalArgumentException("company.already.exists");
        }
        return companyRepository.save(company);
    }

    @Override
    public Company update(Company company) {
        Company exist = companyRepository.findByName(company.getName());
        if (exist == null) {
            throw new IllegalArgumentException("company.does.not.exist");
        }
        return companyRepository.save(company);
    }


    @Override
    public List<Company> findAll() {
        return (List<Company>) companyRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        Company exist = companyRepository.findOne(id);
        if (exist == null) {
            throw new IllegalArgumentException("company.does.not.exist");
        }
        companyRepository.delete(id);
    }

    @Override
    public Company findByName(String name) {
        return companyRepository.findByName(name);
    }

    @Override
    public Company findByCode(String registrationNumber) {
        return null;
    }


//@PostConstruct
    /*public void populate(){
        Company company = new Company();
        company.setNom("Kamga");
        company.setPrenom("Maurice");
        company.setAdresse("Makepe");
        company.setCni("125548518");
        company.setTelephone("688778899");
        companyRepository.save(company);

        company = new Company();
        company.setNom("Kemogne");
        company.setPrenom("Jean");
        company.setAdresse("Makepe");
        company.setCni("125548518");
        company.setTelephone("688778899");
        companyRepository.save(company);
    }*/
}
