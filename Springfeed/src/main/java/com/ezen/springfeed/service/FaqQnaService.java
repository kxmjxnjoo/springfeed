package com.ezen.springfeed.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ezen.springfeed.dao.IFaqQnaDao;

@Service
public class FaqQnaService {

	@Autowired
	IFaqQnaDao fqdao;
	
	
	/*
	public void adminFaqList(HashMap<String, Object> paramMap) {
		fqdao.adminfaqList(paramMap);
	}
		
	public void addFaq(HashMap<String, Object> paramMap) {
		fqdao.addFaq(paramMap);
	}
		
	public void addQna(HashMap<String, Object> paramMap) {
		fqdao.addQna(paramMap);

	}

	public void deleteFaq(HashMap<String, Object> paramMap) {
		fqdao.deleteFaq(paramMap);
	}

	public void deleteQna(HashMap<String, Object> paramMap) {
		fqdao.deleteQna(paramMap);
	}
*/



}