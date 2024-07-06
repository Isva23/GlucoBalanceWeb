import React from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import { Label } from "./UI/Label";
import { Input } from "./UI/Input";
import { cn } from "../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { User } from "../types";
import { auth } from "../firebase/config";

type SingInDemoProops = {
  user : User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export function SingInDemo({user,setUser}:SingInDemoProops) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const usuario = user.user
    const password = user.password
    if(password === null || password === '' || usuario === null || usuario === ''){
      console.log('Ingresa todos los datos')
    }
    else{
      signInWithEmailAndPassword(auth, usuario, password)
        .then((userCredential) => {
          // Singed in
          const userLogin = userCredential.user;
          if(userLogin.emailVerified === true){
            
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
        }); 
      }
  
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [e.target.id]: value
    }));
  }

  return (
    <div className="w-full mx-auto p-8 shadow-input bg-[#121212] rounded-xl md:">
      <img src="/logo.png" alt="logo" className="h-[214px] w-[214px] mb-[30px] mx-auto p-8"/>
      <h2 className="font-bold text-2xl text-white">
        Inicia sesión en Glucobalance
      </h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="user">Correo electronico</Label>
          <Input id="user" placeholder="projectmayhem@gmail.com" type="email" onChange={handleChange}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={handleChange}/>
        </LabelInputContainer>

        <button
          className="relative group/btn bg-gradient-to-br from-blue-900 to-sky-900 w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Iniciar sesión &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input  bg-zinc-800"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-300" />
            <span className="text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input bg-zinc-800"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
