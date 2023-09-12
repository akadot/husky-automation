import fs from 'fs';
import files from '../config/to_commit.js';

if(files != undefined && files != null && files != "" && files.length && files.length > 0){
    const date = new Date();
    
    let dateFormat = ("0" + date.getDate()).slice(-2);
    let monthFormat = ("0" + (date.getMonth() + 1)).slice(-2);
    let hourFormat = ("0" + date.getHours()).slice(-2);
    let minuteFormat = ("0" + date.getMinutes()).slice(-2);
    let secondFormat = ("0" + date.getSeconds()).slice(-2);

    const version_str = `${date.getFullYear()}-${monthFormat}-${dateFormat}-${hourFormat}-${minuteFormat}-${secondFormat}`;

    for(let filename of files){
        if(!filename.includes("version.json"))
        {
            if(filename.includes("/Test.")){
                let splitted = filename.split("/");
                let idx = splitted.findIndex(item => item.includes("Test."))
                if(idx != null && idx != undefined){
                    let absolutePath = splitted.slice(0,idx + 1).join("/")

                    if(absolutePath.includes("Server")){
                        fs.readFile(`./${absolutePath}/version.json`,'utf8',(err,file) => {
                            if(!err){
                                let json = JSON.parse(file)
                                json.version = version_str;

                                fs.writeFile(`./${absolutePath}/version.json`, JSON.stringify(json), (err)=>{
                                    if(!err) console.log(`Versão ${version_str} atualizada em ./${absolutePath}/api-version.json`)
                                })
                            }
                        })
                    }else if(absolutePath.includes("Web")){
                        fs.readFile(`./${absolutePath}/public/version.json`,'utf8',(err,file) => {
                            if(!err){
                                let json = JSON.parse(file)
                                json.version = version_str;
                                
                                fs.writeFile(`./${absolutePath}/public/version.json`, JSON.stringify(json), (err)=>{
                                    if(!err) console.log(`Versão ${version_str} atualizada em ./${absolutePath}/public/api-version.json`)
                                })
                            }
                        })
                    }
                }
            }
        }
    }
}
