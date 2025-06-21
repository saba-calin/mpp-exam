import {Fragment} from "react";
import RegisterNavbar from "../../layout/auth/RegisterNavbar.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formattedData = Object.fromEntries(formData.entries());

        const authRequest = {
            username: formattedData.username,
            password: formattedData.password
        };

        axios.post("http://localhost:8080/api/v1/user/register", authRequest)
            .then((response) => {
                const user = response.data;
                console.log(user);

                localStorage.setItem("id", user.id);
                localStorage.setItem("username", user.username);

                navigate("/");
            })
            .catch(() => alert("CNP already exists"));
    }

    return (
        <Fragment>
            <RegisterNavbar />

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Log In
                        </h2>
                        <form role="form" className="mb-3 text-center" onSubmit={handleEdit}>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="username" name="username" className="form-control" placeholder="Username" style={{marginBottom: "10px"}} />

                            <label htmlFor="password" className="form-label">CNP</label>
                            <input type="password" id="password" name="password" className="form-control" placeholder="CNP" style={{marginBottom: "10px"}} />

                            <button type="submit" className="btn btn-outline-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;
