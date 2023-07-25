let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("Registro de usuario.", () => {
    it("Debe registrar un nuevo usuario", (done) => {
        chai.request(url)
        .post('/users')
        .send({
            name: "marig",
            username: "holaa",
            email: "asd@gmail.com",
            password: "sdl"
           
        })
        .end((err, res) => {
           // console.log(res.body);
            expect(res.body).to.have.property('message');
            done();
        });
    })

    it("Debe recharzar usuario existente", (done) => {
        chai.request(url)
        .post('/users')
        .send({
            name: "marieg",
            username: "holaa",
            password: "sdl",
            email: "asd@gmail.com",
        })

        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        });
    })
    it("Debe rechazar usuarios sin nombre", (done) => {
        chai.request(url)
        .post('/users')
        .send({
            username: "galiz",
            email: "mario20345@gmail.com",
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    })
})

describe("Listado de usuarios.", () => {
    it("Debe mostrar un listado de usuarios existentes", (done) => {
        chai.request(url)
        .get('/users')
        .send({})
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200); 
            done();
        });
    })
    it("Debe rechazar mostrar usuarios con de datos inválidos", (done) => {
        chai.request(url)
        .get('/users')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    })
    it("Debe rechazar mostrar usuarios existentes porque la ruta esta mal escrita", (done) => {
        chai.request(url)
        .get('/use')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(404);
            done();
        });
    })
})

describe("Actualización de usuarios.", () => {
    it("Debe actualizar un usuario con su id", (done) => {
        chai.request(url)
        .put('/users?id=1')
        .send({
            name: "maria",
            username: "galiz",
            email: "maria2034@gmail.com",
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Debe rechazar actualizar usuario si el nombre tiene números ", (done) => {
        chai.request(url)
        .put('/users')
        .send({
            name: "mario3",
            email: "mario2034@gmail.com",
            password: "scd",
        })

        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        });
    })

    it("Debe rechazar actualizar usuarios sin el apellido", (done) => {
        chai.request(url)
        .put('/users')
        .send({
            name: "mario3",
            email: "mario2034@gmail.com",
        })

        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            done();
        });
    })
})

describe("Eliminar usuario.", () => {
    it("Debe elminar un usuarios mediante su id", (done) =>{
        chai.request(url)
        .delete('/users?id=12')
        .send({})
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe rechazar eliminar usuarios si los datos son inválidos ", (done) => {
        chai.request(url)
        .delete('/user')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(404);
            done();
        });
    })

    it("Debe rechazar eliminar usuarios si hacen falta datos", (done) => {
        chai.request(url)
        .delete('/users')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            done();
        });
    })
})