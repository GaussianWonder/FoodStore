package com.gaussianwonder.foodpanda.models.food;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepo extends JpaRepository<Food, Long> {
    List<Food> findFoodsByRestaurant_Id(Long id);
}
