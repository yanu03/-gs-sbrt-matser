package kr.tracom.beans;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import kr.tracom.service.login.CustomAuthFailureHandler;
import kr.tracom.service.login.CustomAuthSuccessHandler;
import kr.tracom.service.login.CustomAuthenticationProvider;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	
	//@Autowired
    //private AuthenticationProvider authenticationProvider;
	
	//@Autowired
    //private AuthenticationSuccessHandler authenticationSuccessHandler;
	
	
    //@Autowired
    //UserDetailService userDetailService;
    
	/*
	 * @Bean public PasswordEncoder passwordEncoder() { return new
	 * BCryptPasswordEncoder(); }
	 */
	
    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new CustomAuthSuccessHandler();
    }
    
    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new CustomAuthFailureHandler();
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new CustomAuthenticationProvider();
    }
    
    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/**", "/static/**", "/jsp/**", "/favicon.ico").permitAll()    // LoadBalancer Chk
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/user/login")
                .loginProcessingUrl("/loginProcess")
                .usernameParameter("username")
                .passwordParameter("password")
                //.successForwardUrl("/user/login_proc")
                //.failureForwardUrl("/user/login")
                //.defaultSuccessUrl("/user/login_proc", true)
                .successHandler(authenticationSuccessHandler())
                .failureHandler(authenticationFailureHandler())
                .permitAll()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/user/login"))
                .logoutSuccessUrl("/user/login")
                .invalidateHttpSession(true);
        //http.authenticationProvider(authenticationProvider);
        http.exceptionHandling()
        .authenticationEntryPoint(new AjaxAuthenticationEntryPoint("/user/login"));
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/user/**", "/static/**", "/jsp/**", "/favicon.ico");
        web.httpFirewall(defaultHttpFirewall());
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        //auth.userDetailsService(userDetailService);
    	auth.authenticationProvider(authenticationProvider());
    }
}