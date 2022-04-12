package com.gaussianwonder.foodpanda.models.food.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class CreateFoodDto {
    @NotNull(message = "ID cannot be null")
    @Positive(message = "Invalid ID")
    Long categoryId;

    @NotEmpty(message = "The food name cannot be empty")
    @Size(min = 1, max = 255, message = "The name should contain between [1, 255] characters")
    String name;

    @NotEmpty(message = "The food description cannot be empty")
    @Size(min = 4, max = 255, message = "The description should contain between [4, 255] characters")
    String description;

    @NotNull
    @Positive
    Double price;

    public CreateFoodDto(Long categoryId, String name, String description, Double price) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
