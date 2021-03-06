<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../admin/common/admin_submenu.jsp" %>
<link rel="stylesheet" href="/css/admin/admin.css">
<link rel="stylesheet" href="/css/admin/faq.css">
	
<h1>FAQ 리스트<!-- <img src="images/Report.png"> --></h1>
<span id="info">
	 <a href="/faq/add"><input type="button" id="button1" value="작성"></a>
${loginAdmin.NAME}(${loginAdmin.ADMINID})님 로그인
	<button type="button" class="btn btn-outline-secondary" onclick="location.href/logoutAdmin'">로그아웃</button></span>
	<br><br><br>
	
<form name="frm" method="post" action="/admin/faqList">		
		<table class="table table-hover">
			<tr>
				<th>번호</th>
				<th>제목</th>
				<th>수정</th>
				<th>삭제</th>
			</tr>
			<c:forEach items="${fdto}" var="fdto">
				<tr align="left" class="faqBox"> <!-- onclick="/faqdetail&num=${ fdto.FAQ_NUM }" -->
					<td style="width: 10%;">${fdto.FAQ_NUM}</td>
					<td style="width: 30%;"><a href="">${fdto.FAQ_SUBJECT}</a></td>
					<td style="width: 10%;"><button type="button" class="btn btn-outline-primary" id="faqEditButton" onClick="editFaq(${fdto.faq_num});">수정</button></td>
					<td style="width: 10%;"><button type="button" class="btn btn-outline-danger" id="faqDeleteButton" onClick="deleteFaq(${fdto.faq_num});">삭제</button></td>
				</tr>
			</c:forEach>
	</table>
</form>
<%-- <%@ include file="../../admin/common/paging.jsp"%> --%>
<%@ include file="../../admin/common/footer.jsp"%>

<script type="text/javascript">
	function faqadd(){
	action = "/faq/add/form";
	}

	function deleteFaq(faq_num){
		document.frm.action = "	/faq/delete";
		if(confirm(faq_num + "번 FAQ를 삭제할까요?")) {
		}
		
		var input_faq = document.createElement('input'); 
		input_faq.setAttribute("type", "hidden");
		input_faq.setAttribute("name", "faq_num");
		input_faq.setAttribute("value", faq_num);
		
		document.frm.appendChild(input_faq);
		document.frm.submit();
	}
	
	function editFaq(faq_num){
		document.frm.action = "/faq/edit";
		if(confirm(faq_num + "번 FAQ를 수정할까요?")) {
		}
		
		var input_faq = document.createElement('input'); 
		input_faq.setAttribute("type", "hidden");
		input_faq.setAttribute("name", "faq_num");
		input_faq.setAttribute("value", faq_num);
		
		document.frm.appendChild(input_faq);
		document.frm.submit();
	}
</script>