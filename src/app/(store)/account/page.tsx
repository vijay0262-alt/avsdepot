import Link from "next/link";
import { FileText, PackageCheck, Settings, UserRound } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const accountCards = [
  {
    title: "Profile",
    body: "Company details, contact information and preferences.",
    icon: UserRound,
  },
  {
    title: "Orders",
    body: "Order history will appear here after backend integration.",
    icon: PackageCheck,
  },
  {
    title: "Quotes",
    body: "Draft quotes and project lists for account buyers.",
    icon: FileText,
  },
  {
    title: "Settings",
    body: "Notifications, payment methods and shipping locations.",
    icon: Settings,
  },
];

export const metadata = {
  title: "Account",
  description: "AVS Depot account dashboard frontend foundation.",
};

export default function AccountPage() {
  return (
    <Container className="py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account</h1>
          <p className="mt-2 text-muted-foreground">
            Dashboard structure for customer and trade account workflows.
          </p>
        </div>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {accountCards.map((card) => (
          <section key={card.title} className="rounded-lg border p-5">
            <card.icon className="size-5 text-primary" />
            <h2 className="mt-4 font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
