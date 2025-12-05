export default function (number: number) {
   let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'DZD',
   });

   return USDollar.format(number);
}
