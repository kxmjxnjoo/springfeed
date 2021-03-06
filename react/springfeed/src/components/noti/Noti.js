import React, { useEffect, useState } from "react";

import Loading from "../common/Loading";

import server from "../common/server";

const Noti = () => {
    const [jspElement, setJspElement] = useState(null);

    const createMarkup = (data) => {
        return { __html: data };
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(server + "/user/notification")
            .then((res) => {
                return res.text();
            })
            .then((html) => {
                setJspElement(html);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading message="알림을 불러오고 있어요" />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: jspElement }} />
            )}
        </>
    );
};

export default Noti;
