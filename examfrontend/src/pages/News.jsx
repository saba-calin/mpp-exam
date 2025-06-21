import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import NewsNavbar from "../layout/NewsNavbar.jsx";

const News = () => {
    const [news, setNews] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/news")
            .then(response => setNews(response.data))
            .catch(() => console.error("Failed to fetch news."));
    }, []);

    return (
        <Fragment>
            <NewsNavbar />

            <div className="container mt-4">
                <h2 className="mb-4 text-center">Latest News</h2>

                {news ? (
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{news.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {new Date().toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                    </h6>
                                    <p className="card-text flex-grow-1">{news.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Loading latest news...</p>
                )}
            </div>
        </Fragment>
    );
};

export default News;
