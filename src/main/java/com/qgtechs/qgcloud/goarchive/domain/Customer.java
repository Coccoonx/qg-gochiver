package com.qgtechs.qgcloud.goarchive.domain;

import java.util.Date;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
// @Data
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String registrationNumber;
	private String firstName;
	private String lastName;
	private String password;
	private String email;
	private String phoneNumber;

	@Column(nullable = false)
	private String encodedPassword;

	@Column(nullable = false)
	private Boolean enabled = true;

	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	private Status status = Status.ACTIVATED;

	private String folder;

	private long quotaMax;
	private long quotaCurrent;

	@CreatedDate
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate = new Date();

	@LastModifiedDate
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModificationDate = new Date();

	@ManyToOne
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

	public long getQuotaMax() {
		return quotaMax;
	}

	public void setQuotaMax(long quotaMax) {
		this.quotaMax = quotaMax;
	}

	public long getQuotaCurrent() {
		return quotaCurrent;
	}

	public void setQuotaCurrent(long quotaCurrent) {
		this.quotaCurrent = quotaCurrent;
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
