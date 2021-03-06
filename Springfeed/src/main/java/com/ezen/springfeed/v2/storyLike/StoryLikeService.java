package com.ezen.springfeed.v2.storyLike;

import com.ezen.springfeed.model.StoryLike;
import org.springframework.stereotype.Service;

@Service
public class StoryLikeService {
    private final StoryLikeRepository slr;

    public StoryLikeService(StoryLikeRepository slr) {
        this.slr = slr;
    }

    public Integer getStoryLikeCount(Long storyNum) {
        return slr.countByStoryNum(storyNum);
    }

    public void addStoryLike(StoryLike storyLike) {
        slr.save(storyLike);
    }

    public void deleteStory(Long storyLikeNum) {
        slr.deleteById(storyLikeNum);
    }
}
