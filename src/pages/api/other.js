import connect from "../../../middleware/connectdb";
import other from "../../../models/otherModel";

require('dotenv').config({ path: '.env.local' });

const handler = async (req, res) => {
    let otherData = await other.find();
    res.status(200).json({ otherData });
}

export default connect(handler);