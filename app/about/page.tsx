"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Leaf,
  Globe2,
  ShieldCheck,
  Handshake,
  Heart,
  Sprout,
  Play,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";
import aboutFarmer1 from "../../lib/public/images/abot_africa_3.jpg";
import aboutFarmer2 from "../../lib/public/images/about_africa_2.jpg";
import aboutFarmer3 from "../../lib/public/images/about_africa_4.jpg";
import Link from "next/link";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
// ── Animation helpers ─────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  icon: Icon,
  delay,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  delay: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#E8F0E8] bg-white px-6 py-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F7F0]">
          <Icon size={22} className="text-[#2E7D32]" />
        </div>
        <span className="text-4xl font-black tracking-tight text-[#2E7D32]">
          {value}
        </span>
        <span className="text-sm font-medium text-[#6B7280]">{label}</span>
      </div>
    </FadeUp>
  );
}

// ── Core value card ───────────────────────────────────────────────────────────
function ValueCard({
  icon: Icon,
  title,
  description,
  delay,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  accent: string;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Accent blob */}
        <div
          className={`absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-10 transition-all duration-300 group-hover:scale-125 group-hover:opacity-20 ${accent}`}
        />
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${accent} bg-opacity-10`}
        >
          <Icon size={22} className="text-[#2E7D32]" />
        </div>
        <h3 className="mb-2 text-[17px] font-bold text-[#1A1A1A]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
      </div>
    </FadeUp>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const coreValues = [
    {
      icon: Leaf,
      title: "Freshness First",
      description:
        "We source directly from African farms and trusted vendors to guarantee every product reaching your table is at its peak quality and nutritional value.",
      accent: "bg-green-400",
    },
    {
      icon: Globe2,
      title: "Cultural Pride",
      description:
        "We celebrate the richness of African culinary heritage — from jollof rice staples to exotic spices — connecting diaspora communities with the tastes of home.",
      accent: "bg-emerald-400",
    },
    {
      icon: ShieldCheck,
      title: "Trust & Safety",
      description:
        "Every vendor on our platform is verified. Every transaction is secured. We hold ourselves to the highest standards so you never have to worry.",
      accent: "bg-teal-400",
    },
    {
      icon: Handshake,
      title: "Empowering Vendors",
      description:
        "We don't just sell food — we build livelihoods. Our platform uplifts African entrepreneurs and small businesses with tools to thrive in a global market.",
      accent: "bg-lime-400",
    },
    {
      icon: Heart,
      title: "Community at Heart",
      description:
        "African Kitchen is more than a marketplace — it's a gathering place. We foster community, share stories, and bring people together through food.",
      accent: "bg-green-300",
    },
    {
      icon: Sprout,
      title: "Sustainable Growth",
      description:
        "We are committed to eco-conscious packaging, fair trade practices, and building a food economy that cares for the earth as much as it cares for people.",
      accent: "bg-emerald-300",
    },
  ];

  return (
    <main
      className="min-h-screen bg-[#F9FBF9]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');
      `}</style>
      <Header />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1A2E1A] px-4 py-24 text-white">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #4F912F 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, #2E7D32 0%, transparent 50%)`,
          }}
        />
        {/* Decorative ring */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full border border-[#4F912F]/20" />
        <div className="absolute bottom-0 -left-20 h-64 w-64 rounded-full border border-[#4F912F]/10" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-block rounded-full border border-[#4F912F]/40 bg-[#4F912F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#8BC34A] uppercase">
              Our Story
            </span>
            <h1
              className="mb-6 text-5xl leading-tight font-black md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Bringing Africa&apos;s{" "}
              <em className="text-[#8BC34A] not-italic">Finest Flavours</em>
              <br />
              to Your Table
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#A5C8A5]">
              Africa Market Place is the bridge between authentic African
              produce and the global community that craves it — fresh, trusted,
              and delivered with love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── YOUTUBE VIDEO ── */}
      <section className="relative z-10 -mt-8 px-4 pb-0">
        <FadeUp>
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/PwhyTsGW7_c?si=T6YyTTeBu0Af3UGp?rel=0&modestbranding=1"
                  title="African Kitchen — Our Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setVideoLoaded(true)}
                />
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── STATS ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              value="50K+"
              label="Happy Customers"
              icon={Users}
              delay={0}
            />
            <StatCard
              value="1,200+"
              label="Verified Vendors"
              icon={Award}
              delay={0.1}
            />
            <StatCard
              value="30+"
              label="African Countries"
              icon={Globe2}
              delay={0.2}
            />
            <StatCard
              value="98%"
              label="Satisfaction Rate"
              icon={TrendingUp}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <FadeUp>
              <div>
                <span className="mb-3 inline-block text-xs font-bold tracking-widest text-[#4F912F] uppercase">
                  Who We Are
                </span>
                <h2
                  className="mb-6 text-4xl leading-tight font-black text-[#1A1A1A] md:text-5xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  More Than a
                  <br />
                  <span className="text-[#2E7D32]">Marketplace</span>
                </h2>
                <div className="space-y-4 leading-relaxed text-[#4B5563]">
                  <p>
                    Africa Market Place was born from a simple truth: no matter
                    where you live in the world, the taste of home is
                    irreplaceable. Founded in Lagos and built for the global
                    African diaspora, we set out to make authentic African food
                    products accessible to everyone — from your nearest
                    neighbour to someone across the ocean.
                  </p>
                  <p>
                    We partner with thousands of carefully vetted farmers,
                    vendors, and producers across Africa to bring you the most
                    authentic selection of fresh produce, pantry staples,
                    spices, and specialty foods — delivered reliably to your
                    door.
                  </p>
                  <p>
                    But we are more than logistics and products. We are a
                    community — a digital home for African food culture,
                    stories, and connection. When you shop with us, you support
                    real families, real farms, and a real movement.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Visual card collage */}
            <FadeUp delay={0.2}>
              <div className="relative h-120">
                {/* Main card */}
                <div className="absolute top-0 left-0 h-72 w-64 overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={aboutFarmer1}
                      alt="about framer"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                {/* Accent card top-right */}
                <div className="absolute top-8 right-0 flex h-56 w-52 items-center justify-center overflow-hidden rounded-3xl bg-[#1A2E1A] shadow-xl">
                  <Image
                    src={aboutFarmer2}
                    alt="about framer"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Bottom card */}
                <div className="absolute bottom-0 left-16 flex h-52 w-60 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#C8E6C9] bg-[#F0F7F0] shadow-xl">
                  <Image
                    src={aboutFarmer3}
                    alt="about framer"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute right-4 bottom-20 rounded-2xl border border-[#E8F0E8] bg-white px-4 py-3 text-sm shadow-lg">
                  <span className="font-bold text-[#2E7D32]">Est. 2026</span>
                  <br />
                  <span className="text-xs text-[#9CA3AF]">Manchester, Uk</span>
                </div>
                {/* Dot pattern */}
                <div
                  className="absolute -right-4 -bottom-4 h-24 w-24 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #2E7D32 1.5px, transparent 1.5px)",
                    backgroundSize: "12px 12px",
                  }}
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl bg-[#1A2E1A] text-white">
            <div className="grid items-center gap-0 lg:grid-cols-2">
              {/* Left — decorative */}
              <div className="relative hidden h-full min-h-95 items-center justify-center overflow-hidden bg-[#2E7D32] lg:flex">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 70%, #8BC34A 0%, transparent 60%)`,
                  }}
                />
                <div className="relative z-10 px-10 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <Globe2 size={40} className="text-[#8BC34A]" />
                  </div>
                  <blockquote
                    className="text-2xl leading-snug font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Food is the universal language of Africa&apos;s soul
                  </blockquote>
                </div>
              </div>

              {/* Right — text */}
              <FadeUp className="p-10 lg:p-14">
                <span className="mb-3 inline-block text-xs font-bold tracking-widest text-[#8BC34A] uppercase">
                  Our Mission
                </span>
                <h2
                  className="mb-6 text-4xl leading-tight font-black md:text-5xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Feed the World,{" "}
                  <span className="text-[#8BC34A]">Honour the Root</span>
                </h2>
                <div className="space-y-4 leading-relaxed text-[#A5C8A5]">
                  <p>
                    Our mission is to democratise access to authentic African
                    food products — making it as easy to find egusi, ugu, or
                    kilishi in London or New York as it is in Abuja or Accra.
                  </p>
                  <p>
                    We do this by building Africa&apos;s most trusted food
                    marketplace: one that upholds quality, rewards honest
                    vendors, protects buyers, and celebrates the incredible
                    diversity of African cuisine with every single order.
                  </p>
                  <p>
                    Every package we ship carries a piece of Africa&apos;s
                    story. We take that responsibility seriously — and
                    personally.
                  </p>
                </div>

                {/* Mission pillars */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { emoji: "🌱", label: "Source Ethically" },
                    { emoji: "📦", label: "Deliver Reliably" },
                    { emoji: "🤝", label: "Grow Together" },
                  ].map((p) => (
                    <div
                      key={p.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                    >
                      <div className="mb-1 text-2xl">{p.emoji}</div>
                      <div className="text-xs font-semibold text-[#8BC34A]">
                        {p.label}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="mb-14 text-center">
            <span className="mb-3 inline-block text-xs font-bold tracking-widest text-[#4F912F] uppercase">
              What Drives Us
            </span>
            <h2
              className="text-4xl font-black text-[#1A1A1A] md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Core <span className="text-[#2E7D32]">Values</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#6B7280]">
              These aren&apos;t just words on a wall — they are the principles
              that guide every decision we make, every vendor we onboard, and
              every order we fulfil.
            </p>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((val, i) => (
              <ValueCard key={val.title} {...val} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-4 pt-4 pb-24">
        <FadeUp>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#2E7D32] px-8 py-14 text-center text-white shadow-xl">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, #8BC34A 0%, transparent 55%)`,
              }}
            />
            <div className="relative z-10">
              <h2
                className="mb-4 text-3xl font-black md:text-4xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Taste Africa?
              </h2>
              <p className="mb-8 text-[#C8E6C9]">
                Join over 50,000 customers who trust Africa Market Place for
                their authentic food needs.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/user/products"
                  className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#2E7D32] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  Shop Now
                </Link>
                <Link
                  href="/auth-vendor/register"
                  className="rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20"
                >
                  Become a Vendor
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
      <Footer />
    </main>
  );
}
