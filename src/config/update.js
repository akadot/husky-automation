import fs from 'fs';
import {exec} from 'child_process';
import files from '../config/to_commit.js';

if(files != undefined && files != null && files != "" && files.length && files.length > 0){
    const date = new Date();
    
    let dateFormat = ("0" + date.getDate()).slice(-2);
    let monthFormat = ("0" + (date.getMonth() + 1)).slice(-2);
    let hourFormat = ("0" + date.getHours()).slice(-2);
    let minuteFormat = ("0" + date.getMinutes()).slice(-2);
    let secondFormat = ("0" + date.getSeconds()).slice(-2);

    const version_str = `${date.getFullYear()}-${monthFormat}-${dateFormat}-${hourFormat}-${minuteFormat}-${secondFormat}`;

    let updatesFiles = [];

    for(let filename of files){
        if(!filename.includes("api-version.json"))
        {
            if(filename.includes("/PentagroPGDI.")){
                let splitted = filename.split("/");
                let idx = splitted.findIndex(item => item.includes("PentagroPGDI."))
                if(idx != null && idx != undefined){
                    let absolutePath = splitted.slice(0,idx + 1).join("/")

                    if(absolutePath.includes("API")){
                        fs.readFile(`./${absolutePath}/api-version.json`,'utf8',(err,file) => {
                            if(!err){
                                let json = JSON.parse(file)
                                json.version = version_str;

                                fs.writeFile(`./${absolutePath}/api-version.json`, JSON.stringify(json), (err)=>{
                                    if(!err) {
                                        updatesFiles.push(`${absolutePath}/api-version.json`);
                                        console.log(`Versão ${version_str} atualizada em ./${absolutePath}/api-version.json`)
                                    }
                                })
                            }
                        })
                    }else if(absolutePath.includes("App") || absolutePath.includes("Conf")){
                        fs.readFile(`./${absolutePath}/public/api-version.json`,'utf8',(err,file) => {
                            if(!err){
                                let json = JSON.parse(file)
                                json.version = version_str;
                                
                                fs.writeFile(`./${absolutePath}/public/api-version.json`, JSON.stringify(json), (err)=>{
                                    if(!err)
                                    {
                                        updatesFiles.push(`${absolutePath}/public/api-version.json`)
                                        console.log(`Versão ${version_str} atualizada em ./${absolutePath}/public/api-version.json`)
                                    } 
                                })
                            }
                        })
                    }
                }
            }
        }
    }

    if(updatesFiles.length > 0){
        exec('git diff --name-only', (error, stdout, stderr) => {
            const modifiedFiles = stdout.trim().split(/\r?\n/);
            console.log(modifiedFiles)

            for(let updatedVersions of updatesFiles){
                if (modifiedFiles.includes(updatedVersions)) {
                    exec(`git commit --amend -C HEAD -n ${updatedVersions}`);
                }
            }
        })
    }

}
