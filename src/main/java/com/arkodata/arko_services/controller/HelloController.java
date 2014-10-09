package com.arkodata.arko_services.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.arkodata.arko_services.service.HelloService;

@Controller
@RequestMapping("/hello.do")
public class HelloController {

	private HelloService hs;
	
	@Autowired
	public void setHelloService(HelloService hs){
		this.hs = hs;
	}
		
		@RequestMapping(params = "method=sayHello")
		public ModelAndView sayHello(){
			System.out.println("sayHello...");
			
			return new ModelAndView(hs.sayHello());
		}
		
		@RequestMapping(params = "method=sayBye")
		public ModelAndView sayBye(){
			System.out.println("sayBye...");
			
			return new ModelAndView(hs.sayBye());
		}
}
