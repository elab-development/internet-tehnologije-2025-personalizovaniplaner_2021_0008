import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../../styles/auth.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper">
      <div className={`auth-box ${!isLogin ? "active" : ""}`}>
        <div className="form-side">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        <div className="overlay">
          {isLogin ? (
            <>
              <h2>Hello, Welcome!</h2>
              <p>Don't have an account?</p>
              <button
                className="btn btn-outline-light"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <h2>Welcome Back!</h2>
              <p>Already have an account?</p>
              <button
                className="btn btn-outline-light"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
