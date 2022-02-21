package com.controller.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.dao.PostDao;
import com.dto.MemberDto;
import com.dto.PostDto;

public class ReportFormAction implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = "/post/report.jsp";
		HttpSession session = request.getSession();
		MemberDto mdto = (MemberDto) session.getAttribute("loginUser");
		if(mdto==null) url = "spring.do?command=login";
		else{
			System.out.println("story_num is null? : " +request.getParameter("story_num"));//////////////////////////////
			if(request.getParameter("story_num") == null) {
				int post_num = Integer.parseInt(request.getParameter("post_num"));
				request.setAttribute("post_num", post_num);
				System.out.println("post_num : " + request.getAttribute("post_num"));//////////////////////
			} else {
				int story_num = Integer.parseInt(request.getParameter("story_num"));
				request.setAttribute("story_num", story_num);
				System.out.println("story_num : " + request.getAttribute("story_num"));////////////////////////////////////
			} 
		}
		request.getRequestDispatcher(url).forward(request, response);
	}
}
