package com.ezen.springfeed.dao;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IAdminDao {

	void checkAdmin(HashMap<String, Object> paramMap);

	void getAllCount(HashMap<String, Object> paramMap);

	void memberList(HashMap<String, Object> paramMap);

	void searchMember(HashMap<String, Object> paramMap);

	void reportList(HashMap<String, Object> paramMap);

	void postReportCheck(HashMap<String, Object> paramMap);

	void storyReportCheck(HashMap<String, Object> paramMap);

	void deletePost(HashMap<String, Object> paramMap);

	void deleteStory(HashMap<String, Object> paramMap);
	
	void blockUser(HashMap<String, Object> paramMap);

	void getAllCount_r(HashMap<String, Object> paramMap);

	void getAllCount_q(HashMap<String, Object> paramMap);
}