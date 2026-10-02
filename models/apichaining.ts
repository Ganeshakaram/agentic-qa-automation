export interface UserResponse {
    responseCode: number;
    user?: {
        id: number;
        name: string;
        email: string;
        title: string;
        birth_day: string;
        birth_month: string;
        birth_year: string;
        first_name: string;
        last_name: string;
        company: string;
        address1: string;
        address2: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobile_number: string;
    };
    message?: string;
}

export interface LoginResponse {
    responseCode: number;
    message: string;
}

export interface AccountActionResponse {
    responseCode: number;
    message: string;
}