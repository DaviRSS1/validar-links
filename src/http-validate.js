import chalk from "chalk";

function extractLinks(arrLinks){
    return arrLinks.map((objectLink) => Object.values(objectLink).join())
}

async function checkStatus(urlList) {
    const arrStatus = await Promise.all(
        urlList.map(async (url) => {
            try{
                const res = await fetch(url)
                return res.status;
            } catch(error) {
                return handleError(error)
            }
        })
    )
    return arrStatus;
}

function handleError(error) {
    if (error.cause.code === 'ENOTFOUND'){
        return 'link não encontrado'
    } else {
        return 'algo deu errado'
    }
}

export default async function validatedList(linkList) {
    const links = extractLinks(linkList)
    const status = await checkStatus(links)
    
    return linkList.map((object, index) => ({
        ...object,
        status: status[index]
    }))
}