import { motion } from 'framer-motion';
import { useState } from 'react';
import logo from '../assets/logo.png';
import heroEvents from '../assets/hero-events.jpg';

interface LandingPageProps {
  onStartGame: () => void;
}

export default function LandingPage({ onStartGame }: LandingPageProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-rose-50 text-slate-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroEvents}
            alt="Eventos Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-slate-50/90 to-rose-50/80"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-rose-400/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-6 leading-tight"
          >
            <span className="text-slate-800">ABRA CAMINHO PARA</span><br/>
            <span className="bg-gradient-to-r from-rose-500 to-pink-400 bg-clip-text text-transparent">
              EVENTOS ÚNICOS
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-lg md:text-2xl font-bold text-rose-500 mb-4 tracking-wider">
              ANTI-IMPROVISO • ANTI-AMADORISMO • PRO-RESULTADOS
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Nunca quisemos saber do "sempre foi assim". Vamos para fora da estrada tradicional se for preciso, 
              mesmo cortando caminho, e levamos você à frente para <span className="text-rose-500 font-semibold">
              criar eventos que realmente importam</span>.
            </p>
          </motion.div>

          {/* CTA Principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <motion.button
              onClick={onStartGame}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white px-12 py-5 rounded-xl font-black text-lg shadow-2xl border border-rose-400/50 overflow-hidden"
            >
              {/* Efeito de brilho animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <div>ACEITO O DESAFIO</div>
                  <div className="text-sm font-normal opacity-90">+ Descubra seu perfil de produtor</div>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-rose-500 text-2xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              <span className="text-rose-500">O QUE VOCÊ VAI</span><br/>
              <span className="text-slate-800">CONQUISTAR</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Porque o melhor caminho não é sempre o mais óbvio. Descubra ferramentas que 
              <span className="text-rose-500 font-semibold"> multiplicam seus resultados</span>.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏆",
                title: "SEU PERFIL ÚNICO",
                subtitle: "Badge Personalizada",
                description: "Descubra se você é um Estrategista, Nativo Digital, ou Tomador de Riscos. Cada perfil tem superpoderes únicos."
              },
              {
                icon: "📖",
                title: "EBOOK EXCLUSIVO",
                subtitle: "Guia Completo",
                description: "Tudo o que produtores profissionais fazem diferente. Estratégias que aumentam vendas em 300%."
              },
              {
                icon: "🚀",
                title: "COMUNIDADE VIP",
                subtitle: "Network Premium",
                description: "Acesso à comunidade de produtores que faturam 6 e 7 dígitos. Networking que vale ouro."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-slate-50 border border-rose-200/50 rounded-xl p-8 text-center group hover:border-rose-300/70 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-rose-500 font-semibold mb-4 text-sm">
                  {item.subtitle}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 to-emerald-950/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              <span className="text-white">COMO FUNCIONA</span><br/>
              <span className="text-emerald-400">O DESAFIO</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {[
                  { step: "01", title: "DECISÕES REAIS", desc: "10 situações que todo produtor enfrenta" },
                  { step: "02", title: "CONSEQUÊNCIAS", desc: "Veja o impacto de cada escolha no seu evento" },
                  { step: "03", title: "SEU PERFIL", desc: "Descubra seu superpoder como produtor" },
                  { step: "04", title: "RECOMPENSAS", desc: "Ebook + comunidade exclusiva na hora" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 items-start"
                  >
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 w-12 h-12 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-emerald-500/20 rounded-2xl p-8">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-4">APENAS 5 MINUTOS</h3>
                <p className="text-slate-300 mb-6">
                  Tempo suficiente para descobrir insights que podem 
                  <span className="text-emerald-400 font-semibold"> transformar seus eventos para sempre</span>.
                </p>
                <div className="text-3xl font-black text-emerald-400">
                  100% GRATUITO
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              <span className="text-white">PRONTO PARA</span><br/>
              <span className="text-emerald-400">SUA PRÓXIMA VIAGEM?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Se você se identifica com produtores que não seguem mapas tradicionais, 
              talvez este seja o desafio que você precisava.
            </p>
            
            <motion.button
              onClick={onStartGame}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 px-16 py-6 rounded-xl font-black text-xl shadow-2xl border border-emerald-400/50 overflow-hidden mb-8"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative">
                COMEÇAR AGORA
              </div>
            </motion.button>

            <p className="text-slate-400 text-sm">
              💡 Sem cadastro • Sem spam • Resultado na hora
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
