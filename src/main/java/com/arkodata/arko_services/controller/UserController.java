package com.arkodata.arko_services.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.arkodata.arko_services.service.UserService;

@Controller
public class UserController {

	private UserService userService;

	public UserService getUserService() {
		return userService;
	}
	
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
	@RequestMapping("/user.do")
	public void user(@RequestParam(value="id",required=false,defaultValue="1") int id){
		System.out.println(userService.findUserById(id).getName());
	}
}
