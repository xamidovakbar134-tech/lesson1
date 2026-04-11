import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login yoki parol noto'g'ri!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle= async()=>{
    try {
    const data=  await signInWithPopup(auth, googleProvider);
    navigate("/chat")
    console.log(data);
    
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-25">
        <div className="card-header bg-success text-white text-center">
          Login
        </div>
        <div className="card-body">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control mt-2"
            placeholder="Password"
          />
        </div>
        <div className="card-footer">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-100 btn btn-success mt-2"
          >
            Login
          </button>
          <button onClick={handleGoogle} className="btn btn-outline-primary d-flex justify-content-center align-items-center mt-2 w-100  gap-2">
          <FcGoogle size={18}/>  Google orqali kirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
