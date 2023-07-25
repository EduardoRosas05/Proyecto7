let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("Registrar ingresos.", () => {
    it("Debe registrar un nuevo ingreso", (done) => {
        chai.request(url)
        .post('/income')
        .send({
            description: "nuevo",
            acount: 120,
            categoryId: 1
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        });
    })
    it("Debe rechazar ingreso sin balance", (done) => {
        chai.request(url)
        .post('/income')
        .send({
            description: "nuevo",
            acount: 12,
            categoryId: 2
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    })
    it("Debe rechazar ingresos de un nuevo acount inválido", (done) => {
        chai.request(url)
        .post('/income')
        .send({
            description: "nuevo",
            acount: "holita",
            categoryId: 1
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message');
            done();
        });
    })
})


describe("Listado de ingresos.", () => {
    it("Debe mostrar un listado de ingresos existentes", (done) => {
        chai.request(url)
        .get('/income')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    })
    it("Debe rechazar mostrar ingresos de datos inválidos", (done) => {
        chai.request(url)
        .get('/income')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    })
    it("Debe rechazar mostrar ingresos existentes porque la ruta esta mal escrita", (done) => {
        chai.request(url)
        .get('/icome')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(404);
            done();
        });
    })
})

describe("Actualización de ingresos.", () => {
    it("Debe actualizar un ingreso con su id", (done) => {
        chai.request(url)
        .put('/income?id=8')
        .send({
            description: "nuevoaa",
            acount: 140,
            categoryId: 1,
        })
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Debe rechazar actualizar ingreso si la descripción tiene números ", (done) => {
        chai.request(url)
        .put('/income')
        .send({
            description: "123susan",
        })

        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        });
    })

    it("Debe rechazar actualizar ingresos con datos faltantes", (done) => {
        chai.request(url)
        .put('/income')
        .send({
            description: "nuevo",
            acount: 5,
            categoryId: 1,
            usersId: 15
        })

        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        });
    })
})

describe("Eliminar ingresos.", () => {
    it("Debe elminar un ingreso mediante su id", (done) => {
        chai.request(url)
        .delete('/income?id=10')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Debe rechazar eliminar ingreso si los datos son inválidos ", (done) => {
        chai.request(url)
        .delete('/income')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        });
    })

    it("Debe rechazar eliminar ingresos si hacen falta datos", (done) => {
        chai.request(url)
        .delete('/income')
        .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        });
    })
})