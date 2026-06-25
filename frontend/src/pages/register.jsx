import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/pages/register", {
        name,
        email,
        password,
      });

      alert(
        res.data.message ||
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        style={{
          width: "400px",
          background:
            "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          padding: "30px",
          borderRadius: "20px",
          color: "white",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🧠 MindMate
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Create Your Account
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background:
                "#ffffff",
              color: "#667eea",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Register
          </button>

        </form>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;