export type getTenantResponse = {
    name: string;
    mainColor: string;
    secondColor: string;
}

export const useApi = () => ({
    getTenant: (tenantSlug: string): boolean | getTenantResponse => {
        switch(tenantSlug){
            case 'b7burger':
                return {
                    name: 'B7burguer',
                    mainColor: '#FF0000',
                    secondColor: '#0F0001'
                }
                break;

            case 'b7pizza':
                return {
                    name: 'B7pizza',
                    mainColor: '#0000FF',
                    secondColor: '#00FF00'
                }
                break;

            default: return false;
        }
    }
});