import Head from 'next/head';
import Navbar from '@/components/Navbar/Navbar';
import Main from '@/components/Main/Main';
import AboutUs from '@/components/AboutUs/AboutUs';
import Stats from '@/components/Stats/Stats';
import Services from '@/components/Services/Services';
import Millitary from '@/components/Millitary/Millitary';
import Dashboard from '@/components/Dashboard/Dashboard.jsx';
import Calculator from '@/components/Calculator/Calculator';
import Reviews from '@/components/Reviews/Reviews.jsx';
import ContactUs from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/Footer';
import { fetchComponents } from '../api/components';
import { fetchLots, fetchBodyTypes, fetchFuelTypes } from '../api/lots';

export default async function Home() {
  const components = await fetchComponents();
  const lotsData = await fetchLots({ page: 1, limit: 10, filters: {} });
  const bodyTypes = components.bodyTypes || [];
  const fuelTypes = components.fuelTypes || [];

  return (
    <>
      <Head>
        <title>MAKS AUTO - Головна</title>
        <meta name="description" content="MAKS AUTO - найкращі автомобілі для вас." />
        <meta name="keywords" content="автомобілі, продаж, сервіс, MAKS AUTO" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main>
        <Main component={components.main} />
        <AboutUs component={components.about_us} />
        <Stats component={components.stats} />
        <Services component={components.service} />
        <Millitary component={components.millitary} />
        <Dashboard
          components={components.dashboard}
          lots={lotsData.lots}
          bodyTypes={bodyTypes}
          fuelTypes={fuelTypes}
        />
        <Calculator component={components.calculator} />
        <Reviews component={components.reviews} />
        <ContactUs />
        <Footer />
      </main>
    </>
  );
}
