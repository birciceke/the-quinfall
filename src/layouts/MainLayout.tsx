import { Outlet } from "react-router";

import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
export default MainLayout;
