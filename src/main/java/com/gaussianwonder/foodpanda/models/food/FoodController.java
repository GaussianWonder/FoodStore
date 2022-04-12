package com.gaussianwonder.foodpanda.models.food;

import com.gaussianwonder.foodpanda.models.food.dto.CreateFoodDto;
import com.gaussianwonder.foodpanda.models.food.dto.UpdateFoodDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

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

    @RolesAllowed("ADMIN")
    @PostMapping("/foods/{restaurantID}")
    public ResponseEntity<Food> addFoodToRestaurant(
            @PathVariable(value="restaurantID")
            @NotNull(message = "ID cannot be null")
            @Positive(message = "Invalid ID")
            final Long id,
            @Valid
            @RequestBody
            final CreateFoodDto foodDto
    ) {
        Food food = this.foodService.createFor(foodDto, id)
                .orElse(null);

        if (food == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @RolesAllowed("ADMIN")
    @DeleteMapping("/foods/{foodID}")
    public ResponseEntity<Boolean> removeFood(
            @PathVariable(value="foodID")
            @NotNull(message = "ID cannot be null")
            @Positive(message = "Invalid ID")
            final Long id
    ) {
        Boolean success = this.foodService
                .delete(id);

        if (success == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

        if (!success) {
            return new ResponseEntity<>(false, HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @RolesAllowed("ADMIN")
    @PutMapping("/foods/{foodID}")
    public ResponseEntity<Food> updateFood(
            @PathVariable(value="foodID")
            @NotNull(message = "ID cannot be null")
            @Positive(message = "Invalid ID")
            final Long id,
            @Valid
            @RequestBody
            final UpdateFoodDto foodDto
    ) {
        Food food = this.foodService
                .update(foodDto)
                .orElse(null);

        if (food == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(food, HttpStatus.OK);
    }
}
