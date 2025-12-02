import { cn } from "@/lib/utils";
import { Handshake, Dumbbell, Trophy, Calendar, Clock, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";

const programData = [
    {
        day: "Dan 1",
        title: "Dolazak i upoznavanje",
        description: "Registracija, smještaj u bungalove, upoznavanje s trenerima i sudionicima. Večernji mini-turnir za probijanje leda.",
        icon: Handshake,
        color: "text-primary",
        bgGradient: "bg-primary",
        details: ["14:00 - 18:00 Dolazak", "19:00 Večera", "20:30 Upoznavanje"]
    },
    {
        day: "Dan 2-6",
        title: "Intenzivni treninzi",
        description: "Fokus na tehniku, taktiku i kondiciju. Jutarnji treninzi u dvorani, poslijepodnevne radionice i kupanje.",
        icon: Dumbbell,
        color: "text-secondary",
        bgGradient: "bg-secondary",
        details: ["08:00 Doručak", "09:30 Trening", "15:00 Radionice", "17:00 Kupanje"]
    },
    {
        day: "Dan 7",
        title: "Završni dan",
        description: "Veliki završni turnir, svečana dodjela priznanja i medalja. Zajedničko druženje i oproštajni party.",
        icon: Trophy,
        color: "text-primary",
        bgGradient: "bg-primary",
        details: ["09:00 Turnir", "13:00 Ručak", "15:00 Dodjela", "17:00 Odlazak"]
    },
];

export const ProgramTimeline = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-10 px-4">
            <div className="relative space-y-12 md:space-y-0">
                {/* Central Line (Desktop) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20 -translate-x-1/2 rounded-full" />

                {/* Mobile Line */}
                <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20 rounded-full" />

                {programData.map((item, index) => {
                    const isEven = index % 2 === 0;
                    const Icon = item.icon;

                    return (
                        <Reveal key={index} delay={index * 100} direction={isEven ? "left" : "right"} className="w-full">
                            <div className={cn(
                                "relative flex flex-col md:flex-row items-center",
                                isEven ? "md:flex-row-reverse" : ""
                            )}>
                                {/* Spacer for alternating layout */}
                                <div className="flex-1 w-full md:w-1/2" />

                                {/* Center Node */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                                    <div className={cn(
                                        "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-strong border-4 border-background transition-transform duration-300 hover:scale-110",
                                        item.bgGradient
                                    )}>
                                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className={cn(
                                    "flex-1 w-full md:w-1/2 pl-20 md:pl-0",
                                    isEven ? "md:pr-12" : "md:pl-12"
                                )}>
                                    <div className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 border border-border/50 hover:-translate-y-1 overflow-hidden">
                                        {/* Decorative background blob */}
                                        <div className={cn(
                                            "absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150",
                                            item.bgGradient
                                        )} />

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={cn(
                                                    "px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm",
                                                    item.bgGradient
                                                )}>
                                                    {item.day}
                                                </span>
                                            </div>

                                            <h3 className={cn("text-2xl font-bold mb-3", item.color)}>
                                                {item.title}
                                            </h3>

                                            <p className="text-muted-foreground leading-relaxed mb-6">
                                                {item.description}
                                            </p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border/50">
                                                {item.details.map((detail, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                                                        <Clock className="w-4 h-4 text-primary/60" />
                                                        {detail}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
};
