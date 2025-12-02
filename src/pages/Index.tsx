import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Heart,
  Target,
  Globe,
  Dumbbell,
  Waves,
  Sun,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Sparkles,
  Smile,
  Star,
  Home,
  Utensils,
  Shield
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-handball.jpg";
import hvarImage from "@/assets/hvar-resort.jpg";
import { WaveDivider } from "@/components/WaveDivider";
import { MobileMenu } from "@/components/MobileMenu";
import { Reveal } from "@/components/Reveal";
import { ProgramTimeline } from "@/components/ProgramTimeline";

const registrationSchema = z.object({
  childName: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  childBirthDate: z.string().min(1, "Datum rođenja je obavezan"),
  childGender: z.enum(["male", "female"], { required_error: "Odaberite spol" }),
  childClub: z.string().optional(),
  tshirtSize: z.string().min(1, "Odaberite veličinu majice"),
  parentName: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  parentEmail: z.string().email("Unesite valjanu email adresu"),
  parentPhone: z.string().min(6, "Unesite valjani broj telefona"),
  parentCity: z.string().min(2, "Unesite grad"),
  emergencyName: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  emergencyPhone: z.string().min(6, "Unesite valjani broj telefona"),
  emergencyRelation: z.string().min(2, "Unesite odnos"),
  medicalNotes: z.string().optional(),
  specialRequests: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Morate prihvatiti uvjete sudjelovanja",
  }),
});

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      childName: "",
      childBirthDate: "",
      childClub: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      parentCity: "",
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "",
      medicalNotes: "",
      specialRequests: "",
      acceptTerms: false,
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleMobileNavigate = (id: string) => {
    scrollToSection(id);
  };

  const onSubmit = (data: z.infer<typeof registrationSchema>) => {
    console.log(data);
    toast({
      title: "Prijava primljena! 🎉",
      description: "Kontaktirat ćemo vas uskoro s daljnjim informacijama.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-8 h-8 text-primary" />
              <span className="text-2xl font-heading font-bold bg-gradient-sun bg-clip-text text-transparent">
                HANDBALLSUN
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("o-nama")}
                className="text-foreground hover:text-primary transition-colors font-heading font-medium"
              >
                O nama
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="text-foreground hover:text-primary transition-colors font-heading font-medium"
              >
                Program
              </button>
              <button
                onClick={() => scrollToSection("lokacija")}
                className="text-foreground hover:text-primary transition-colors font-heading font-medium"
              >
                Lokacija
              </button>
              <button
                onClick={() => scrollToSection("cijena")}
                className="text-foreground hover:text-primary transition-colors font-heading font-medium"
              >
                Cijena
              </button>
              <button
                onClick={() => scrollToSection("prijava")}
                className="text-foreground hover:text-primary transition-colors font-heading font-medium"
              >
                Prijava
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-foreground hover:text-primary transition-colors font-heading font-medium"
              >
                Kontakt
              </button>
              <Button
                onClick={() => scrollToSection("prijava")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-medium"
              >
                Prijavi se
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </nav>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleMobileNavigate}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/90 via-secondary/80 to-[#F97316]/90" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-accent/30 rounded-full blur-xl animate-bounce-gentle" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute top-1/4 right-1/4 w-8 h-8 text-accent/50 animate-sparkle" />
        <Star className="absolute bottom-1/3 left-1/3 w-6 h-6 text-accent/40 animate-sparkle" style={{ animationDelay: '1.5s' }} />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg animate-gradient-shift bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
              Rukometni ljetni kamp 2026
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Badge className="bg-white/20 text-white backdrop-blur-sm text-lg py-2 px-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Jelsa, otok Hvar
              </Badge>
              <Badge className="bg-white/20 text-white backdrop-blur-sm text-lg py-2 px-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                1. – 7. srpnja 2026
              </Badge>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Pridruži nam se ovog ljeta na najzabavnijem rukometnom kampu na Jadranu!
              Savršena destinacija za spoj sporta, sunca i mora.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <Badge variant="outline" className="bg-white/10 border-white text-white backdrop-blur-sm text-base py-2 px-4">
                Za djevojčice i dječake (2010.–2014.)
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white text-white backdrop-blur-sm text-base py-2 px-4">
                7 Dana
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white text-white backdrop-blur-sm text-base py-2 px-4">
                Puni Pansion
              </Badge>
            </div>
            <Button
              size="lg"
              onClick={() => scrollToSection("prijava")}
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 py-6 shadow-strong group"
            >
              <Smile className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
              Rezerviraj svoje mjesto
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <WaveDivider fill="#fdfbf6" />
      </section>

      {/* About Section */}
      <section id="o-nama" className="py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <Reveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-sun bg-clip-text text-transparent pb-2">
                O Kampu
              </h2>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto mb-16">
            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed text-center">
                Ovaj sedmodnevni kamp namijenjen je djeci i mladima od 10 do 17 godina koji žele
                unaprijediti svoje rukometne vještine, upoznati nove prijatelje i doživjeti
                nezaboravno ljetno iskustvo. Uz stručno vodstvo trenera, sudionike očekuje
                dinamičan program ispunjen energijom, sportom i druženjem.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Reveal delay={0} direction="left" className="h-full">
              <Card className="border-2 hover:border-primary hover:shadow-strong hover:-translate-y-2 transition-all duration-300 group hover:animate-bloom h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:animate-wiggle">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Svakodnevni treninzi</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Dvorana i vanjski teren - maksimiziramo vaše sportske vještine
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={100} direction="up" className="h-full">
              <Card className="border-2 hover:border-primary hover:shadow-strong hover:-translate-y-2 transition-all duration-300 group hover:animate-bloom h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:animate-wiggle">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Individualni napredak</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Uz EHF trenere - personalizirani pristup svakom polaziniku
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={200} direction="right" className="h-full">
              <Card className="border-2 hover:border-primary hover:shadow-strong hover:-translate-y-2 transition-all duration-300 group hover:animate-bloom h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 group-hover:animate-wiggle">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Mini turniri</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Natjecanja i testiranje naučenog u stvarnim uvjetima
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={300} direction="left" className="h-full">
              <Card className="border-2 hover:border-primary hover:shadow-strong hover:-translate-y-2 transition-all duration-300 group hover:animate-bloom h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:animate-wiggle">
                    <Waves className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Kupanje i izleti</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Uživanje na plažama i istraživanje otoka Hvara
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={400} direction="up" className="h-full">
              <Card className="border-2 hover:border-primary hover:shadow-strong hover:-translate-y-2 transition-all duration-300 group hover:animate-bloom h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:animate-wiggle">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Timski duh</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Stvaranje novih prijateljstava i timskog duha
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={500} direction="right" className="h-full">
              <Card className="border-2 hover:border-primary hover:shadow-strong hover:-translate-y-2 transition-all duration-300 group hover:animate-bloom h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:animate-wiggle">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Nova prijateljstva</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Upoznavanje polaznika iz raznih zemalja i kultura
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="cijena" className="py-20 md:py-32 bg-secondary/5 relative">
        <WaveDivider position="top" fill="#fdfbf6" />
        <div className="container mx-auto px-4">
          <Reveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-sun bg-clip-text text-transparent pb-2">
                Cijena i Paketi
              </h2>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="relative">
                {/* Floating Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-accent text-accent-foreground px-6 py-2 rounded-full font-bold text-lg shadow-strong border-4 border-white rotate-2 inline-block">
                    ✨ All Inclusive Paket
                  </span>
                </div>

                <Card className="border-0 shadow-soft-xl overflow-hidden relative bg-white">
                  {/* Decorative Gradient Border */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-sun" />

                  <CardHeader className="text-center pt-16 pb-8 bg-secondary/5">
                    <CardTitle className="text-5xl md:text-6xl font-bold bg-gradient-sun bg-clip-text text-transparent mb-4">
                      650 - 750 EUR
                    </CardTitle>
                    <CardDescription className="text-foreground/70 text-xl font-medium">
                      Ovisno o paketu i roku prijave
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8 md:p-12">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-bold mb-2">Što je sve uključeno?</h3>
                      <p className="text-muted-foreground">Sve što vašem djetetu treba za nezaboravno ljeto</p>
                    </div>

                    <div className="grid grid-cols-1 gap-y-4 mb-12">
                      {[
                        "7 noćenja s punim pansionom",
                        "2 treninga dnevno + sportski materijali",
                        "Oprema kampa (majice, bidoni, poklon paket)",
                        "Osiguranje i certifikat o sudjelovanju",
                        "Organizirane aktivnosti i izleti",
                        "Medicinska podrška i sigurnost 24/7",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-secondary/5 transition-colors">
                          <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          </div>
                          <span className="text-lg font-medium text-foreground/80 text-center">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <Button
                        size="lg"
                        onClick={() => scrollToSection("prijava")}
                        className="bg-gradient-sun hover:opacity-90 text-white font-bold text-xl px-12 py-8 rounded-full shadow-strong hover:shadow-xl hover:scale-105 transition-all duration-300 group w-full md:w-auto"
                      >
                        <Sparkles className="w-6 h-6 mr-2 group-hover:animate-sparkle" />
                        Rezerviraj Svoje Mjesto
                        <Sparkles className="w-6 h-6 ml-2 group-hover:animate-sparkle" />
                      </Button>
                      <p className="text-sm text-muted-foreground mt-6 font-medium">
                        * Mogućnost plaćanja na rate
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
        <WaveDivider position="bottom" fill="#fdfbf6" />
      </section>

      {/* Program Section */}
      <section id="program" className="py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <Reveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-sun bg-clip-text text-transparent pb-2">
                Tjedni Program
              </h2>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-6">
            <ProgramTimeline />
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent max-w-3xl mx-auto">
              <CardContent className="pt-6">
                <p className="text-lg font-semibold text-foreground">
                  ✨ Dodatne aktivnosti: izlet u Hvar, kvizovi, sportske radionice
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="lokacija" className="py-20 md:py-32 bg-secondary/5 relative">
        <WaveDivider position="top" fill="#fdfbf6" />
        <div className="container mx-auto px-4">
          <Reveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-sun bg-clip-text text-transparent pb-2">
                Smještaj i Lokacija
              </h2>
            </div>
          </Reveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <Reveal direction="left" className="h-full">
                <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <img
                    src={hvarImage}
                    alt="Resort Fontana Hvar"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-8 left-8 right-8 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-accent/20 backdrop-blur-md p-2 rounded-lg">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <span className="font-bold tracking-wide uppercase text-sm bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">Lokacija</span>
                    </div>
                    <h3 className="text-4xl font-bold mb-2 text-shadow-lg">Jelsa, Otok Hvar</h3>
                    <p className="text-white/90 text-lg font-medium">Resort Fontana</p>
                  </div>
                </div>
              </Reveal>

              <div className="flex flex-col justify-center space-y-8">
                <Reveal direction="right">
                  <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-lg">
                    <h3 className="text-3xl font-bold mb-4 text-foreground">
                      Savršen spoj sporta i odmora
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Resort Fontana nudi idealne uvjete za naše polaznike. Smješten uz samo more,
                      pruža savršenu ravnotežu između intenzivnih treninga i opuštanja.
                    </p>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Reveal delay={100} direction="up">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:-translate-y-1 group">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Home className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Bungalovi</h4>
                        <p className="text-sm text-muted-foreground">4 osobe po jedinici, klimatizirano</p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={200} direction="up">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:-translate-y-1 group">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Utensils className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 group-hover:text-secondary transition-colors">Puni pansion</h4>
                        <p className="text-sm text-muted-foreground">3 obroka dnevno za sportaše</p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={300} direction="up">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:-translate-y-1 group">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Waves className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">Sadržaji</h4>
                        <p className="text-sm text-muted-foreground">Bazen, plaža (50m), dvorana</p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={400} direction="up">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:-translate-y-1 group">
                      <div className="w-12 h-12 rounded-2xl bg-success flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Sigurnost</h4>
                        <p className="text-sm text-muted-foreground">24/7 nadzor i podrška</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider position="bottom" fill="#fdfbf6" />
      </section>

      {/* Coaches Section */}
      <section className="py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <Reveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-sun bg-clip-text text-transparent pb-2">
                Stručni Tim
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Reveal delay={0} direction="left" className="h-full">
              <div className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-strong transition-all duration-300 border border-border/50 hover:-translate-y-1 overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-sun" />
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Award className="w-32 h-32 text-primary" />
                </div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Glavni trener</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Licencirani EHF trener s međunarodnim iskustvom
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} direction="right" className="h-full">
              <div className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-strong transition-all duration-300 border border-border/50 hover:-translate-y-1 overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-ocean" />
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Users className="w-32 h-32 text-secondary" />
                </div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Omjer</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      1 trener na 15–20 djece za optimalan razvoj
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} direction="left" className="h-full">
              <div className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-strong transition-all duration-300 border border-border/50 hover:-translate-y-1 overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-sun" />
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Trophy className="w-32 h-32 text-primary" />
                </div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pomoćni treneri</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Stručan tim za individualne treninge
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} direction="right" className="h-full">
              <div className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-strong transition-all duration-300 border border-border/50 hover:-translate-y-1 overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-ocean" />
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Heart className="w-32 h-32 text-secondary" />
                </div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-success flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Podrška</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Fizioterapeut, voditelj logistike i animacije
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Handball Sun Section */}
      <section className="py-20 md:py-32 bg-secondary/5 relative">
        <WaveDivider position="top" fill="#fdfbf6" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-sun bg-clip-text text-transparent pb-2">
              Zašto Handball Sun?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Reveal delay={100} className="h-full">
              <Card className="bg-card border-2 hover:shadow-strong transition-all duration-300 hover:scale-105 hover:rotate-1 h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Sun className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center">Vizija</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-lg text-foreground/80">
                    Spoj vrhunskog sporta, edukacije i mediteranskog uživanja.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={200} className="h-full">
              <Card className="bg-card border-2 hover:shadow-strong transition-all duration-300 hover:scale-105 hover:rotate-1 h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center">Misija</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-lg text-foreground/80">
                    Razvoj sportskih i socijalnih vještina kroz stručni trening i međunarodnu interakciju.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={300} className="h-full">
              <Card className="bg-card border-2 hover:shadow-strong transition-all duration-300 hover:scale-105 hover:rotate-1 h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center">Međunarodni karakter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-lg text-foreground/80">
                    Suradnja s klubovima iz Njemačke, Skandinavije i regije.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="prijava" className="py-20 md:py-32 bg-background relative overflow-hidden">
        <WaveDivider position="top" fill="#f0f5fb" />
        {/* Decorative background elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-10 h-10 text-primary animate-sparkle" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-sun bg-clip-text text-transparent pb-2">
                Prijava na Kamp
              </h2>
              <Sparkles className="w-10 h-10 text-primary animate-sparkle" style={{ animationDelay: '1s' }} />
            </div>
            <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
              Ispunite obrazac i postanite dio nezaboravnog ljetnog iskustva! 🏐☀️
            </p>
          </div>

          <Reveal>
            <Card className="max-w-4xl mx-auto border-4 border-primary/20 shadow-strong">
              <CardContent className="pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Child Information */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold flex items-center gap-2 text-primary">
                        <Smile className="w-6 h-6" />
                        Podaci o djetetu
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="childName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ime i prezime *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ana Horvat" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="childBirthDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Datum rođenja *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="childGender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Spol *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id="male" />
                                  <label htmlFor="male" className="cursor-pointer">Dječak</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="female" />
                                  <label htmlFor="female" className="cursor-pointer">Djevojčica</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="childClub"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Klub (opcionalno)</FormLabel>
                              <FormControl>
                                <Input placeholder="RK Zagreb" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tshirtSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Veličina majice *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Odaberite veličinu" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="xs">XS</SelectItem>
                                  <SelectItem value="s">S</SelectItem>
                                  <SelectItem value="m">M</SelectItem>
                                  <SelectItem value="l">L</SelectItem>
                                  <SelectItem value="xl">XL</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Parent/Guardian Information */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold flex items-center gap-2 text-secondary">
                        <Users className="w-6 h-6" />
                        Podaci o roditelju/skrbniku
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="parentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ime i prezime *</FormLabel>
                              <FormControl>
                                <Input placeholder="Marko Horvat" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="parentEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="marko@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="parentPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefon *</FormLabel>
                              <FormControl>
                                <Input placeholder="+385 99 123 4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="parentCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Grad/Država *</FormLabel>
                              <FormControl>
                                <Input placeholder="Zagreb, Hrvatska" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold flex items-center gap-2 text-destructive">
                        <Phone className="w-6 h-6" />
                        Hitni kontakt
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="emergencyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ime i prezime *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ivan Horvat" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="emergencyPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefon *</FormLabel>
                              <FormControl>
                                <Input placeholder="+385 98 765 4321" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="emergencyRelation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Odnos *</FormLabel>
                              <FormControl>
                                <Input placeholder="Otac, Majka, Ujak..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold flex items-center gap-2 text-accent">
                        <Heart className="w-6 h-6" />
                        Dodatne informacije
                      </h3>
                      <FormField
                        control={form.control}
                        name="medicalNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zdravstvene napomene/alergije</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Unesite sve relevantne zdravstvene informacije, alergije na hranu ili lijekove..."
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="specialRequests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Posebni zahtjevi</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Posebne prehrambene potrebe, smještajni zahtjevi..."
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Terms and Submit */}
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 bg-muted/30">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="cursor-pointer">
                                Prihvaćam uvjete sudjelovanja i pravila kampa *
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-sun text-white font-bold text-xl py-6 shadow-strong group"
                      >
                        <Trophy className="w-6 h-6 mr-2 group-hover:animate-bounce-gentle" />
                        Pošalji prijavu
                        <Sparkles className="w-6 h-6 ml-2 group-hover:animate-sparkle" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card className="bg-white/80 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a href="mailto:info@handballsun.hr" className="text-foreground/80 hover:text-primary transition-colors">
                  info@handballsun.hr
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Telefon</h3>
                <a href="tel:+385991234567" className="text-foreground/80 hover:text-primary transition-colors">
                  +385 99 123 4567
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Lokacija</h3>
                <p className="text-foreground/80">Jelsa, Hvar, Hrvatska</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <WaveDivider position="bottom" fill="#43bfe6" />
      </section>

      {/* Footer / Contact */}
      <footer id="kontakt" className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-8 h-8 text-primary" />
                <span className="text-2xl font-heading font-bold">HANDBALLSUN</span>
              </div>
              <p className="text-secondary-foreground/80">
                Najzabavniji rukometni ljetni kamp na Jadranu
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>info@handballsun.hr</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+385 99 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Jelsa, Hvar, Hrvatska</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Prati nas</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 pt-8 text-center">
            <p className="text-secondary-foreground/80">
              © 2026 Handball Sun Hvar. Sva prava pridržana.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
