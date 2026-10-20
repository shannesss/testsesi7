const request = require('supertest');
const { expect } = require('chai');

const baseURL = 'https://belajar-bareng.onrender.com';

describe('Automation API Testing - Belajar Bareng Render', function () {
    let token = ''; 

    
    it('1. POST Login - Success (Positive Case)', async function () {
        const response = await request(baseURL)
            .post('/api/login') // Endpoint Login sesuai dokumentasi
            .send({
                email: 'admin', // Sesuaikan dengan email akun terdaftar Anda
                password: 'admin'    // Sesuaikan dengan password terdaftar Anda
            });

        // Assertion (Requirement 3)
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token'); // Menyimpan token dari response body

        token = response.body.token;
    });

    // 1b. Sample Request GET (List Users)
    it('2. GET List Users - Success with Token', async function () {
        const response = await request(baseURL)
            .get('/users') // Endpoint List Users sesuai dokumentasi (memiliki ikon gembok/butuh token)
            .set('Authorization', `Bearer ${token}`);

        // Assertion (Requirement 3)
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object'); // Atau sesuaikan jika berbentuk array
    });

    // 1c. Sample Request POST (Add Users - Positive Case)
    it('3. POST Add Users - Success (Positive Case)', async function () {
        const response = await request(baseURL)
            .post('/users') // Endpoint Add Users sesuai dokumentasi
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'misako',
              
            });

        // Assertion (Requirement 3)
        expect(response.status).to.equal(201); // Status Created
        expect(response.body).to.have.property('message'); // Sesuaikan properti response sukses
    });

    // 1c. Sample Request POST (Add Users - Negative Case)
    it('4. POST Add Users - Missing Data (Negative Case)', async function () {
        const response = await request(baseURL)
            .post('/users') // Endpoint Add Users dengan data kosong
            .set('Authorization', `Bearer ${token}`)
            .send({
                // Data sengaja dikosongkan untuk memicu error validasi
            });

        // Assertion (Requirement 3)
        expect(response.status).to.equal(400); // Status Bad Request
        expect(response.body).to.have.property('message');
    });
});