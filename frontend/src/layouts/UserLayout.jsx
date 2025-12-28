import Header from "@/components/globalcomponent/Header";
import Footer from "@/components/globalcomponent/Footer";
import AllRoute from "@/routes/AllRoute";
import { Productsfetcher } from "../data/Productsfetcher";

import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Outlet />
        <Productsfetcher />
      </main>

      <Footer />
    </div>
  );
}
