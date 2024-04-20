import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerifyLink = () => {
  let params = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    async function verify() {
      let data = await axios.post(
        "http://localhost:8000/api/v1/auth/linkverification",
        {
          token: params.token,
        }
      );
      navigate("/login");
    }
    verify();
  });
  return (
    <>
      <div className="">loading....</div>
    </>
  );
};

export default EmailVerifyLink;
