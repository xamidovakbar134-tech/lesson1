import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const data = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
      console.log(data);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-25">
        <div className="card-header bg-success text-white text-center">
          Register
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
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-100 btn btn-success mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

export default Register;
