import { useState, useMemo, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const IMG_SUPREME = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/e62d8eb0-e80b-495d-9a60-5fd0b6234d80.jpg';
const IMG_OFFWHITE = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/fe32b7e4-2c6e-49c8-ba66-d859e513ca13.jpg';
const IMG_PALMANGELS = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/33f5d6f1-4456-492f-bb2c-776ed33f5f1d.jpg';
const IMG_CARHARTT = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/6a791da5-2e8a-4cfa-bc31-83d81473064b.jpg';
const IMG_HERO = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/c57daadc-411a-4ef8-9648-5c53200caf4d.jpg';

type Product = {
  id: number;
  name: string;
  brand: string;
  seller: string;
  price: number;
  size: string;
  style: string;
  rating: number;
  reviews: number;
  img: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Box Logo Hoodie', brand: 'Supreme', seller: 'ThornDrop', price: 8900, size: 'M', style: 'Streetwear', rating: 4.9, reviews: 214, img: IMG_SUPREME },
  { id: 2, name: 'Diagonal Stripe Tee', brand: 'Off-White', seller: 'LuxCN', price: 6400, size: 'L', style: 'Streetwear', rating: 4.8, reviews: 97, img: IMG_OFFWHITE },
  { id: 3, name: 'Track Jacket', brand: 'Palm Angels', seller: 'TrendHouse', price: 11200, size: 'M', style: 'Спорт', rating: 4.7, reviews: 63, img: IMG_PALMANGELS },
  { id: 4, name: 'Canvas Work Jacket', brand: 'Carhartt WIP', seller: 'TrendHouse', price: 7800, size: 'XL', style: 'Базовый', rating: 4.9, reviews: 148, img: IMG_CARHARTT },
  { id: 5, name: 'Script Logo Tee', brand: 'Supreme', seller: 'ThornDrop', price: 4200, size: 'S', style: 'Streetwear', rating: 4.6, reviews: 88, img: IMG_SUPREME },
  { id: 6, name: 'Arrow Logo Hoodie', brand: 'Off-White', seller: 'LuxCN', price: 9600, size: 'L', style: 'Спорт', rating: 5.0, reviews: 41, img: IMG_OFFWHITE },
];

const SIZES = ['Все', 'S', 'M', 'L', 'XL'];
const STYLES = ['Все', 'Streetwear', 'Спорт', 'Базовый'];

const REVIEWS = [
  { name: 'Алина К.', seller: 'DripStore', rating: 5, text: 'Выкупили куртку быстрее, чем обещали. Качество огонь, упаковали бережно!' },
  { name: 'Максим Р.', seller: 'KicksCN', rating: 5, text: 'Кроссовки точь-в-точь как на фото. Продавец на связи 24/7, рекомендую.' },
  { name: 'Дарья В.', seller: 'WarmWave', rating: 4, text: 'Свитер мягкий и тёплый. Доставка из Китая заняла 12 дней — норм.' },
];

const Stars = ({ value, size = 14 }: { value: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Icon key={i} name="Star" size={size} className={i <= Math.round(value) ? 'text-secondary fill-secondary' : 'text-muted-foreground/30'} />
    ))}
  </div>
);

// Считаем время до следующего дропа (ближайшее воскресенье 20:00)
function getNextDrop() {
  const now = new Date();
  const next = new Date(now);
  const day = now.getDay();
  const daysUntilSun = (7 - day) % 7 || 7;
  next.setDate(now.getDate() + daysUntilSun);
  next.setHours(20, 0, 0, 0);
  return next;
}

const Index = () => {
  const [size, setSize] = useState('Все');
  const [style, setStyle] = useState('Все');
  const [maxPrice, setMaxPrice] = useState(12000);
  const [popup, setPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  // Попап через 2 секунды (один раз за сессию)
  useEffect(() => {
    if (sessionStorage.getItem('thorn_popup')) return;
    const t = setTimeout(() => { setPopup(true); sessionStorage.setItem('thorn_popup', '1'); }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Таймер обратного отсчёта
  useEffect(() => {
    const target = getNextDrop();
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => (size === 'Все' || p.size === size) && (style === 'Все' || p.style === style) && p.price <= maxPrice
      ),
    [size, style, maxPrice]
  );

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen bg-mesh text-foreground overflow-x-hidden">

      {/* ПОПАП при входе */}
      {popup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-float-up">
          <div className="bg-card rounded-3xl border border-border p-8 max-w-sm w-full relative shadow-2xl text-center">
            <button onClick={() => setPopup(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={20} />
            </button>
            <div className="text-5xl mb-4">🔥</div>
            <h3 className="font-display font-black text-2xl mb-2">-10% на первый заказ</h3>
            <p className="text-muted-foreground mb-6 text-sm">Напиши нам в Telegram и получи скидку на первую покупку прямо сейчас.</p>
            <a href="https://t.me/THORNSHOOP" target="_blank" rel="noreferrer">
              <Button className="w-full rounded-xl h-12 font-semibold text-base">
                <Icon name="Send" size={18} /> Написать в Telegram
              </Button>
            </a>
            <button onClick={() => setPopup(false)} className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
              Нет, спасибо
            </button>
          </div>
        </div>
      )}

      {/* ПЛАВАЮЩАЯ КНОПКА TELEGRAM */}
      <a
        href="https://t.me/THORNSHOOP"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-foreground text-background rounded-full shadow-2xl flex items-center gap-2 px-5 py-3 font-semibold text-sm hover:bg-secondary transition-colors hover-scale"
      >
        <Icon name="Send" size={18} /> Написать
      </a>

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('top')} className="font-display font-black text-2xl tracking-tight">
            THORN<span className="text-primary">.</span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollTo('catalog')} className="hover:text-primary transition-colors">Каталог</button>
            <button onClick={() => scrollTo('sell')} className="hover:text-primary transition-colors">Продавцам</button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-primary transition-colors">Отзывы</button>
            <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">О нас</button>
          </nav>
          <Button onClick={() => scrollTo('catalog')} className="rounded-full font-semibold">
            <Icon name="ShoppingBag" size={16} /> В каталог
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="container pt-16 pb-24 md:pt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-float-up">
            <Badge className="rounded-full bg-accent text-accent-foreground border-0 mb-6 px-4 py-1.5 font-semibold">
              🚀 Выкуп вещей с Китая под ключ
            </Badge>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">
              Твой <span className="text-gradient">стиль</span><br />из Поднебесной
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Заказывай трендовую одежду напрямую с китайских площадок. Мы выкупаем, проверяем и доставляем — без переплат и риска.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollTo('catalog')} size="lg" className="rounded-full font-semibold text-base h-12 px-7">
                Смотреть каталог <Icon name="ArrowRight" size={18} />
              </Button>
              <Button onClick={() => scrollTo('sell')} size="lg" variant="outline" className="rounded-full font-semibold text-base h-12 px-7 border-2">
                Стать продавцом
              </Button>
            </div>
            <div className="flex gap-8 mt-12">
              {[
                { n: '12 000+', l: 'выкупленных вещей' },
                { n: '4.8★', l: 'средний рейтинг' },
                { n: '350+', l: 'продавцов' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-extrabold text-2xl">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/10 to-foreground/5 blur-3xl rounded-full" />
            <img
              src={IMG_HERO}
              alt="Supreme, Off-White, Palm Angels, Carhartt WIP"
              className="relative rounded-3xl w-full object-cover aspect-[4/5] shadow-2xl"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {['Supreme', 'Off-White', 'Palm Angels', 'Carhartt WIP'].map((b) => (
                <span key={b} className="text-[10px] font-bold tracking-widest uppercase bg-background/90 backdrop-blur px-3 py-1 rounded-full border border-border shadow-sm">
                  {b}
                </span>
              ))}
            </div>
            <div className="absolute bottom-6 -left-4 bg-foreground text-background rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 whitespace-nowrap animate-float-up" style={{ animationDelay: '0.5s' }}>
              <Icon name="ShieldCheck" size={18} className="text-secondary" />
              <span className="text-sm font-semibold">Проверка качества перед отправкой</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden whitespace-nowrap -rotate-1 my-4">
        <div className="inline-flex animate-marquee">
          {[...Array(2)].map((_, k) => (
            <span key={k} className="font-display font-bold text-lg mx-6 flex gap-12">
              {['STREETWEAR', '✦', 'БЫСТРАЯ ДОСТАВКА', '✦', 'ОРИГИНАЛ', '✦', 'ВЫКУП ЗА 24Ч', '✦'].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* СЧЁТЧИК ДО ДРОПА */}
      <section className="container py-10">
        <div className="bg-foreground text-background rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-secondary mb-1">Следующий дроп</div>
            <div className="font-display font-black text-2xl md:text-3xl">Supreme × Off-White — эксклюзивная коллекция</div>
            <div className="text-sm opacity-60 mt-1">Воскресенье, 20:00 МСК</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {[{ v: pad(timeLeft.h), l: 'часов' }, { v: pad(timeLeft.m), l: 'минут' }, { v: pad(timeLeft.s), l: 'секунд' }].map((t, i) => (
              <div key={t.l} className="flex items-center gap-3">
                {i > 0 && <span className="font-display font-black text-3xl opacity-40">:</span>}
                <div className="text-center">
                  <div className="font-display font-black text-4xl md:text-5xl tabular-nums leading-none">{t.v}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-50 mt-1">{t.l}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="https://t.me/THORNSHOOP" target="_blank" rel="noreferrer">
            <Button variant="outline" className="rounded-xl border-background/30 text-background hover:bg-background hover:text-foreground font-semibold shrink-0">
              Уведомить меня <Icon name="Bell" size={16} />
            </Button>
          </a>
        </div>
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Как это работает</h2>
          <p className="text-muted-foreground mt-2">От выбора до двери — 4 простых шага</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: '01', icon: 'Search', title: 'Выбираешь', desc: 'Находишь товар в каталоге или скидываешь ссылку с китайского сайта' },
            { n: '02', icon: 'CreditCard', title: 'Оплачиваешь', desc: 'Оплачиваешь заказ на сайте — комиссия сервиса уже включена' },
            { n: '03', icon: 'PackageCheck', title: 'Выкупаем', desc: 'Мы выкупаем товар, проверяем качество и фотографируем перед отправкой' },
            { n: '04', icon: 'Truck', title: 'Доставляем', desc: 'Отправляем в Россию. Среднее время — 12–18 дней до вашей двери' },
          ].map((s, i) => (
            <div key={s.n} className="bg-card rounded-3xl border border-border p-6 animate-float-up hover-scale" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-foreground text-background flex items-center justify-center">
                  <Icon name={s.icon} size={20} />
                </div>
                <span className="font-display font-black text-4xl text-muted-foreground/20">{s.n}</span>
              </div>
              <h3 className="font-display font-black text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="container py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Каталог</h2>
            <p className="text-muted-foreground mt-2">Фильтруй по размеру, стилю и цене</p>
          </div>
          <span className="text-sm text-muted-foreground">Найдено: {filtered.length}</span>
        </div>

        {/* FILTERS */}
        <div className="bg-card rounded-3xl border border-border p-6 mb-10 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="text-sm font-semibold mb-3">Размер</div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${size === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold mb-3">Стиль</div>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button key={s} onClick={() => setStyle(s)} className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${style === s ? 'bg-secondary text-secondary-foreground border-secondary' : 'border-border hover:border-secondary'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold mb-3">Цена до: <span className="text-primary">{maxPrice} ₽</span></div>
            <input type="range" min={4000} max={12000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary mt-3" />
          </div>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.id} className="group bg-card rounded-3xl border border-border overflow-hidden hover-scale animate-float-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <Badge className="absolute top-3 left-3 rounded-full bg-background/90 text-foreground border-0 backdrop-blur">{p.style}</Badge>
                <Badge className="absolute top-3 right-3 rounded-full bg-accent text-accent-foreground border-0">{p.size}</Badge>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black tracking-widest uppercase text-foreground bg-muted px-2 py-0.5 rounded-full">{p.brand}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Icon name="Store" size={12} /> {p.seller}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-2">{p.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Stars value={p.rating} />
                  <span className="text-xs text-muted-foreground">{p.rating} · {p.reviews} отзывов</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-xl">{p.price.toLocaleString('ru')} ₽</span>
                  <Button size="sm" className="rounded-full font-semibold">В корзину</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="SearchX" size={40} className="mx-auto mb-3" />
            Ничего не найдено. Измени фильтры.
          </div>
        )}
      </section>



      {/* REVIEWS */}
      <section id="reviews" className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Оценки и отзывы</h2>
          <p className="text-muted-foreground mt-2">Реальные истории покупателей о продавцах</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-card rounded-3xl border border-border p-7 animate-float-up hover-scale" style={{ animationDelay: `${i * 0.08}s` }}>
              <Stars value={r.rating} size={18} />
              <p className="mt-4 mb-6 text-foreground/90">«{r.text}»</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Icon name="Store" size={12} /> {r.seller}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / SUPPORT */}
      <section id="about" className="container py-20">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-card rounded-3xl border border-border p-8 md:p-10">
            <Icon name="Sparkles" size={28} className="text-primary mb-4" />
            <h2 className="font-display font-black text-3xl tracking-tight mb-4">О компании</h2>
            <p className="text-muted-foreground leading-relaxed">
              THORN — маркетплейс выкупа одежды с китайских площадок. Мы соединяем покупателей с проверенными продавцами, берём на себя выкуп, контроль качества и доставку. Тысячи довольных клиентов получают модные вещи без переплат и рисков.
            </p>
          </div>
          <div className="bg-card rounded-3xl border border-border p-8 md:p-10">
            <Icon name="LifeBuoy" size={28} className="text-secondary mb-4" />
            <h2 className="font-display font-black text-3xl tracking-tight mb-4">Поддержка</h2>
            <p className="text-muted-foreground mb-6">Возникли вопросы? Мы на связи каждый день.</p>
            <div className="space-y-3">
              <a href="https://t.me/THORNSHOOP" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Send" size={18} /> @THORNSHOOP</a>
              <a href="https://t.me/TRORNSHOP1" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Send" size={18} /> @TRORNSHOP1</a>
              <a href="https://t.me/THORNSHOP2" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Send" size={18} /> @THORNSHOP2</a>
              <a href="tel:89373451240" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Phone" size={18} /> 8 937 345-12-40</a>
              <a href="tel:89279273937" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Phone" size={18} /> 8 927 927-39-37</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border mt-10">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-xl">THORN<span className="text-primary">.</span></div>
          <p className="text-sm text-muted-foreground">© 2026 THORN SHOP — выкуп одежды с Китая</p>
          <div className="flex gap-4">
            {['Instagram', 'Send', 'Youtube'].map((n) => (
              <a key={n} href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon name={n} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;