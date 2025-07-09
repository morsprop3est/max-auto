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
import FloatingSocial from '@/components/FloatingSocial/FloatingSocial';
import { fetchComponents } from '../api/components';
import { fetchLots } from '../api/lots';
import componentsData from '@/utils/components.json';

export default async function Home() {
  let components;
  let lotsData;
  
  try {
    components = await fetchComponents();
    if (!components) {
      console.log('Failed to fetch components, using fallback data');
      components = componentsData;
    }
    lotsData = await fetchLots({ page: 1, limit: 10, filters: {} });
  } catch (error) {
    console.log('Failed to fetch data from API, using fallback data:', error);
    components = componentsData;
    lotsData = { lots: [] };
  }

  const bodyTypes = components?.bodyTypes || [];
  const fuelTypes = components?.fuelTypes || [];
  const auctions = components?.auctions || { copart: [], iaai: [] };

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
        <section id="main">
          <Main component={components?.main} />
        </section>
        <section id="about-us">
          <AboutUs component={components?.about_us} />
        </section>
        <section id="stats">
          <Stats component={components?.stats} />
        </section>
          <Services component={components?.service} />
        <section id="millitary">
          <Millitary component={components?.millitary} />
        </section>
        <section id="dashboard">
          <Dashboard
            components={components?.dashboard}
            initialLots={lotsData.lots}
            bodyTypes={bodyTypes}
            fuelTypes={fuelTypes}
          />
        </section>
        <section id="calculator">
          <Calculator 
            component={components?.calculator}
            bodyTypes={bodyTypes}
            fuelTypes={fuelTypes}
            auctions={auctions}
          />
        </section>
        <section id="reviews">
          <Reviews component={components?.reviews} />
        </section>
        <section id="contact-us">
          <ContactUs />
        </section>
        <Footer />
      </main>
      <FloatingSocial />
    </>
  );
}
