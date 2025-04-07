import axios from 'axios';

const CRM_URL = process.env.CRM_URL;
const CRM_API_KEY = process.env.CRM_API_KEY;

export const formatCRMData = ({ name, phone, carDetails, totalPrice }) => {
  return {
    form: CRM_API_KEY,
    fName: name, 
    phone,
    products: [
      {
        name: carDetails,
        costPerItem: totalPrice,
        amount: 1,
      },
    ],
    comment: `Замовлення звінка`, 
  };
};

export const sendOrderToCRM = async (orderData) => {
  const crmData = formatCRMData(orderData);
  try {
    const response = await axios.post(CRM_URL, crmData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Order sent to CRM:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending order to CRM:', error);
    throw new Error('Failed to send order to CRM');
  }
};