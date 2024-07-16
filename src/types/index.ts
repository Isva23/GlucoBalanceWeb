export type ListaDeFuncionesProops = {
   id : number,
   name : string,
   img : string ,
   description : string
}

export interface User {
   user : string
   password : string
}

export interface Users {
   id: string
   Correo: string
   Nombre: string
   isSelected : boolean
   accountType : string
}