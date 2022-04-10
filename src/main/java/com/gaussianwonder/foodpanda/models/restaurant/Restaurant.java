package com.gaussianwonder.foodpanda.models.restaurant;

import com.gaussianwonder.foodpanda.models.food.Food;
import com.gaussianwonder.foodpanda.models.user.User;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @Column(unique = true, nullable = false)
    String name;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Food> foodList = Collections.emptyList();

    public Restaurant() {}
    public Restaurant(String name) {
        this.name = name;
    }
    public Restaurant(String name, User user) {
        this.name = name;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Food> getFoodList() {
        return foodList;
    }

    public void setFoodList(List<Food> foodList) {
        this.foodList = foodList;
    }
}
