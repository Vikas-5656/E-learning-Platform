import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import NavBar from "../Component/NavBar";
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          TransitionComponent={Slide}
        >
          <NavBar />
          <Component {...pageProps} />;
        </SnackbarProvider>
      </Provider>
    </>
  );
}

export default MyApp;
