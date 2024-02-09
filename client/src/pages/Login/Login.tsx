import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Login.style.scss";

function Login() {
  const [message, setMessage] = useState(null);
  const { loggedIn, login } = useAccountContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const attemptLogin = async () => {
    try {
      const message = await login(email, password);//admin@email.com, password
      setMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn() === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);
  
  return (
    <Page>
      <div className="login-page">
        <h1>Login</h1>
      
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

          <button onClick={() => attemptLogin()}>
          Login
          </button>
        {message && <p>{message}</p>}
        
        
      </div>
    </Page>
  );
}

export default Login;
