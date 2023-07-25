let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("mostrar categorias", () => {
    it("Debe mostrar las categorias registradas", (done) =>{
        chai.request(url)
        .get('/category')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar las categoria registrada con el id 1", (done) =>{
        chai.request(url)
        .get('/category?id=1')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar mostrar la categoria con id incorrecto", (done) =>{
        chai.request(url)
        .get('/category?id=9')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        })
    })
});

describe("registrar categorias", () => {
    it("Debe registrar una nueva categoria", (done) =>{
        chai.request(url)
        .post('/category')
        .send({

            name: "Gatos"
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar el registro con datos faltantes", (done) =>{
        chai.request(url)
        .post('/category')
        .send({

            name: ""
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar el registro con datos incorrectos", (done) =>{
        chai.request(url)
        .post('/category')
        .send({
            name: "Huuas12"
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })
});

describe("actualizar categorias", () => {
    it("Debe actualizar una categoria", (done) =>{
        chai.request(url)
        .put('/category/?id=1')
        .send({

            name: "Frijoleps"
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar actualizar con datos faltantes", (done) =>{
        chai.request(url)
        .put('/category')
        .send({

            name: ""
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar actualizar con datos incorrectos", (done) =>{
        chai.request(url)
        .put('/category?id=45')
        .send({

            name: "Beca145"
        })
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })


})

describe("borrar categorias", () => {
    it("Debe borrar una categoria", (done) =>{
        chai.request(url)
        .delete('/category?id=8')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar borrar con datos faltantes", (done) =>{
        chai.request(url)
        .delete('/category')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(400);
            done();
        })
    })

    it("Debe rechazar borrar con datos incorrectos", (done) =>{
        chai.request(url)
        .delete('/category?id=15')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        })
    })

});