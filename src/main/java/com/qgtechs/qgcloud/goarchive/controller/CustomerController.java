package com.qgtechs.qgcloud.goarchive.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.service.CustomerService;
import com.qgtechs.qgcloud.goarchive.view.Views;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CustomerController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    CustomerService customerService;
    
    @Autowired
    PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/customer/", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    @JsonView(Views.Public.class)
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @RequestMapping(value = "/customer/", method = RequestMethod.PUT)
    @ResponseBody
    @Transactional
    @JsonView(Views.Public.class)
    public Customer updateCustomer(@AuthenticationPrincipal User principal, @RequestBody Customer customer) {
        return customerService.update(customer);
    }

    @RequestMapping(value = "/customer/", method = RequestMethod.GET)
    @ResponseBody
    @Transactional
    @JsonView(Views.Private.class)
    public List<Customer> findAll(@AuthenticationPrincipal User principal) {
        return customerService.findAll();
    }


    @RequestMapping(value = "/customer/{memberId}", method = RequestMethod.DELETE)
    @ResponseBody
    @Transactional
    public void deleteCustomer(@AuthenticationPrincipal User principal, @PathVariable long memberId) {
        customerService.delete(memberId);
    }

    @RequestMapping(value = "/customer/register", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    @JsonView(Views.Public.class)
    public Customer signin(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @RequestMapping(value = "/customer/login", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    @JsonView(Views.Public.class)
    public Customer login(@AuthenticationPrincipal User principal, @RequestBody Customer customer) {
    	logger.info("Incoming user principal :{}", principal.getUsername());
        Customer foundCustomer = this.customerService.findByEmail(customer.getEmail());
        
        if (foundCustomer != null) {
                if (passwordEncoder.matches(customer.getPassword(), foundCustomer.getEncodedPassword()))
                    return foundCustomer;
                throw new SecurityException("Incorrect password");
            
        }
        throw new SecurityException("User doesn't exist");
        
    }
}
