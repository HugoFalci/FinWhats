import { connect } from '../config/database.js';
import app from '../routes/api.js';

export default async function handler(req, res) {
    await connect(); // Conecta ao banco de dados se necessário
    app(req, res); // Delegue para o Express
}
