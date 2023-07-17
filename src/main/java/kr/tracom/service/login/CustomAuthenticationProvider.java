package kr.tracom.service.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import kr.tracom.util.Sha256;

public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
    private UserDetailsService userDetailsService;

    //@Autowired
    //private PasswordEncoder passwordEncoder;


    // 검쯩을 위한 구현
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getName();
        String password = (String)authentication.getCredentials();

        UserDetails userDetails = (UserDetails) userDetailsService.loadUserByUsername(username);

        if(userDetails!=null&&Sha256.getHashTwo((String) password, "".getBytes(),(String) username).equals(userDetails.getPassword())){
        	
        }
        else {
        	throw new BadCredentialsException("BadCredentialsException");
        }
        
        // password 일치하지 않으면!
        //if(!passwordEncoder.matches(password,userDetails.getPassword())){
        //    throw new BadCredentialsException("BadCredentialsException");
        //}

        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(
                		userDetails.getUsername(),
                		userDetails.getPassword(),
                userDetails.getAuthorities());

        return authenticationToken;
    }

    // 토큰 타입과 일치할 때 인증
    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
