package com.qgtechs.qgcloud.goarchive.repository;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Customer findByEmail(@Param("email") String email);
    Customer findByRegistrationNumber(@Param("registrationNumber") String registrationNumber);
    Customer findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

}
