import { NavBar } from '../components/NavBar'
import back from '../assets/back.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiRequest } from "../api/api";
const NewTask = () => {
    const navigate = useNavigate()
    const [tag, setTag] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!title.trim()) {
        setError("Task title required");
        return;
      }

      if (!description.trim()) {
        setError("Task description required");
        return;
      }

      if (!tag.trim()) {
        setError("Tag required");
        return;
      }

      setError("");

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date().toISOString().slice(0, 10),
        category: tag,
        completed: false,
      };

      try {
    const data = await apiRequest("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

        console.log("Task created:", data);

        navigate("/all-tasks");
      } catch (error) {
        console.error("Failed to create task:", error);
        setError("Something went wrong. Please try again.");
      }
    };
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />

      {/* content  */}
      <div className="px-5 lg:px-16 py-7 lg:py-9 space-y-6">
        {/* heading */}
        <div className="flex items-center">
          <img
            src={back}
            alt="back"
            width={30}
            className="cursor-pointer"
            onClick={() => navigate("/all-tasks")}
          />
          <h1 className="text-3xl">New Task</h1>
        </div>

        <form className="space-y-7" onSubmit={handleSubmit}>
          {/* title  */}
          <fieldset className="border border-surface rounded-sm px-4">
            <legend className="px-2 text-xl text-secondary">Task Title</legend>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g Project Defense, Assignment"
              className="w-full outline-none py-3"
            />
          </fieldset>

          {/* description  */}
          <fieldset className="border border-surface rounded-sm px-4">
            <legend className="px-2 text-xl text-secondary">Description</legend>

            <textarea
              name="description"
              id="description"
              placeholder="Briefly Describe your task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 w-full border-0 outline-0 focus:border-0 focus:outline-none focus:ring-0 resize-none"
            ></textarea>
          </fieldset>

          {/* Tags  */}
          <fieldset className="border border-gray-400 rounded-sm px-4 ">
            <legend className="px-2 text-xl text-secondary">Tags</legend>

            <div className="flex gap-3 py-3">
              <button
                type="button"
                onClick={() => setTag("Urgent")}
                className={`px-3 py-1 rounded-lg border ${
                  tag === "Urgent"
                    ? "bg-secondary text-white"
                    : "border-secondary"
                }`}
              >
                Urgent
              </button>

              <button
                type="button"
                onClick={() => setTag("Important")}
                className={`px-3 py-1 rounded-lg border ${
                  tag === "Important"
                    ? "bg-secondary text-white"
                    : "border-secondary"
                }`}
              >
                Important
              </button>
            </div>
          </fieldset>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-violet hover:bg-violet/95 text-white rounded-sm p-3 text-xl mt-5 cursor-pointer"
          >
            Done
          </button>
        </form>
        <button
          type="button"
          className="w-full text-violet hover:underline rounded-sm capitalize cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          back to top
        </button>
      </div>
    </div>
  );
}

export default NewTask