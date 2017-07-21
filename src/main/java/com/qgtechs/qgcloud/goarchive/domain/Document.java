package com.qgtechs.qgcloud.goarchive.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonView;
import com.qgtechs.qgcloud.goarchive.view.Views;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.Date;

@Entity
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.Private.class)
    private long id;
    
    @JsonView(Views.Private.class)
    private String code;
    
    @JsonView(Views.Public.class)
    private String name;
    
    @JsonView(Views.Public.class)
    private String link;
    
    @JsonView(Views.Public.class)
    private long size;
    
    @JsonView(Views.Public.class)
    private String description;
    
    @JsonView(Views.Public.class)
    private String extension;
    
    @JsonView(Views.Public.class)
    private String type;

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
    @JsonView(Views.Private.class)
    private Customer customer;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
    
    
}
