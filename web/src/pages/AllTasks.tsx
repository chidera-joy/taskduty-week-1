import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import edit from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import DeleteModal from "../components/DeleteModal";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  completed: boolean;
};

const AllTasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [completionFilter, setCompletionFilter] = useState("All");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch tasks");
          return;
        }

        setTasks(data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setError("Something went wrong while fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to delete task");
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError("Something went wrong while deleting task");
    }
  };

  const handleComplete = async (task: Task) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          category: task.category,
          completed: !task.completed,
        }),
      });

      const data = await response.json();
      setError("");

      if (!response.ok) {
        setError(data.message || "Failed to update task");
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.map((item) => (item._id === task._id ? data.task : item)),
      );
    } catch (error) {
      console.error("Failed to update task:", error);
      setError("Something went wrong while updating task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const categoryMatches =
      categoryFilter === "All" || task.category === categoryFilter;

    const completionMatches =
      completionFilter === "All" ||
      (completionFilter === "Completed" && task.completed) ||
      (completionFilter === "Not Completed" && !task.completed);

    return categoryMatches && completionMatches;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />

      <div className="px-5 lg:px-20 py-7 md:py-9 space-y-7">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl">My Tasks</h1>

          <div
            className="flex items-center text-violet cursor-pointer"
            onClick={() => navigate("/new-task")}
          >
            <p>
              <span className="text-xl pr-2">+</span>
              Add New Task
            </p>
          </div>
        </div>

        {/* CATEGORY DROP DOWN  */}
        <div className="flex flex-wrap gap-4">
          <div className=" flex justify-center border border-surface rounded-sm px-3 py-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className=" outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
            </select>
          </div>

          <div className="flex justify-center border border-surface rounded-sm px-3 py-2">
            <select
              value={completionFilter}
              onChange={(e) => setCompletionFilter(e.target.value)}
              className="outline-none"
            >
              <option value="All">All Tasks</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading */}
        {loading && (
          <p className="text-center text-secondary py-10">Loading tasks...</p>
        )}

        {/* No tasks */}
        {!loading && tasks.length === 0 && !error && (
          <p className="text-center text-secondary py-10">No tasks yet.</p>
        )}

        {!loading && tasks.length > 0 && filteredTasks.length === 0 && (
          <p className="text-center text-secondary py-10">
            No tasks match the selected filters.
          </p>
        )}

        {/* Tasks */}
        {!loading &&
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="border border-surface rounded-sm p-3"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 border-b border-b-surface">
                <p
                  className={`text-lg ${
                    task.category === "Urgent"
                      ? "text-red-500"
                      : task.category === "Important"
                        ? "text-green-600"
                        : ""
                  }`}
                >
                  {task.category}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="flex items-center bg-violet hover:bg-violet/95 cursor-pointer px-3 py-1 text-sm gap-1 text-white rounded-sm"
                    onClick={() => navigate(`/edit-task/${task._id}`)}
                  >
                    <img src={edit} alt="edit" className="w-4" />
                    Edit
                  </button>

                  <button
                    className="flex hover:bg-gray-100 cursor-pointer border border-violet px-3 py-1 text-sm gap-1 text-violet rounded-sm"
                    onClick={() => {
                      setTaskToDelete(task._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <img src={deleteIcon} alt="delete" className="w-4" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="py-3 space-y-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleComplete(task)}
                    className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer ${
                      task.completed
                        ? "bg-violet border-violet text-white"
                        : "border-secondary"
                    }`}
                  >
                    {task.completed && "✓"}
                  </button>

                  <h1
                    className={`font-regular text-2xl ${
                      task.completed ? "line-through text-secondary" : ""
                    }`}
                  >
                    {task.title}
                  </h1>
                </div>

                <p className="line-clamp-3 text-secondary">
                  {task.description}
                </p>
              </div>
            </div>
          ))}

        {/* Delete Modal */}
        {showDeleteModal && (
          <DeleteModal
            onCancel={() => {
              setShowDeleteModal(false);
              setTaskToDelete(null);
            }}
            onConfirm={() => {
              if (taskToDelete) {
                handleDelete(taskToDelete);
              }

              setShowDeleteModal(false);
              setTaskToDelete(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AllTasks;