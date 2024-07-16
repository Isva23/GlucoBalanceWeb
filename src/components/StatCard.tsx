
type StatCardProops = {
    title : string
    quantity : number
    color : string
    textColor : string
    icon : string
}
export default function StatCard({title,quantity,color,textColor,icon}:StatCardProops) {
  return (
    <>
        <div className=' bg-[#18181B] border border-[#1F1F22] p-5 rounded-xl'>
            <div className='flex items-center'>
                <span className={`pi ${icon} p-3 ${color} bg-opacity-25 ${textColor} rounded-full font-bold`}></span>
                <div className="ml-4 text-white">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <span className="text-sm">{quantity}</span>
                </div>
            </div>
        </div>
    </>
  )
}
