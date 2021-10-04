import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import user from "../../server/models/user";

const Login = (props) => {
  const [email, setEmail] = useState("Tanish@gmail.com");
  const [password, setPassword] = useState("Tanishjain");

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  // router
  const router = useRouter();
  // console.log("STATE", state);

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    const { data } = await axios.post(`/api/login`, {
      email,
      password,
    });
    props.enqueueSnackbar("LoggedIn Sucessfully", {
      variant: "success",
    });
    console.log("Login Response", data);
    dispatch({
      type: "LOGIN",
      payload: data,
    });
    // Save in local storage
    window.localStorage.setItem("user", JSON.stringify(data));
    // redirect
    router.push("/");
  };

  return (
    <>
      <h1 className="jumbotron bg-primary square">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />

          <input
            type="password"
            name="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
          <button type="submit" className="btn btn-block btn-primary"></button>
        </form>
        <p className="text-center p-3">
          Not Yet registered?
          <Link href="/Register">
            <a>Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default withSnackbar(Login);
