import axios from 'axios';
import dotenv from 'dotenv';

const webHookUrl = process.env.SLACK_URL;

async function sendSlackNotification(message) {
    try {
        const payload = {
            text: message
        };

        const response = await axios.post(webHookUrl, payload);
        console.log('Deu boa! ', response.status);
    } catch (error) {
        console.error('Falha na conexão! ', response.error);
    }
}

sendSlackNotification('Hello World');