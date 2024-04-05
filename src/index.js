import fs from 'fs';
import chalk from "chalk";

function extractLinks(text) {
	const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
	const captures = [...text.matchAll(regex)];
	const results = captures.map(capture => ({[capture[1]]: [capture[2]]}));
	return results.length !== 0 ? results : 'não há links no arquivo';
}

function catchError(erro){
    throw new Error(chalk.bgWhite.red(erro.code, 'não tem arquivo'))
}

async function catchFile(pathFile){
    try{
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(pathFile, encoding)
        return extractLinks(text)
    } catch (erro) {
        catchError(erro)
    }
}

export default catchFile;