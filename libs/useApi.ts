import { Tenant } from "../type/Tenant";

export const useApi = () => ({
    getTenant: (tenantSlug: string): boolean | Tenant => {
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
    }
});