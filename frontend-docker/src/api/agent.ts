import axios from 'axios';

// agent rotas api
const agent = axios.create({
    baseURL: "http://localhost:3000", // Usar a variável de ambiente
    headers: {
        'Content-Type': 'application/json',
    },
});

export default agent;

// Example GET request
export const getJoke = async () => {
    try {
        const response = await agent.get('/piada');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch example data');
    }
};

// Example POST request
export const suggestJoke = async (data: any) => {
    try {
        const response = await agent.post('/piada', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to post example data');
    }
};