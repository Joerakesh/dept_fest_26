"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function signOut() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }
  return <button disabled={busy} onClick={signOut} className="text-xs text-[#b6ada2] hover:text-white disabled:opacity-50">{busy ? "Signing out…" : "Sign out"}</button>;
}