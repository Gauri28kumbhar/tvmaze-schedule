import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import SchedulePage from "../features/schedule/SchedulePage";
import ShowDetailPage from "../features/show/ShowDetailPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SchedulePage />} />
          <Route path="/show/:id" element={<ShowDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter;