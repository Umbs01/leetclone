import PropTypes from "prop-types"; // Optional: For prop validation

const Button = ({ onClick, label, varient = "primary", size = "md", extra}) => {
    const buttonStyles = {
        primary: "bg-primary hover:bg-primary-dark text-primary-foreground border-border border",
        secondary: "bg-secondary hover:bg-secondary-dark text-secondary-foreground border-border border",
        ghost: "bg-transparent hover:bg-primary-dark text-primary-foreground border-border border",
        link: "bg-transparent hover:bg-primary-dark text-primary-foreground border-none"
    };

    const buttonSize = {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg"
    };

    const style = buttonStyles[varient];
    const sizeStyle = buttonSize[size];

    return (
        <button
            className={`rounded-md inline-flex ${style} items-center justify-center ${sizeStyle} hover:shadow-md focus:outline-none ${extra}`}
            onClick={onClick}
            aria-label={label} // Optional: Improve accessibility
        >
            {label}
        </button>
    );
};

// Optional: Add PropTypes for better prop validation
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    varient: PropTypes.oneOf(["primary", "secondary", "ghost", "link"]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Button;
