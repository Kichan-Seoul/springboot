package com.study.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.springboot.components.Cart;
import com.study.springboot.service.CartService;

@Controller
@RequestMapping("/react")
public class CartController {
	@Autowired
	CartService cartService;
	
	@PostMapping("/addCart")
	public String addcart(@RequestBody Cart cart) {
		cart.setMemId("user01");
		cartService.addcart(cart);
	}
}
