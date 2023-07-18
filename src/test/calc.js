module.exports = {

    add: (num1, num2) => {

        if(isNaN(num1) || isNaN(num2)) {
            throw new Error('Valores invalidos.');
        }
        return num1 + num2;
       
    },
    //mas funciones
    sustraction: (num1, num2) => {

        if(isNaN(num1) || isNaN(num2)) {
            throw new Error('Valores invalidos.');
        }
        return num1 - num2;
       
    },
    multiplication: (num1, num2) => {

        if(isNaN(num1) || isNaN(num2)) {
            throw new Error('Valores invalidos.');
        }
        return num1 * num2;
       
    },
    division: (dividend, divisor) => {

        if(isNaN(dividend) || isNaN(divisor)) {
            throw new Error('Valores invalidos.');
        } 
        if(divisor===0){
            throw new Error('División por cero');
        }
        return dividend / divisor;
       
    },
}