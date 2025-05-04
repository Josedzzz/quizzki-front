import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/helperFunctions";
import { loginService } from "../services/authService";
import Cookies from "js-cookie";

export default function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * handles the submission of the login form
   * @param e - the form submission event
   * @returns
   */
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    try {
      if (!isAdmin) {
        const validation: string | null = validateLoginForm(email, password);
        if (validation) {
          setMessage(validation);
          return;
        }
        const response = await loginService({ email, password }, "student");
        localStorage.setItem("userId", response.data.id);
        Cookies.set("authUserToken", response.data.token, { expires: 1 });
        setMessage(response.message);
        navigate("/user-dashboard");
      } else {
        const validation: string | null = validateLoginForm(email, password);
        if (validation) {
          setMessage(validation);
          return;
        }
        const response = await loginService({ email, password }, "teacher");
        localStorage.setItem("adminId", response.data.id);
        Cookies.set("authAdminToken", response.data.token, { expires: 1 });
        setMessage(response.message);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Un error inesperado ocurrió");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center w-full">
      <div className="w-full max-w-xl bg-zinc-800 p-8 border-4 border-blue-500 rounded-xl shadow-lg">
        <div className="flex items-center space-x-1 gap-1 mb-5">
          <h1 className="text-3xl font-bold text-white text-center">Login</h1>
          <i className="fa-solid fa-arrow-right-to-bracket text-3xl text-blue-500"></i>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-5">
            <label className="block text-white font-bold mb-3" htmlFor="email">
              <i className="fa-regular fa-envelope text-white"></i> Email
            </label>
            <input
              type="text"
              id="email"
              className="text-white w-full px-2 py-1 rounded-lg ring-1 ring-blue-500 focus:outline-none focus:ring-2 text-sm"
              placeholder={"Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block text-white font-bold mb-3"
              htmlFor="password"
            >
              <i className="fa-solid fa-lock"></i> Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="text-white w-full px-2 py-1 rounded-lg ring-1 ring-blue-500 focus:outline-none focus:ring-2 text-sm"
              placeholder={"Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center text-white font-bold mb-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-md mr-2"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <span className="flex items-center text-white">
                Soy un profesor
                <i className="fa-solid fa-user-tie ml-2"></i>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`text-white font-bold p-2 rounded-xl w-full ${
                isLoading
                  ? "bg-blue-500 text-white cursor-not-allowed"
                  : "bg-blue-500 hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              }`}
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
            </button>
          </div>
        </form>
        {message && <p className="text-white text-center mt-4">{message}</p>}
      </div>
    </main>
  );
}
