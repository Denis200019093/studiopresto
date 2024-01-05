interface RatingFieldTypes {
  rate: number;
  count: number;
}

export interface ProductItemsTypes {
  id: number;
  image: string;
  title: string;
  category: string;
  price: string;
  desctiption: string;
  rating: RatingFieldTypes;
}
