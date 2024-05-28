import { Persona } from './persona.js';

const persona1 = new Persona('juan', 'Carlos', 23)

// console.log(persona1.getFullName());
// console.log(persona1.getEdad());

// persona1.setEdad(50);

// console.log(persona1.getEdad());

const btnTest = $("#btnTest")

btnTest.on(click, function(){
    alert(12312)
})