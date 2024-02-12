import { handleError } from "./common"

const getBaseUrl = (): string => {
    const envVar = process.env
    const url = envVar.API_PATH!
    return url.replace('port', envVar.PORT!)
}

export const getShopifyProducts = async (get: string, status: string) => {
    const resp = await fetch(`${getBaseUrl()}/?get=${get}&status=${status}`)
    handleError(resp);

    return resp.json();
}

export const getShopifyProduct = async (get: string, pid: string) => {
    const resp = await fetch(`${getBaseUrl()}/?get=${get}&pid=${pid}`)
    handleError(resp);

    return resp.json();
}