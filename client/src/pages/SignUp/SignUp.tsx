import { Page } from "../../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.style.scss";
import { signup } from "../../infrastructure/ServiceAPI";

function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const attemptSignup = async () => {
    try {
      const message = await signup(email, password);
      setMessage(message);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <Page>
      <div className="signup-page">
        <h1>Sign Up</h1>

        <label>
            Email Address:
            <br></br>
            <input type="text" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <br></br>
          <label>
            Password:
            <br></br>
            <input type="password" name="password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <br></br>

          <button onClick={() => attemptSignup()}>
          Signup
          </button>
          {message && <p>{message}</p>}
      </div>
    </Page>
  );
}

export default SignUp;
