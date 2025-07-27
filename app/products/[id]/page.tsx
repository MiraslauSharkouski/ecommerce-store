import { notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProduct } from "@/lib/api";
import AddToCartButton from "./add-to-cart-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const product = await fetchProduct(Number.parseInt(id));

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold">{product.title}</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating.rate}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.rating.count} reviews)
              </span>
            </div>

            <div className="text-4xl font-bold">
              ${product.price.toFixed(2)}
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
