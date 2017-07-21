package com.qgtechs.qgcloud.goarchive.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.requestMatchers().antMatchers("/**").and().authorizeRequests()
                .antMatchers(HttpMethod.GET, "/").permitAll()
                .antMatchers("/controllers/**")
                .permitAll().antMatchers("/directives/**")
                .permitAll().antMatchers("/images/**")
                .permitAll().antMatchers("/fonts/**")
                .permitAll().antMatchers("/partials/**")
                .permitAll().antMatchers("/services/**")
                .permitAll().antMatchers("/stylesheets/**")
                .permitAll().antMatchers("/vendor/**")
                .permitAll().antMatchers("/app.js")
                .permitAll().antMatchers("/favicon.png")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/customer/register")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/activation/**")
                .permitAll()
                .anyRequest().fullyAuthenticated().and().
                httpBasic().and().
                csrf().disable();
    }

}