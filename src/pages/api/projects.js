import project from "../../../models/projectModel";
import connect from "../../../middleware/connectdb";

require('dotenv').config({ path: '.env.local' });

const handler = async (req, res) => {
    let projects = await project.find();
    res.status(200).json({ projects });
}

export default connect(handler);