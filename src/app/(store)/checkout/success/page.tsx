import { Suspense } from "react";
import CheckoutSuccessContent from "./checkout-success-content";

export const dynamic = 'force-dynamic';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
