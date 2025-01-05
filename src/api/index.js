import { connect } from '../config/database.js';
import app from '../routes/api.js';

export default async function handler(req, res) {
    await connect();
    app(req, res);
}
