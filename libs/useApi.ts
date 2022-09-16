import { Http2ServerRequest } from "http2";
import { Product } from "../type/Product";
import { Tenant } from "../type/Tenant";
import { User } from "../type/User";

const productTemp: Product = {
    id: 1,
    image: '/tmp/burger.png',
    categoryName: 'Tradicional',
    name: 'Texas Burguer',
    price: 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
}

export const useApi = (tenantSlug: string) => ({
    getTenant: (): boolean | Tenant => {
        switch(tenantSlug){
            case 'b7burguer':
                return {
                    slug: 'b7burguer',
                    name: 'B7burguer',
                    mainColor: '#FF0000',
                    secondColor: '#0F0001'
                }
                break;

            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7pizza',
                    mainColor: '#0000FF',
                    secondColor: '#00FF00'
                }
                break;

            default: return false;
        }
    },

    getAllProducts: () => {
        let products = [];

        for (let index = 0; index < 10; index++)
            products.push(productTemp);

        return products;
        
    },

    getProduct: (id: string) => {
        return productTemp;
    },

    authorizeToken: async (token: string): Promise<User | false> => {
        if(!token)return false;

        return {
            name: 'Thiago Ripardo',
            email: 'thiago.ripardo.86@gmail.com'
        }
    },
});