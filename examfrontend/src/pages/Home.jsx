import {Fragment, useRef, useState} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const [dummyData, setDummyData] = useState([
        { id: 1, firstName: "John", lastName: "Doe" },
        { id: 2, firstName: "Jane", lastName: "Smith" },
        { id: 3, firstName: "Alice", lastName: "Johnson" },
        { id: 4, firstName: "Bob", lastName: "Williams" }
    ]);

    const [isGenerating, setIsGenerating] = useState(false);
    const intervalRef = useRef(null);

    const generateRandomCandidate = () => {
        const firstNames = ["Liam", "Olivia", "Noah", "Emma", "Elijah", "Ava", "James", "Sophia"];
        const lastNames = ["Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Lopez"];
        const parties = ["Red", "Blue", "Green", "Yellow"];

        const newCandidate = {
            id: Date.now(), // unique ID based on timestamp
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            party: parties[Math.floor(Math.random() * parties.length)]
        };

        setDummyData(prevData => [...prevData, newCandidate]);
    };

    const toggleGeneration = () => {
        if (!isGenerating) {
            intervalRef.current = setInterval(generateRandomCandidate, 1000);
            setIsGenerating(true);
        } else {
            clearInterval(intervalRef.current);
            setIsGenerating(false);
        }
    };

    const handleDelete = (indexToRemove) => {
        setDummyData((prevData) =>
            prevData.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <Fragment>
            <HomeNavbar />

            <div className="container">
                <div className="d-flex justify-content-end py-2">
                    <button className={`btn ${isGenerating ? "btn-danger" : "btn-success"}`} onClick={toggleGeneration}>
                        {isGenerating ? "Stop Generator" : "Start Generator"}
                    </button>
                </div>

                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dummyData.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-primary btn-sm mx-1"
                                        onClick={() => navigate(`/candidate/${index}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm mx-1"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>



            {/*<form role="form" className="mb-3 text-center" onSubmit={handleSubmit}>*/}
            {/*    <label htmlFor="firstName" className="form-label">First Name</label>*/}
            {/*    <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="lastName" className="form-label">Last Name</label>*/}
            {/*    <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="party" className="form-label">Party</label>*/}
            {/*    <input type="text" id="party" name="party" className="form-control" placeholder="Party" style={{marginBottom: "50px"}} />*/}

            {/*    <button type="submit" className="btn btn-outline-primary">Add</button>*/}
            {/*</form>*/}

            {/*<form role="form" className="mb-3 text-center" onSubmit={handleEdit}>*/}
            {/*    <label htmlFor="id" className="form-label">First Name</label>*/}
            {/*    <input type="number" id="id" name="id" className="form-control" placeholder="Id" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="firstName" className="form-label">First Name</label>*/}
            {/*    <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="lastName" className="form-label">Last Name</label>*/}
            {/*    <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="party" className="form-label">Party</label>*/}
            {/*    <input type="text" id="party" name="party" className="form-control" placeholder="Party" style={{marginBottom: "50px"}} />*/}

            {/*    <button type="submit" className="btn btn-outline-primary">Edit</button>*/}
            {/*</form>*/}
        </Fragment>
    );
}

export default Home;
