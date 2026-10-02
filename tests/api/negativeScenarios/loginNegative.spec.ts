import {test,expect} from '../../../fixtures/testFixtures';
import {LoginResponse} from '../../../models/apichaining';


test('negative Login',async({api}) =>{
    const response = await api.post<LoginResponse>('/api/verifyLogin',{
        email: 'invalid@example.com',
        password: 'wrongpassword',
    }
    ,{type:'form'});
     

expect(response.status).toBe(200);
expect(response.data.responseCode).toBe(404);
expect(response.data.message).toContain('User not found!');
    
})
