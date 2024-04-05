import chalk from "chalk"
import catchFile from "./index.js"
import fs from 'fs';
import validatedList from "./http-validate.js";

const path = process.argv;

async function printList(validate, result, identifier = '') {

    if (validate){
        console.log(
            chalk.yellow('lista validada'), 
            chalk.bgGreen(identifier),
            await validatedList(result))    
    } else{
        console.log(
            chalk.yellow('lista de links'), 
            chalk.bgGreen(identifier),
            result)
    }
}

async function processText(args) {
    const path = args[2]
    const valida = args[3] === '--valida'

    try {
        fs.lstatSync(path)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe')
            return;
        }
    }

    if (fs.lstatSync(path).isFile()){
        const result = await catchFile(path)
        printList(valida, result)
    } else if (fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path)
        files.forEach(async (fileName) => {
            const list = await catchFile(`${path}/${fileName}`)
            printList(valida, fileName)
        })
    }
}

processText(path)