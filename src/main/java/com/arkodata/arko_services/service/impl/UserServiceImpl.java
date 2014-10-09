package com.arkodata.arko_services.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arkodata.arko_services.domain.User;
import com.arkodata.arko_services.mapper.UserMapper;
import com.arkodata.arko_services.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	private UserMapper userMapper;
	
	public UserMapper getUserMapper() {
		return userMapper;
	}

	@Autowired
	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	public User findUserById(int id) {
		return userMapper.findUserById(id);
	}

}
