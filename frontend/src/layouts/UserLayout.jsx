import Header from "@/components/globalcomponent/Header";
import Footer from "@/components/globalcomponent/Footer";
import AllRoute from "@/routes/AllRoute";
import { Productsfetcher } from "../data/Productsfetcher";

import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Productsfetcher />
    </>
  );
}