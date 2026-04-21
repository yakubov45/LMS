export default function Card({ children, className = "", ...props }) {
    const hasBg = className.includes("bg-");
    const hasBorder = className.includes("border-") || className.includes("border-none");
    const hasRounded = className.includes("rounded-");
    const hasShadow = className.includes("shadow-") || className.includes("shadow-none");
    const hasPadding = className.includes("p-") || className.includes("px-") || className.includes("py-");

    return (
        <div className={`
            backdrop-blur-xl transition-all duration-300
            ${!hasBg ? "bg-white/70" : ""} 
            ${!hasBorder ? "border border-slate-200/80 shadow-indigo-50/10" : ""} 
            ${!hasRounded ? "rounded-[24px]" : ""} 
            ${!hasShadow ? "shadow-sm" : ""} 
            ${!hasPadding ? "p-6" : ""} 
            ${className}
        `} {...props}>
            {children}
        </div>
    );
}
