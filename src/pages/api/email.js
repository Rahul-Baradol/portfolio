require('dotenv').config({ path: '.env.local' });

const handler = (req, res) => {
    let emailKeys = {
        serviceKey: process.env.SERVICE_ID,
        templateKey: process.env.TEMPLATE_ID,
        publicKey: process.env.PUBLIC_KEY
    }
    res.json(emailKeys);
}

export default handler;