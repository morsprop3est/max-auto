import axios from 'axios';

const CRM_URL = process.env.CRM_URL;
const CRM_API_KEY = process.env.CRM_API_KEY;

export const sendOrderToCRM = async ({ 
  name, 
  phone, 
  comment,
  prodex24source,
  prodex24medium,
  prodex24campaign,
  prodex24content,
  prodex24term,
  prodex24page,
  prodex24source_full
}) => {
  let fName = name || '';

  const crmData = {
    form: CRM_API_KEY,
    getResultData: "1",
    fName,
    phone,
    comment: comment || '',
    con_comment: comment || '',
    ...(prodex24source && { prodex24source }),
    ...(prodex24medium && { prodex24medium }),
    ...(prodex24campaign && { prodex24campaign }),
    ...(prodex24content && { prodex24content }),
    ...(prodex24term && { prodex24term }),
    ...(prodex24page && { prodex24page }),
    ...(prodex24source_full && { prodex24source_full })
  };

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