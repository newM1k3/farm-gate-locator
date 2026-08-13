export type ProductCategory = 'eggs' | 'produce' | 'baked-goods' | 'maple' | 'flowers' | 'seasonal';

export interface ProductStatus {
  name: string;
  category: ProductCategory;
  available: boolean;
}

export type AvailabilityState = 'available' | 'sold-out' | 'stale';

export interface Farm {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  products: ProductStatus[];
  lastUpdated: Date;
  distance?: number;
  favorited: boolean;
  alertEnabled: boolean;
  imagePlaceholder: string;
}

export type ViewMode = 'map' | 'list' | 'detail' | 'vendor' | 'favorites';
