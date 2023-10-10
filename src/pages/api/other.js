import connect from "../../../middleware/connectdb";
import other from "../../../models/otherModel";

const handler = async (req, res) => {
    let otherData = await other.find();
    res.status(200).json({ otherData });
}

export default connect(handler);