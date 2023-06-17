"use client";

interface SubMenuProps {
  onClick: () => void;
  label: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        "
    >
      {label}
    </div>
  );
};

export default SubMenu;
