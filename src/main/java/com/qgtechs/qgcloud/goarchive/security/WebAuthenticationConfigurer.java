package com.qgtechs.qgcloud.goarchive.security;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.qgtechs.qgcloud.goarchive.domain.Customer;
import com.qgtechs.qgcloud.goarchive.repository.CustomerRepository;
import com.qgtechs.qgcloud.goarchive.service.CustomerService;

@Configuration
public class WebAuthenticationConfigurer extends GlobalAuthenticationConfigurerAdapter {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
  @Autowired
  CustomerRepository customerRepository;
  
  @Autowired
  CustomerService customerService;

  @Autowired
  DataSource dataSource;
  
  @Autowired
  private UserDetailsService userDetailsService;
  
  
  @Bean
  public DaoAuthenticationProvider authProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
      authProvider.setUserDetailsService(userDetailsService);
      authProvider.setPasswordEncoder(passwordEncoder());
      return authProvider;
  }
  
  @Override
  public void init(AuthenticationManagerBuilder auth) throws Exception {
	  auth.authenticationProvider(authProvider());
  }
  
  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }
  
  @Bean
  UserDetailsService userDetailsService() {
    return new UserDetailsService() {

      @Override
      public UserDetails loadUserByUsername(String phoneOrEmail) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(phoneOrEmail);
        logger.info("Customer found {}",customer);
        if(customer != null) {
        	return new User(customer.getId().toString(), customer.getEncodedPassword(), customer.isEnabled(), true, true, true,
                AuthorityUtils.createAuthorityList("USER"));
        } 
        throw new UsernameNotFoundException("could not find the user '"
                  + phoneOrEmail + "'");
      }
      
    };
  }
}
