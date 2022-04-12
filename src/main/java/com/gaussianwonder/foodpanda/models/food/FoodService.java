package com.gaussianwonder.foodpanda.models.food;

import com.gaussianwonder.foodpanda.models.category.Category;
import com.gaussianwonder.foodpanda.models.category.CategoryService;
import com.gaussianwonder.foodpanda.models.food.dto.CreateFoodDto;
import com.gaussianwonder.foodpanda.models.food.dto.UpdateFoodDto;
import com.gaussianwonder.foodpanda.models.restaurant.Restaurant;
import com.gaussianwonder.foodpanda.models.restaurant.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
    final FoodRepo foodRepo;
    final RestaurantService restaurantService;
    final CategoryService categoryService;

    @Autowired
    public FoodService(
            FoodRepo foodRepo,
            RestaurantService restaurantService,
            CategoryService categoryService
    ) {
        this.foodRepo = foodRepo;
        this.restaurantService = restaurantService;
        this.categoryService = categoryService;
    }

    public List<Food> of(Long restaurantId) {
        return this.foodRepo.findFoodsByRestaurant_Id(restaurantId);
    }

    public Optional<Food> createFor(CreateFoodDto foodDto, Long restaurantId) {
        return this.restaurantService
                .ofAuthed()
                .filter(restaurant -> restaurant.getId().equals(restaurantId))
                .flatMap(restaurant -> {
                    Food food = new Food(
                            foodDto.getName(),
                            foodDto.getDescription(),
                            foodDto.getPrice()
                    );
                    food.setRestaurant(restaurant);
                    return this.categoryService
                            .findId(foodDto.getCategoryId())
                            .map(category -> {
                                food.setCategory(category);
                                this.foodRepo.save(food);
                                return food;
                            });
                });
    }

    public List<Food> ofAuthed() {
        return this.restaurantService
                .ofAuthed()
                .map(Restaurant::getFoodList)
                .orElse(Collections.emptyList());
    }

    public boolean isOfAuthed(Long foodId) {
        if (foodId == null) return false;
        return this.ofAuthed()
                .stream()
                .anyMatch(f -> f.getId().equals(foodId));
    }

    public Boolean delete(Long id) {
        return this.foodRepo
                .findById(id)
                .map(food -> this.restaurantService
                        .ofAuthed()
                        .map(restaurant -> {
                            ArrayList<Food> oldList = new ArrayList<>(restaurant.getFoodList());
                            ArrayList<Food> newFoods = new ArrayList<>(
                                    oldList.stream()
                                            .filter(f -> !f.getId().equals(id))
                                            .toList()
                            );
                            restaurant.setFoodList(newFoods);
                            this.restaurantService.updateComputed(restaurant);
                            this.foodRepo.delete(food);
                            return true;
                        })
                        .orElse(false)
                )
                .orElse(false);
    }

    public Optional<Food> update(UpdateFoodDto foodDto) {
        return this.foodRepo
                .findById(foodDto.getId())
                .filter(food -> this.isOfAuthed(food.getId()))
                .map(food -> {
                    food.setName(foodDto.getName());
                    food.setDescription(foodDto.getDescription());
                    food.setPrice(foodDto.getPrice());
                    this.foodRepo.save(food);
                    return food;
                });
    }
}
