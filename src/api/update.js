const files_to_commit = require("../config/to_commit.json");

if(JSON.stringify(files_to_commit) != "{}"){
    const date = new Date();
    
    let dateFormat = ("0" + date.getDate()).slice(-2);
    let monthFormat = ("0" + (date.getMonth() + 1)).slice(-2);
    let hourFormat = ("0" + date.getHours()).slice(-2);
    let minuteFormat = ("0" + date.getMinutes()).slice(-2);
    let secondFormat = ("0" + date.getSeconds()).slice(-2);

    const version_str = `${date.getFullYear()}${monthFormat}${dateFormat}${hourFormat}${minuteFormat}${secondFormat}`;

    console.log("SYSTEM VERSION: ", version_str)
}