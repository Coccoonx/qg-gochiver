package com.qgtechs.qgcloud.goarchive.service.impl;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.domain.Document;
import com.qgtechs.qgcloud.goarchive.repository.CustomerRepository;
import com.qgtechs.qgcloud.goarchive.service.CustomerService;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

/**
 * Created by lyonnel on 02/09/16.
 */
@Component
@PropertySource("application.properties")
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Value("${root.directory}")
	String baseDirectory;

	@Override
	public Customer create(Customer customer) {
		Customer exist = customerRepository.findByEmail(customer.getEmail());
		if (exist != null) {
			throw new IllegalArgumentException("customer.already.exists");
		}

		
		String folder = RandomStringUtils.randomAlphabetic(10);
		String dirRef = baseDirectory.concat(folder);
		System.out.println("User Folder: " + dirRef);

		boolean success = (new File(dirRef)).mkdirs();
		if (success) {

			customer.setFolder(folder);
			customer.setEncodedPassword(passwordEncoder.encode(customer.getPassword()));
			customer.setPassword(null);
			return customerRepository.save(customer);
		}
		
		throw new IllegalStateException("system.error");

		
	}

	@Override
	public Customer update(Customer customer) {
		Customer exist = customerRepository.findByEmail(customer.getEmail());
		if (exist == null) {
			throw new IllegalArgumentException("customer.does.not.exist");
		}
		return customerRepository.save(customer);
	}

	@Override
	public List<Customer> findAll() {
		return (List<Customer>) customerRepository.findAll();
	}

	@Override
	public void delete(Long id) {
		Customer exist = customerRepository.findOne(id);
		if (exist == null) {
			throw new IllegalArgumentException("customer.does.not.exist");
		}
		customerRepository.delete(id);
	}

	@Override
	public Customer findByEmail(String email) {
		return customerRepository.findByEmail(email);
	}

	@Override
	public Customer findByPhoneNumber(String phone) {
		return customerRepository.findByPhoneNumber(phone);
	}

	@Override
	public Customer findByRegistrationNumber(String registrationNumber) {
		return customerRepository.findByRegistrationNumber(registrationNumber);
	}

	@Override
	public Customer findUser(Customer customer) {
		Customer exist = customerRepository.findByEmailAndPassword(
				customer.getEmail(), customer.getPassword());
		if (exist == null) {
			throw new IllegalArgumentException("error: Authentication Failed");
		}
		return exist;
	}

	@Override
	public Document upload() {
		return null;
	}

	@Override
	public Document download(String name) {
		return null;
	}

	// @PostConstruct
	/*
	 * public void populate(){ Customer customer = new Customer();
	 * customer.setNom("Kamga"); customer.setPrenom("Maurice");
	 * customer.setAdresse("Makepe"); customer.setCni("125548518");
	 * customer.setTelephone("688778899"); customerRepository.save(customer);
	 * 
	 * customer = new Customer(); customer.setNom("Kemogne");
	 * customer.setPrenom("Jean"); customer.setAdresse("Makepe");
	 * customer.setCni("125548518"); customer.setTelephone("688778899");
	 * customerRepository.save(customer); }
	 */
}
