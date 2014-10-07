package com.arkodata.arko_services.services;

import org.springframework.stereotype.Component;

@Component
public class HelloServiceImpl implements HelloService{

	public String sayHello() {
		return "hello";
	}

	public String sayBye() {
		return "bye";
	}
	
}
