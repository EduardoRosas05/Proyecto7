let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("Registrar usuario.", () =>{
    it ("Debe registrar un nuevo usuario", (done) =>{
        chai.request(url)

        .post('/users')

        .send({
            name: "Usuario prueba",
            email: "ejemplo@gmail.com",
            password: "adc",
    })

        .end((err, res)=>{
            console.log(res.body);
            expect(res).to.have.status(400);
        })
    })
})