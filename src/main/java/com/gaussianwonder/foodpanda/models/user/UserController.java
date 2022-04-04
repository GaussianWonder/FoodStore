package com.gaussianwonder.foodpanda.models.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping
public class UserController {
    UserService service;

    @Autowired
    public UserController(
            final UserService service
    ) {
        this.service = service;
    }

    @RolesAllowed("ADMIN")
    @GetMapping("/find")
    public User findUser(
            @RequestParam Long id
    ) {
        return service.find(id).orElse(null);
    }
}
