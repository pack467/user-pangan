import type { ProductAttributesWithImages } from "./product";

export interface CartAttributes {
  productId: string;
  userId: string;
  readonly UUID: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CartWithProduct = {
  Product: ProductAttributesWithImages;
} & CartAttributes;
