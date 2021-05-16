import { Especialidad } from "./especialidad";

export class Usuario {
    nombre:string;
    apellido:string;
    edad:number;
    dni:string;
    os!:string;
    especialidad!:Especialidad[];
    email: string;
    password: string;
    img1: string;
    img2!:string;
    isPacient:boolean;
    isDoctor:boolean;
    isAdmin:boolean;
    isValidAccount:boolean;

    constructor() {
        this.nombre = '';
        this.apellido = '';
        this.edad = 0;
        this.dni= '';
        this.email = '';
        this.password = '';
        this.img1 = '';
        this.isPacient = false;
        this.isDoctor = false;
        this.isAdmin = false;
        this.isValidAccount = false;
    }
}
