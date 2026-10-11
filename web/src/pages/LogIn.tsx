import { NavBar } from "../components/NavBar";
import back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {loginUser} from "../api/api"

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

     try {
       await loginUser(email, password);
       navigate("/all-tasks");
     } catch (error) {
       setError(error instanceof Error ? error.message : "Login failed");
     } finally {
       setLoading(false);
     }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />

      {/* content  */}
      <div className="px-5 lg:px-16 py-7 lg:py-9 space-y-6 ">
        <div className="space-y-2">
          {/* heading */}
          <div className="flex items-center">
            <img
              src={back}
              alt="back"
              width={30}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h1 className="text-3xl">LogIn</h1>
          </div>
          <p className="text-secondary">
            Log in to access your account
          </p>
        </div>

        <form className="space-y-7"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500">{error}</p>}
          {/* email  */}
          <fieldset className="border border-surface rounded-sm px-4">
            <legend className="px-2 text-xl text-secondary">Email</legend>

            <input
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full outline-none py-3"
            />
          </fieldset>

          {/* Password  */}
          <fieldset className="border border-gray-400 rounded-sm px-4 ">
            <legend className="px-2 text-xl text-secondary ">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="w-full outline-none py-3"
            />
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet hover:bg-violet/95 text-white rounded-sm p-3 text-xl mt-5 cursor-pointer"
          >
            {loading? "Logging in..." : "Log In"}
          </button>
        </form>
        <button
          type="button"
          className="w-full text-secondary capitalize cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Don't have an account?
          <a href="/signup" className=" text-violet hover:underline">
            Sign Up
          </a>
        </button>
      </div>
    </div>
  );
};

export default LogIn;
