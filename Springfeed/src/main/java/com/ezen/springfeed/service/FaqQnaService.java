package com.ezen.springfeed.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ezen.springfeed.dao.IFaqQnaDao;

@Service
public class FaqQnaService {

	@Autowired
	IFaqQnaDao fqdao;
	
	
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

	public void faqEdit(HashMap<String, Object> paramMap) {
		fqdao.faqEdit(paramMap);
	}

	public void qnaEdit(HashMap<String, Object> paramMap) {
		fqdao.qnaEdit(paramMap);
	}

	public void qnaList(HashMap<String, Object> paramMap) {
		fqdao.qnaList(paramMap);
	}

	public void faqList(HashMap<String, Object> paramMap) {
		fqdao.faqList(paramMap);
	}

	public void getQna(HashMap<String, Object> paramMap) {
		fqdao.getQna(paramMap);
	}

	public void getQnaList(HashMap<String, Object> paramMap) {
		fqdao.getQnaList(paramMap);
	}

	public void getAllQna(HashMap<String, Object> paramMap) {
		fqdao.getAllQna(paramMap);
	}



}