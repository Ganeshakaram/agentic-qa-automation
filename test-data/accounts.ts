import { generateUniqueEmail } from '../utils/testData';


export interface AccountCreateData {
    name: string;
    email: string;
    password: string;
    title: string;
    birth_date: string;
    birth_month: string;
    birth_year: string;
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
}


export function createAccountData(): AccountCreateData {
    return {
        name: 'QA Automation User',
        email: generateUniqueEmail(),
        password: 'Test@123456',
        title: 'Mr',
        birth_date: '10',
        birth_month: '05',
        birth_year: '2002',
        firstname: 'QA',
        lastname: 'Automation',
        company: 'QA Project',
        address1: 'Hyderabad',
        address2: 'Telangana',
        country: 'India',
        zipcode: '500001',
        state: 'Telangana',
        city: 'Hyderabad',
        mobile_number: '9876543210'
    };
}


export interface AccountUpdateData {
    name: string;
    title: string;
    birth_date: string;
    birth_month: string;
    birth_year: string;
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
}


export const accountUpdateData: AccountUpdateData = {
    name: 'Akaram Ganesh QA',
    title: 'Mr',
    birth_date: '10',
    birth_month: '05',
    birth_year: '2002',
    firstname: 'Akaram',
    lastname: 'Ganesh',
    company: 'QA Automation',
    address1: 'Hyderabad',
    address2: 'Telangana',
    country: 'India',
    zipcode: '500001',
    state: 'Telangana',
    city: 'Jaipur',
    mobile_number: '6301766004'
};