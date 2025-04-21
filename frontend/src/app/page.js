'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { fetchComponents } from "../api/components.js";
import AboutUs from "../components/AboutUs/AboutUs";
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import Calculator from "../components/Calculator/Calculator";
import ContactUs from "../components/ContactUs/ContactUs";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Millitary from "../components/Millitary/Millitary";
import Reviews from "../components/Reviews/Reviews";
import Services from "../components/Services/Services";
import Stats from "../components/Stats/Stats";
import Navbar from "@/components/Navbar/Navbar";
import GridAnimation from '@/components/AnimationComponents/AnimatedLoading/AnimatedLoading.jsx';

export default function Home() {
  const [isAnimationComplete, setAnimationComplete] = useState(false);
  const [components, setComponents] = useState(null);

  useEffect(() => {
    const loadComponents = async () => {
      const fetchedComponents = await fetchComponents();
      setComponents(fetchedComponents);
    };

    loadComponents();
  }, []);

  if (!components) {
    return <GridAnimation onComplete={() => setAnimationComplete(true)} />;
  }

  return (
    <>
      <Head>
        <title>MAKS AUTO - Головна</title>
        <meta name="description" content="MAKS AUTO - найкращі автомобілі для вас." />
        <meta name="keywords" content="автомобілі, продаж, сервіс, MAKS AUTO" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {isAnimationComplete ? (
        <>
          <Navbar />
          <main>
            <Main component={components.main} />
            <AboutUs component={components.about_us} />
            <Stats component={components.stats} />
            <Services component={components.service} />
            <Millitary component={components.millitary} />
            <Dashboard />
            <Calculator component={components.calculator} />
            <Reviews />
          </main>
          <ContactUs />
          <Footer />
        </>
      ) : (
        <GridAnimation onComplete={() => setAnimationComplete(true)} />
      )}
    </>
  );
}