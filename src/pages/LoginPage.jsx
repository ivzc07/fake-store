import { useForm} from 'react-hook-form'
import { useState } from 'react';
import { login } from '../api'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast,Toaster } from 'sonner';
import clsx from 'clsx';
export default function LoginPage () {

    const { handleSubmit, register , formState : { errors },setError} = useForm ();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    

async function onSubmit (data) {
    try{
        const token = await login(data.username, data.password)
        if(token) {
            window.localStorage.setItem('token', token)
            navigate('/products')
            toast.success('Welcome!')
        }else{
            toast.error('Invalid Data')
            setError('root.credentials',
                { 
                    type: 'manual', 
                    message: 'Credenciales Invalidas'
                });   
        }
    }catch (error) {
        toast.error('Log In Error')
        console.error('[login error]', error)
    }
    
}


function handleShowHidePassword (){
    if(showPassword === true) {
        setShowPassword(false);
    }else{
        setShowPassword(true);
    }
}
    return (
        <main className='flex justify-center items-center flex-col w-full h-full min-h-dvh gap-4'>
            <Toaster />
            <h1 className='text-center'>LOGIN</h1>
            <form onSubmit={handleSubmit (onSubmit)} 
            className={clsx('border border-white/50 p-4 flex flex-col gap-4 max-w-sm w-full',{
                'border-red-500': errors.root?.credentials
                }
            )}>
            <input type="text" className='border border-white/50 rounded p-2 text-black' {... register('username', {
                required: { value: true , message : ' Name required'}
                })} 
            />
            <input type={ showPassword? 'text' : 'password'} 
            {... register('password', {
                required: { value: true , message : ' Username required'}
                })} 
                className='border border-white/50 rounded p-2 text-black'
            />

            <span className='text-xs text-white/50 cursor-pointer hover:text-white'
            onClick={handleShowHidePassword}>
                {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
            
            <button className='bg-teal-500 p-4 text-black hover:bg-teal-300 rounded'> Ingresar </button>

            {errors.root?.credentials && (
                <p className='text-red-500 text-center'> Invalid Data</p>
            )}
        </form>
        </main>
        
    )
}