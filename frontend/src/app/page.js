import Head from 'next/head';
import Navbar from '@/components/Navbar/Navbar';
import Main from '@/components/Main/Main';
import { fetchComponents } from '../api/components';
import { fetchLots, fetchBodyTypes, fetchFuelTypes } from '../api/lots';
import ClientSections from '@/components/client';

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
        <ClientSections
          components={components}
          lots={lotsData.lots}
          bodyTypes={bodyTypes}
          fuelTypes={fuelTypes}
        />
      </main>
    </>
  );
}
