export const JuiceGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 sm:p-6 bg-stone-700 border-4 border-stone-800 rounded-2xl shadow-inner">
      <div className="grid grid-cols-3 gap-4 sm:gap-6">{children}</div>
    </div>
  );
};
