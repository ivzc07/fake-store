import { useEffect, useState } from "react"
import { getProducts } from "../api"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function ProductsPage() {
    const [products, setProducts] = useState([])   
    const navigate = useNavigate();
    useEffect( () => {

        const token  = localStorage.getItem('token');

        if(!token){
            toast.error('You have to be logged!')
            navigate('/login');
            return;
        }

        getProducts()
            .then((prods) => {
                setProducts(prods)
            })
            .catch(error => {
                toast.error('Error')
                console.error('[getProducts error]',error)

            })
    }, [])

    return (
        <main className="p-4">
           <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {
                products.map((prod, idx) => {
                    return (
                        <article key={`prod-${idx}`}
                            className="hover:bg-white/10 cursor-pointer rounded p-4 flex flex-col gap-1
                            "
                        >
                            <img src={prod.thumbnail} alt={prod.title} />
                            <p className="text-center">{prod.title}</p>
                            <Link to={`/products/${prod.id}`} className="bg-white/50 w-full p-4 rounded text-center">
                                Ver Detalle
                            </Link>
                            
                        </article>
                    );
                })
            }
            </section> 
        </main>
    )
}