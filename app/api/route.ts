import { NextResponse, NextRequest } from 'next/server'
import { getProducts, getProduct } from '@/utils/api'


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('get')
    const status = searchParams.get('status')
    const pid = searchParams.get('pid')
    let response
    if (query === 'products') {
        response = await getProducts(status ?? "status:*")
    } else {
        response = await getProduct(pid)
    }
    return NextResponse.json({
        response
    })

}