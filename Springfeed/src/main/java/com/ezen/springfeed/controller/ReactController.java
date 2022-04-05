package com.ezen.springfeed.controller;

import com.ezen.springfeed.dto.MemberDto;
import com.ezen.springfeed.dto.PostDto;
import com.ezen.springfeed.service.MemberService;
import com.ezen.springfeed.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ReactController {

    @Autowired
    PostService ps;

    @Autowired
    MemberService ms;

    // Get user's post
    @RequestMapping("/api/post")
    public ArrayList<PostDto> getPostsByUserid(@RequestParam("userid") String userid) {
        // Get Posts from db
        HashMap<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("userid", userid);
        paramMap.put("ref_cursor", null);
        ps.getPostsByUserid(paramMap);
        ArrayList<HashMap<String, Object>> postHashList =
                (ArrayList<HashMap<String, Object>>)  paramMap.get("ref_cursor");

        // Convert Hashmap to PostDto
        ArrayList<PostDto> postList = new ArrayList<PostDto>();
        for(HashMap<String, Object> postHashmap : postHashList) {
            PostDto pdto = new PostDto();
            pdto.setAddress((String) postHashmap.get("ADDRESS"));
            pdto.setUserid((String) postHashmap.get("USERID"));
            pdto.setPost_img((String) postHashmap.get("POST_IMG"));
            pdto.setContent((String) postHashmap.get("CONTENT"));
            postList.add(pdto);
        }

        return postList;
    }

    // Get loginUser's feed
    @RequestMapping("/api/post/feed")
    @ResponseBody
    public ArrayList<PostDto> getPostFeed(HttpServletRequest request, HttpServletResponse response, @RequestParam(value="page", required=false) Integer page) {

        String userid = getLoginUserid(request);
        if(userid == null) {
            return null;
        }

        // Get 10 posts by pages
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("userid", userid);
        paramMap.put("page", page == null ? 0 : page);
        paramMap.put("ref_cursor", null);
        ps.getPostFeed(paramMap);

        ArrayList<HashMap<String, Object>> list =
                (ArrayList<HashMap<String, Object>>) paramMap.get("ref_cursor");
        if(list.size() == 0 || list == null) {
            return null;
        }
        ArrayList<PostDto> postList = new ArrayList<PostDto>();
        for(HashMap<String, Object> pvo : list) {
            PostDto pdto = new PostDto();
            pdto.setUserid((String) pvo.get("USERID"));
            pdto.setAddress((String) pvo.get("ADDRESS"));
            pdto.setContent((String) pvo.get("CONTENT"));
            pdto.setPost_img((String) pvo.get("POST_IMG"));
            pdto.setCreate_date((Timestamp) pvo.get("CREATE_DATE"));


//            pdto.setPostNum((Integer) pvo.get("POSTNUM"));
            //pdto.setLikeCount(pvo.get("LIKECOUNT"));
            //pdto.setReplyCount();
            postList.add(pdto);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return postList;
    }

    // Get loginUser
    @RequestMapping(value="/api/user/login")
    public MemberDto getLoginUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        HashMap<String, Object> mdtoHash = (HashMap<String, Object>) session.getAttribute("loginUser");

        if(mdtoHash != null) {
            MemberDto mdto = new MemberDto();
            mdto.setUserid((String) mdtoHash.get("USERID"));
            mdto.setEmail((String) mdtoHash.get("EMAIL"));
            mdto.setImg((String) mdtoHash.get("IMG"));
            mdto.setIntroduce((String) mdtoHash.get("INTRODUCE"));
            mdto.setName((String) mdtoHash.get("NAME"));
            mdto.setPhone((String) mdtoHash.get("PHONE"));
            return mdto;
        }
        return null;
    }

    private String getLoginUserid(HttpServletRequest request) {
        HttpSession session = request.getSession();
        HashMap<String, Object> mdtoHash = (HashMap<String, Object>) session.getAttribute("loginUser");
        if(mdtoHash != null) {
            return (String) mdtoHash.get("USERID");
        }
        return null;
    }

    // Get specific user's info
    @RequestMapping(value="/api/user")
    public MemberDto getUser(@RequestParam("id") String id) {
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("userid", id);
        paramMap.put("ref_cursor", null);
        ms.getMember(paramMap);

        ArrayList<HashMap<String, Object>> list =
                (ArrayList<HashMap<String, Object>>) paramMap.get("ref_cursor");
        if(list.size() == 0) {
            return null;
        }
        HashMap<String, Object> mvo = list.get(0);
        MemberDto mdto = new MemberDto();
        mdto.setPhone((String) mvo.get("PHONE"));
        mdto.setIntroduce((String) mvo.get("INTRODUCE"));
        mdto.setName((String) mvo.get("NAME"));
        mdto.setEmail((String) mvo.get("EMAIL"));
        mdto.setUserid((String) mvo.get("USERID"));
        mdto.setImg((String) mvo.get("IMG"));

        return mdto;
    }

    // Get search result
    @RequestMapping(value="api/search")
    public HashMap<String, Object> getSearchResult(@RequestParam(value="key", required = false) String key) {
        // Get member

        // Get post

        return null;
    }
}