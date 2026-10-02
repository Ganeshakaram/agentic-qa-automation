import { APIRequestContext } from '@playwright/test';
// import { ProductsResponse } from './products';


export interface ApiResponse<T> {
    status: number;
    data: T;
}


export class ApiClient {
    readonly request: APIRequestContext
    constructor(request:APIRequestContext){
        this.request = request;

    }

    async get<T>(endpoint: string,data?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
     const response =  await this.request.get(endpoint,{
        params: data
     })
     return{
        
            status: response.status(),
            data: await response.json()
        

     }
}
  
async post<T>(
    endpoint: string,
    data: Record<string, string | number | boolean>,
    options?: {
        type?: 'json' | 'form';
    }
): Promise<ApiResponse<T>> {

    const response = options?.type === 'form'
        ? await this.request.post(endpoint, { form: data })
        : await this.request.post(endpoint, { data });

    return {
        status: response.status(),
        data: await response.json()
    };
}

async put<T>(
    endpoint: string,
    data: Record<string, string | number | boolean>,
    options?: {
        type?: 'json' | 'form';
    }
): Promise<ApiResponse<T>> {

    const response = options?.type === 'form'
        ? await this.request.put(endpoint, { form: data })
        : await this.request.put(endpoint, { data });

    return {
        status: response.status(),
        data: await response.json()
    };
}


async delete<T>(
    endpoint: string,
    data: Record<string, string | number | boolean>,
    options?: {
        type?: 'json' | 'form';
    }
): Promise<ApiResponse<T>> {

    const response = options?.type === 'form'
        ? await this.request.delete(endpoint, { form: data })
        : await this.request.delete(endpoint, { data });

    return {
        status: response.status(),
        data: await response.json()
    };
}



}