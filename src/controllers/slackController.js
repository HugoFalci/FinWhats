import axios from 'axios';

export async function sendSlackNotification(level, message, context = {}) {
    try {
        const payload = {
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*${level.toUpperCase()}*: ${message}`,
                    },
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `*Contexto:* \`\`\`${JSON.stringify(context, null, 2)}\`\`\``,
                        },
                    ],
                },
            ],
        };

        await axios.post(process.env.SLACK_URL, payload);
    } catch (error) {
        console.error('Erro ao enviar notificação ao Slack:', error.message);
    }
}
