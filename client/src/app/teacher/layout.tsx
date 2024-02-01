export default function TeacherDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col  items-center  p-12">
      {children}
    </div>
  );
}
