import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";

const { Item, SubMenu } = Menu;

const NavBar = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>

          <Item
            key="/Register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/Register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <Item
            onClick={logout}
            icon={<LogoutOutlined />}
            className="float-right"
          >
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};
export default NavBar;
