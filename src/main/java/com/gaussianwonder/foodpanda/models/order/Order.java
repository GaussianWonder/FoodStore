package com.gaussianwonder.foodpanda.models.order;

import com.gaussianwonder.foodpanda.models.food.Food;
import com.gaussianwonder.foodpanda.models.user.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    User user;

    @ManyToMany()
    @JoinTable(
            name = "cart_items",
            joinColumns = { @JoinColumn(name = "order_id") },
            inverseJoinColumns = { @JoinColumn(name = "food_id") }
    )
    List<Food> foodList;

    @Column(nullable = false) Double price;

    @Column(nullable = false) Date date;

    public Order() {}
    public Order(Double price, Date date) {
        this.price = price;
        this.date = date;
    }
}
