package com.qgtechs.qgcloud.goarchive.service;


import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;

import java.util.List;


public interface CustomerService {

    Customer create(Customer customer);
    Customer update(Customer customer);
    Customer findByEmail(String email);
    Customer findByPhoneNumber(String phone);
    Customer findByRegistrationNumber(String registrationNumber);
    List<Customer> findAll();
    void delete(Long Id);

    Document upload ();
    Document download (String name);

}
