package com.gaussianwonder.foodpanda.auth;

import com.gaussianwonder.foodpanda.auth.dto.AuthDto;
import com.gaussianwonder.foodpanda.auth.dto.AuthRegisterDto;
import com.gaussianwonder.foodpanda.auth.dto.AuthResponseDto;
import com.gaussianwonder.foodpanda.models.user.User;
import com.gaussianwonder.foodpanda.models.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody AuthRegisterDto registerDto) {
        User user = new User(registerDto.getUsername(), registerDto.getPassword(), registerDto.isRestaurantOwner());
        service.save(user);

        Optional<String> token = auth.login(
                registerDto.getUsername(),
                registerDto.getPassword()
        );

        if (token.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new AuthResponseDto(user, token.get()), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody AuthDto loginDto) {
        Optional<String> token = auth.login(
                loginDto.getUsername(),
                loginDto.getPassword()
        );

        if (token.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Optional<User> user = service.findByUsername(loginDto.getUsername());

        if (user.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new AuthResponseDto(user.get(), token.get()), HttpStatus.ACCEPTED);
    }

    // TODO once sessions exist, add POST and GET mappings for logout
}
