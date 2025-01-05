import { connect } from '../src/config/database.js';
import app from '../src/routes/api.js';

export default async function handler(req, res) {
    await connect(); // Conecta ao banco de dados se necessário
    app(req, res); // Delegue para o Express
}
