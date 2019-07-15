package nim.webrtc.api.config;

import nim.webrtc.api.authentication.AuthFailureHandler;
import nim.webrtc.api.authentication.AuthSuccessHandler;
import nim.webrtc.api.authentication.JWTAuthenticationFilter;
import nim.webrtc.api.base.CustomEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("userDetailsServiceImpl")
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthSuccessHandler authSuccessHandler;

    @Autowired
    private AuthFailureHandler authFailureHandler;

    @Bean
    public CustomEncoder customEncoder() {
        return new CustomEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(customEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter();

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.formLogin()
                .loginPage("/auth/login/info")
                .loginProcessingUrl("/auth/login")
                .successHandler(authSuccessHandler)
                .failureHandler(authFailureHandler);
        http.authorizeRequests()
                .antMatchers("/auth/login/info", "/auth/login", "/auth/logout", "/api/**")
                .permitAll()
                .anyRequest()
                .authenticated();
        http.logout().logoutSuccessUrl("/auth/logout");

        http.csrf().disable();
        http.cors();
    }
}

