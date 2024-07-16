import { ListaDeFuncionesProops } from '../types'
import { Dispatch , SetStateAction, useEffect, useRef} from 'react'
import ArrowRight from '/arrowRight.svg'
import BasicDemo from './UI/BasicDemo'
import { ListaDeFunciones } from '../service/ListaDeFuncionalidades'
import HeaderUI from './UI/HeaderUI'

type HomeProops = {
    setElementos : Dispatch<SetStateAction<ListaDeFuncionesProops[]>>
    elementos : ListaDeFuncionesProops[]
}

export default function Home({setElementos,elementos}:HomeProops) {   
    const datos = [
        {name:'Isaac Lopez', work : 'FullStack'},
        {name:'Matias Tirado', work : 'Develoment'}
    ]

    const boxRef = useRef<HTMLDivElement | null>(null)
    const boxCreators = useRef<HTMLDivElement | null>(null)

    console.log(elementos)

    useEffect(() => {
      const handleScroll = () => {
        if (boxRef.current) {
          const box = boxRef.current
          const boxPosition = box.getBoundingClientRect().top
          const screenPosition = window.innerHeight / 1.5
  
          if (boxPosition < screenPosition) {
            box.classList.add('active')
          }
        }

        if (boxCreators.current) {
            const anotherBox = boxCreators.current;
            const anotherBoxPosition = anotherBox.getBoundingClientRect().top;
            const anotherScreenPosition = window.innerHeight / 1.2;
    
            if (anotherBoxPosition < anotherScreenPosition) {
              anotherBox.classList.add('active');
            }
        }
      }
  
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])


  return (
    <>
        <HeaderUI/>  
        <div className="max-w-6xl mx-auto p-5 rounded-full pb-24">
            <h1 className="font-bold text-6xl text-white text-center mt-10"> Mejora tu calidad de vida</h1>
            <p className="text-center max-w-2xl mx-auto mt-5 text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius non tellus non varius. Nam tempus sapien nunc, id viverra nibh eleifend vel. Etiam feugiat auctor pellentesque. Sed efficitur sapien et pharetra tincidunt. Aliquam euismod molestie lorem, quis euismod ligula fermentum vel. Suspendisse in suscipit sapien. Duis vel eros sit amet tellus interdum efficitur lacinia vel arcu. Vestibulum tincidunt facilisis nunc, et scelerisque dui lacinia id. Proin eu nibh volutpat, pharetra arcu sed, suscipit purus. </p>
            <div className="flex mt-10 justify-center space-x-4">
                <button className="bg-[#3b67f6] text-white rounded-2xl w-60 p-2 hover:bg-[#2553eb]">Empieza ya</button>
                <button className="border border-[#6084fa] text-[#6084fa] rounded-2xl w-60 p-2 hover:border-[#3b67f6] hover:text-[#3b67f6]">Ver mas</button>
            </div>
        </div>
        <div className="max-w-6xl mx-auto">
            <BasicDemo/>
        </div>
        <div className="max-w-4xl mx-auto mt-20">
            <h1 className="text-white font-black text-4xl mx-auto text-center">Nuestros usuarios cuenta con funcionalidades unicas</h1>
            <div className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 box" ref={boxRef}>
                    {ListaDeFunciones.map((funcion, index) => (
                        <div key={index} className=" border-[0.25px] border-[#1C1C1F] bg-gradient-to-br from-[#18181B] to-transparent] p-5 
                        rounded-xl hover:scale-105 duration-300 hover:from-[#172554] hover:to-[#2553eb] flex flex-col">
                            <div className='flex-grow'>
                                <img src={`/${funcion.img}`} alt={funcion.name} className='max-w-32 max-h-32 mx-auto text-black'/>
                                <h2 className="mt-10 font-black text-white">{funcion.name}</h2>
                                <p className="text-slate-300 text-pretty mt-3">{funcion.description}</p>
                            </div>
                            <button className="bg-transparent border border-white rounded-lg p-2 text-white mt-5
                             hover:bg-slate-300 max-w-8 self-end"
                            onClick={ () => setElementos([funcion]) }> 
                                <img src={ArrowRight} className="logo react" alt="React logo" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className='max-w-4xl mx-auto mt-10 mb-20 boxCreadores' ref={boxCreators}>
            <h1 className=' text-4xl text-white font-black'>Creadores</h1>
            {datos.map((data,index) => (
                <div key={index} className='mt-10 border-[0.25px] border-[#1C1C1F] bg-[#18181B]  p-5 
                            rounded-xl grid gap-4 grid-cols-2 text-[#eff3ff]'>
                    <div className="flex items-center gap-4 p-4">
                        <img src="/public/usuario.png" className='w-20 h-20 rounded-full'></img>
                        <div className='flex flex-col'>
                            <strong className='text-slate-200 font-medium text-2xl'>{data.name}</strong>
                            <span className='text-slate-400 font-medium text-1xl mt-5'>{data.work}</span>
                        </div>
                    </div>
                    <div className='flex items-center space-x-10 justify-end'>
                        <a href="https://github.com/Isva23" className='bg-gradient-to-r from-slate-700 to-slate-800 rounded-full p-3
                        hover:from-[#172554] hover:to-[#2553eb] duration-300'>
                            <img src="/public/github.png" alt="github" className='w-8 h-8'/>
                        </a>
                        <a href="" className='bg-gradient-to-r from-slate-700 to-slate-800 rounded-full p-3
                        hover:from-[#172554] hover:to-[#2553eb] duration-300'>
                            <img src="/public/instagramIcon.png" alt="instagram" className='w-8 h-8'/>
                        </a>
                    </div>
                </div>
            ))}
        </div>

    </>
  )
}
