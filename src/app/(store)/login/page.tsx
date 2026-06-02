import { AuthForm } from "@/components/forms/auth-form";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Login",
  description: "Login to an AVS Depot customer account.",
};

export default function LoginPage() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <section className="w-full max-w-md rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access saved carts, quotes and account preferences.
        </p>
        <div className="mt-6">
          <AuthForm mode="login" />
        </div>
      </section>
    </Container>
  );
}
