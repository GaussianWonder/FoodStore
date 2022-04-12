package com.gaussianwonder.foodpanda.models.restaurant;

import com.gaussianwonder.foodpanda.models.restaurant.dto.RestaurantDto;
import com.gaussianwonder.foodpanda.models.restaurant.dto.UpdateRestaurantDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@Controller
public class RestaurantController {
    final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(
            RestaurantService restaurantService
    ) {
        this.restaurantService = restaurantService;
    }

    @RolesAllowed("ADMIN")
    @PostMapping("/admin/restaurant")
    public ResponseEntity<Restaurant> createRestaurant(
            @Valid @RequestBody RestaurantDto restaurantDto
    ) {
        Restaurant restaurant = this.restaurantService
                .create(restaurantDto)
                .orElse(null);

        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @RolesAllowed("ADMIN")
    @GetMapping("/admin/restaurant")
    public ResponseEntity<Restaurant> getRestaurant() {
        Restaurant restaurant = this.restaurantService
                .ofAuthed()
                .orElse(null);

        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @RolesAllowed("ADMIN")
    @PutMapping("/admin/restaurant")
    public ResponseEntity<Restaurant> updateRestaurant(
            @Valid @RequestBody UpdateRestaurantDto restaurantDto
    ) {
        Restaurant restaurant = this.restaurantService
                .update(restaurantDto)
                .orElse(null);

        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @RolesAllowed({"ADMIN", "USER"})
    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return new ResponseEntity<>(
                this.restaurantService.all(),
                HttpStatus.OK
        );
    }
}
