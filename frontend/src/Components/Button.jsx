export const Button=({text,onClick,type="button",className=""})=>{
    return(
        <button
        type={type}
        onClick={onClick}
        className={`bg-gray-900 text-white font-bold  mt-2 rounded-lg py-2 ${className}`}>{text}
        </button>
    );
};
