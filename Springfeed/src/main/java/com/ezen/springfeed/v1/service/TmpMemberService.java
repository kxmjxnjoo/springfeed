//package com.ezen.springfeed.tmp.service;
//
//import java.util.HashMap;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import com.ezen.springfeed.tmp.dao.IMemberDao;
//
//@Service
//public class TmpMemberService {
//
//	@Autowired
//	IMemberDao mdao;
//
//	public void getMember(HashMap<String, Object> paramMap) {
//		mdao.getMember(paramMap);
//	}
//
//	public void idCheck(HashMap<String, Object> paramMap) {
//		mdao.idCheck(paramMap);
//	}
//
//	@Transactional
//	public void insertMember(HashMap<String, Object> paramMap) {
//		mdao.insertMember(paramMap);
//	}
//
//	public void insertFollow(HashMap<String, Object> paramMap) {
//		mdao.insertFollow(paramMap);
//	}
//
//	public void addNotification(HashMap<String, Object> paramMap) {
//		mdao.addNotification(paramMap);
//	}
//
//	public void unfollow(HashMap<String, Object> paramMap) {
//		mdao.unfollow(paramMap);
//	}
//
//	public void phoneCheck(HashMap<String, Object> paramMap) {
//		mdao.phoneCheck(paramMap);
//	}
//
//	public void getNotification(HashMap<String, Object> paramMap) {
//		mdao.getNotification(paramMap);
//	}
//
//	@Transactional
//	public void userEdit(HashMap<String, Object> paramMap) {
//		mdao.userEdit(paramMap);
//	}
//
//	public void deleteAcount(HashMap<String, Object> paramMap) {
//		mdao.deleteAcount(paramMap);
//	}
//
//	public void activateAccount(HashMap<String, Object> paramMap) {
//		mdao.activateAccount(paramMap);
//	}
//
//	public void getFollow(HashMap<String, Object> followMap) {
//		mdao.getFollow(followMap);
//	}
//
//	public void findId(HashMap<String, Object> paramMap) {
//		mdao.findId(paramMap);
//	}
//
//	public void userEmailCheck(String email, String name, boolean pwFindCheck) {
//		mdao.userEmailCheck(email, name, pwFindCheck);
//	}
//
//	public void updatePassword(String str, String email) {
//		mdao.updatePassword(str, email);
//	}
//
//	public void getFollowedList(HashMap<String, Object> paramMap) {
//		mdao.getFollowedList(paramMap);
//	}
//
//	public void getNotiCount(HashMap<String, Object> paramMap) {
//		mdao.getNotiCount(paramMap);
//	}
//
//	public void blockMember(HashMap<String, Object> paramMap) {
//		mdao.blockMember(paramMap);
//	}
//
//	public void unblockMember(HashMap<String, Object> paramMap) {
//		mdao.unblockMember(paramMap);
//	}
//
//	public void blockCheck(HashMap<String, Object> paramMap) {
//		mdao.blockCheck(paramMap);
//	}
//
//	public void privateAccount(String userid) {
//		mdao.privateAccount(userid);
//	}
//
//	public void PublicAccount(String userid) {
//		mdao.PublicAccount(userid);
//	}
//
//    public void getFollowerCount(HashMap<String, Object> paramMap) {
//		mdao.getFollowerCount(paramMap);
//    }
//
//	public void getFollowingCount(HashMap<String, Object> paramMap) {
//		mdao.getFollowingCount(paramMap);
//	}
//
//    public void getFollowerList(HashMap<String, Object> paramMap) {
//		mdao.getFollowerList(paramMap);
//    }
//
//	public void findPw(HashMap<String, Object> paramMap) {
//		mdao.findPw(paramMap);
//	}
//
//	public void changePw(String userid, String tempPassword) {
//		mdao.changePw(userid, tempPassword);
//	}
//
//	public void findRecentStory(HashMap<String, Object> paramMap) {
//		mdao.findRecentStory(paramMap);
//	}
//
//    public void getIsFollowing(HashMap<String, Object> paramMap) {
//		mdao.getIsFollowing(paramMap);
//    }
//}