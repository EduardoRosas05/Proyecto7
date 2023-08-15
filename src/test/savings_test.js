let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect

chai.use(chaiHttp);

const url = 'https://proyecto7-ten.vercel.app/api';

describe("mostrar ahorros", () => {
    it("Debe mostrar los ahorros registrados", (done) =>{
        chai.request(url)
        .get('/savings')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar los ahorros registrados con el id 2", (done) =>{
        chai.request(url)
        .get('/savings?id=1')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar mostrar los ahorros con id incorrecto", (done) =>{
        chai.request(url)
        .get('/savings?id=1')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        })
    })
});

describe("registrar ahorros", () => {
    it("Debe registrar un nuevo usuarios", (done) =>{
        chai.request(url)
        .post('/savings')
        .send({

            concepto: "Feria",
            monto: 20,
            clientId: 1
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar un registro con datos faltantes", (done) =>{
        chai.request(url)
        .post('/savings')
        .send({

            concepto: "Feria",
            usersId: 1
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar un registro con datos incorrectos", (done) =>{
        chai.request(url)
        .post('/savings')
        .send({
            concepto: "Feria",
            monto: "Azucar",
            usersId: 1
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })
});

describe("actualizar ahorros", () => {
    it("Debe actualizar un usuarios", (done) =>{
        chai.request(url)
        .put('/savings/?id=2')
        .send({

            concepto: "Colcahona",
            monto: 210
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar actualizar con datos faltantes", (done) =>{
        chai.request(url)
        .put('/savings')
        .send({

            concepto: "Guardadito"
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar actualizar con datos incorrectos", (done) =>{
        chai.request(url)
        .put('/savings?id=45')
        .send({

            concepto: "Beca",
            monto: "Juanito"
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })


})
describe("borrar ahorros", () => {
    it("Debe borrar un usuarios", (done) =>{
        chai.request(url)
        .delete('/savings?id=1')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar borrar con datos faltantes", (done) =>{
        chai.request(url)
        .delete('/savings')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar borrar con datos incorrectos", (done) =>{
        chai.request(url)
        .delete('/savings?id=15')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        })
    })

});