import { fetchComponents } from "../api/components.js";
import AboutUs from "../components/AboutUs/AboutUs";
import BudgetDashboard from "../components/BudgetDashboard/BudgetDashboard";
import Calculator from "../components/Calculator/Calculator";
import ContactUs from "../components/ContactUs/ContactUs";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Millitary from "../components/Millitary/Millitary";
import Reviews from "../components/Reviews/Reviews";
import Services from "../components/Services/Services";
import Stats from "../components/Stats/Stats";

export default async function Home() {
  const components = await fetchComponents();

  return (
    <div>
      <Main component={components.main} />
      <AboutUs component={components.about_us} />
      <Stats component={components.stats} />
      <Services component={components.services} />
      <Calculator component={components.calculator} />
      <Reviews reviews={components.reviews} />
    </div>
  );
}