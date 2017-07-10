package com.qgtechs.qgcloud.goarchive.repository;

import com.qgtechs.qgcloud.goarchive.domain.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CompanyRepository extends CrudRepository<Company, Long> {

    Company findByName(@Param("name") String name);
    Company findByCode(@Param("code") String registrationNumber);
    Company findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

}
