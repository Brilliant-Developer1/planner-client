
const Button = ({ type = 'button', className = '', onClick, children, icon: Icon }) => {
  return (
    <button
      type={type}
      className={`btn btn-outline btn-primary rounded-lg  flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
      {Icon && <Icon className="" />}
    </button>
  );
};

export default Button;
