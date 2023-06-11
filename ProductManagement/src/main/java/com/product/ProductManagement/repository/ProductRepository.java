package com.product.ProductManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.ProductManagement.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

}
