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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/otpverification/:email" element={<OtpVerification />} />
      <Route path="/emailverification/:token" element={<EmailVerifyLink />} />
      <Route path="/login" element={<Login />} />
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
