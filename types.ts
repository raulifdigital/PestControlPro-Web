
export interface ServicePack {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}
