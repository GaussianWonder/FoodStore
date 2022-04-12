package com.gaussianwonder.foodpanda.models.food;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gaussianwonder.foodpanda.models.category.Category;
import com.gaussianwonder.foodpanda.models.order.Order;
import com.gaussianwonder.foodpanda.models.restaurant.Restaurant;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "foods")
public class Food {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String description;

    @Column(nullable = false)
    Double price;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    Category category;

    @ManyToMany(mappedBy = "foodList")
    List<Order> orderList = Collections.emptyList();

    @ManyToOne()
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference
    Restaurant restaurant;

    public Food() {}
    public Food(String name, String description, Double price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Order> getOrderList() {
        return orderList;
    }

    public void setOrderList(List<Order> orderList) {
        this.orderList = orderList;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
