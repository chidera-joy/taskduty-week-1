import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";

import AllTasks from "./pages/AllTasks";
import NewTask from "./pages/NewTask";
import Home from "./pages/Home";
import EditTask from "./pages/EditTask";

function App() {
  const location = useLocation();

  return (
    <div className="font-signika">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/all-tasks"
            element={
              <PageTransition>
                <AllTasks />
              </PageTransition>
            }
          />

          <Route
            path="/new-task"
            element={
              <PageTransition>
                <NewTask />
              </PageTransition>
            }
          />

          <Route
            path="/edit-task/:id"
            element={
              <PageTransition>
                <EditTask />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default App;
