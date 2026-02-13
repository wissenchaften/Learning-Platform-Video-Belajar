import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/Button/Button";
import "./Register.css";
import logoImg from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();


    if (formData.password !== formData.confirmPassword) {
      alert("Kata sandi dan konfirmasi kata sandi tidak cocok!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log("Data Pendaftaran:", formData);
      setIsLoading(false);
      alert("Pendaftaran Berhasil! Silakan masuk.");
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logoImg} alt="videobelajar logo" />
        </div>
      </nav>

      <main className="login-content">
        <div className="login-card">
          <h3>Pendaftaran Akun</h3>
          <p>Yuk, daftarkan akunmu sekarang juga!</p>

          <form className="login-form" onSubmit={handleRegister}>
            <div className="input-group">
              <label>
                Nama Lengkap <span>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>
                E-Mail <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>
                No. Hp <span>*</span>
              </label>
              <div className="phone-input-container">
                <div className="country-code">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg"
                    alt="ID"
                    width="20"
                  />
                  <span>+62</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  className="input-phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Kata Sandi */}
            <div className="input-group">
              <label>
                Kata Sandi <span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Kata Sandi */}
            <div className="input-group">
              <label>
                Konfirmasi Kata Sandi <span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPw ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                >
                  {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Mendaftar..." : "Daftar"}
            </Button>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="secondary"
                fullWidth
                className="mt-16"
                type="button"
              >
                Masuk
              </Button>
            </Link>

            <div className="divider">atau</div>

            <Button
              variant="outline"
              fullWidth
              className="btn-google-reusable"
              type="button"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                width="20"
                alt="google"
                style={{ marginRight: "10px" }}
              />
              Daftar dengan Google
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
