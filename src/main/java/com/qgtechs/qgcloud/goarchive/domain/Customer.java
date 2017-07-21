package com.qgtechs.qgcloud.goarchive.domain;

import java.util.Date;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonView;
import com.qgtechs.qgcloud.goarchive.view.Views;

@Entity
// @Data
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonView(Views.Private.class)
	private Long id;
	
	@JsonView(Views.Private.class)
	private String registrationNumber;
	
	@JsonView(Views.Public.class)
	private String firstName;
	
	@JsonView(Views.Public.class)
	private String lastName;
	
	@JsonView(Views.Private.class)
	private String password;
	
	@JsonView(Views.Public.class)
	private String email;
	
	@JsonView(Views.Public.class)
	private String phoneNumber;

	@Column(nullable = false)
	@JsonView(Views.Private.class)
	private String encodedPassword;

	@Column(nullable = false)
	private Boolean enabled = true;

	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	@JsonView(Views.Public.class)
	private Status status = Status.ACTIVATED;

	@JsonView(Views.Private.class)
	private String folder;

	@CreatedDate
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	@JsonView(Views.Private.class)
	private Date creationDate = new Date();

	@LastModifiedDate
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	@JsonView(Views.Private.class)
	private Date lastModificationDate = new Date();

	@ManyToOne
	@JsonView(Views.Public.class)
	private Company company;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getLastModificationDate() {
		return lastModificationDate;
	}

	public void setLastModificationDate(Date lastModificationDate) {
		this.lastModificationDate = lastModificationDate;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getFolder() {
		return folder;
	}

	public void setFolder(String folder) {
		this.folder = folder;
	}

	public String getEncodedPassword() {
		return encodedPassword;
	}

	public void setEncodedPassword(String encodedPassword) {
		this.encodedPassword = encodedPassword;
	}

	public Boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
