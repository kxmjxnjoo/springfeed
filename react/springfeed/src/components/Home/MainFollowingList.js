import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import defaultProfile from "../../images/tmpUserIcon.png";

import Loading from "../common/Loading";

const MainFollowingList = ({ user, followingList, isFollowingError }) => {
    const [followingListIndex, setFollowingListIndex] = useState(0);
    const [isError, setIsError] = useState(false);

    // const loadFollowingList = () => {
    //     if (user != null) {
    //         fetch(
    //             "/api/user/following?id=" +
    //                 user.userid +
    //                 "&page=" +
    //                 followingListIndex
    //         )
    //             .then((res) => {
    //                 return res.json();
    //             })
    //             .then((data) => {
    //                 if (
    //                     data === null ||
    //                     data === "" ||
    //                     typeof data.userid == "undefined"
    //                 ) {
    //                     toast.error("더 이상 팔로잉하고 있는 유저가 없어요");
    //                 } else {
    //                     setFollowingList((arr) => [...arr, data]);
    //                     setFollowingListIndex(followingListIndex + 1);
    //                 }
    //             })
    //             .catch((err) => {
    //                 setIsFollowingError(true);
    //             });
    //     }
    // };

    return (
        <div>
            <div>
                {user == null ? (
                    <></>
                ) : (
                    <Link
                        to={"/user/page/" + user.userid}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div className="row">
                            <div className="col-6">
                                <img
                                    src={
                                        user.img == null
                                            ? defaultProfile
                                            : "/images/" + user.img
                                    }
                                    alt=""
                                    style={{ width: "100px", height: "100px" }}
                                    className="rounded-circle"
                                />
                            </div>
                            <div className="col-6 mt-2">
                                <div className="h3">{user.userid}</div>
                                <div className="h3 text-muted">{user.name}</div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>

            <div className="h3 mt-3">내가 팔로우한 사람</div>

            <div>
                {!isError && followingList != null ? (
                    followingList.map((data) => {
                        return (
                            <Link
                                to={"/user/page/" + data.userid}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <div className="row">
                                    <div className="col-4">
                                        <img
                                            src={
                                                data.img == null ||
                                                data.img == ""
                                                    ? defaultProfile
                                                    : "/images/" + data.img
                                            }
                                            alt=""
                                            style={{
                                                width: "75px",
                                                height: "75px",
                                            }}
                                            className="rounded-circle"
                                        />
                                    </div>

                                    <div className="col-7 ms-2">
                                        <div className="h5">{data.userid}</div>
                                        <div className="h5 text-muted">
                                            {data.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <Loading message="로딩중" />
                )}
                {followingList == null || followingList.length < 5 ? (
                    <div className="text-muted mt-3"></div>
                ) : (
                    <div className="btn btn-success w-100 mt-3">더 보기</div>
                )}
            </div>
        </div>
    );
};

export default MainFollowingList;
