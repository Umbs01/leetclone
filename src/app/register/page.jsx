import RegisterCard from "@/components/register_card";
import FirstNavbar from "@/components/firstnavbar";

export default function Register() {
  return (
    <div className="dark:bg-slate-950 bg-white  min-h-screen flex flex-col">
      <FirstNavbar />
      <div className="flex-grow flex items-center justify-center">
        <RegisterCard />
      </div>
    </div>
  );
}
