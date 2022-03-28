package com.ezen.springfeed.dao;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IAdminDao {

	void checkAdmin(HashMap<String, Object> paramMap);

	void getAllCount(HashMap<String, Object> paramMap);

	void memberList(HashMap<String, Object> paramMap);

}