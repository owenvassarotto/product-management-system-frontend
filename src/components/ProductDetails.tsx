import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";

type ProductDetailsProps = {
    product: Product;
}

export async function action({ params } : ActionFunctionArgs){
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
} 

export default function ProductDetails({ product } : ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form
                method="POST"
            >
                <button 
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${product.available ? 'text-green-500' : 'text-red-500'} rounded-lg p-2 text-xs uppercase font-black w-full border border-black/10 hover:cursor-pointer`}
                >
                    {product.available ? 'Disponible' : 'No Disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center justify-center">
                <button  
                    onClick={() => navigate(`products/${product.id}/edit`, {
                        state: {
                            product
                        }
                    })}
                    className="bg-orange-600 hover:bg-orange-700 transition-all text-white font-bold p-2 rounded-lg text-xs w-full text-center uppercase"
                >Editar</button>
                <Form 
                    className="w-full"
                    method="POST"
                    action={`products/${product.id}/delete`}
                    onSubmit={ (e) => {
                        if(!confirm('¿Eliminar?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <input 
                        type="submit" 
                        value='Eliminar'
                        className="bg-red-600 hover:bg-red-700 transition-all text-white font-bold p-2 rounded-lg text-xs w-full text-center uppercase cursor-pointer"
                    />
                </Form>
            </div>
        </td>
    </tr> 
  )
}

