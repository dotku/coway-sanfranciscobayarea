import AdminHelpBot from "@/components/AdminHelpBot";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AdminHelpBot />
    </>
  );
}
