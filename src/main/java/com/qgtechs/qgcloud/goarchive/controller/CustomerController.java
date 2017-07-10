package com.qgtechs.qgcloud.goarchive.controller;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @RequestMapping(value = "/customer/", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @RequestMapping(value = "/customer/", method = RequestMethod.PUT)
    @ResponseBody
    @Transactional
    public Customer updateCustomer(@RequestBody Customer customer) {
        return customerService.update(customer);
    }

    @RequestMapping(value = "/customer/", method = RequestMethod.GET)
    @ResponseBody
    @Transactional
    public List<Customer> findAll() {
        return customerService.findAll();
    }


    @RequestMapping(value = "/customer/{memberId}", method = RequestMethod.DELETE)
    @ResponseBody
    @Transactional
    public void deleteCustomer(@PathVariable long memberId) {
        customerService.delete(memberId);
    }

    @RequestMapping(value = "/customer/register", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    public Customer signin(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @RequestMapping(value = "/customer/login", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    public Customer login(@RequestBody Customer customer) {
        return customerService.create(customer);
    }
}
