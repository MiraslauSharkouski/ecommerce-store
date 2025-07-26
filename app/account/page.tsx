"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useCartStore } from "@/lib/stores/cart-store";
import ProtectedRoute from "@/components/protected-route";
import Link from "next/link";

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">
                  {user?.name?.firstname} {user?.name?.lastname}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user?.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Street</p>
                <p className="font-medium">
                  {user?.address?.number} {user?.address?.street}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{user?.address?.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ZIP Code</p>
                <p className="font-medium">{user?.address?.zipcode}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Items in Cart</span>
                <Badge variant="secondary">{totalItems}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Account Status</span>
                <Badge variant="default">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <Link href="/cart">View Cart</Link>
              </Button>
              <Button onClick={logout} variant="destructive" className="w-full">
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
