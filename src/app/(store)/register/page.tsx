import { AuthForm } from "@/components/forms/auth-form";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Register",
  description: "Create an AVS Depot customer account.",
};

export default function RegisterPage() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <section className="w-full max-w-md rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Prepare for saved carts, trade pricing and quote workflows.
        </p>
        <div className="mt-6">
          <AuthForm mode="register" />
        </div>
      </section>
    </Container>
  );
}
