package com.ezen.springfeed.replyLike;

import org.apache.ibatis.annotations.Delete;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/replylike")
public class ReplyLikeController {
    private final ReplyLikeService rls;

    public ReplyLikeController(ReplyLikeService rls) {
        this.rls = rls;
    }

    @GetMapping("/{replynum}")
    public Integer getReplyLikeCount(@PathVariable("replynum") Integer replyNum) {
        return rls.getReplyLikeCount(replyNum);
    }

    @GetMapping("/{replynum}/{userid}")
    public Integer getIsLiked(@PathVariable("replynum") Integer replyNum, @PathVariable("userid") String userid) {
        return rls.getIsReplyLikedByUserid(replyNum, userid);
    }

    @PostMapping
    public void addReplyLike(@RequestBody ReplyLike replyLike) {
        rls.addReplyLike(replyLike);
    }

    @DeleteMapping("/{replynum}/{userid}")
    public void deleteReplyLike(@PathVariable("replynum") Integer replyNum, @PathVariable("userid") String userid) {
        rls.deleteReply(replyNum, userid);
    }
}
