"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Home, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { stripe } from "@/lib/stripe/client";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setSessionData(data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch session data");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Processing your order...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
        <div className="text-center max-w-md">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Error</h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button asChild>
              <Link href="/cart">Return to Cart</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          {sessionData && (
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono">{sessionData.payment_intent || sessionId}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Email</span>
                <span>{sessionData.customer_details?.email || sessionData.customer_email}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold">
                  ${sessionData.amount_total ? (sessionData.amount_total / 100).toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Payment Status</span>
                <span className="text-green-600 font-semibold">
                  {sessionData.payment_status}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">License Keys</p>
                <p className="text-sm text-muted-foreground">
                  Your license keys will be sent to your email address within a few minutes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Download className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Download Instructions</p>
                <p className="text-sm text-muted-foreground">
                  Follow the instructions in your email to download and activate your software.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/account">
              <Package className="h-4 w-4 mr-2" />
              View Order
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
