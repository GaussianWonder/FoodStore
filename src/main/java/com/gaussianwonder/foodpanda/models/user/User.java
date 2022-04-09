package com.gaussianwonder.foodpanda.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gaussianwonder.foodpanda.models.order.Order;
import com.gaussianwonder.foodpanda.models.restaurant.Restaurant;
import com.gaussianwonder.foodpanda.util.Hash;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id = null;

    @Column(nullable = false, unique = true)
    String username = null;

    @Column(nullable = false)
    String password = null;

    @Column(nullable = false)
    boolean isAdmin = false;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    Restaurant restaurant;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Order> orderList;

    public User(String username, String password) {
        this.username = username;
        this.password = Hash.bcrypt(password);
    }

    public User(String username, String password, boolean isAdmin) {
        this.username = username;
        this.password = Hash.bcrypt(password);
        this.isAdmin = isAdmin;
    }

    public User() {}

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> authorities = new ArrayList<>();
        if (isAdmin) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
