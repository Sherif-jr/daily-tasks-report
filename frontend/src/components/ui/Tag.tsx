import { FC } from "react";

interface TagProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  textSelectable?: boolean;
}
const Tag: FC<TagProps> = ({
  text,
  onClick,
  className,
  style,
  children,
  textSelectable = false,
}) => {
  return (
    <span
      className={`px-2 py-1 bg-slate-400 rounded-3xl cursor-pointer flex justify-center items-center ${
        !textSelectable ? "select-none" : ""
      } ${className || ""}`}
      style={style}
      onClick={onClick}
    >
      {children || text}
    </span>
  );
};

export default Tag;
