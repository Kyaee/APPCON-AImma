const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = 'px-6 py-2 rounded-lg font-medium transition-all duration-200';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 