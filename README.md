# Version 1
## 기간
2월 14일 ~ 2월 27일 (14일)

## 목표
- Instagram을 참고한 SNS 서비스 개발
- 계정생성, 서로 팔로우, 게시글/댓글 CRUD 등 기본적인 기능

# Version 1에서 사용된 기술
## Backend
- Java EE Web 관련 Modules
- JSP

## Frontend
- HTML
- CSS
- JS
- jQuery

## DevOps

# Architecture 구조
1. HTTP Request 받음 (URL은 /command=COMMAND_NAME 형태)
2. Servlet Container가 HTTP Reuqest 받아 HttpServletRequest, HttpServletResponse 생성
3. HttpServlet 상속한 객체 호출
4. HTTP Request의 HTTP Method에 따라 doGet, doPost 호출 (하지만 개발 시간상의 사유로 doGet만 호출하도록 함)
5. doGet
    1. URL Parsing해 command 찾음
    2. ActionFactory 패턴으로 된 Action 객체 생성
    3. Action의 execute method 실행
6. execute
    1. (필요한 경우) Session에 저장되어 있는 로그인 정보 확인
    2. (필요한 경우) Parameter에서 데이터 가져옴
    3. 필요한 DAO 호출
    4. 얻은 DTO로 적절하게 응답
7. DAO
    1. driver, url, id, pw를 사용해 Connection 생성
    2. Connection 객체 받아와 PreparedStatement에 적절한 데이터 넣어서 실행
    3. 실행 후 받은 ResultSet을 DTO로 변환
8. execute로 적절하게 처리된 HttpServletRequest를 jsp로 보냄
9. jsp에서 정의된 대로 Servlet 객체 생성
10. HttpServletResponse로 응답
11. Servlet Container에서 HTTP Response로 변환

# 다음 버전에서 추가하고 싶은 기능
## 기능적
- 비밀 계정
- 헤시태그
- 검색 게시물도 가능하게
- 알림이 있으면 topnav에 띄게 하기
- 신고 당하면 안내
- 이용자 통계 추가
- 아이디 저장
- 자동 로그인
- 광고 추가
- 쇼핑 기능 추가
- 아이디/비밀번호 알파벳만 하게 하기
- 이메일 주소 형식 확인
- 전화 번호 형식 확인
- 메세지 실시간 기능 추가
- 사진 더블클릭 시 좋아요 되는 기능 추가
- 사진 사이즈 조정

# View 역할 분배
- [x] userPage.jsp 진겸
- [x] feedDetail.jsp 세인
- [x] main.jsp 진겸
- [x] story.jsp 세인
- [x] accountManage.jsp 진겸
- [x] message.jsp 진겸
- [x] messageDetail.jsp 진겸
- [x] explore.jsp 세인
- [x] notification.jsp 진겸
- [x] search.jsp 진겸
- [x] addPostForm.jsp 세인
- [x] editPostForm.jsp 세인
- [x] login.jsp 진주
- [x] joinForm.jsp 진주
- [x] adminLogin.jsp 진주
- [x] faqList.jsp 진주
- [ ] qnaForm.jsp 진주 -> css 오류로 수정 중
- [x] adminReportList.jsp 진주
- [x] adminMemberList.jsp 진주

# TODO
## User Side TODO
- [x] 아이디 비밀번호 찾기
- [x] 아이디 중복확인
- [x] 스토리/포스트 팔로우
- [x] 본인 스토리 보기
- [x] 스토리 수정
- [x] 북마크 추가 - 2월 23일 11시, dao/dto/jsp/action 작성 완료
- [x] 프로필 이미지 수정
- [x] 업로드 이미지
- [x] 메인에서 스토리 한 건이라도 있는사람만 sub bar 목록에 뜨기 - 2월 23일 11시 30분
- [x] 좋아요했을 때 알림
- [x] 유저페이지 팔로잉/팔로우 수 버그 수정 - 2월 23일 12시
- [x] 유저페이지 팔로우 확인해서 팔로우/언팔로우 버튼 수정 - 2월 23일 12시
- [x] 유저페이지에서 포스트 상세보기
- [ ] 유저페이지 포스트 이미지 비율 맞추기
- [x] 포스트 상세보기 css
- [x] spring.css 쪼개기
- [x] 메인에서 스토리가 없을 때 스토리 등록 페이지로
- [x] 스토리 작성자 전부 hong으로 뜸
- [x] 알람이 안오는 버그 수정 - 2월 23일 2시, sql문이 잘못 됐었음
- [x] 메인 페이지에서 자기자신 팔로우 인식 안하게 - 2월 23일 2시 30분, action에서 followList가 null이 아님을 확인하고 size가 1일 경우에도 info 페이지로 이동
- [x] 포스트 없을 때 안내 문구 추가  - 2월 23일 2시 30분, c:choose를 사용해서 안내문구 추가
- [x] 메인페이지 모달창 테두리 둥글게, 글씨체 볼드 - 2월 23일 2시 40분
- [x] 상세보기 모달창 신고 빨간 글씨
- [x] 상세보기 topnav 추가
- [x] 스토리/게시물 업로드에 topnav 추가
- [x] 로그인안했을 때 tonav 프로필 이동 안하게 수정 -> 로그인 안했을 때 프로필 두개로 나오는 거 해결 하면 됨 
- [x] 로그인 안해도 검색되게 검색 기능 수정
- [x] 회원 탈퇴 버그 수정 - 2월 23일 2시, 회원의 모든 정보를 먼저 삭제하게 수정
- [x] 유저 페이스 포스트 좋아요 댓글
- [ ] 메인 페이지에 페이징
- [x] 모든 페이지에 footer - 2월 23일 3시, footer가 있어야 할 자리에 footer 추가, 아직 css 조금 수정해야 함
- [x] 메세지 - 2월 24일 1시, dto, dao, action, jsp, css, js 추가

## Admin Side TODO
- [ ] memberList User 검색
- [ ] QnaView, QnaList Comment 작성
- [ ] ReportList 데이터 미출력
- [ ] ReportList Detail -> 해당 게시물, 스토리 내역?  
- [ ] ReportList jsp 유저 CheckBox 출력
- [ ] FaqList 작성 button CSS 위치 가운데로 수정  
- [ ] Faq View
- [ ] Faq Upload
- [ ] Faq Delete
- [ ] List.jsp button들 css미적용 되는 부분들 수정 필요함
- [ ] ()님 로그인 하셨습니다 문구 조금 더 가운데로 위치하게 수정

# 버그 수정
- [ ] Admin 로그인 안 됨 (아마 오라클 Cloud DB 문제)
- [x] 자기 자신 팔로우 취소 가능
    - [x] 검색에서 팔로우 취소 안 뜨게 하기
    - [x] action에서 확인해서 막기
- [x] 저장하기 안 됨 (아마 DB가 없음)
- [x] 메세지에 자기자신 안 뜨게
- [ ] Explore 같은 좋아요 수이면 댓글 많은 순서대로
- [x] 정보수정에서 비밀번호 갯수만큼 *
- [x] 정보수정에서 textarea에 자기소개 안 뜸
- [x] 비로그인 상태에서 userPage에 들어가서 포스트 클릭하면 로그인 안내 메세지가 아니라 그냥 아이디가 없다고 나옴
- [ ] QNA에서 답변이 안 달려도 자세히 볼 수 있음
- [x] 회원탈퇴 안 됨(Action에서 관련 테이블 전체 삭제 해야 함)
- [ ] postdetail에서 유저 이미지 hover 하면 opacity + userPage로 이동
- [ ] Detail에서 댓글 enter 치면 등록 안 됨
- [ ] userPage css 오류
- [ ] 스토리 모달 hover 효과
- [ ] detail에서 유저 글씨 누르면 userPage로 가기
- [ ] detail 유저 프로필/글씨 hover 효과
- [ ] detail 댓글에서 유저 프로필/아이디 누르면 userPage로
- [ ] 댓글 알람 안 감
- [ ] main 페이지에서 팔로우 안 함 사람 포스트도 뜸
- [ ] 게시글 삭제 안 됨