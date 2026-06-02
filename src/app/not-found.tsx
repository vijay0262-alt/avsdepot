import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10 text-center">
      <section>
        <p className="text-sm font-semibold uppercase text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page may have moved or is not part of the frontend foundation yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Return home</Link>
        </Button>
      </section>
    </Container>
  );
}
