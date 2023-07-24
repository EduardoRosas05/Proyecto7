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
            name: "Ruth",
            email: "serrano202@gmail.com",
            password: "1cd",
        })

        .end((err, res) => {
            if (err) {
                console.error(err); // Muestra el error en la consola para fines de depuración.
                return done(err); 
            }
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('name');
            expect(res.body).to.have.property('message');
            done();
        });
    })

    it("Debe recharzar usuario existente", (done) => {
        chai.request(url)
        .post('/users')
        .send({
            name: "Ruth",
            email: "serrano202@gmail.com",
            password: "1cd",
        })

        .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    })
})


