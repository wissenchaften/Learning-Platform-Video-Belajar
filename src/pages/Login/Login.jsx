import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../../components/Button/Button";
import logoImg from "../../assets/logo.png";
// Import icon mata (bisa gunakan library seperti lucide-react atau react-icons)
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // State untuk input
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const MOCK_USER = {
    email: "admin@gmail.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi delay loading API
    setTimeout(() => {
      // Validasi input terhadap data statis
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        console.log("Login Berhasil!");

        // Simpan status login di localStorage (opsional agar tidak logout saat refresh)
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", "Admin Videobelajar");

        setIsLoading(false);
        navigate("/"); // Pindah ke halaman utama
      } else {
        setIsLoading(false);
        alert(
          "Email atau Kata Sandi salah! (Gunakan: admin@gmail.com / password123)",
        );
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logoImg} alt="logo" />
        </div>
      </nav>

      <main className="login-content">
        <div className="login-card">
          <h3>Masuk ke Akun</h3>
          <p>Yuk, lanjutin belajarmu di videobelajar.</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>
                E-Mail <span>*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
              />
            </div>

            <div className="input-group">
              <label>
                Kata Sandi <span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <span className="forgot-pw">Lupa Password?</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="secondary"
                fullWidth
                className="mt-16"
                type="button"
              >
                Daftar
              </Button>
            </Link>

            <div className="divider">atau</div>

            <Button
              variant="outline"
              fullWidth
              className="btn-google-reusable btn-google-login"
              type="button"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                width="20"
                alt="google"
                style={{ marginRight: "10px" }}
              />
              Masuk dengan Google
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
