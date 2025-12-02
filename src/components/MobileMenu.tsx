import { X, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (id: string) => void;
}

export const MobileMenu = ({ isOpen, onClose, onNavigate }: MobileMenuProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = "unset";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const menuItems = [
        { id: "o-nama", label: "O nama" },
        { id: "program", label: "Program" },
        { id: "lokacija", label: "Lokacija" },
        { id: "cijena", label: "Cijena" },
        { id: "prijava", label: "Prijava" },
        { id: "kontakt", label: "Kontakt" },
    ];

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl transition-opacity duration-300 flex flex-col",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            {/* Header inside menu */}
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sun className="w-8 h-8 text-primary animate-spin-slow" />
                    <span className="text-2xl font-heading font-bold bg-gradient-sun bg-clip-text text-transparent">
                        HANDBALLSUN
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-accent/20 transition-colors"
                >
                    <X className="w-8 h-8 text-foreground" />
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
                {menuItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={cn(
                            "text-3xl md:text-4xl font-heading font-bold text-foreground hover:text-primary transition-all duration-300 transform hover:scale-110",
                            isOpen ? "animate-stagger-in" : "opacity-0"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {item.label}
                    </button>
                ))}

                <Button
                    onClick={() => onNavigate("prijava")}
                    size="lg"
                    className={cn(
                        "mt-8 text-xl px-12 py-6 shadow-strong animate-stagger-in",
                        isOpen ? "animate-stagger-in" : "opacity-0"
                    )}
                    style={{ animationDelay: `${menuItems.length * 100}ms` }}
                >
                    Prijavi se
                </Button>
            </div>

            {/* Decorative background elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
        </div>
    );
};
