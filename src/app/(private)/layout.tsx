const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
};

export default PrivateLayout;
