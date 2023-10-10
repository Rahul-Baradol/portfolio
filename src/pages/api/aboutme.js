import * as fs from "fs"

export default async function handler(req, res) {
    let aboutme = await fs.promises.readFile('constants/aboutme.json', 'utf-8');
    res.status(200).json(JSON.parse(aboutme));
}