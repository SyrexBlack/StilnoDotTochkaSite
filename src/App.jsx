import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Scissors, MapPin, Phone, Calendar, Star, Check, ChevronDown, ChevronUp, ArrowUpRight, Instagram, Send, Users, Award, ThumbsUp } from 'lucide-react';

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const bookingLink = "https://dikidi.net/1750327";
  const vkLink = "https://vk.ru/studiost59";
  const tgLink = "https://t.me/Edinorog_59";
  const phoneNumber = "+7 (909) 102-93-92";

  const services = [
    "Окрашивание волос",
    "Женская стрижка",
    "Уходовые процедуры для волос",
    "Кератиновое выпрямление",
    "Ботокс для волос",
    "Холодное восстановление",
    "Массаж тела",
  ];

  const reviews = [
    { name: "Григорий Ефимов", text: "Искал медь, а нашёл золото. Мастер Илья выполнил одну из лучших стрижек. Крайне доброжелательный, профессионал своего дела.", rating: 5 },
    { name: "Элиза Генералова", text: "Открыла для себя новое место на районе и была приятно удивлена качеством услуг, материалов. Рекомендую посетить данную студию)", rating: 5, date: "23 августа 2025" },
    { name: "Ольга Мышакова", text: "Благодарю за хороший массаж. Отличное настроение, легкость в теле 🤗 Спасибо Вам большое!!!", rating: 5 }
  ];

  const faqs = [
    { question: "Подойдёт ли мне процедура?", answer: "Мы всегда начинаем с диагностики волос. Если состояние волос не позволяет сделать горячую процедуру (кератин), мы предложим холодное восстановление." },
    { question: "Можно ли делать после окрашивания?", answer: "Да! Кератин и ботокс отлично запечатывают цвет. Рекомендуем делать процедуру через 10-14 дней после окрашивания." },
    { question: "Что если мне не понравится результат?", answer: "Мы даем гарантию на свою работу. Если в течение 2 недель результат не устроит — сделаем бесплатную коррекцию." }
  ];

  const PRIMARY = '#9c161d'; // Burgundy/Crimson

  return (
    <div className="font-['Inter'] text-[#1b0e0f] bg-white min-h-screen flex flex-col antialiased">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-[#e6d1d2] py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-4 group">
            <img src="/images/logo.png" alt="Logo" className="h-12 w-auto object-contain group-hover:opacity-80 transition-opacity" />
            <span className="font-['Playfair_Display'] text-2xl lg:text-3xl font-bold tracking-tight" style={{ color: PRIMARY }}>
              Стильно и точка
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            <a href="#about" className="text-xs uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">О нас</a>
            <a href="#services" className="text-xs uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Услуги</a>
            <a href="#portfolio" className="text-xs uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Работы</a>
            <a href="#reviews" className="text-xs uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Отзывы</a>
            <a href="#contacts" className="text-xs uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Контакты</a>
          </div>

          <div className="flex items-center gap-6">
            <a href={`tel:${phoneNumber}`} className="hidden xl:block text-sm font-medium hover:opacity-70 transition-opacity">{phoneNumber}</a>
            <a  
              href={bookingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center h-10 px-6 border text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:text-white"
              style={{ borderColor: PRIMARY, color: PRIMARY }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = PRIMARY; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = PRIMARY; }}
            >
              Записаться
            </a>
            <button onClick={toggleMenu} className="lg:hidden p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-[#e6d1d2] py-6 px-6 flex flex-col gap-4">
            <a href="#about" onClick={toggleMenu} className="text-sm uppercase tracking-widest py-2">О нас</a>
            <a href="#services" onClick={toggleMenu} className="text-sm uppercase tracking-widest py-2">Услуги</a>
            <a href="#portfolio" onClick={toggleMenu} className="text-sm uppercase tracking-widest py-2">Работы</a>
            <a href="#reviews" onClick={toggleMenu} className="text-sm uppercase tracking-widest py-2">Отзывы</a>
            <a href="#contacts" onClick={toggleMenu} className="text-sm uppercase tracking-widest py-2">Контакты</a>
            <a href={bookingLink} target="_blank" className="mt-4 py-3 text-center text-white text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: PRIMARY }}>Записаться</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="w-full max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-0">
          <div className="flex flex-col items-start lg:pr-12 order-2 lg:order-1 relative z-10">
            <span className="inline-block py-1 px-3 border text-xs uppercase tracking-[0.2em] mb-6 rounded-full" style={{ borderColor: `${PRIMARY}30`, color: PRIMARY, backgroundColor: `${PRIMARY}08` }}>
              Beauty Salon
            </span>
            <h1 className="font-['Playfair_Display'] text-5xl lg:text-7xl xl:text-8xl leading-[1.1] mb-8">
              Искусство <br/>
              <span className="italic" style={{ color: PRIMARY }}>быть собой</span>
            </h1>
            <p className="text-[#6b5e5f] text-lg font-light leading-relaxed max-w-md mb-10">
              Пространство безупречного стиля в Перми, где каждая деталь работает на вашу красоту. Высокая мода в повседневной жизни.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href={bookingLink} 
                target="_blank"
                className="h-12 px-8 text-white text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                Записаться онлайн
                <ArrowUpRight size={16} />
              </a>
              <a 
                href="#portfolio"
                className="h-12 px-8 border border-[#e6d1d2] text-sm uppercase tracking-widest hover:border-[#1b0e0f] transition-colors flex items-center justify-center"
              >
                Наши работы
              </a>
            </div>
          </div>
          <div className="relative h-[50vh] lg:h-[80vh] w-full order-1 lg:order-2 group overflow-hidden">
            <img 
              src="/images/hero.jpg" 
              alt="Стильно и точка - Салон красоты"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
        {/* Decorative lines */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-[#e6d1d2]"></div>
        <div className="absolute top-0 right-1/2 w-px h-full bg-[#e6d1d2] hidden lg:block -z-10"></div>
      </header>

      {/* About / Philosophy */}
      <section id="about" className="py-24 lg:py-32 relative">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-4xl mb-6" style={{ color: PRIMARY }}>spa</span>
          <h2 className="font-['Playfair_Display'] text-3xl lg:text-5xl mb-8">
            Мы создаем не просто образ, <br/>а настроение уверенности.
          </h2>
          <div className="w-24 h-px mx-auto mb-8" style={{ backgroundColor: PRIMARY }}></div>
          <p className="text-[#6b5e5f] text-lg font-light leading-relaxed max-w-2xl mx-auto">
            В "Стильно и точка" мы верим, что красота — это не шаблон, а индивидуальность. Наши мастера — художники, которые видят вашу уникальность и подчеркивают её с помощью современных техник и премиальной косметики.
          </p>
        </div>
      </section>

      {/* Stats Counters */}
      <section className="py-16 border-t border-[#e6d1d2]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users size={28} style={{ color: PRIMARY }} />
              </div>
              <div className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold mb-2" style={{ color: PRIMARY }}>
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-[#6b5e5f] text-sm font-light uppercase tracking-widest">Довольных клиентов</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award size={28} style={{ color: PRIMARY }} />
              </div>
              <div className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold mb-2" style={{ color: PRIMARY }}>
                <AnimatedCounter end={3} />
              </div>
              <p className="text-[#6b5e5f] text-sm font-light uppercase tracking-widest">Года работы</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star size={28} style={{ color: PRIMARY }} />
              </div>
              <div className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold mb-2" style={{ color: PRIMARY }}>
                5.0
              </div>
              <p className="text-[#6b5e5f] text-sm font-light uppercase tracking-widest">Рейтинг</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ThumbsUp size={28} style={{ color: PRIMARY }} />
              </div>
              <div className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold mb-2" style={{ color: PRIMARY }}>
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-[#6b5e5f] text-sm font-light uppercase tracking-widest">Положительных отзывов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white border-t border-[#e6d1d2]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PRIMARY }}>Что мы делаем</span>
              <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl">Наши услуги</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Services List */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-4">
                <Scissors className="text-2xl" style={{ color: PRIMARY }} />
                <h3 className="font-['Playfair_Display'] text-2xl italic">Направления</h3>
              </div>
              <div className="flex flex-col">
                {services.map((name, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-4 border-b border-[#e6d1d2] hover:bg-neutral-50 transition-colors px-2">
                    <Check size={18} style={{ color: PRIMARY }} className="flex-shrink-0" />
                    <span className="text-base">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Block */}
            <div className="flex flex-col gap-6">
              <div className="p-8 lg:p-10 border-2 border-dashed hover:border-solid transition-all" style={{ borderColor: `${PRIMARY}40`, backgroundColor: `${PRIMARY}05` }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-3xl" style={{ color: PRIMARY }}>loyalty</span>
                  <h3 className="font-['Playfair_Display'] text-2xl italic">Подписчикам — скидка</h3>
                </div>
                <div className="mb-6">
                  <span className="inline-block text-5xl lg:text-6xl font-['Playfair_Display'] font-bold mb-2" style={{ color: PRIMARY }}>−20%</span>
                  <p className="text-lg text-[#6b5e5f] font-light">на первый визит по промокоду</p>
                </div>
                <div className="inline-block px-6 py-3 mb-6 text-xl font-bold tracking-[0.15em] border-2" style={{ borderColor: PRIMARY, color: PRIMARY, backgroundColor: `${PRIMARY}08` }}>
                  СТИЛЬ
                </div>
                <div className="space-y-3 text-sm text-[#6b5e5f]">
                  <p className="flex items-start gap-2">
                    <Check size={16} style={{ color: PRIMARY }} className="mt-0.5 flex-shrink-0" />
                    Подпишитесь на нашу группу ВКонтакте
                  </p>
                  <p className="flex items-start gap-2">
                    <Check size={16} style={{ color: PRIMARY }} className="mt-0.5 flex-shrink-0" />
                    Напишите в сообщения сообщества промокод
                  </p>
                  <p className="flex items-start gap-2">
                    <Check size={16} style={{ color: PRIMARY }} className="mt-0.5 flex-shrink-0" />
                    Действует только для подписчиков группы
                  </p>
                </div>
                <a
                  href={vkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 h-12 px-8 text-white text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3 hover:opacity-90 w-full"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <span className="font-bold">VK</span>
                  Подписаться на группу
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Masonry */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl mb-4">Наши работы</h2>
            <p className="text-[#6b5e5f] font-light tracking-wide uppercase text-sm">Вдохновение в каждом кадре</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[400px]">
            <div className="relative group overflow-hidden lg:row-span-2">
              <img src="/images/work-1.jpg" alt="Работа 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
                <p className="font-['Playfair_Display'] text-xl">Укладка</p>
                <p className="text-xs uppercase tracking-widest mt-1">Прически</p>
              </div>
            </div>
            <div className="relative group overflow-hidden">
              <img src="/images/work-2.jpg" alt="Работа 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
                <p className="font-['Playfair_Display'] text-xl">Салонный уход</p>
                <p className="text-xs uppercase tracking-widest mt-1">Укладка и уход</p>
              </div>
            </div>
            <div className="relative group overflow-hidden lg:row-span-2">
              <img src="/images/work-3.jpg" alt="Работа 3" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
                <p className="font-['Playfair_Display'] text-xl">Профессиональная укладка</p>
                <p className="text-xs uppercase tracking-widest mt-1">Укладка</p>
              </div>
            </div>
            <div className="relative group overflow-hidden">
              <img src="/images/work-4.jpg" alt="Работа 4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
                <p className="font-['Playfair_Display'] text-xl">Вечерний образ</p>
                <p className="text-xs uppercase tracking-widest mt-1">Прически</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-neutral-50 border-t border-[#e6d1d2]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl mb-4">Видео</h2>
            <p className="text-[#6b5e5f] font-light tracking-wide uppercase text-sm">Процесс и результат</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              "IMG_4471.mp4", "IMG_4472.mp4", "IMG_4699.mp4", "IMG_4714.mp4",
              "IMG_4899.mp4", "IMG_4960.mp4", "IMG_4997.mp4", "IMG_5062.mp4"
            ].map((file, idx) => (
              <div key={idx} className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden group">
                <video
                  src={`/video/${file}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  onTouchStart={(e) => {
                    if (e.currentTarget.paused) e.currentTarget.play();
                    else { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-0 transition-opacity pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[18px] border-l-[#9c161d] border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent ml-1.5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-neutral-50 border-t border-[#e6d1d2]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PRIMARY }}>Отзывы</span>
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl">Что говорят гости</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-8 border border-[#e6d1d2] hover:border-[#9c161d]/30 transition-colors">
                <div className="flex gap-1 mb-6" style={{ color: PRIMARY }}>
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-[#6b5e5f] italic mb-8 leading-relaxed">"{review.text}"</p>
                <div>
                  <div className="font-medium">{review.name}</div>
                  {review.date && <span className="text-[#6b5e5f] text-xs">{review.date}</span>}
                </div>
              </div>
            ))}
          </div>
          {/* External Reviews */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <a href="https://yandex.ru/maps/org/stilno_i_tochka/190131005834/gallery/?ll=56.229498%2C57.976591&tab=gallery&z=17" target="_blank" className="px-6 py-3 border border-[#e6d1d2] text-xs uppercase tracking-widest hover:border-red-500 hover:text-red-600 transition-colors flex items-center gap-2">
              <div className="w-5 h-5 bg-red-500 text-white rounded-sm flex items-center justify-center font-serif text-xs font-bold">Я</div> Яндекс
            </a>
            <a href="https://2gis.ru/perm/firm/70000001095544403/tab/reviews?m=56.233594%2C57.978185%2F15.19" target="_blank" className="px-6 py-3 border border-[#e6d1d2] text-xs uppercase tracking-widest hover:border-green-500 hover:text-green-600 transition-colors flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div> 2ГИС
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-white text-center relative overflow-hidden" style={{ backgroundColor: PRIMARY }}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-[800px] mx-auto px-6">
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl mb-6">Готовы к преображению?</h2>
          <p className="text-white/80 text-lg mb-10 font-light">Запишитесь онлайн и откройте лучшую версию себя.</p>
          <a 
            href={bookingLink} 
            target="_blank"
            className="inline-block h-14 px-10 bg-white text-sm font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors shadow-lg leading-[3.5rem]"
            style={{ color: PRIMARY }}
          >
            Записаться сейчас
          </a>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl mb-3">Как нас найти</h2>
            <p className="text-[#6b5e5f] text-sm font-light">г. Пермь, ул. Уфимская, 16</p>
          </div>
          <div className="rounded-xl overflow-hidden border border-[#e6d1d2] shadow-sm">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A0&source=constructor&ll=56.229498%2C57.976591&z=16&pt=56.229498%2C57.976591%2Cpm2rdm"
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
              className="block w-full"
              title="Стильно и точка на карте"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-[#211112] text-white pt-20 pb-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="flex flex-col gap-6">
              <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight">Стильно и точка</span>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Салон красоты в самом сердце Перми. Мы заботимся о вашей красоте и здоровье каждый день.
              </p>
            </div>
            {/* Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: PRIMARY }}>Навигация</h4>
              <a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Услуги</a>
              <a href="#portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">Портфолио</a>
              <a href="#reviews" className="text-sm text-gray-400 hover:text-white transition-colors">Отзывы</a>
            </div>
            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: PRIMARY }}>Контакты</h4>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={18} className="mt-0.5" />
                <span>г. Пермь, ул. Уфимская, 16</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={18} />
                <a href={`tel:${phoneNumber}`} className="hover:text-white transition-colors">{phoneNumber}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Calendar size={18} />
                <span>По предварительной записи</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: PRIMARY }}>Мы в соцсетях</h4>
              <div className="flex gap-4">
                <a href={vkLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all text-white">
                  <span className="font-bold text-xs">VK</span>
                </a>
                <a href={tgLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all text-white">
                  <Send size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Стильно и точка. Все права защищены.</p>
            <a href="https://t.me/GregorysJourney" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#e0c068] transition-all rounded">Разработка сайта — @GregorysJourney</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp/Telegram Button */}
      <a 
        href={tgLink} 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#229ED9] rounded-full shadow-xl flex items-center justify-center z-50 hover:scale-110 transition-transform lg:hidden"
      >
        <Send className="text-white" size={24} />
      </a>

    </div>
  );
};

export default App;
