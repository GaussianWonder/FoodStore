package com.gaussianwonder.foodpanda.models.order;

import com.gaussianwonder.foodpanda.models.food.Food;
import com.gaussianwonder.foodpanda.models.user.User;

import javax.persistence.*;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    User user;

    @ManyToMany()
    @JoinTable(
            name = "cart_items",
            joinColumns = { @JoinColumn(name = "order_id") },
            inverseJoinColumns = { @JoinColumn(name = "food_id") }
    )
    List<Food> foodList = Collections.emptyList();

    @Column(nullable = false)
    Double price;

    @Column(nullable = false)
    Date date;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;

    public Order() {}
    public Order(Double price, Date date) {
        this.price = price;
        this.date = date;
    }
    public Order(List<Food> foodList) {
        this.foodList = foodList;
        this.date = new Date(System.currentTimeMillis());
        AtomicReference<Double> priceSum = new AtomicReference<>(0.0);
        foodList.forEach(food -> priceSum.updateAndGet(v -> v + food.getPrice()));
        this.price = priceSum.get();
        this.orderStatus = OrderStatus.PENDING;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }
}
