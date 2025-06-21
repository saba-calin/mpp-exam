import { Fragment } from "react";
import NewsNavbar from "../layout/NewsNavbar.jsx";

const News = () => {
    const staticNews = [
        {
            id: 1,
            title: "University Election Results Announced",
            summary: "The official results of the 2025 student body elections have been released. See who won!",
            date: "June 21, 2025",
        },
        {
            id: 2,
            title: "New Voting Platform Launched",
            summary: "A new online voting platform has been launched to simplify the student election process.",
            date: "June 19, 2025",
        },
        {
            id: 3,
            title: "Debate Night Highlights",
            summary: "Catch the best moments from the live debate between leading candidates.",
            date: "June 15, 2025",
        }
    ];

    // Example candidate-based news items
    const candidateNews = [
        {
            id: 4,
            title: "Liam Brown Speaks on Environmental Reform",
            summary: "Green Party candidate Liam Brown shared his ambitious sustainability plan at Tuesday's rally.",
            date: "June 13, 2025"
        },
        {
            id: 5,
            title: "Olivia Garcia Gains Momentum in Student Polls",
            summary: "Blue Party's Olivia Garcia is quickly becoming a favorite among first-year students.",
            date: "June 12, 2025"
        },
        {
            id: 6,
            title: "Noah Martinez Discusses Campus Safety",
            summary: "During a campus Q&A, Red Party candidate Noah Martinez proposed new safety protocols.",
            date: "June 10, 2025"
        },
        {
            id: 7,
            title: "Emma Lopez Wins Over Undecided Voters",
            summary: "Emma Lopez of the Yellow Party delivered a passionate speech that swayed many undecided students.",
            date: "June 9, 2025"
        },
        {
            id: 8,
            title: "James Davis Challenges Opponents in Debate",
            summary: "James Davis, representing the Blue Party, sharply criticized his rivals’ lack of clarity during the latest debate.",
            date: "June 7, 2025"
        },
        {
            id: 9,
            title: "Sophia Miller Promises More Student Events",
            summary: "Red Party’s Sophia Miller pledged to organize more cultural and recreational events if elected.",
            date: "June 5, 2025"
        }
    ];

    const newsItems = [...staticNews, ...candidateNews];

    return (
        <Fragment>
            <NewsNavbar />

            <div className="container mt-4">
                <h2 className="mb-4 text-center">Latest News</h2>
                <div className="row">
                    {newsItems.map(item => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{item.date}</h6>
                                    <p className="card-text flex-grow-1">{item.summary}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default News;
