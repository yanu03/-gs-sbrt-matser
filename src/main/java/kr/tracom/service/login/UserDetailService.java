package kr.tracom.service.login;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.tracom.service.cm.User.UserService;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
public class UserDetailService  implements UserDetailsService{

	@Autowired
	private UserService userService;;
	
    @Override
    public UserDetails loadUserByUsername(String userID) throws UsernameNotFoundException {
    	Map memberMap = userService.searchByID(userID);

        if (memberMap == null) {
            return null;
        }

        
        String pw = (String) memberMap.get("USER_PS");
        //String roles = user.getRoles();

        return User.builder()
                .username(userID)
                .password(pw)
                .roles("")
                .build();
    }
}
