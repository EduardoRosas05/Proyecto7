var assert = require ('assert');
const calc = require('./calc');

describe("Calculadora", () => {

    before(() => {
        console.log("probando las funciones de calculadora");
    });

    //casos de prueba
    describe("Sumar", () => {
    // escenario para sumar 
        it("Debe retornar 5, cuando 3 + 2", () =>{
            assert.equal( calc.add(3, 2), 5);
        })

        it("Debe retornar 0, cuando 0 + 0", () => {
            assert.equal( calc.add(0, 0), 0);
        })

        it("Debe mostrar error, cuando 5 + 'hola'", () =>{
            assert.throws(function() {
                calc.add(5, 'hola');
            },
            {
                name: 'Error',
                message: 'Valores invalidos.'
            }
            );
        });
    });

    describe("Restar", () => {
    // escenario para sumar 
        it("Debe retornar 3, cuando 5 - 2", () =>{
            assert.equal( calc.sustraction(5, 2), 3);
        })

        it("Debe retornar -10, cuando 10 - 20", () => {
            assert.equal( calc.sustraction(10, 20), -10);
        })

        it("Debe mostrar error, cuando 'abc' - 8", () =>{
            assert.throws(function() {
                calc.sustraction('abc', 8);
            },
            {
                name: 'Error',
                message: 'Valores invalidos.'
            }
            );
        });
    });

    describe("Multiplicar", () => {
        // escenario para sumar 
            it("Debe retornar 15, cuando 5 * 3", () =>{
                assert.equal( calc.multiplication(3, 5), 15);
            })
    
            it("Debe retornar 0, cuando 0 + 0", () => {
                assert.equal( calc.multiplication(0, 0), 0);
            })
    
            it("Debe mostrar error, cuando 8 * 'bgh'", () =>{
                assert.throws(function() { calc.multiplication(5, 'hola');
                },
                {
                    name: 'Error',
                    message: 'Valores invalidos.'
                }
                );
            });
        });

        describe("Dividir", () => {
            // escenario para sumar 
                it("Debe retornar 5, cuando 15 / 3", () =>{
                    assert.equal( calc.division(15, 3), 5);
                })
        
                it("Debe retornar 0, cuando 0 / 50", () => {
                    assert.equal( calc.division(0, 50), 0);
                })
        
                it("Debe mostrar error, cuando 50 / 0", () =>{
                    assert.throws(function() { calc.division(50, 0);
                    },
                    {
                        name: 'Error',
                        message: 'División por cero'
                    }
                    );
                });

                it("Debe mostrar error, cuando 'efg' / 0", () =>{
                    assert.throws(function() { calc.division('efg', 0);
                    },
                    {
                        name: 'Error',
                        message: 'Valores invalidos.'
                    }
                    );
                });
            });

    after(() => {
        console.log("fin del test de la calculadora");
    });
});