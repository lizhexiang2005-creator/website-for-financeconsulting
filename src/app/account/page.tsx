import { getCurrentUser } from "@/lib/auth";
import { AccountAuthPanel } from "@/components/account-auth-panel";
import { AccountProfilePanel } from "@/components/account-profile-panel";
import { SiteHeader } from "@/components/site-header";

export default async function AccountPage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff1e7_0%,#fff7f2_45%,#fffdfb_100%)] text-[#2d1812]">
        <section className="mx-auto flex min-h-[calc(100vh-112px)] w-full max-w-4xl items-center px-5 py-10 sm:px-8 lg:px-10">
          {currentUser ? <AccountProfilePanel user={currentUser} /> : <AccountAuthPanel />}
        </section>
      </main>
    </>
  );
}
