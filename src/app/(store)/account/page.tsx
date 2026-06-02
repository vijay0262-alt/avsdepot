"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, PackageCheck, Settings, UserRound, LogOut, Mail, Calendar } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

const accountCards = [
  {
    title: "Profile",
    body: "Company details, contact information and preferences.",
    icon: UserRound,
    href: "/account/profile",
  },
  {
    title: "Orders",
    body: "View your order history and track shipments.",
    icon: PackageCheck,
    href: "/account/orders",
  },
  {
    title: "Quotes",
    body: "Draft quotes and project lists for account buyers.",
    icon: FileText,
    href: "/account/quotes",
  },
  {
    title: "Settings",
    body: "Notifications, payment methods and shipping locations.",
    icon: Settings,
    href: "/account/settings",
  },
];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <Container className="py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-10">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h1 className="text-3xl font-bold tracking-tight">Not logged in</h1>
          <p className="mt-2 text-muted-foreground">
            Please log in to access your account.
          </p>
          <Button asChild className="mt-6">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back, {user.user_metadata?.full_name || user.email}
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* User Info Card */}
      <div className="mt-8 rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <UserRound className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{user.user_metadata?.full_name || "Not set"}</p>
              <p className="text-sm text-muted-foreground">Full Name</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground">Email</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">Member since</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5">
              {user.email_confirmed_at ? "Verified" : "Unverified"}
            </Badge>
            <div>
              <p className="text-sm text-muted-foreground">Email status</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {accountCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <section className="rounded-lg border p-5 hover:bg-secondary/50 transition cursor-pointer">
              <card.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
            </section>
          </Link>
        ))}
      </div>
    </Container>
  );
}
