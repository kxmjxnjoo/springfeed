<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>스프링피드</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="stylesheet" href="/css/mainPopup.css">
</head>
<body>
	<%@ include file="/topnav/topnav.jsp" %>
	
	<div id="mainContent">
		<div id="story">
		
		<c:forEach items="${ followingList }" var="follow">
			<c:if test="${ follow.following == loginUser.userid }">
				<div class="storyBubble">
					<div class="storyBubbleContent">
						<div id="myStory">
							<img src="${ follow.followingImg }">
						</div>
						<h3>${ follow.following }</h3>
					</div>
				</div>
			</c:if>
		</c:forEach>
		
		
		<c:forEach items="${ followingList }" var="follow">
			<c:choose>
				<c:when test="${ follow.following == loginUser.userid }">
				
				</c:when>
				<c:otherwise>
					<div class="storyBubble" onclick="location.href='spring.do?command=storyDetail&userid=${follow.following}'">
						<div class="storyBubbleContent">
							<img src="${ follow.followingImg }">
							<h3>${ follow.following }</h3>
						</div>
					</div>
				</c:otherwise>
			</c:choose>
		</c:forEach>
			
		</div>
		
		<div id="postFeed">
			
			<c:forEach var="post" items="${ postList }">
				<div class="post">
				
					<div class="postBar">
						<div class="postBarUserInfo" onclick="location.href='spring.do?command=userpage&userid=${ post.userid }'">
							<img src="${ post.userImg }">
							<div class="postBarInfo">
								<h3>${ post.userid }</h3>
								<h4>${ post.address }</h4>
							</div>
						</div>
						
						<button onclick="openPopup(${ post.postNum }, '${ post.userid }')"><i class="material-icons">more_horiz</i></button>
					</div>
					
					<div class="postImg">
						<img src="${ post.postImg }">
						<div class="postImgNavigationBar">
						
						</div>
					</div>
					
					<div class="postIcons">
						<i class="material-icons" 
						<c:choose>
							<c:when test="${ post.isLikedByUser == 1 }">
								onclick="location.href='spring.do?command=unlikepost&postnum=${ post.postNum }'"
								style="color: red;"
							</c:when>
							<c:otherwise>
								onclick="location.href='spring.do?command=likepost&postnum=${ post.postNum }'"
							</c:otherwise>
						</c:choose>
						>favorite_border</i>
						<i class="material-icons">chat_bubble_outline</i>
						<i class="material-icons">send</i>
						<i class="material-icons">bookmark_border</i>
					</div>
					
					<div class="postInfo">
						<h3 class="postLike">${ post.likes } likes</h3>
						<div class="postContent">
							<h3><b>${ post.userid }</b></h3>
							<p>${ post.content }</p>
						</div>
						
						<div class="postComment">
						
						</div>
						
						<form>
							<input type="hidden" name="command" value="addreply">
							<input type="hidden" name="post_num" value="${ post.postNum }">
							<div class="addComment" id="comment${ post.postNum }">
								<input type="text" placeholder="댓글을 추가해 주세요..." name="reply_content">
								<input type="submit" value="추가" onclick="return addReply(${ post.postNum })">
							</div>
						</form>
						
					</div>
				</div> 		
			
			</c:forEach>
		</div>
		
	</div>
	
	<div id="subBar">
		<div id="myProfile" onclick="location.href='spring.do?command=userpage&userid=${ loginUser.userid }'">
			<img src="${ loginUser.img }">
			
			<div id="myProfileInfo">
				<h3>${ loginUser.userid }</h3>
				<h4>${ loginUser.name }</h4>
			</div>
		</div>
		
		<div id="followProfile">
			<h3 id="followMessage">내가 팔로우 한 사람</h3>
			
			<c:forEach var="follow" items="${ followingList }">
				<c:choose>
					<c:when test="${ follow.following == loginUser.userid }">
					
					</c:when>
					<c:otherwise>
						<div class="follower">
							<div class="followerInfoWrapper" onclick="location.href='spring.do?command=userpage&userid=${ follow.following }'">
								<img class="followerImg" src="${ follow.followingImg }">
								
								<div class="followerInfo">
									<h3>${ follow.following }</h3>
									<h4>${ follow.followingName }</h4>
								</div>
							</div>
							
							<input type="button" value="언팔로우" onclick="unfollow('${ follow.following }')">
						</div>
					</c:otherwise>	
				</c:choose>			
			
			</c:forEach>
			
		</div>
	</div>
	
	<div id="popupWindow" style="display: none;">
		<div id="popupBox">
			<button>신고</button>
			<hr>
			<button onclick="unfollowPopup()">팔로우 취소</button>
			<hr>
			<button>게시물로 이동</button>
			<hr>
			<button onclick="openPopup()">취소</button>
		</div>
	</div>
	
	<script type="text/javascript">
		let postnum = 0
		let tmpUserid = ""
	
		function openPopup(postnum, userid) {
			let popup = document.getElementById("popupWindow")
			if(popup.style.display == "none") {
				popup.style.display = ""
				postnum = this.postnum
				tmpUserid = userid
			} else {
				popup.style.display = "none"
				postnum = 0
				tmpUserid = ""
			}
		}
		
		function unfollowPopup() {
			if(confirm(tmpUserid + "님을 언팔로우 할까요?")) {
				location.href = "spring.do?command=unfollow&userid=" + tmpUserid
			}
		}
		
		function addReply(postNum) {
			let reply = document.querySelector("#comment" + postNum + " input:nth-child(1)")
			
			if(reply.value == "") {
				alert("댓글에 내용이 없어요")
				return false
			} else {
				return true
			}
		}
		
	</script>
	<script src="/js/follow.js"></script>
	
</body>
</html>