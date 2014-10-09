package com.arkodata.arko_services.mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.arkodata.arko_services.domain.User;

public interface UserMapper {
	
	@Select("select * from user where id=${id}")
	public User findUserById(@Param("id") int id);
	
}
