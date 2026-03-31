/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Shield, 
  Phone, 
  AlertTriangle, 
  Star, 
  Quote, 
  CheckCircle2, 
  Microscope, 
  Droplets, 
  ShieldCheck,
  Calendar,
  Zap,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, FormEvent } from 'react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 
      'fbclid', 'campaign_id', 'adset_id', 'ad_id'
    ].forEach(key => {
      const value = params.get(key);
      if (value) utms[key] = value;
    });
    setUtmParams(utms);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const payload = {
      ...data,
      ...utmParams,
      timestamp: new Date().toISOString(),
      source_url: window.location.href,
      form_id: e.currentTarget.id || 'general_contact'
    };

    // Send to CRM Webhook
    const webhookUrl = import.meta.env.VITE_CRM_WEBHOOK_URL || 'https://services.leadconnectorhq.com/hooks/VMV06EXKrBhxxAqzGrDI/webhook-trigger/8918d8e8-753e-4005-a928-d7060db351d0';
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Error sending to CRM:', error);
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-5xl w-full glass-card p-8 md:p-12 rounded-3xl border border-primary/20 space-y-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Next Steps: Your <span className="text-primary italic">Restoration</span> Protocol
            </h1>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Our tactical response team has received your request. Here is exactly what will happen next to secure your property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 group"
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1516387784550-596f25421ff7?auto=format&fit=crop&q=80&w=800" 
                  alt="Specialist Consultation" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-on-primary-container flex items-center justify-center font-black text-sm">01</div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-headline font-bold text-primary uppercase tracking-widest">Specialist Consultation</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  A restoration specialist will call you within 15 minutes to review your specific threat indicators and verify your location for immediate dispatch.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 group"
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                  alt="Digital Assessment" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-on-primary-container flex items-center justify-center font-black text-sm">02</div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-headline font-bold text-primary uppercase tracking-widest">Digital Threat Report</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  You'll receive a secure link via email containing your structural vulnerability assessment, decontamination quote, and tactical timeline.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 group"
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800" 
                  alt="Tactical Restoration" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-on-primary-container flex items-center justify-center font-black text-sm">03</div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-headline font-bold text-primary uppercase tracking-widest">Tactical Restoration</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Our certified bio-threat units arrive on-site to execute the Sentinel Protocol: full extraction, aerosol decontamination, and structural fortification.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-error-container/20 border border-error/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-error animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-error">Emergency Line Active</p>
                <p className="text-sm font-headline font-bold text-on-surface">Keep your line open for (800) 555-0199</p>
              </div>
            </div>
            <button 
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest hover:underline transition-all"
            >
              Return to Command Center <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary-container relative">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[-5%] w-[40%] h-[1px] bg-primary/10 rotate-12"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[1px] bg-primary/10 -rotate-12"></div>
        <div className="absolute top-[40%] right-[10%] w-[1px] h-[30%] bg-primary/10"></div>
        <div className="absolute top-[60%] left-[5%] w-[1px] h-[20%] bg-primary/10"></div>
        <div className="absolute top-0 left-0 p-4 opacity-20">
          <div className="text-[10px] font-mono tracking-tighter">LAT: 34.0522 N</div>
          <div className="text-[10px] font-mono tracking-tighter">LNG: 118.2437 W</div>
        </div>
        <div className="absolute bottom-0 right-0 p-4 opacity-20">
          <div className="text-[10px] font-mono tracking-tighter">SEC: TACTICAL-01</div>
          <div className="text-[10px] font-mono tracking-tighter">VER: 2.4.0</div>
        </div>
        {/* Crosshairs */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 border-t border-l border-primary/20"></div>
        <div className="absolute top-1/4 right-1/4 w-4 h-4 border-t border-r border-primary/20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-4 h-4 border-b border-l border-primary/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border-b border-r border-primary/20"></div>
        
        {/* Additional Decorative Lines */}
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary/5 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/5 -translate-y-1/2"></div>
      </div>

      {/* Top Urgency Strip */}
      <div className="bg-primary-container/10 border-b border-primary/20 py-2 overflow-hidden whitespace-nowrap z-50 relative">
        <div className="flex items-center justify-center gap-8 animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <p key={i} className="text-[10px] md:text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              Critical Warning: Limited inspection slots available this week
            </p>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-1.5 rounded-sm transform -skew-x-12 group-hover:skew-x-0 transition-all duration-300">
              <Zap className="text-on-primary-container w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-headline font-black tracking-tighter text-on-surface uppercase">
                ATTIC<span className="text-primary italic">CREW</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-12">
        {/* Hero Section */}
        <section className="relative min-h-[800px] flex items-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-primary/5 rounded-full"></div>
            <div className="absolute bottom-[10%] right-[15%] w-64 h-64 border border-primary/5 rounded-full"></div>
          </div>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiNCDAQ-gvKcgJZ_-hoYXRBnMS4lxEWBNiWWXs_v4LZcoqb9Z6QfmdSPBSfuC87RWnVKTenvH77OicJncx0UIpz-A_YWYucZ0xu-Shtbp9PfmMdJRmadQ6O71JeZnDAw-MMoeGbHTB4EHMcvVXoUkRH7PLgL-hi0vPVDItEHAZzHXBEV1md-MO1bmyqRQPlczjKn15fzkGnmfkyMm85vf1f88JuvD0UF3IZDxR90z4y7pt7zFJPjowji475txkealTi2_LYMiPb8wx" 
              alt="Dark attic" 
              className="w-full h-full object-cover opacity-40 brightness-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-1 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/20 border border-error/30 text-error text-[10px] font-bold uppercase tracking-widest">
                <AlertTriangle className="w-3 h-3" />
                Active Bio-Threat Detected
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter leading-[0.9] text-on-surface">
                Something Is Living In Your <span className="text-primary italic">Attic</span> Right Now.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
                Rodents multiply and contaminate the air you breathe. They chew through structural wiring and deposit toxic pathogens. Stop the damage before it's too late.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
                  ].map((url, i) => (
                    <img 
                      key={i}
                      src={url} 
                      alt="User" 
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">+12k</div>
                </div>
                <p className="text-xs text-on-surface-variant self-center font-medium">
                  <span className="text-on-surface font-bold">12,482</span> Homes Secured This Year
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card tactical-border px-4 py-8 md:p-8 rounded-xl shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="w-2 h-2 rounded-full bg-primary urgency-pulse"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold text-on-surface">Secure Your Inspection</h3>
                <p className="text-sm text-on-surface-variant">Instant dispatch available for high-risk zones.</p>
              </div>
              <form id="hero_inspection_form" className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Full name</label>
                  <input 
                    name="full_name"
                    className="w-full bg-surface-container-high border border-primary/30 rounded-lg focus:ring-1 focus:ring-primary outline-none text-on-surface placeholder:text-slate-500 h-12 px-4 transition-all" 
                    placeholder="Your Name" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Phone number</label>
                  <input 
                    name="phone"
                    className="w-full bg-surface-container-high border border-primary/30 rounded-lg focus:ring-1 focus:ring-primary outline-none text-on-surface placeholder:text-slate-500 h-12 px-4 transition-all" 
                    placeholder="Phone Number" 
                    type="tel"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Signs of Activity</label>
                  <select name="activity_signs" className="w-full bg-surface-container-high border border-primary/30 rounded-lg focus:ring-1 focus:ring-primary outline-none text-on-surface h-12 px-4 appearance-none">
                    <option value="scratching">Scratching Noises at Night</option>
                    <option value="odors">Foul Odors / Staining</option>
                    <option value="sightings">Visible Rodent Sightings</option>
                    <option value="electrical">Electrical Flickering</option>
                    <option value="preventative">Preventative Inspection</option>
                  </select>
                </div>
                <button className="w-full bg-primary py-4 rounded-lg font-headline font-black text-sm text-on-primary-container uppercase tracking-widest transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_10px_30px_rgba(88,244,219,0.3)] glow-primary">
                  get a free inspection
                </button>
                <p className="text-[10px] text-center text-slate-500 font-medium">By clicking, you agree to our Rapid Response Protocol and Terms.</p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Threat Grid */}
        <div className="tactical-line opacity-40"></div>
        <section id="threats" className="py-24 px-6 max-w-7xl mx-auto relative">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/5"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px] opacity-20"></div>
          </div>
          <div className="text-center mb-16 space-y-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface">Identify the Hazard</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Rodents aren't just a nuisance; they are biological and structural threats that escalate daily.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: '01',
                title: 'Electrical Arcing',
                desc: 'Rodents chew wire insulation to sharpen teeth, causing 25% of all unexplained residential fires.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASsWew5avKCsG_BjxOBzopT6zX9-b3sdx9s6zDiWorulFh-nPoFkp9L2eIbii8sh0-UxkxJP4-1iQndLfNTumwbIUuA9iDLCqObv96rF7iT0l9iwvKyHGC6gOOTSTnJV9SwVIJWJERx2G2CP9R0d1o4R4K5CyYemw0cp3LZ8rGY3Uke2SE2RsTxbEX-AXcFGa3l87YAK3pV3HM0fo-MNmiMhPSvJAh4F0ZGdM9U6gqHfsXSn5tX-x50K-pezFP3lnhuTsDNzwkpI1f'
              },
              {
                id: '02',
                title: 'Aerosolized Pathogens',
                desc: 'Waste particles enter your HVAC system, spreading Hantavirus and Leptospirosis through your home.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQhmX5pACH7RwVXdGPvtPDWRMgn96UqVn8f4s6CsKgg3smsPKkJYe7Al2GxGx7D_KMv9SHjJr0xX3HwO7kij6r_ymQAORLp4cbGl33rI8foKsMSu0rhepQLvWV8gs3qSC7f5bdn5OwRQaBPirKqaN5gmA8xO3Y5_biKusozj3d3nI9JvSTDF4VworytMHM57GfUhTDSCuQi6HtJ7gMLqMRo1R0ENtipQQWUy6E2MhISUWxMaBWvJ6phRf_JxI5AXSiHjTLRbPSdqa0'
              },
              {
                id: '03',
                title: 'Structural Decay',
                desc: 'Nesting in insulation destroys its R-value, skyrocketing energy bills and rotting wooden joists.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIL--JfrnwcUuLq7HrzjnvM9FHvW0Mqc9Vqfi9v6E39Er62EvSSAPtc2d_mBUnpmfkfFdJID4ixlDA7vgQnCubBIxzCQQ_euYM0SCUkrq71RGqet7bR9-HF3KW-BWyD_RYVEsm3o7hF1GVFYSH--9KLC3SQTtGUbnv2ooNUJliEVmtQTxDKNSQfBLODjeM3YWqrslDQbV33cMoHUnn8_yayLyKXP2g7MxWpiN8l8WCi4SR4xnVR5YI5xUsTGWErWAVT7Ae7VAd0oQN'
              }
            ].map((threat, idx) => (
              <motion.div 
                key={threat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all hover:translate-y-[-8px]"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={threat.img} 
                    alt={threat.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                </div>
                <div className="p-8 space-y-4">
                  <span className="text-primary font-bold text-4xl opacity-20 font-headline">{threat.id}</span>
                  <h4 className="text-xl font-headline font-extrabold text-on-surface">{threat.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{threat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <div className="tactical-line opacity-40"></div>
        <section id="process" className="bg-surface-container-low py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-1/4 w-px h-full bg-primary/5"></div>
            <div className="absolute top-0 right-1/4 w-px h-full bg-primary/5"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/5 rounded-full blur-[150px] opacity-10"></div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface">The Sentinel Protocol</h2>
                <p className="text-on-surface-variant max-w-xl mx-auto">A clinical approach to total eradication and fortification.</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 px-8 py-5 rounded-lg inline-block">
                <div className="flex items-center gap-4 text-left">
                  <div className="text-5xl font-headline font-black text-primary">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant leading-tight">
                    Extraction<br />Success Rate
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {[
                {
                  id: '01',
                  title: 'Inspection',
                  desc: 'Thermal imaging and pheromone tracking to locate every entry point.',
                  icon: Microscope
                },
                {
                  id: '02',
                  title: 'Removal',
                  desc: 'Humane extraction followed by clinical-grade enzyme decontamination.',
                  icon: Droplets
                },
                {
                  id: '03',
                  title: 'Fortification',
                  desc: 'Steel-mesh structural sealing and insulation restoration for life.',
                  icon: ShieldCheck
                }
              ].map((step, idx) => (
                <div key={step.id} className={`relative p-10 bg-surface text-center md:text-left border-surface-container-highest ${idx === 0 ? 'rounded-l-xl border-r' : idx === 1 ? 'border-r' : 'rounded-r-xl'}`}>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-headline font-bold text-on-surface mb-2">{step.id}. {step.title}</h5>
                  <p className="text-sm text-on-surface-variant">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <div className="tactical-line opacity-40"></div>
        <section id="results" className="py-24 px-6 max-w-7xl mx-auto relative">
          <div className="absolute top-1/4 right-0 w-32 h-32 border-t border-r border-primary/10 pointer-events-none"></div>
          <div className="absolute bottom-1/4 left-0 w-32 h-32 border-b border-l border-primary/10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px] opacity-20"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                <div className="flex items-center gap-1 text-primary">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-primary" />)}
                  <span className="ml-2 font-bold font-headline text-on-surface">4.9/5 Based on 2,400+ Inspections</span>
                </div>
                <div className="h-px w-12 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-4 opacity-60">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Verified On:</span>
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#af0606]">
                      <path d="M12.2 15.3l1.1 4.5c.1.4.5.6.9.4l3.5-1.9c.4-.2.5-.7.3-1.1l-2.3-4c-.2-.4-.7-.5-1.1-.3l-2.4 2.4zm-1.4-2.1l-4.5 1.1c-.4.1-.6.5-.4.9l1.9 3.5c.2.4.7.5 1.1.3l4-2.3c.4-.2.5-.7.3-1.1l-2.4-2.4zm-.2-1.4l1.1-4.5c.1-.4-.1-.8-.5-.9L7.7 5.1c-.4-.1-.8.1-.9.5l-1.1 4.5c-.1.4.1.8.5.9l4.5 1.3c.4.1.8-.1.9-.5zm1.4.2l4.5-1.1c.4-.1.8.1.9.5l1.3 4.5c.1.4-.1.8-.5.9l-4.5 1.1c-.4.1-.8-.1-.9-.5l-.8-5.4zm-1.4-1.4L9.5 6.1c-.1-.4-.5-.6-.9-.4L5.1 7.6c-.4.2-.5.7-.3 1.1l2.3 4c.2.4.7.5 1.1.3l2.4-2.4z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface">Rapid Results.<br />Proven Security.</h2>
              <div className="space-y-6">
                {[
                  {
                    name: 'S. O. • Renton, WA',
                    initials: 'SO',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100',
                    source: 'Yelp',
                    platformColor: '#af0606',
                    stars: 5,
                    quote: "It's 8pm and the Attic Crew has finally wrapped up their day. They got started just about 8:30am. They worked hard, were professional, and did a great job. They cleaned up after themselves and were very respectful of our home."
                  },
                  {
                    name: 'A. B. • Seattle, WA',
                    initials: 'AB',
                    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100',
                    source: 'Google',
                    platformColor: '#4285F4',
                    stars: 5,
                    quote: "Excellent service from start to finish. The team was knowledgeable, efficient, and left our attic in perfect condition. They even helped with some insulation rebates we didn't know about. Five stars!"
                  },
                  {
                    name: 'K. L. • Bellevue, WA',
                    initials: 'KL',
                    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100',
                    source: 'Yelp',
                    platformColor: '#af0606',
                    stars: 5,
                    quote: "Attic Crew is the real deal. They identified entry points I never would have found and sealed them with steel mesh. The decontamination process was thorough and the smell is completely gone. Highly recommend their tactical approach."
                  }
                ].map((testimonial, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-6 bg-surface-container-high rounded-xl relative border-t-2 border-x border-b border-white/5 group hover:border-primary/30 transition-all"
                    style={{ borderTopColor: testimonial.platformColor }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full border border-white/10 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-0.5">
                            {[...Array(testimonial.stars)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-4 h-4 fill-current" 
                                style={{ color: testimonial.source === 'Yelp' ? '#af0606' : '#FBBC05' }} 
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Verified Review</span>
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border border-white/5">
                        {testimonial.source === 'Yelp' ? (
                          <div className="flex items-center gap-1.5">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#af0606]">
                              <path d="M12.2 15.3l1.1 4.5c.1.4.5.6.9.4l3.5-1.9c.4-.2.5-.7.3-1.1l-2.3-4c-.2-.4-.7-.5-1.1-.3l-2.4 2.4zm-1.4-2.1l-4.5 1.1c-.4.1-.6.5-.4.9l1.9 3.5c.2.4.7.5 1.1.3l4-2.3c.4-.2.5-.7.3-1.1l-2.4-2.4zm-.2-1.4l1.1-4.5c.1-.4-.1-.8-.5-.9L7.7 5.1c-.4-.1-.8.1-.9.5l-1.1 4.5c-.1.4.1.8.5.9l4.5 1.3c.4.1.8-.1.9-.5zm1.4.2l4.5-1.1c.4-.1.8.1.9.5l1.3 4.5c.1.4-.1.8-.5.9l-4.5 1.1c-.4.1-.8-.1-.9-.5l-.8-5.4zm-1.4-1.4L9.5 6.1c-.1-.4-.5-.6-.9-.4L5.1 7.6c-.4.2-.5.7-.3 1.1l2.3 4c.2.4.7.5 1.1.3l2.4-2.4z" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Yelp</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <svg viewBox="0 0 24 24" className="w-4 h-4">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Google</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-on-surface italic mb-6 leading-relaxed text-sm">"{testimonial.quote}"</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-on-surface uppercase tracking-widest">{testimonial.name}</span>
                          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Restoration Client</span>
                        </div>
                      </div>
                      <Quote className="text-primary/20 w-8 h-8 group-hover:text-primary/40 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-full border border-primary/10 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 border border-primary/20 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-8 border border-primary/20 rounded-full"
                />
                <div className="z-10 bg-primary text-on-primary-container p-12 rounded-full text-center shadow-[0_0_80px_rgba(88,244,219,0.2)] transform hover:scale-105 transition-transform cursor-default">
                  <ShieldCheck className="w-16 h-16 mb-4 mx-auto" />
                  <h6 className="text-4xl font-headline font-black leading-none mb-2">10-YEAR</h6>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4">Structural Seal</p>
                  <div className="h-px bg-on-primary-container/20 w-12 mx-auto mb-4"></div>
                  <p className="text-[10px] font-black uppercase">Guaranteed Immunity</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rebate Section */}
        <div className="tactical-line opacity-20"></div>
        <section id="booking" className="py-24 px-1 md:px-6 relative">
          <div className="max-w-7xl mx-auto glass-card tactical-border rounded-2xl px-2 py-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">Efficiency Rebate</div>
                <h2 className="text-4xl font-headline font-black text-on-surface">Home Built Before 2000?</h2>
                <p className="text-lg text-on-surface-variant">You may qualify for up to <span className="text-primary font-bold">75% off insulation rebates</span> when we upgrade your attic's thermal barrier after decontamination.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <CheckCircle2 className="text-primary w-4 h-4" />
                    Instant Utility Credit Eligibility
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <CheckCircle2 className="text-primary w-4 h-4" />
                    Lower Monthly Energy Consumption
                  </li>
                </ul>
              </div>
              <div className="bg-surface-container-highest tactical-border px-4 py-8 md:p-8 rounded-xl border border-white/5 text-center">
                <h4 className="text-2xl font-headline font-bold text-on-surface mb-6">Check Qualification</h4>
                <form id="rebate_qualification_form" className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Full Name</label>
                    <input name="full_name" className="w-full bg-surface-container-high border border-primary/30 rounded-lg h-12 px-4 text-on-surface focus:ring-1 focus:ring-primary outline-none placeholder:text-slate-500 transition-all" placeholder="Enter full name" type="text" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Phone Number</label>
                    <input name="phone" className="w-full bg-surface-container-high border border-primary/30 rounded-lg h-12 px-4 text-on-surface focus:ring-1 focus:ring-primary outline-none placeholder:text-slate-500 transition-all" placeholder="(555) 000-0000" type="tel" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">Email Address</label>
                    <input name="email" className="w-full bg-surface-container-high border border-primary/30 rounded-lg h-12 px-4 text-on-surface focus:ring-1 focus:ring-primary outline-none placeholder:text-slate-500 transition-all" placeholder="name@email.com" type="email" required />
                  </div>
                  <button className="bg-primary text-on-primary-container py-4 rounded-lg font-headline font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg mt-2 glow-primary">
                    Check My Rebate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 bg-background border-t border-white/5 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded-sm transform -skew-x-12">
            <Zap className="text-on-primary-container w-4 h-4 fill-current" />
          </div>
          <span className="text-xl font-headline font-black tracking-tighter text-on-surface uppercase">
            ATTIC<span className="text-primary italic">CREW</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs font-headline text-on-surface-variant uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-primary transition-colors">Service Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Guarantee</a>
          <a href="#" className="hover:text-primary transition-colors">Certifications</a>
        </div>
        <p className="text-[10px] text-on-surface-variant max-w-md leading-relaxed">
          © 2024 ATTIC CREW TACTICAL RESTORATION. CERTIFIED BIOHAZARD RESPONSE. LICENSE #BH-98210-A. PROTECTING HOMES FROM BIOLOGICAL THREATS WITH MILITARY PRECISION.
        </p>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-50 bg-gradient-to-t from-background to-transparent pointer-events-none">
        <button 
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-primary text-on-primary-container py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(88,244,219,0.4)] active:scale-[0.98] transition-all pointer-events-auto"
        >
          GET FREE INSPECTION
        </button>
      </div>
    </div>
  );
}
