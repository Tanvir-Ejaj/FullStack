import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "../pages/Registration";
import OtpVerification from "../pages/OtpVerification";
import Login from "../pages/Login";
import EmailVerifyLink from "../pages/EmailVerifyLink";
import ForgetPassword from "../pages/ForgetPassword";
import NewPassword from "../pages/NewPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/otpverification/:email" element={<OtpVerification />} />
      <Route path="/emailverification/:token" element={<EmailVerifyLink />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/newpassword/:token" element={<NewPassword />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
