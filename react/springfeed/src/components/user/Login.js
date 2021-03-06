import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import server from "../common/server";

const Login = ({
    setIsLoggedIn,
    user,
    setUser,
    setPage,
    setSelectedPost,
    setIsPostDetailOpen,
}) => {
    const [id, setId] = useState(null);
    const [pw, setPw] = useState(null);

    const navigate = useNavigate();

    const loginAction = (e) => {
        e.preventDefault();

        let noti = toast.loading("로그인하고 있어요");

        fetch(server + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                userid: id,
                password: pw,
            }),
        })
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                if (data == "loginComplete") {
                    toast.success("반가워요!", {
                        id: noti,
                    });

                    fetch(server + "/api/user/login")
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            setUser(data);
                        })
                        .catch((err) => {
                            return err;
                        });

                    navigate(
                        "/",
                        { replace: true },
                        {
                            state: {
                                user: user,
                                setPage: setPage,
                                setSelectedPost: setSelectedPost,
                                setIsPostDetailOpen: setIsPostDetailOpen,
                            },
                        }
                    );
                } else {
                    if (data == "emptyId") {
                        toast.error("아이디를 입력해 주세요!", {
                            id: noti,
                        });
                    } else if (data == "emptyPassword") {
                        toast.error("비밀번호를 입력해 주세요!", {
                            id: noti,
                        });
                    } else if (data == "wrongPassword") {
                        toast.error("비밀번호가 틀렸어요", {
                            id: noti,
                        });
                    } else if (data == "wrongId") {
                        toast.error("존재하지 않는 아이디에요", {
                            id: noti,
                        });
                    } else {
                        toast.error(data);
                    }
                }
                return data;
            })
            .then((data) => {
                if (data == "loginComplete") {
                    setIsLoggedIn(true);
                }
            });
    };

    return (
        <div className="row">
            <div className="col-md-3"></div>

            <div className="col-md-6 border">
                <div className="container">
                    <div className="row justify-content-center mb-5 mt-5">
                        <div className="h1 text-center mb-5">Springfeed</div>
                        <div className="h2 text-center">로그인</div>
                    </div>

                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="아이디"
                                className="p-4 mb-4 border form-control"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="pw"
                                placeholder="비밀번호"
                                className="p-4 mb-4 border form-control"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                value="로그인"
                                className="p-4 mb-4 btn form-control btn-outline"
                                style={{ border: "1px solid var(--mainColor)" }}
                                onClick={(e) => loginAction(e)}
                            />
                        </div>
                    </form>

                    <div className="row mt-5 mb-5">
                        <div className="col-5 align-self-center">
                            <div className="h3 text-center">-</div>
                        </div>
                        <div className="col-2 align-self-center">
                            <div className="h3 text-center">or</div>
                        </div>
                        <div className="col-5 align-self-center">
                            <div className="h3 text-center">-</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8">아직 계정이 없으신가요?</div>
                        <div className="col-4 text-primary">
                            <a href="/admin" className="text-decoration-none">
                                가입하기
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            아이디나 비밀번호를 잊으셨나요?
                        </div>
                        <div className="col-4 text-primary">
                            <a href="/admin" className="text-decoration-none">
                                아이디/비밀번호 찾기
                            </a>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-8">관리자신가요?</div>
                        <div className="col-4 text-primary">
                            <a href="/admin" className="text-decoration-none">
                                관리자 로그인
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3"></div>
        </div>
    );
};

export default Login;
