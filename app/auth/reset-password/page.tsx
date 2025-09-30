// app/auth/reset-password/page.tsx
export const dynamic = "force-dynamic";

import ResetPasswordClient from "./reset";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token || null;

  return <ResetPasswordClient token={token} />;
}
