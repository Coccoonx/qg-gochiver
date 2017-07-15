package com.qgtechs.qgcloud.goarchive.repository;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Customer findByEmail(@Param("email") String email);
     @Query("SELECT t FROM Customer t WHERE t.email = :email AND t.password = :password")
    Customer findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
    Customer findByRegistrationNumber(@Param("registrationNumber") String registrationNumber);
    Customer findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

}
