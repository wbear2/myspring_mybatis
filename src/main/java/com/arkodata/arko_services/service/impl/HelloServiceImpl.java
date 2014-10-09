package com.arkodata.arko_services.service.impl;

import org.springframework.stereotype.Component;

import com.arkodata.arko_services.service.HelloService;

@Component
public class HelloServiceImpl implements HelloService{

	public String sayHello() {
		return "hello";
	}

	public String sayBye() {
		return "bye";
	}
	
}
