package com.gaussianwonder.foodpanda.models.food;

import com.gaussianwonder.foodpanda.models.food.dto.FoodRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Controller
public class FoodController {
    final FoodService foodService;

    @Autowired
    public FoodController(
            FoodService foodService
    ) {
        this.foodService = foodService;
    }

    @RolesAllowed({"ADMIN", "USER"})
    @GetMapping("/foods/{restaurantID}")
    public ResponseEntity<List<Food>> foodsOfRestaurant(
            @PathVariable(value="restaurantID")
            @NotNull(message = "ID cannot be null")
            @Positive(message = "Invalid ID")
            final Long id
    ) {
        return new ResponseEntity<>(
                this.foodService.of(id),
                HttpStatus.OK
        );
    }
}
