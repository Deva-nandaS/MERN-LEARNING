export const Button=({text,onClick,type="button"})=>{
    return(
        <button
        type={type}
        onClick={onClick}
        className="bg-black">{text}
        </button>
    );
};
