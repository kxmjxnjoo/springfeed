create or replace PROCEDURE checkAdmin (
    p_adminid IN admin.adminid%TYPE,
    p_rc OUT SYS_REFCURSOR )
IS 
BEGIN 
    OPEN p_rc FOR
        select * from admin where adminid = p_adminid;
END;



create or replace PROCEDURE getAllCount (
    p_adminid IN admin.adminid%TYPE,
    p_key IN member.name%TYPE,
    p_cnt OUT number
     )
IS 
    v_cnt number := 0;
BEGIN 
    select count(*) into v_cnt from admin where adminid=p_adminid;
    p_cnt := v_cnt;
END;



create or replace PROCEDURE memberList( 
    p_startNum IN NUMBER,
    p_endNum IN NUMBER,
    p_key member.name%TYPE,
    p_cur OUT SYS_REFCURSOR )
IS
BEGIN
    OPEN p_cur FOR 
    select * from (
    select * from (
    select rownum as rn, m.* from ((SELECT * FROM member WHERE name like '%'||p_key||'%' order by indate desc)m)
    ) where rn >= p_startNum
    ) where rn <= p_endNum;
END;



CREATE OR REPLACE PROCEDURE searchMember(
    p_userid IN member.userid%TYPE,
    p_name IN member.name%TYPE,
    p_curvar OUT SYS_REFCURSOR
)
IS
BEGIN
    OPEN p_curvar FOR SELECT * FROM member WHERE userid LIKE '%'||p_userid||'%';
    OPEN p_curvar FOr SELECT * FROM member WHERE name LIKE '%'||p_name||'%';
END;



CREATE OR replace PROCEDURE reportList( 
    p_reported_id IN report.reported_id%TYPE,
    p_cur OUT SYS_REFCURSOR )
IS
BEGIN
    OPEN p_cur FOR SELECT * FROM report WHERE reported_id=p_reported_id order by indate desc;
END;



CREATE OR REPLACE PROCEDURE postReportCheck (
    p_post_num IN report.p_post_num%TYPE,
    p_reason IN report.p_reason%TYPE,
    p_report_type IN report.p_report_type%TYPE )
IS
BEGIN
    insert into report(post_num, reason, report_type)
    values (p_post_num, p_reason, p_report_type);
    commit;
END;






---------------------------------------------------------------------------
create or replace PROCEDURE faqList( 
    p_faq_num IN faq.faq_num%TYPE,
    p_cur OUT SYS_REFCURSOR )
IS
BEGIN
    OPEN p_cur FOR SELECT * FROM faq WHERE faq_num=p_faq_num;
END;



CREATE OR REPLACE PROCEDURE addFaq(
    p_faq_num IN faq.faq_num%TYPE,
    p_faq_subject IN faq.faq_subject%TYPE,
    p_faq_content IN faq.faq_content%TYPE )
IS
BEGIN
    insert into faq(faq_num, faq_subject, faq_content)
    values( p_faq_num, p_faq_subject, p_faq_content);
    commit;
END;



CREATE OR REPLACE PROCEDURE addQna(
    p_qna_id IN qna.qna_id%TYPE,
    p_qna_subject IN qna.qna_subject%TYPE,
    p_qna_content IN qna.qna_content%TYPE )
IS
BEGIN
    insert into qna(qna_num, qna_id, qna_subject, qna_content)
    values(qna_seq.nextVal, p_qna_id, p_qna_subject, p_qna_content);
    commit;
END;