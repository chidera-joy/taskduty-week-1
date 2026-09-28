import { NavBar } from "../components/NavBar";
import illustration  from "../assets/illustration.svg";
import illustration2 from "../assets/illustration2.svg"
import illustration3 from "../assets/illustration3.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
    const navigate = useNavigate()
    const images = [illustration, illustration2, illustration3]
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [images.length])

    return (
      <div className="max-w-7xl mx-auto">
        <NavBar />
        {/* contents  */}
        <div className="flex flex-col lg:flex lg:flex-row justify-between items-center max-h-screen gap-8 px-5 lg:px-20 py-7 lg:py-25">
          {/* heading and description  */}
          <div className="lg:w-[50%] space-y-6">
            <h1 className="text-[36px] md:text-[45px] font-medium leading-normal">
              Manage your Tasks on <span className="text-violet">TaskDuty</span>
            </h1>
            <p className="text-secondary text-[20px]">
              TaskDuty helps you organize your daily tasks, manage deadlines,
              and stay focused on what matters most. Create, track, and complete
              tasks with ease while keeping everything simple, clear, and
              accessible.
            </p>
            <button
              onClick={() => {
                navigate("/all-tasks");
              }}
              className="bg-violet text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-violet/95"
            >
              Go to my Tasks
            </button>
          </div>
          {/* illustration image  */}
          <div className="relative w-90 h-90">
            {images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt=""
                className={`absolute inset-0 w-90 h-90 object-contain transition-opacity duration-1000 ease-in-out ${
                  currentImage === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
}

export default Home