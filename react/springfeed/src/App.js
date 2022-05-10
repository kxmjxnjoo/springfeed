import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams,
} from "react-router-dom";
import React, { useState, useEffect, useHistory } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

// Components
import Home from "./components/Home";
import Topnav from "./components/common/Topnav";
import Loading from "./components/common/Loading";
import Search from "./components/Search";
import Message from "./components/Message";
import Error from "./components/common/Error";
import Explore from "./components/Explore";
import NoLogin from "./components/common/NoLogin";
import PostDetail from "./components/Home/PostDetail";
import Noti from "./components/jsp-components/Noti";
import Login from "./components/jsp-components/Login";
import Logout from "./components/jsp-components/Logout";
import Join from "./components/jsp-components/Join";
import UserEdit from "./components/jsp-components/UserEdit";
import UploadStory from "./components/jsp-components/UploadStory";
import UploadPost from "./components/UploadPost";
import Find from "./components/jsp-components/Find";
import Admin from "./components/jsp-components/Admin";
import Report from "./components/jsp-components/Report";
import StoryNum from "./components/jsp-components/StoryNum";
import Post from "./components/Home/Post";

// Common
import "./common.css";
import UserPage from "./components/common/UserPage";
import Footer from "./components/common/Footer";
import Qna from "./components/jsp-components/Qna";
import Faq from "./components/jsp-components/Faq";
import Story from "./components/jsp-components/Story";
import Select from "./components/Select";

import "./search.css";

function App() {
    const [page, setPage] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchKey, setSearchKey] = useState("");

    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);

    const closePostDetail = () => {
        setIsPostDetailOpen(false);
    };

    useEffect(() => {
        fetch("/api/user/login")
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setUser(result);

                if (result !== "" || result == null) {
                    setIsLoggedIn(true);
                    toast.success("안녕하세요 " + result.name + "님!");
                } else {
                    setIsLoggedIn(false);
                    toast.promise({
                        loading: "loading...",
                        success: <b>Success!</b>,
                        error: <b>ERROR!</b>,
                    });
                }
            })
            .catch((err) => {
                toast.error("에러가 났어요! " + err.message);
            });
    }, []);

    const openPostDetail = (postNum) => {
        setIsPostDetailOpen(true);
        setSelectedPost(postNum);
    };

    return (
        <div className="App d-flex flex-column min-vh-100">
            <Router>
                <div>
                    <Toaster position="bottom-right" reverseOrder="false" />
                </div>

                <Topnav
                    page={page}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setIsSelectOpen={setIsSelectOpen}
                />

                {searchKey !== "" ? (
                    <div
                        className="card w-50 ms-5 mt-md-5 mt-6 overflow-auto shadow-lg"
                        style={{
                            height: "300px",
                            position: "fixed",
                            zIndex: "100",
                            top: "50px",
                            left: "50px",
                        }}
                    >
                        <div className="card-header">
                            <div className="card-title h5 text-center">
                                검색 결과
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <Search
                                searchKey={searchKey}
                                setIsPostDetailOpen={setIsPostDetailOpen}
                                setSelectedPost={setSelectedPost}
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                <div className="container min-vh-100">
                    {isLoading ? (
                        <Loading message="로딩중이에요" />
                    ) : isError ? (
                        <Error errorMessage={errorMessage} />
                    ) : (
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    !isLoggedIn ? (
                                        <Login
                                            isLoggedIn={isLoggedIn}
                                            setIsLoggedIn={setIsLoggedIn}
                                        />
                                    ) : (
                                        <Home
                                            user={user}
                                            setPage={setPage}
                                            setSelectedPost={setSelectedPost}
                                            setIsPostDetailOpen={
                                                setIsPostDetailOpen
                                            }
                                            setIsSelectOpen={setIsSelectOpen}
                                        />
                                    )
                                }
                            />
                            <Route path="/search" element={<Search />} />
                            <Route
                                path="/message"
                                element={
                                    !isLoggedIn ? (
                                        <Login
                                            isLoggedIn={isLoggedIn}
                                            setIsLoggedIn={setIsLoggedIn}
                                            user={user}
                                            setPage={setPage}
                                            setSelectedPost={setSelectedPost}
                                            setIsPostDetailOpen={
                                                setIsPostDetailOpen
                                            }
                                            setIsSelectOpen={setIsSelectOpen}
                                        />
                                    ) : (
                                        <Message
                                            setPage={setPage}
                                            user={user}
                                            setIsSelectOpen={setIsSelectOpen}
                                        />
                                    )
                                }
                            />
                            <Route
                                path="/explore"
                                element={
                                    <Explore
                                        setPage={setPage}
                                        setIsPostDetailOpen={
                                            setIsPostDetailOpen
                                        }
                                        setSelectedPost={setSelectedPost}
                                        setIsSelectOpen={setIsSelectOpen}
                                    />
                                }
                            />

                            <Route
                                path="/noti"
                                element={
                                    !isLoggedIn ? (
                                        <Login isLoggedIn={isLoggedIn} />
                                    ) : (
                                        <Noti
                                            setIsSelectOpen={setIsSelectOpen}
                                        />
                                    )
                                }
                            />

                            <Route
                                path="/user/page/:id"
                                element={
                                    <UserPage
                                        setSearchKey={setSearchKey}
                                        setIsSelectOpen={setIsSelectOpen}
                                        isLoggedIn={isLoggedIn}
                                        loginUser={user}
                                        setIsPostDetailOpen={
                                            setIsPostDetailOpen
                                        }
                                        openPostDetail={openPostDetail}
                                    />
                                }
                                openPostDetail={openPostDetail}
                            />
                            <Route
                                path="/login"
                                element={
                                    <Login
                                        isLoggedIn={isLoggedIn}
                                        setIsLoggedIn={setIsLoggedIn}
                                    />
                                }
                            />
                            <Route
                                path="/logout"
                                element={
                                    <Logout setIsLoggedIn={setIsLoggedIn} />
                                }
                            />
                            <Route path="/join" element={<Join />} />

                            <Route
                                path="/user/edit"
                                element={
                                    !isLoggedIn ? (
                                        <Login isLoggedIn={isLoggedIn} />
                                    ) : (
                                        <UserEdit />
                                    )
                                }
                            />
                            <Route path="/faq" element={<Faq />} />
                            <Route path="/qna" element={<Qna />} />

                            <Route
                                path="/upload/story"
                                element={
                                    <UploadStory
                                        setIsSelectOpen={setIsSelectOpen}
                                    />
                                }
                            />
                            <Route
                                path="/upload/post"
                                element={
                                    <UploadPost
                                        setIsSelectOpen={setIsSelectOpen}
                                    />
                                }
                            />

                            <Route path="/find/account" element={<Find />} />

                            <Route path="/admin" element={<Admin />} />

                            <Route path="/story/:id" element={<Story />} />
                            <Route
                                path="/storynum/:num"
                                element={<StoryNum />}
                            />

                            <Route path="/post/:num" element={<Post />} />
                        </Routes>
                    )}
                </div>

                <Footer />

                <Modal
                    show={isPostDetailOpen}
                    onHide={closePostDetail}
                    dialogClassName="postDetailModal"
                    className="mt-5"
                >
                    <PostDetail selectedPost={selectedPost} />
                </Modal>

                <Modal
                    show={isSelectOpen}
                    onHide={() => {
                        setIsSelectOpen(false);
                    }}
                    dialogClassName="selectModal"
                    className="mt-5"
                >
                    <Select />
                </Modal>

                <Modal
                    show={isReportOpen}
                    onHide={() => {
                        setIsReportOpen(false);
                    }}
                    className="mt-5"
                >
                    <Report />
                </Modal>
            </Router>
        </div>
    );
}

export default App;
