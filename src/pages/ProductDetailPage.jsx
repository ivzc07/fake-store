import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProductById, getProducts } from "../api"
export default function ProductDetailPage(){
    const { id } = useParams()

   
    const [product, setProduct] = useState()
    
   
   
   useEffect(() => {
    
    getProductById(id)
        .then((json) => {
            setProduct(json); 
        })
        .catch ((error) => {
            toast.error('Error al obtener el producto');
            console.error('[getProductById error]', error);
        })
    }, [id]);
   
return (
    <main className="">
        <section className="w-full h-dvh flex items-center justify-center ">
            {product && (
                <article key={`prod-${product.id}`}
                    className="flex flex-col p-4 gap-8"
                >   
                    <div className="flex flex-col sm:flex-row p-1 justify-center">
                        
                        <img src={product.thumbnail} alt={product.title} className="w-150 h-150 object-cover"/>
                        <div className="flex flex-col justify-center items-center gap-10">
                            
                            <p className="text-center text-6xl font-bold">{product.title}</p>
                            <p className="font-sans text-3xl">{'{ $'} {product.price} {' }'}</p>
                            <p className="font-sans text-3xl">{'{ '} {product.category} {' }'}</p>
                            <p className="font-sans text-3xl">{'{ '} 
                                <span>★ </span>
                                {product.rating} 

                                {' }'}</p>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-center text-2xl font-light">{product.description}</p>
                    </div>
                    
                    
                </article>
            )}
        </section>
    </main>
);
  
}