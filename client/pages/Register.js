import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import Link from "next/link";
import styles from "../public/css/register.module.css";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    const { data } = await axios.post(`/api/Register`, {
      name,
      email,
      password,
    });
    props.enqueueSnackbar("User Created Sucessfully", {
      variant: "success",
    });
    console.log("Register Response", data);
  };

  return (
    <>
      <h1 className="jumbotron bg-primary square">Register</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />

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
          <button type="submit" className={`${styles.Login}`}></button>
        </form>
        <p className="text-center p-3">
          Already registered?
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default withSnackbar(Register);
