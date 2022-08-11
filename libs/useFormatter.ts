export const useFormatter = () => ({
    formatPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    },
    formatQuantity: (quantity: number, digits: number) => {

        if(quantity.toString().length >= digits)
            return quantity;

        const remain = digits - quantity.toString().length;
        return `${'0'.repeat(remain)}${quantity}`;

    }
});