import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { useParams } from "react-router-dom";

import server from "../common/server";

const StoryNum = () => {
    const { num } = useParams();

    const [jspElement, setJspElement] = useState(null);

    const createMarkup = (data) => {
        return { __html: data };
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(server + "/story?story_num=" + num)
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
        <div>
            {isLoading ? (
                <Loading message="스토리를 가져오고 있어요" />
            ) : (
                <div
                    dangerouslySetInnerHTML={{ __html: jspElement }}
                    className="mt-5 vh-100"
                    style={{ margin: "0px" }}
                />
            )}
        </div>
    );
};

export default StoryNum;
