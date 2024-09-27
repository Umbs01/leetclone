import ProblemSelect from "@/components/ProblemSelect";

export default function Page() {
    return (
        <div className="mx-5 px-5 h-full">
            <ProblemSelect name="Problem 1" difficulty="Easy" points="100" status="Solved" />
        </div>
    );
  }