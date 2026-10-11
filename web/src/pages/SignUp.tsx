import { NavBar } from "../components/NavBar";
import back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { registerUser } from "../api/api";
const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setError("");
      setLoading(true);

      try {
        await registerUser(name, email, password);

        navigate("/login");
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Registration failed",
        );
      } finally {
        setLoading(false);
      }
    };


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
            <h1 className="text-3xl">SignUp</h1>
          </div>
          <p className="text-secondary">
            Sign up with to be a part of task duty
          </p>
        </div>

        <form className="space-y-7" onSubmit={handleSignUp}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* name  */}
          <fieldset className="border border-surface rounded-sm px-4">
            <legend className="px-2 text-xl text-secondary">Full-Name</legend>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g Joy Madu"
              className="w-full outline-none py-3"
            />
          </fieldset>

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
            className="w-full bg-violet hover:bg-violet/95 text-white rounded-sm p-3 text-xl mt-5 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Done"}
          </button>
        </form>
        <button
          type="button"
          className="w-full text-secondary capitalize cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account?{" "}
          <a href="/login" className=" text-violet hover:underline">
            Login
          </a>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
