export class Persona {
    constructor(name, lastname, edad) {
        this.name = name;
        this.lastname = lastname;
        this.edad = edad
    }

    getFullName(){
        return `${this.name} ${this.lastname}`
    }

    getEdad(){
        return this.edad;
    }

    setEdad(nuevaEdad){
        this.edad = nuevaEdad 
    }
    
}