
const ProblemSelect = ({ name, difficulty, points, status}) => { 
    const style = "bg-primary hover:bg-primary-dark text-primary-foreground border-border border";

    return (
        <button
            className={`flex justify-between rounded-2xl ${style} items-center text-base hover:shadow-md focus:outline-none w-full px-4 py-2`}
            aria-label={name} // Optional: Improve accessibility
            onClick={console.log("go to problem")}
        >
            <div className=" ">
                <label className="">{name}</label>
            </div>
            <div>
                <label>{difficulty}</label>
                <label>{points}</label>
                <label>{status}</label>
            </div>
            
        </button>
    );
}

export default ProblemSelect;