type Props = {
  value: boolean;
  children: React.ReactNode;
  className?: string;
};

export default ({ children, value, className }: Props) => {
  return (
    <div className={`${className} ${value ? "" : "hidden"}`}>{children}</div>
  );
};
