// Category types: 'home' | 'car-electronics' | 'mobile' | 'services'

// Product interface structure:
// {
//   id: string,
//   name: string,
//   description: string,
//   price: number,
//   originalPrice?: number,
//   discount?: number,
//   image: string,
//   images?: string[],
//   rating: number,
//   reviewCount: number,
//   category: Category,
//   inStock: boolean,
//   brand?: string,
//   features?: string[]
// }

// CategoryInfo interface structure:
// {
//   id: Category,
//   name: string,
//   icon: string,
//   subcategories?: string[]
// }

export const CATEGORIES = {
  HOME: 'home',
  CAR_ELECTRONICS: 'car-electronics',
  MOBILE: 'mobile',
  SERVICES: 'services'
};