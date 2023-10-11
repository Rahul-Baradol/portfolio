require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const connect = (handler) => {
    return async (req, res) => {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        await mongoose.connect(process.env.MONGO_URI);
        return handler(req, res);
    }
}

export default connect;