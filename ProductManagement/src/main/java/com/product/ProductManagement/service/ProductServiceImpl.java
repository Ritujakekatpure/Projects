package com.product.ProductManagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.ProductManagement.Entity.Product;
import com.product.ProductManagement.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepository productRepo;

	@Override
	public Product saveProduct(Product product) {
		// TODO Auto-generated method stub
		
		return productRepo.save(product);

		
	}

	@Override
	public List<Product> getAllProduct() {
		// TODO Auto-generated method stub
		return productRepo.findAll();
	}

	@Override
	public Product getProductById(Integer id) {
		// TODO Auto-generated method stub
		return productRepo.findById(id).get();
		
		
	}

	@Override
	public String deleteProduct(Integer id) {
		// TODO Auto-generated method stub
		 Product product = productRepo.findById(id).get();
		 if(product != null)
		 {
			 productRepo.delete(product);
			 return "Product deleted Successfully";
		 }
		 return "Something Went Wrong";
	}

	@Override
	public Product editProduct(Product product, Integer id) {
		Product oldProduct = productRepo.findById(id).get();
		oldProduct.setProductName(product.getProductName());
		oldProduct.setWarranty(product.getWarranty());
		oldProduct.setBillNumber(product.getBillNumber());
		oldProduct.setDate(product.getDate());
		return productRepo.save(oldProduct);
	}

}
