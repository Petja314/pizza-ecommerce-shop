export const mapPizzaSize = {
   20: 'Small',
   30: 'Medium',
   40: 'Large',
} as const;

export const mapPizzaType = {
   1: 'Thin',
   2: 'Thick',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([name, value]) => ({
   name,
   value,
}));
