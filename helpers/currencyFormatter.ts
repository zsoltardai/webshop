export default (number: any): string => new Intl.NumberFormat('hu-HU', {
  style: 'currency',
  currency: 'HUF',
  
}).format(number);