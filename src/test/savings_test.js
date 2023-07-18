let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("mostrar ahorros", () => {
    it("Debe mostrar los ahorros registrados", (done) =>{
        chai.request(url)
        .get('/savings')
        .send({})
        .end(function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar mostrar los ahorros con datos faltantes", (done) =>{
        chai.request(url)
        .get('/savings')
        .send({})
        .end(function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar mostrar los ahorros con datos incorrectos", (done) =>{
        chai.request(url)
        .get('/savings')
        .send({})
        .end(function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
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
            usersId: 1
        })
        .end(function(err, res){
            console.log(res.body);
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
            console.log(res.body);
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
            console.log(res.body);
            expect(res).to.have.status(400);
            done();
        })
    })

});

/*
describe("actualizar ahorros", () => {
    it("Debe actualizar un usuarios", (done) =>{
        chai.request(url)
        .put('/savings/?id=1')
        .send({

            concepto: "Colchon",
            monto: 210
        })
        .end(function(err, res){
            console.log(res.body);
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
            console.log(res.body);
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar actualizar con datos incorrectos", (done) =>{
        chai.request(url)
        .put('/savings')
        .send({

            concepto: "Beca",
            monto: "Juanito"
        })
        .end(function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            done();
        })
    })


});
*/
describe("borrar ahorros", () => {
    it("Debe borrar un usuarios", (done) =>{
        chai.request(url)
        .delete('/savings/?id=4')
        .send({})
        .end(function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar borrar con datos faltantes", (done) =>{
        chai.request(url)
        .delete('/savings')
        .send({})
        .end(function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar borrar con datos incorrectos", (done) =>{
        chai.request(url)
        .delete('/savings?id=15')
        .send({})
        .end(function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            done();
        })
    })

});