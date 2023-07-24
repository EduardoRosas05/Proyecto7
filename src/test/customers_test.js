let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("Registro de cliente.", () => {
    it("Debe registrar un nuevo cliente", (done) => {
        chai.request(url)
        .post('/customers')
        .send({
            name: "Ruthi",
            lastname: "serranoValerio",
            email: "se0rranio209@gmail.com",
            phone: "243131197",
            password: "1cda",
            active: true,
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('customer');
            expect(res.body).to.have.property('message');
            done();
        });
    })

    it("Debe rechazar registro de un nuevo cliente sin nombre", (done) => {
        chai.request(url)
        .post('/customers')
        .send({
            lastname: "serranoValerio",
            email: "serr3an203@gmail.com",
            phone: "243131197",
            password: "1cda",
            active: true,
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    })

    it("Debe rechazar registro de un nuevo cliente sin apellido", (done) => {
        chai.request(url)
        .post('/customers')
        .send({
            name: "Chavela",
            email: "serra4n203@gmail.com",
            phone: "243131197",
            password: "1cda",
            active: true,
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    })

    /*
    it("Debe rechazar registro de un nuevo cliente con teléfono inválido (!= 10 carácteres)", (done) => {
        chai.request(url)
        .post('/customers')
        .send({
            name: "Chavelita",
            lastname: "Valerio",
            email: "serran208@gmail.com",
            phone: "1234",
            active: true,
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    })
    */

    it("Debe rechazar registro de un nuevo cliente sin email", (done) => {
        chai.request(url)
        .post('/customers')
        .send({
            name: "Chavelita",
            lastname: "Valerio",
            phone: "1234",
            active: true,
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    })

    it("Debe rechazar registro de un nuevo email inválido", (done) => {
        chai.request(url)
        .post('/customers')
        .send({
            name: "Chavelito",
            lastname: "Valerio",
            email: "hola",
            phone: "1234",
            active: true,
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    })
})

