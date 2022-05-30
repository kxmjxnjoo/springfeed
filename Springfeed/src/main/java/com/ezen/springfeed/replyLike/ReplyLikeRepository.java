package com.ezen.springfeed.replyLike;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyLikeRepository extends JpaRepository<ReplyLike, Long> {
    Integer countAllByReplyNum(Integer replyNum);

    Integer countAllByReplyNumAndUserid(Integer replyNum, String userid);

    ReplyLike findByReplyNumAndUserid(Integer replyNum, String userid);
}
