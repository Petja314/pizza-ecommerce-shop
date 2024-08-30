export const basketTotalAmount = (totalAmount: number) => {
   let DELIVERY_PRICE = 5;
   let VAT = 20;
   if (totalAmount <= 0) {
      DELIVERY_PRICE = 0;
   }
   let totalVATPrice = (totalAmount * VAT) / 100;
   const totalBasketPrice = totalAmount + totalVATPrice + DELIVERY_PRICE;
   return { totalVATPrice, totalBasketPrice, DELIVERY_PRICE, VAT };
};
