package com.ezen.springfeed.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ezen.springfeed.dao.IMemberDao;

@Service
public class MemberService {

	@Autowired
	IMemberDao mdao;
	
	public void getMember(HashMap<String, Object> paramMap) {
		mdao.getMember(paramMap);
	}

	public void idCheck(HashMap<String, Object> paramMap) {
		mdao.idCheck(paramMap);
	}

	@Transactional
	public void insertMember(HashMap<String, Object> paramMap) {
		mdao.insertMember(paramMap);
	}

	public void insertFollow(HashMap<String, Object> paramMap) {
		mdao.insertFollow(paramMap);
	}

	public void addNotification(HashMap<String, Object> paramMap) {
		mdao.addNotification(paramMap);
	}

	public void unfollow(HashMap<String, Object> paramMap) {
		mdao.unfollow(paramMap);
	}

	public void phoneCheck(HashMap<String, Object> paramMap) {
		mdao.phoneCheck(paramMap);
	}

	public void getNotification(HashMap<String, Object> paramMap) {
		mdao.getNotification(paramMap);
	}

	@Transactional
	public void userEdit(HashMap<String, Object> paramMap) {
		mdao.userEdit(paramMap);
	}

	public void deleteAcount(HashMap<String, Object> paramMap) {
		mdao.deleteAcount(paramMap);
	}

	public void activateAccount(String userid) {
		mdao.activateAccount(userid);
	}

	public void getFollow(HashMap<String, Object> followMap) {
		mdao.getFollow(followMap);
	}

	public void getNotiCount(HashMap<String, Object> paramMap) {
		mdao.getNotiCount(paramMap);
	}

	public void findId(HashMap<String, Object> paramMap) {
		mdao.findId(paramMap);
	}
	public void userEmailCheck(String email, String name, boolean pwFindCheck) {
		mdao.userEmailCheck(email, name, pwFindCheck);
	}

	public void updatePassword(String str, String email) {
		mdao.updatePassword(str, email);
	}

	public void getFollowedList(HashMap<String, Object> paramMap) {
		mdao.getFollowedList(paramMap);
	}
}