export const FormError=({message})=>{
    if (!message) return null;
    return(
        <p>{message}</p>
    )
    
}