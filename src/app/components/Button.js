
const Button = ({ type = 'button', className = '', onClick, children, icon: Icon }) => {
  return (
    <button
      type={type}
      className={`btn btn-outline btn-primary rounded-lg w-full flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
      {Icon && <Icon className="ml-2" />}
    </button>
  );
};

export default Button;
