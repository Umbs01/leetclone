import LoginCard from "@/components/login_card";
import FirstNavbar from "@/components/firstnavbar";


export default function Page() {
  return (
    <div className="dark:bg-slate-950 bg-white  flex-col flex min-h-screen">
      <FirstNavbar />
      <div className="flex-grow flex items-center justify-center">
        <LoginCard />
      </div>
    </div>
  );
}