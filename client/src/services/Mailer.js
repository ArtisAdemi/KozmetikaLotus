import axios from 'axios';
//import buildUrl from '../middleware/BuildParam';
const API_URL = 'http://localhost:3001/api/mailer';

const MailerService = {
    sendEmail: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}`, userData);
            console.log('Email sent successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    },

    // sendStatusEmail: async (userId) => {
    //     try {
    //         const response = await axios.post(`${API_URL}/status`, userId);
    //         console.log('Email sent successfully:', response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error sending email:', error);
    //         throw error;
    //     }
    // }
    
};

export default MailerService;