<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>스토리 작성</title>
<link href="/css/spring.css" rel="stylesheet"> 
<link href="/css/posting.css" rel="stylesheet"> 
<link href="/css/story.css" rel="stylesheet"> 
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>
<body>

<form name="frm" method="post" action="/story/add">
	<div class="wrap">
		<div id="postingStory" >
			<div id="postingTitle">
				<span class="material-icons" id="goBack" onclick="goBack();">west</span>
				<label id="newPost"> 새 게시물 </label>
				
			</div>
			
			<div id="clear"></div>
			<div id="postingContent">
				<div id="thumbnail">
					<label class="input-file-button" for="input-file" >
					  업로드
					</label>
					<div id ="image_container"></div>
					<input type="hidden" name="story_img" id="newImage">
				</div>
				<div id="clear"></div>
				<select name="fontcolor" id="fontColor" class="select-css">
					<option value = ""> 스토리에 표시될 폰트 색을 선택해주세요 </option>
					<option value = "white"> 흰색 </option>
					<option value = "black"> 검정 </option>
					<option value = "purple"> 보라 </option>
					<option value = "yellow"> 노랑 </option>
					<option value = "orange"> 주황 </option>
					<option value = "pink"> 분홍 </option>
					<option value = "green"> 초록 </option>
					<option value = "#e59999"> 스프링 </option>
				</select>
				<div id="postingText">
					<textarea name="story_content"
					onKeyDown="textCounter(this.form.post_content,this.form.remLen,100);" 
					onKeyUp="textCounter(this.form.post_content,this.form.remLen,100);"
					placeholder="사진을 설명해주세요" rows="4" cols="50"></textarea>
				</div>
				<div id="clear"></div>
<!-- 등록/다시작성 -->
				
				<div id="submit-buttons">
					<label id="input-submit-button" for="input-submit">
					등록
					</label>
					<input type="button" name="input-submit" id="input-submit" onclick="uploadCheck();">
					<label id="input-reset-button" for="input-reset" onclick="reset();">
					다시 작성 
					</label>
					<input type="reset" id="input-reset"  >
				</div>
			</div>
		</div>
	</div>
</form>

<!-- 이미지 ajax용 form -->
<form id="imgForm" method="post" enctype="multipart/form-data">
	<input type="file" name="fileName" id="input-file" accept=".jpg, .jpeg, .png, .gif" onchange="setThumbnail(event); uploadImg();"/>
</form>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript"> 

window.onbeforeunload = function() {};

$(function(){
	$('#input-file').change(function(){
		var formselect = $("#imgForm")[0];   // 지목된 폼을 변수에 저장
		var formdata = new FormData(formselect);   // 전송용 폼객에 다시 저장
		
		$.ajax({
			url:"/uploadImg",
			type:"POST",
			enctype:"multipart/form-data",
			async: false,
			data: formdata,
	    	timeout: 10000,
	    	contentType : false,
	        processData : false,
	        success : function(data){
	            if(data.STATUS == 1){
	            	
	            	$("#newImage").val(data.FILENAME);
	            
	            }
	        },
	        error: function() {
				alert("실패");
			}
		});
	});
});


function setThumbnail(event) { 
	var reader = new FileReader(); 
	reader.onload = function(event) { 
		var img = document.createElement("img"); 
		img.setAttribute("src", event.target.result); 
		document.querySelector("div#image_container").appendChild(img); 
	}; 
	
	reader.readAsDataURL(event.target.files[0]); 
}


function goBack(){
	window.history.back();
}

function reset(){
	let elem = document.querySelector("div#image_container img");
	elem.parentNode.removeChild(elem);
}


function textCounter(field, countfield, maxlimit) {
	if (field.value.length > maxlimit) 
	field.value = field.value.substring(0, maxlimit);
	else 
	countfield.value = maxlimit - field.value.length;
}

function uploadCheck(){
	var theForm = document.frm;
	if( theForm.story_img.value=="") {
		alert('사진을 첨부해주세요'); 
		return;
	} else {
		theForm.action="/story/add";
		theForm.submit();
	}
} 

</script>
</body>
</html>