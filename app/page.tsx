"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Star, ArrowRight, Zap, Award, Shield, Swords, Crown } from "lucide-react"

export default function LegendaryFitnessPage() {
  const [counters, setCounters] = useState({ members: 0, success: 0, years: 0, access: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // Scroll animations and counter effects
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")

          // Trigger counters when stats section is visible
          if (entry.target === statsRef.current && !isVisible) {
            setIsVisible(true)
            animateCounters()
          }
        }
      })
    }, observerOptions)

    // Observe all scroll-fade-in elements
    const elements = document.querySelectorAll(".scroll-fade-in")
    elements.forEach((el) => observer.observe(el))

    if (statsRef.current) observer.observe(statsRef.current)

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    const targets = { members: 500, success: 95, years: 15, access: 24 }
    const duration = 2000
    const steps = 60

    Object.keys(targets).forEach((key) => {
      const target = targets[key as keyof typeof targets]
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, duration / steps)
    })
  }

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax-bg")

      parallaxElements.forEach((element) => {
        const speed = 0.5
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-hero-gradient">
        <div className="parallax-bg absolute inset-0 bg-[url('/intense-gym-workout-dark-lighting-powerful-athlete.jpg')] bg-cover bg-center opacity-30"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="animate-slide-up">
            <Badge className="mb-6 bg-primary/20 text-white border-primary/30 text-lg px-6 py-2 animate-glow">
              SPENCER SPARTAN FITNESS
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient animate-pulse-strong">
              FORGE YOUR
              <br />
              SPARTAN WARRIOR
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where ordinary mortals become legendary Spartan warriors. Train like the 300, fight like a champion, and
              forge your body into an unstoppable weapon of ancient power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-bold animate-glow"
              >
                JOIN THE SPARTAN ARMY
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                WITNESS SPARTAN TRAINING
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 animate-float">
          <Shield className="h-12 w-12 text-primary/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
          <Swords className="h-16 w-16 text-secondary/30" />
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-legendary-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center scroll-fade-in">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 animate-counter-up">
                {counters.members}+
              </div>
              <div className="text-lg text-muted-foreground font-semibold">SPARTAN WARRIORS</div>
            </div>
            <div className="text-center scroll-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-5xl md:text-6xl font-bold text-secondary mb-2 animate-counter-up">
                {counters.success}%
              </div>
              <div className="text-lg text-muted-foreground font-semibold">CONQUER THEIR GOALS</div>
            </div>
            <div className="text-center scroll-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 animate-counter-up">
                {counters.access}/7
              </div>
              <div className="text-lg text-muted-foreground font-semibold">SPARTAN TRAINING</div>
            </div>
            <div className="text-center scroll-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="text-5xl md:text-6xl font-bold text-secondary mb-2 animate-counter-up">
                {counters.years}
              </div>
              <div className="text-lg text-muted-foreground font-semibold">YEARS OF GLORY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">SPARTAN TRAINING REGIMENS</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose your path to Spartan glory. Each regimen is forged in the fires of ancient warrior tradition to
              create an unstoppable force.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "SPARTAN STRENGTH",
                description: "Build legendary power with ancient warrior training methods",
                icon: <Shield className="h-8 w-8" />,
                color: "primary",
              },
              {
                title: "300 WARRIOR PROTOCOL",
                description: "Elite conditioning inspired by the legendary 300 Spartans",
                icon: <Swords className="h-8 w-8" />,
                color: "secondary",
              },
              {
                title: "AGOGE ENDURANCE",
                description: "Forge unbreakable mental and physical endurance",
                icon: <Zap className="h-8 w-8" />,
                color: "primary",
              },
              {
                title: "SPARTAN NUTRITION",
                description: "Fuel your body like an ancient warrior king",
                icon: <Crown className="h-8 w-8" />,
                color: "secondary",
              },
            ].map((program, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 scroll-fade-in group hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-4 rounded-full bg-${program.color}/10 text-${program.color} mb-4 group-hover:animate-pulse-strong`}
                  >
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{program.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{program.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    LEARN MORE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Gallery */}
      <section className="py-20 bg-legendary-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">SPARTAN TRANSFORMATIONS</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Witness the power of Spartan discipline. These warriors transformed their bodies and minds through
              legendary training worthy of ancient Greece.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marcus 'The Spartan Shield' Johnson",
                transformation: "Lost 50lbs, Gained Warrior Strength",
                quote: "This place didn't just change my body, it forged my soul into Spartan steel.",
                image: "/muscular-man-transformation-before-after.jpg",
              },
              {
                name: "Sarah 'Warrior Queen' Chen",
                transformation: "Built 20lbs Muscle, Became Unstoppable",
                quote: "I walked in mortal, I walked out a Spartan goddess of war.",
                image: "/strong-woman-fitness-transformation.jpg",
              },
              {
                name: "David 'Spartan Beast' Rodriguez",
                transformation: "Complete Warrior Transformation",
                quote: "They didn't just train my body, they awakened the Spartan within.",
                image: "/athletic-man-muscle-transformation.jpg",
              },
            ].map((story, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden scroll-fade-in group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                    <p className="text-primary font-semibold">{story.transformation}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <blockquote className="text-muted-foreground italic leading-relaxed">"{story.quote}"</blockquote>
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">CHOOSE YOUR SPARTAN RANK</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every Spartan legend starts with choosing your rank. Select the membership that matches your commitment to
              Spartan excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "SPARTAN RECRUIT",
                price: "$49",
                period: "/month",
                features: [
                  "Access to all training grounds",
                  "Basic Spartan programs",
                  "Warrior locker access",
                  "Brotherhood support",
                ],
                popular: false,
              },
              {
                name: "SPARTAN HOPLITE",
                price: "$99",
                period: "/month",
                features: [
                  "Everything in Recruit",
                  "Personal Spartan training",
                  "Warrior nutrition coaching",
                  "Priority battle scheduling",
                  "Exclusive Spartan events",
                ],
                popular: true,
              },
              {
                name: "SPARTAN KING",
                price: "$199",
                period: "/month",
                features: [
                  "Everything in Hoplite",
                  "24/7 Spartan fortress access",
                  "Royal meal plans",
                  "Recovery therapy",
                  "King's treatment",
                ],
                popular: false,
              },
            ].map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden scroll-fade-in ${tier.popular ? "border-primary bg-primary/5 scale-105" : "border-border bg-card"} hover:scale-110 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 font-bold">
                    MOST POPULAR
                  </div>
                )}
                <CardContent className={`p-8 text-center ${tier.popular ? "pt-12" : ""}`}>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-primary">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center text-muted-foreground">
                        <Award className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${tier.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground animate-glow" : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"}`}
                    size="lg"
                  >
                    BECOME A {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="parallax-bg absolute inset-0 bg-[url('/gym-equipment-dark-atmosphere-motivational.jpg')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 scroll-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient animate-pulse-strong">
            YOUR SPARTAN LEGEND AWAITS
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
            The gates of Sparta are open. Stop making excuses. The only thing standing between you and Spartan glory is
            your first step into battle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-bold animate-glow"
            >
              CLAIM YOUR SPARTAN TRIAL
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-12 py-6 text-xl bg-transparent"
            >
              <Users className="mr-2 h-6 w-6" />
              JOIN THE 300
            </Button>
          </div>
        </div>

        <div className="absolute top-10 left-10 animate-float">
          <Shield className="h-16 w-16 text-primary/20" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: "2s" }}>
          <Crown className="h-20 w-20 text-secondary/20" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gradient mb-4">SPENCER SPARTAN FITNESS</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Where Spartan legends are forged, warriors are born, and mortals become gods of war.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">CONTACT</h4>
              <p className="text-muted-foreground">300 Spartan Avenue</p>
              <p className="text-muted-foreground">Sparta City, SC 30000</p>
              <p className="text-muted-foreground">(555) SPARTAN-1</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">TRAINING HOURS</h4>
              <p className="text-muted-foreground">Mon-Fri: 5AM - 11PM</p>
              <p className="text-muted-foreground">Sat-Sun: 6AM - 10PM</p>
              <p className="text-primary font-semibold">24/7 for Spartan Kings</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">FOLLOW THE SPARTANS</h4>
              <div className="flex justify-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  Instagram
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  YouTube
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  TikTok
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground">
              © 2024 Spencer Spartan Fitness. All rights reserved. Forge your Spartan legend.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
