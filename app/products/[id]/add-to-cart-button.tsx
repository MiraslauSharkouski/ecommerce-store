"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    toast.success("Added to cart!");
  };

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full">
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
