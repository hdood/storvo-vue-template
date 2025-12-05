import { Config } from 'ziggy-js';

export interface User {
   id: number;
   name: string;
   email: string;
   email_verified_at?: string;
}

export interface Tenant {
   id: string;
   store_name: string;
   email: string;
   theme_data: {
      primary: string;
      title: string;
      facebook: string;
      email: string;
      phone: string;
      instagram: string;
      tiktok: string;
   };
   logo: string;
}

export interface VisitOptions {
   onSuccess: () => void;
   onError: () => void;
}

export type PageProps<
   T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
   auth: {
      user: User;
   };
   tenant: Tenant;
   ziggy: Config & { location: string };
   cart: Cart;
   alert: {
      message: string;
      type: 'success' | 'error' | 'info' | 'warning';
   };
   filepond_url: string;
   csrf_token: string;
   attempted_registration?: boolean;
   brands_menu: Brand[];
   types_menu: Brand[];
   favorites: Product[];

   registration_data?: {
      name: string;
      email: string;
      phone: string;
      password: string;
   };
};

export interface Cart {
   id: number;
   variants: ProductVariant[];
   lines: CartLine[];
   total: string;
   shipping_total: string;
   sub_total: string;
   delivery_options: {
      id: 'home' | 'desk';
      price: string;
   }[];
}

export interface CartLine {
   id: number;
   product: Product;
   quantity: number;
   unit_price: number;
   total: number;
   purchasable: ProductVariant;
}

export type PaginationResponse<T> = {
   current_page: number;
   data: T[];
   first_page_url: string;
   from: number | null;
   last_page: number;
   last_page_url: string;
   links: PaginationLink[];
   next_page_url: string | null;
   path: string;
   per_page: number;
   prev_page_url: string | null;
   to: number | null;
   total: number;
};

interface PaginationLink {
   url: string | null;
   label: string;
   active: boolean;
}

interface PaginationLinks {
   first: string | null;
   last: string | null;
   prev: string | null;
   next: string | null;
}

interface PaginationMeta {
   current_page: number;
   from: number | null;
   last_page: number;
   links: PaginationLink[];
   path: string;
   per_page: number;
   to: number | null;
   total: number;
}

interface ResourcePaginationResponse<T> {
   data: T[];
   links: PaginationLinks;
   meta: PaginationMeta;
}

type I18nText = {
   [key: string]: string;
};

type Media = {
   id: number;
   original_url: string;
   custom_properties: {
      name: string;
      primary: boolean;
   };
};

type Brand = {
   id: number;
   name: string;
   media: ProductMedia[];
};

type ProductMedia = {
   id: number;
   small_url: string;
   medium_url: string;
   large_url: string;
   zoom_url: string;
   primary: boolean;
};

type ProductType = {
   id: number;
   name: string;
   media: ProductMedia[];
};
type Product = {
   id: number;
   attribute_data: {
      name: I18nText;
      description: I18nText;
   };
   media: ProductMedia[];
   price: string;
   thumbnail: Media;
   default_url: {
      slug: string;
   };
   brand?: Brand;
   variants: ProductVariant[];
   reviews: Review[];
   has_discount: boolean;
   discount?: Discount;
   price_after_discount?: string;
   saved_amount?: string;
   reviews_stats: ReviewsStats;
   in_favorites: boolean;
};

type Discount = {
   type: 'fixed-value' | 'percentage';
   value: string;
   ends_at?: string;
};

type ProductAssociation = {
   id: number;
   type: 'cross-sell' | 'up-sell' | 'alternate';
   product: Product;
};

type currency = {
   id: number;
   code: string;
   name: string;
   exchange_rate: number;
   decimal_places: number;
};

type Collection = {
   id: number;
   attribute_data: {
      name: I18nText;
      description: I18nText;
   };

   media: Media[];
   products: Product[];
};

type ProductOptionValue = {
   id: number;
   name: I18nText;
};

type ProductOption = {
   id: number;
   name: I18nText;
   label: I18nText;
   values: ProductOptionValue[];
};

export interface ProductVariant extends Product {
   values: ProductOptionValue[];
   product?: Product;
   max_quantity: number;
   has_discount: boolean;
   discount?: Discount;
   price_after_discount?: string;
   saved_amount?: string;
}

export interface State {
   name: string;
   id: string;
   code: string;
   country_id: number;
}

export interface Town {
   commune_name: string;
   commune_name_ascii: string;
   daira_name: string;
   daira_name_ascii: string;
   id: number;
   wilaya_code: string;
   wilaya_name: string;
   wilaya_name_ascii: string;
}

export interface Review {
   name: string;
   content: string;
   value: number;
   user: User;
   created_at: string;
}

export interface ReviewsStats {
   average: number;
   total: number;
   count_1: number;
   count_2: number;
   count_3: number;
   count_4: number;
   count_5: number;
}

export type Address = {
   state_id: number | null;
   city: string;
   first_name: string;
   last_name: string;
   contact_phone: string;
   contact_email: string;
   line_one: string;
   delivery_instructions?: string;
   postcode: string;
   delivery_option_id : 'desk' | 'home'
};

export type Tag = {
   id: number;
   value: string;
};

export type ProductOrderOptions = 'newest' | 'cheapest';
