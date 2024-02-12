import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Register.scss";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileimage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileimage" ? files[0] : value,
    }));
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmpassword ||
        formData.confirmpassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (let key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Failed", error.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords Do Not Match!</p>
          )}
          <input
            id="image"
            type="file"
            name="profileimage"
            accept="image/"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img
              src="../../../public/assets/addImage.png"
              alt="add profile photo"
            />
            <p>Upload Your Photo</p>
          </label>
          {formData.profileimage && (
            <img
              src={URL.createObjectURL(formData.profileimage)}
              alt="profile photo"
              style={{ maxWidth: "64px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default Register;
