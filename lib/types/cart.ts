// lib/types/cart.ts

export interface CartItemProductImage {
  id: string;
  url: string;
  altText?: string; // Assuming altText might be optional or path is used as altText
  path?: string;    // As seen in product queries
  type?: string;    // As seen in product queries
}

export interface CartItemProduct {
  id: string;
  name: string; // From cart item 'name'
  images?: CartItemProductImage[]; // Assuming 'images' is an array on the product object within a cart item
  // Add other relevant product fields if necessary, e.g., sku
}

export interface FormattedPrice {
  price: string;
  basePrice: string;
  total: string;
  baseTotal: string;
  taxAmount: string;
  baseTaxAmount: string;
  discountAmount: string;
  baseDiscountAmount: string;
  grandTotal?: string; // For overall cart formatted price
  subTotal?: string;   // For overall cart formatted price
  taxTotal?: string;   // For overall cart formatted price
  discount?: string;   // For overall cart formatted price
}

export interface CartItem {
  id: string;
  quantity: number;
  name: string; // This seems to be the product name directly on the item
  total: string; // Assuming this is a string representation of the total for the item
  product: CartItemProduct; // The product details associated with this cart item
  formattedPrice?: FormattedPrice; // As seen in getCartQuery
  // Add other fields from getCartQuery items if needed
  // e.g. sku, type, couponCode, weight, price, basePrice, taxPercent, etc.
}

export interface Cart {
  id: string;
  lines: CartItem[]; // Renaming 'items' to 'lines' to match component usage, but GraphQL uses 'items'
  subTotal: string; // Assuming string representation
  taxTotal: string; // Assuming string representation
  grandTotal: string; // Assuming string representation
  discountAmount?: string; // Optional, as it might not always be present
  formattedPrice?: FormattedPrice; // For overall cart formatted price
  // Add other fields from getCartQuery cartDetail if needed
  // e.g. customerEmail, itemsCount, itemsQty, couponCode, etc.
}

// It's good practice to also export any relevant Bagisto types if they are different
// For example, if Bagisto's Cart type is significantly different and you need to map it.
// For now, these types are structured to align with what the frontend components seem to expect.
