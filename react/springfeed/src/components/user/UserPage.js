import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import Loading from "../common/Loading";
import FollowList from "./FollowList";
import PostThumbnail from "../post/PostThumbnail";

import { InfiniteScroll } from "react-infinite-scroller";

import { Modal } from "react-bootstrap";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { FaUserSlash as NoUserIcon } from "react-icons/fa";
import Report from "../admin/Report";

import server from "../common/server";

const UserPage = ({
    setSearchKey,
    loginUser,
    openPostDetail,
    setIsPostDetailOpen,
}) => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState(null);
    const [savedPosts, setSavedPosts] = useState(null);

    const [introduction, setIntroduction] = useState(null);
    const [profileImg, setProfileImg] = useState(null);

    const [postCount, setPostCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const [isPostSelected, setIsPostSelected] = useState(true);
    const [isFollowing, setIsFollowing] = useState(0);

    const [isReportOpen, setIsReportOpen] = useState(false);

    const [followingList, setFollowingList] = useState(null);
    const [isFollowingListOpen, setIsFollowingListOpen] = useState(false);
    const [followingListIndex, setFollowingListIndex] = useState(0);
    const [hasFollowingMore, setHasFollowingMore] = useState(true);
    const [followerList, setFollowerList] = useState(null);
    const [isFollowerListOpen, setIsFollowerListOpen] = useState(false);
    const [isUserExist, setIsUserExist] = useState(true);

    const loadFollowingList = () => {
        setFollowingListIndex(followingListIndex + 1);
        fetch(
            server +
                "/api/user/following?id=" +
                id +
                "&page=" +
                followingListIndex
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data == null || data == "") {
                    hasFollowingMore(false);
                    toast.error("??? ?????? ???????????? ?????????");
                } else {
                    setFollowingList([...followingList, ...data]);
                }
            })
            .catch((err) => {
                setHasFollowingMore(false);
                toast.err("????????? ????????? ????????? ??? ?????????");
            });
    };
    const openFollowingList = () => {
        // Fetch Following List
        fetch(server + "/api/user/following?id=" + id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setFollowingList(
                    data.filter((follow) => {
                        return !(follow.userid == id);
                    })
                );
            })
            .catch((err) => {
                toast.err("????????? ????????? ???????????? ??? ?????????");
            })
            .finally(() => {
                setIsFollowingListOpen(true);
            });

        // Close Follower List
        closeFollowerList();
    };
    const openFollowerList = () => {
        // Fetch Follower List
        fetch(server + "/api/user/follower?id=" + id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setFollowerList(
                    data.filter((follow) => {
                        return !(follow.userid == id);
                    })
                );
            })
            .catch((err) => {
                toast.err("????????? ????????? ???????????? ??? ?????????");
            })
            .finally(() => {
                setIsFollowerListOpen(true);
            });

        // Close Following List
        closeFollowingList();
    };
    const closeFollowingList = () => {
        setIsFollowingListOpen(false);
    };
    const closeFollowerList = () => {
        setIsFollowerListOpen(false);
    };

    useEffect(() => {
        setSearchKey("");
        setIsPostDetailOpen(false);

        // Get user introduction, isFollowing, profile image
        fetch(server + "/api/user?id=" + id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setIntroduction(data.introduce);
                setProfileImg("/images/" + data.img);
                setIsFollowing(data.isFollowing);
            })
            .catch((err) => {
                toast.error("??????????????? ????????? ??? ????????????");
                setIsUserExist(false);
            });

        // Get follower count
        fetch(server + "/api/user/follow/count?id=" + id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setFollowerCount(data.follower - 1);
                setFollowingCount(data.following - 1);
            })
            .catch((err) => {
                toast.err("???????????? ????????? ??? ????????????");
            });

        // Get posts initially
        setIsLoading(true);
        fetch(server + "/api/post?userid=" + id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                setPostCount(data.length);
            })
            .catch((err) => {
                toast.err("???????????? ????????? ??? ?????????");
            })
            .finally(() => {
                setIsLoading(false);
            });

        // Get whether loginUser is following current userPage's user
    }, []);

    useEffect(() => {
        if (savedPosts == null) {
            setIsLoading(true);
            // Fetch saved posts
            fetch(server + "/api/post/save?id=" + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setSavedPosts(data);
                })
                .catch((err) => {
                    toast.error(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isPostSelected]);

    const handleFollow = () => {
        // POST follow

        // Toggle UI
        setIsFollowing(!isFollowing);
    };

    const follow = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui justify-content-center">
                        <div className="h1 text-center">
                            {id + "?????? ????????? ??????????"}
                        </div>
                        <p>
                            {id +
                                "?????? ??????????????? " +
                                id +
                                "?????? ???????????? ???????????? ??? ??? ?????????. ????????? " +
                                loginUser.userid +
                                "?????? ????????? ????????? ????????? ??????"}
                        </p>

                        <div className="row">
                            <div className="col-6">
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                        onClose();
                                        fetch(
                                            server + "/api/user/follow?id=" + id
                                        )
                                            .then((res) => {
                                                return res;
                                            })
                                            .then((data) => {
                                                if (data.result == 0) {
                                                    toast.error(
                                                        "?????? ??????????????????, " +
                                                            id +
                                                            "?????? ????????? ??? ?????????. ?????? ????????? ?????????"
                                                    );
                                                } else {
                                                    toast.success(
                                                        id +
                                                            "?????? ????????? ?????????!"
                                                    );
                                                    setIsFollowing(1);
                                                }
                                            });
                                    }}
                                >
                                    ???! ????????? ?????????
                                </button>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={onClose}
                                >
                                    ????????? ????????? ??? ?????????
                                </button>
                            </div>
                        </div>
                    </div>
                );
            },
        });
    };

    const unfollow = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui justify-content-center">
                        <div className="h1 text-center">
                            {id + "?????? ???????????? ??????????"}
                        </div>
                        <p>
                            {id +
                                "?????? ?????????????????? " +
                                id +
                                "?????? ???????????? ???????????? ??? ??? ??????, " +
                                id +
                                "????????? " +
                                loginUser.userid +
                                "?????? ???????????? ????????? ????????? ??????"}
                        </p>

                        <div className="row">
                            <div className="col-6">
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() => {
                                        onClose();
                                        fetch(
                                            server +
                                                "/api/user/unfollow?id=" +
                                                id
                                        )
                                            .then((res) => {
                                                return res;
                                            })
                                            .then((data) => {
                                                if (data.result == 0) {
                                                    toast.error(
                                                        "?????? ??????????????????, " +
                                                            id +
                                                            "?????? ???????????? ??? ?????????. ?????? ????????? ?????????"
                                                    );
                                                } else {
                                                    toast.success(
                                                        id +
                                                            "?????? ???????????? ?????????"
                                                    );
                                                    setIsFollowing(0);
                                                }
                                            });
                                    }}
                                >
                                    ???????????????. ?????????????????????
                                </button>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={onClose}
                                >
                                    ?????? ????????? ?????????
                                </button>
                            </div>
                        </div>
                    </div>
                );
            },
        });
    };

    return (
        <div>
            {!isUserExist ? (
                <NoUserPage />
            ) : (
                <>
                    <div className="row border-bottom">
                        <div className="col-4">
                            <div className="row justify-content-center">
                                <img
                                    src={profileImg}
                                    alt="PROFILE"
                                    className="rounded-circle"
                                    style={{ width: "150px" }}
                                />
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="row p-3">
                                <div className="col-6">
                                    <div className="h3">{id}</div>
                                </div>
                                {loginUser != null ? (
                                    id !== loginUser.userid ? (
                                        <>
                                            <div className="col-6 col-md-3">
                                                <div
                                                    className="btn btn-danger w-100"
                                                    onClick={() => {
                                                        setIsReportOpen(true);
                                                    }}
                                                >
                                                    ????????????
                                                </div>
                                            </div>

                                            <div className="col-6 col-md-3">
                                                {isFollowing == 1 ? (
                                                    <div
                                                        className="btn btn-warning w-100"
                                                        onClick={() => {
                                                            unfollow();
                                                        }}
                                                    >
                                                        ????????????
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="btn btn-success w-100"
                                                        onClick={() => {
                                                            follow();
                                                        }}
                                                    >
                                                        ?????????
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="col-6 col-md-3"
                                                onClick={handleFollow}
                                            >
                                                {
                                                    <Link to="/user/edit">
                                                        <div className="btn btn-primary w-100">
                                                            ??? ?????? ??????
                                                        </div>
                                                    </Link>
                                                }
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="row p-3">
                                <div className="col-4">{postCount} posts</div>

                                <div href="" className="col-4">
                                    <div
                                        className="btn p-0"
                                        onClick={openFollowerList}
                                    >
                                        {followerCount} followers
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div
                                        className="btn p-0"
                                        onClick={openFollowingList}
                                    >
                                        {followingCount} following
                                    </div>
                                </div>
                            </div>

                            <div className="row p-4">{introduction}</div>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-3">
                        <div className="col-3">
                            <div
                                className={
                                    "btn btn-outline-primary w-100" +
                                    (isPostSelected ? " active" : "")
                                }
                                onClick={() => {
                                    setIsPostSelected(true);
                                }}
                            >
                                POSTS
                            </div>
                        </div>
                        <div className="col-3">
                            <div
                                className={
                                    "btn btn-outline-primary w-100" +
                                    (!isPostSelected ? " active" : "")
                                }
                                onClick={() => {
                                    setIsPostSelected(false);
                                }}
                            >
                                SAVED
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 mb-5">
                        {isLoading ? (
                            <Loading message="???????????? ???????????? ?????????..." />
                        ) : isPostSelected ? (
                            posts == null || posts.length == 0 ? (
                                <div className="h1 text-center mt-5">
                                    ???????????? ?????????!
                                </div>
                            ) : (
                                <div className="row">
                                    {posts.map((post) => {
                                        return (
                                            <div className="col-4">
                                                <PostThumbnail
                                                    postNum={post.postNum}
                                                    postImg={post.post_img}
                                                    likeCount={post.likeCount}
                                                    replyCount={0}
                                                    openPostDetail={
                                                        openPostDetail
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                        ) : savedPosts == null || savedPosts.length == 0 ? (
                            <div className="h1 text-center mt-5">
                                ????????? ???????????? ?????????!
                            </div>
                        ) : (
                            savedPosts.map((post) => {
                                return (
                                    <div className="col-12 col-md-4">
                                        <PostThumbnail
                                            postNum={post.postNum}
                                            postImg={post.post_img}
                                            likeCount={post.likeCount}
                                            replyCount={0}
                                            openPostDetail={openPostDetail}
                                            className="p-2"
                                        />
                                    </div>
                                );
                            })
                        )}
                    </div>
                </>
            )}

            <Modal
                show={isFollowingListOpen}
                onHide={closeFollowingList}
                className="mt-5"
            >
                <div className="card">
                    <div className="card-header">
                        <div className="h5 text-center">
                            {id}?????? ??????????????? ?????? ??????
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-content">
                            <FollowList followList={followingList} />
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                show={isFollowerListOpen}
                onHide={closeFollowerList}
                className="mt-5"
            >
                <div className="card">
                    <div className="card-header">
                        <div className="h5 text-center">
                            {id}?????? ??????????????? ?????? ??????
                        </div>

                        <div className="card-body">
                            <div className="card-content">
                                <FollowList followList={followerList} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                show={isReportOpen}
                onHide={() => {
                    setIsReportOpen(false);
                }}
                className="mt-5"
            >
                <Report className="vh-100" />
            </Modal>
        </div>
    );
};

const NoUserPage = () => {
    return (
        <>
            <div className="h1 text-center mb-5">
                <div className="row text-danger h1 mb-5">
                    <NoUserIcon />
                </div>
                ????????? ?????????!
            </div>
        </>
    );
};

export default UserPage;
