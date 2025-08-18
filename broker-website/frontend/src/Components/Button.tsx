//here are data types for type attribute
type ButtonType = 'button' | 'submit' | 'reset' | undefined;

//data types
interface ButtonInterface {

  text:string
  type?:ButtonType
  children?:React.ReactNode
  handleClick?:()=> void
 
}
const Button = (props:ButtonInterface) => {
    //className
  const baseClass = "text-center font-bold py-2 px-4 border border-brand-3 rounded inline-block";
  const defaultColorClass = "bg-brand-1 hover:bg-brand-2 text-brand-5 block";
  const submitColorClass ="text-brand-1 bg-brand-5 hover:bg-brand-4 font-semibold shadow w-50 ";

 
  const finalClass =
    props.type === "submit"
      ? `${baseClass} ${submitColorClass}`
      : `${baseClass} ${defaultColorClass}`;
  return (
    <button
    className={`${finalClass}`}
    type={props.type}
    onClick={props.handleClick}
    >
      {props.children}
      {props.text}
    </button>
  )
}

export default Button