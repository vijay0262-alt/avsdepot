import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";

const legalPages = {
  privacy: {
    title: "Privacy Policy",
    body: "Privacy policy content will be finalized before production launch.",
  },
  terms: {
    title: "Terms of Service",
    body: "Terms of service content will be finalized before production launch.",
  },
  returns: {
    title: "Returns Policy",
    body: "Returns and exchange policy content will be finalized before production launch.",
  },
  warranty: {
    title: "Warranty",
    body: "Warranty coverage content will be finalized before production launch.",
  },
};

type LegalSlug = keyof typeof legalPages;

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages[slug as LegalSlug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.body,
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = legalPages[slug as LegalSlug];

  if (!page) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          {page.title}
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">{page.body}</p>
      </div>
    </Container>
  );
}
