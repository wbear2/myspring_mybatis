package com.arkodata.arko_services.services;

import org.springframework.security.access.annotation.Secured;

public interface HelloService {
	
	@Secured({"ROLE_USER","ROLE_ADMIN"})
	public String sayHello();
	
	@Secured({"ROLE_ADMIN"})
	public String sayBye();
}
