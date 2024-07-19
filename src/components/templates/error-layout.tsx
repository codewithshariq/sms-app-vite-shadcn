import { ReactNode } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface Props {
  code: number;
  children: ReactNode;
}
export default function ErrorLayout({ code, children }: Props) {
  const navigate = useNavigate();
  return (
    <div className="h-screen grid place-content-center place-items-center bg-light dark:bg-dark">
      <h1 className="text-5xl">{code}</h1>
      <h2 className="text-xl opacity-50">{children}</h2>
      <Button onClick={() => navigate("/")} className="mt-4">
        <RiArrowLeftLine size={20} />
        <span>Go Back</span>
      </Button>
    </div>
  );
}
