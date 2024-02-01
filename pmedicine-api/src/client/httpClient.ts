import axios from 'axios'

async function getHtmlFrom(url: string) {
    return (await axios.get(url)).data as string
}

export default getHtmlFrom