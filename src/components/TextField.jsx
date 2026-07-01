const TextField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={id}
                className={`${className ? className : ""} font-semibold text-sm text-gray-300 tracking-wide`}
            >
                {label}
            </label>

            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`${className ? className : ""
                    } px-4 py-3 border outline-none bg-white/5 backdrop-blur-sm text-white placeholder-gray-500 rounded-xl transition-all duration-200 focus:bg-white/10 ${errors[id]?.message ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-violet-500/50"
                    }`}
                {...register(id, {
                    required: { value: required, message },
                    minLength: min
                        ? { value: min, message: "Minimum 6 character is required" }
                        : null,

                    pattern:
                        type === "email"
                            ? {
                                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                message: "Invalid email",
                            }
                            : type === "url"
                                ? {
                                    value:
                                        /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                    message: "Please enter a valid url",
                                }
                                : null,
                })}
            />

            {errors[id]?.message && (
                <p className="text-sm font-medium text-red-400 mt-1">
                    {errors[id]?.message}*
                </p>
            )}
        </div>
    );
};

export default TextField;