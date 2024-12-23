const { google } = require('googleapis');

async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.GoogleAuth();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const spreadsheets = "";

    return {
        auth,
        client,
        googleSheets,
        spreadsheets
    };
};

async function readSheet() {
    try {
        const { googleSheets, spreadsheets, auth } = await getAuthSheets();

        const response = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Página1"
        });

        return response.data.values || [];
    } catch (error) {
        console.log("Não foi possível acessar a planilha!", error.message);
    };
};

async function writeToSheet(data) {
    try {
        const { googleSheets, spreadsheetId } = await getAuthSheets();

        await googleSheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Página1!A2",
            valueInputOption: "RAW",
            resource: {
                values: data
            }
        });

        console.log("Dados adicionados na planilha com sucesso!")
    } catch (error) {
        console.error("Erro ao escrever na planilha: ", error.message);
    }
};

module.exports = { getAuthSheets, readSheet, writeToSheet };