package com.gaussianwonder.foodpanda.auth;

import com.gaussianwonder.foodpanda.auth.dto.AuthDto;
import com.gaussianwonder.foodpanda.auth.dto.AuthResponseDto;
import com.gaussianwonder.foodpanda.models.user.User;
import com.gaussianwonder.foodpanda.models.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/auth")
public class AuthApi {
    AuthService auth;
    UserService service;

    @Autowired
    public AuthApi(
            AuthService auth,
            UserService service
    ) {
        this.auth = auth;
        this.service = service;
    }

    @PostMapping("/register")
    public AuthResponseDto register(@RequestBody AuthDto loginDto) {
        User user = new User(loginDto.getUsername(), loginDto.getPassword());
        service.save(user);

        Optional<String> token = auth.login(
                loginDto.getUsername(),
                loginDto.getPassword()
        );

        if (token.isEmpty()) {
            throw new RuntimeException("invalid login and/or password");
        }

        return new AuthResponseDto(user, token.get());
    }

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody AuthDto loginDto) {
        Optional<String> token = auth.login(
                loginDto.getUsername(),
                loginDto.getPassword()
        );

        if (token.isEmpty()) {
            throw new RuntimeException("invalid login and/or password");
        }

        Optional<User> user = service.findByUsername(loginDto.getUsername());

        if (user.isEmpty()) {
            throw new RuntimeException("cannot find the given user");
        }

        return new AuthResponseDto(user.get(), token.get());
    }

    // TODO once sessions exist, add POST and GET mappings for logout
}
