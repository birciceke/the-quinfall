const ToastContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="absolute bottom-16 md:bottom-28 left-1/2 -translate-x-1/2 z-9999">
      {children}
    </div>
  );
};
export default ToastContainer;
