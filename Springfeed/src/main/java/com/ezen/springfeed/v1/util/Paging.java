package com.ezen.springfeed.v1.util;

import lombok.Data;

@Data
public class Paging {
	
	private int page =1;    //화면에 표시될 페이지번호
    private int totalCount;   //게시물의 총 수
    private int beginPage;    //prev 와 next 버튼 사이 표시될 시작페이지
    private int endPage;      // prev 와 next 버튼 사이 표시될 끝페이지
    private int displayRow =10;    //한화면에 표시될 게시물의 수
    private int displayPage =10;   //prev 와 next 버튼 사이의 한화면에 표시될 페이지의 갯수
    boolean prev;     //화면에 안보이는 이전 페이지로 이동하는 버튼
    boolean next;    //화면에 안보이는 다음 페이지로 이동하는 버튼
    private int startNum;    //화면에 표시되는 게시물의 시작 번호(num , pseq  같은 번호아닌 rownum)
    private int endNum;    //화면에 표시되는 게시물의 끝번호(num , pseq  같은 번호아닌 rownum)
    
    public void paging() {
    	endPage = ( (int)Math.ceil( page/(double)displayPage ) ) * displayPage;
    	beginPage = endPage - (displayPage - 1);
    	int totalPage = (int)Math.ceil( totalCount/(double)displayRow );
    	if(totalPage<endPage){
			endPage = totalPage;
			next = false;
		}else{
			next = true;
		}
		prev = (beginPage==1)?false:true;
		startNum = (page-1)*displayRow+1;
		endNum = page*displayRow;
		
		System.out.println(beginPage + " " + endPage + " " + startNum + " " + endNum + " " + totalCount);
    }
}