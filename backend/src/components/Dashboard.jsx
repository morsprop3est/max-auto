import React, { useEffect, useState } from 'react';
import { ApiClient, Box, H1, H2, Text } from 'adminjs';
import { Chart } from 'react-chartjs-2';

const api = new ApiClient();

const Dashboard = () => {
  const [stats, setStats] = useState({ orders: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    };

    fetchStats();
  }, []);

  const data = {
    labels: ['Orders', 'Users'],
    datasets: [
      {
        label: 'Statistics',
        data: [stats.orders, stats.users],
        backgroundColor: ['#038405', '#80c904'],
      },
    ],
  };

  return (
    <Box>
      <H1>Welcome to Maks Auto Admin</H1>
      <H2>Statistics</H2>
      <Chart type="bar" data={data} />
      <Text mt="lg">Manage your platform efficiently!</Text>
    </Box>
  );
};

export default Dashboard;