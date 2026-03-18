export const Button=({text,onClick,type="button"})=>{
    return(
        <button
        type={type}
        onClick={onClick}
        className="bg-gray-900 text-white font-bold w-full mt-2 rounded-lg py-2">{text}
        </button>
    );
};
