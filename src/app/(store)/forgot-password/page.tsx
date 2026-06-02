import { Suspense } from "react";
import ForgotPasswordContent from "./forgot-password-content";

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
