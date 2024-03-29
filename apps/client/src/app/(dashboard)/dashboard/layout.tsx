import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FLEX | Dashboard",
};

export default async function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <div className="container max-h-screen w-full py-16 md:py-12">
        {children}
        {modal}
      </div>
    </div>
  );
}
