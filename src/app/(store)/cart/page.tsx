import { CartContent } from "@/components/cart/cart-content";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Cart",
  description: "Review selected AVS Depot software licenses before checkout.",
};

export default function CartPage() {
  return (
    <Container className="py-10">
      <CartContent />
    </Container>
  );
}
