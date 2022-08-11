export const useFormatter = () => ({
    formatPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    },
    formatQuantity: (quantity: number, digits: number) => {
        if(quantity < 10)
            return `${'0'.repeat(digits)}${quantity}`;

        return quantity;
    }
});