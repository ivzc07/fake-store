import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div className='w-full h-dvh flex flex-col items-center justify-center gap-8'>
            <h1 className="text 4-xl font-bold text-center text-6xl" >Fake Store </h1>
            <p className="text-center text-4xl">Keeping It Real 🫀 </p>
            <div className='flex flex-row gap-8 text-center text-3xl'>
                <Link to="/login" className='hover:text-white/50'>{" { login } "}</Link>
                <Link to="/products" className='hover:text-white/50'>{" { products } "}</Link>
                
            </div>
        </div>
    )
}