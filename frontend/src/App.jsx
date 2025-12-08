import Header from "@/components/globalcomponent/Header";
import Footer from "@/components/globalcomponent/Footer";
import AllRoute from "@/routes/AllRoute";
import { Productsfetcher } from "./data/Productsfetcher";

export default function App() {
  return (
    <>
      <Header />
      <AllRoute />
      <Footer />
      <Productsfetcher />
    </>
  );
}
