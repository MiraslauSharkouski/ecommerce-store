"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/lib/stores/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 overflow-hidden rounded">
            <Image
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.title}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium line-clamp-1">{item.product.title}</h3>
            <p className="text-sm text-muted-foreground">
              ${item.product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.product.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
