import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import TaskTrackerPage from "./components/pages/TaskTrackerPage";
import Footer from "./components/ui/Footer";
// pages

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task-tracker" element={<TaskTrackerPage />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
