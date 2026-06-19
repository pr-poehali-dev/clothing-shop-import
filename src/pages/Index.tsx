import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const IMG1 = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/28d6ec36-1011-41c5-b2c2-61e8d2bf2e3c.jpg';
const IMG2 = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/ca9d950b-22f1-4e8b-9b2e-248dbbb04c2b.jpg';
const IMG3 = 'https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/47722d1a-1acd-44f6-935c-50d68e3b590f.jpg';

type Product = {
  id: number;
  name: string;
  seller: string;
  price: number;
  size: string;
  style: string;
  rating: number;
  reviews: number;
  img: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Оверсайз куртка Urban', seller: 'DripStore', price: 4200, size: 'M', style: 'Streetwear', rating: 4.9, reviews: 128, img: IMG1 },
  { id: 2, name: 'Кроссовки Air Flow', seller: 'KicksCN', price: 5600, size: 'L', style: 'Спорт', rating: 4.7, reviews: 86, img: IMG2 },
  { id: 3, name: 'Вязаный свитер Cozy', seller: 'WarmWave', price: 2800, size: 'S', style: 'Базовый', rating: 4.8, reviews: 64, img: IMG3 },
  { id: 4, name: 'Худи Neon Vibes', seller: 'DripStore', price: 3100, size: 'XL', style: 'Streetwear', rating: 4.6, reviews: 53, img: IMG2 },
  { id: 5, name: 'Свитер Minimal Beige', seller: 'WarmWave', price: 3400, size: 'M', style: 'Базовый', rating: 5.0, reviews: 41, img: IMG3 },
  { id: 6, name: 'Куртка Bold Statement', seller: 'KicksCN', price: 6900, size: 'L', style: 'Спорт', rating: 4.5, reviews: 97, img: IMG1 },
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

const Index = () => {
  const [size, setSize] = useState('Все');
  const [style, setStyle] = useState('Все');
  const [maxPrice, setMaxPrice] = useState(7000);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => (size === 'Все' || p.size === size) && (style === 'Все' || p.style === style) && p.price <= maxPrice
      ),
    [size, style, maxPrice]
  );

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-mesh text-foreground overflow-x-hidden">
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
              src="https://cdn.poehali.dev/projects/f37cc239-d18c-4bae-bb5f-b49536b6b966/files/87f50cb1-743e-4afb-b1c6-b1bbc083f7a8.jpg"
              alt="Stone Island, BAPE, AAPE, CP Company"
              className="relative rounded-3xl w-full object-cover aspect-[4/5] shadow-2xl"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {['Stone Island', 'BAPE', 'AAPE', 'CP Company'].map((b) => (
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
            <input type="range" min={2000} max={7000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary mt-3" />
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
                <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
                  <Icon name="Store" size={13} /> {p.seller}
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

      {/* SELLER PANEL */}
      <section id="sell" className="container py-20">
        <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="rounded-full bg-accent text-accent-foreground border-0 mb-5 font-semibold">Панель продавца</Badge>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-5">Добавь свой товар за минуту</h2>
            <p className="opacity-80 mb-6">Загрузи фото, укажи цену и размер — товар появится в каталоге. Покупатели оставляют отзывы и оценки, а ты растишь свой рейтинг продавца.</p>
            <ul className="space-y-3">
              {['Без комиссии на старте', 'Защита сделок и проверка', 'Рейтинг и отзывы покупателей'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Icon name="CircleCheck" size={20} className="text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card text-foreground rounded-3xl p-6 md:p-8">
            <h3 className="font-bold text-xl mb-5">Новый товар</h3>
            <div className="space-y-4">
              <Input placeholder="Название товара" className="rounded-xl h-12 border-2" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Цена, ₽" className="rounded-xl h-12 border-2" />
                <Input placeholder="Размер (S/M/L)" className="rounded-xl h-12 border-2" />
              </div>
              <Textarea placeholder="Описание и ссылка на товар в Китае" className="rounded-xl border-2 min-h-24" />
              <Button className="w-full rounded-xl h-12 font-semibold text-base">
                <Icon name="Plus" size={18} /> Опубликовать товар
              </Button>
            </div>
          </div>
        </div>
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
              <a href="#" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Mail" size={18} /> support@drip.shop</a>
              <a href="#" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Send" size={18} /> Telegram-чат поддержки</a>
              <a href="#" className="flex items-center gap-3 font-medium hover:text-primary transition-colors"><Icon name="Phone" size={18} /> 8 800 555-35-35</a>
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