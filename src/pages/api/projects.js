import * as fs from "fs"

export default async function handler(req, res) {
    let projectDirectories = await fs.promises.readdir('constants/projects');
    let projects = [];
    for (let index = 0; index < projectDirectories.length; index++) {
        let myFile = await fs.promises.readFile(`constants/projects/${projectDirectories[index]}`, 'utf-8');
        projects.push(JSON.parse(myFile));
    }
    res.status(200).json(projects);
}