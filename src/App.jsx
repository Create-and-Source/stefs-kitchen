import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowRight, ArrowLeft, Minus, Plus, ChevronRight, Mic, Headphones, Play, Music, Camera, Tv } from 'lucide-react';
import { getProducts, getProduct, formatPrice } from './lib/shopify';
import './App.css';

/* ─── Cart Context ─── */
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, variant) => {
    const key = `${product.id}-${variant.id}`;
    setCart(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, {
        key,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price.amount,
        image: product.images[0]?.url,
        qty: 1,
      }];
    });
    setCartOpen(true);
  };

  const updateQty = (key, delta) => {
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + parseFloat(i.price) * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, cartOpen, setCartOpen, addToCart, updateQty, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() { return useContext(CartContext); }

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─── Ticker ─── */
function Ticker() {
  const items = [
    'EUGHHH!', 'Where The Hooks Get Cooked', 'Too Blessed 2 Be Stressed',
    'Jingle King', 'Jackson MS', 'Music On All Platforms', 'EUGHHH!', 'Stef\'s Kitchen',
  ];

  return (
    <div className="ticker">
      <div className="ticker-track">
        {[...Array(3)].map((_, rep) =>
          items.map((item, i) => (
            <span className="ticker-text" key={`${rep}-${i}`}>
              {item}
              <span className="ticker-dot" />
            </span>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Marquee ─── */
function Marquee({ children }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="marquee-item">{children}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── Header ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCartOpen, cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="header-logo">STEF'S KITCHEN</Link>
          <nav className="header-nav">
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/book">Book A Jingle</Link>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button className="header-cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
          <X size={28} />
        </button>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
        <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link to="/book" onClick={() => setMobileOpen(false)}>Book A Jingle</Link>
      </div>
    </>
  );
}

/* ─── Cart Drawer ─── */
function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, cartTotal } = useCart();

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <span className="cart-title">Cart ({cart.length})</span>
          <button onClick={() => setCartOpen(false)}><X size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={32} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.key} className="cart-item">
                  {item.image && <img className="cart-item-img" src={item.image} alt={item.title} />}
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.title}</div>
                    {item.variantTitle !== 'Default' && <div className="cart-item-variant">{item.variantTitle}</div>}
                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item.key, -1)}><Minus size={12} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, 1)}><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>{formatPrice(cartTotal.toFixed(2))}</span>
              </div>
              <button className="checkout-btn">Checkout <ArrowRight size={14} /></button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, index }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={() => navigate(`/product/${product.handle}`)}
    >
      <div className="product-card-img-wrap">
        <img className="product-card-img" src={product.images[0]?.url} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card-name">{product.title}</div>
      <div className="product-card-price">{formatPrice(product.priceRange.minVariantPrice.amount)}</div>
    </motion.div>
  );
}

/* ─── Product Carousel ─── */
function ProductCarousel({ products: items }) {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.carousel-slide');
    if (!card) return;
    const w = card.offsetWidth + 16;
    const next = Math.max(0, Math.min(current + dir, items.length - 1));
    track.scrollTo({ left: w * next, behavior: 'smooth' });
    setCurrent(next);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.carousel-slide');
    if (!card) return;
    const w = card.offsetWidth + 16;
    setCurrent(Math.round(track.scrollLeft / w));
  };

  return (
    <div className="carousel">
      <div className="carousel-viewfinder">
        <div className="vf-corner vf-tl" />
        <div className="vf-corner vf-tr" />
        <div className="vf-corner vf-bl" />
        <div className="vf-corner vf-br" />
        <div className="carousel-counter">
          <span className="carousel-counter-current">{String(current + 1).padStart(2, '0')}</span>
          <span className="carousel-counter-sep">/</span>
          <span className="carousel-counter-total">{String(items.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {items.map((p, i) => (
          <div
            key={p.id}
            className={`carousel-slide ${i === current ? 'active' : ''}`}
            onClick={() => navigate(`/product/${p.handle}`)}
          >
            <div className="carousel-slide-img">
              <img src={p.images[0]?.url} alt={p.title} />
            </div>
            <div className="carousel-slide-info">
              <div className="carousel-slide-name">{p.title}</div>
              <div className="carousel-slide-price">{formatPrice(p.priceRange.minVariantPrice.amount)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-nav">
        <button className="carousel-btn" onClick={() => scroll(-1)} disabled={current === 0}>
          <ArrowLeft size={18} />
        </button>
        <div className="carousel-dots">
          {items.map((_, i) => (
            <div key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} />
          ))}
        </div>
        <button className="carousel-btn" onClick={() => scroll(1)} disabled={current === items.length - 1}>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <span className="header-logo footer-logo-text">STEF'S KITCHEN</span>
          <p className="footer-desc">Where the hooks get cooked. Music, merch, and vibes from $tef the Chef.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/shop">Hoodies</Link>
          <Link to="/shop">Tees</Link>
        </div>
        <div className="footer-col">
          <h4>Info</h4>
          <Link to="/about">About</Link>
          <Link to="/book">Book A Jingle</Link>
        </div>
        <div className="footer-col">
          <h4>Follow</h4>
          <a href="https://www.tiktok.com/@stefisthechef" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://soundcloud.com/stefan-todd-628273407" target="_blank" rel="noopener noreferrer">SoundCloud</a>
          <a href="https://www.instagram.com/stefan.toddbusiness/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@stefan.toddbusiness" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Stef's Kitchen. All rights reserved.</span>
        <span style={{ color: 'var(--purple)' }}>EUGHHH! &rarr;</span>
      </div>
    </footer>
  );
}

/* ═══ PAGES ═══ */

function HomePage({ products }) {
  const featured = products.filter(p => p.tags?.includes('featured'));

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-media">
          <video src="/images/street-video.mp4" autoPlay muted loop playsInline />
          <div className="hero-gradient" />
        </div>
        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="hero-title">STEF'S<br/>KITCHEN</h1>
          <div className="hero-tagline">Where The Hooks Get Cooked</div>
          <Link to="/shop" className="hero-cta">
            Shop Now <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* MARQUEE */}
      <Marquee>
        <span className="filled">EUGHHH!</span> <span>&rarr;</span> <span className="purple">STEF'S KITCHEN</span> <span>&rarr;</span> <span>JINGLE KING</span> <span>&rarr;</span>
      </Marquee>

      {/* INTRO */}
      <motion.section
        className="intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="intro-label">The Artist</div>
        <h2 className="intro-headline">More than music. A movement. A vibe.</h2>
        <p className="intro-body">
          From Jackson, MS to your timeline — $tef the Chef is a rapper, producer, and viral jingle king.
          "Too Blessed 2 Be Stressed" isn't just words, it's the whole lifestyle. This merch is how you rep the kitchen.
        </p>
      </motion.section>

      {/* SPREAD — The Merch */}
      <section className="spread">
        <div className="spread-img">
          <video src="/images/hero-video.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <motion.div
          className="spread-text"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="spread-label">New Drop</div>
          <h2 className="spread-title">The Kitchen's Cookin'</h2>
          <p className="spread-body">
            Neon graphics, premium weight, built for the streets and the studio. Every piece carries that $tef energy — loud, blessed, and always cooking.
          </p>
          <Link to="/shop" className="spread-link">
            Shop The Drop <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* PULLQUOTE */}
      <motion.section
        className="pullquote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="pullquote-text">
          "Too Blessed 2 Be Stressed. The kitchen never closes — we're <em>always</em> cooking something up."
        </p>
      </motion.section>

      {/* PRODUCTS — Carousel */}
      <section className="products-section">
        <div className="products-header">
          <h2 className="products-title">The Collection</h2>
          <Link to="/shop" className="products-link">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <ProductCarousel products={featured.length > 0 ? featured : products} />
      </section>

      {/* MUSIC SECTION */}
      <section className="music-section">
        <div className="music-inner">
          <div className="music-header">
            <div className="spread-label">Listen</div>
            <h2 className="spread-title">Hear What's Cookin'</h2>
            <p className="spread-body" style={{ marginBottom: 32 }}>
              Stream $tef the Chef on all platforms. From "Stargazer" to viral jingles — the kitchen never closes.
            </p>
          </div>
          <div className="music-embed">
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/stefan-todd-628273407/know-nobody-ft-suede&color=%239B5DE5&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
              title="SoundCloud Player"
            />
          </div>
          <div className="music-platforms">
            <a href="https://soundcloud.com/stefan-todd-628273407" target="_blank" rel="noopener noreferrer" className="music-platform-link">
              <Headphones size={18} /> SoundCloud
            </a>
            <a href="https://www.youtube.com/@stefan.toddbusiness" target="_blank" rel="noopener noreferrer" className="music-platform-link">
              <Tv size={18} /> YouTube
            </a>
            <a href="https://www.tiktok.com/@stefisthechef" target="_blank" rel="noopener noreferrer" className="music-platform-link">
              <Music size={18} /> TikTok
            </a>
          </div>
        </div>
      </section>

      {/* SIDE-BY-SIDE — EUGHHH + Community */}
      <section className="editorial-pair">
        <motion.div
          className="editorial-pair-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/product/eughhh-speaker-tee" className="editorial-pair-link">
            <img src="/images/eughhh-speaker-tee-studio.png" alt="EUGHHH! Speaker Tee" loading="lazy" />
            <div className="editorial-pair-caption">
              <div className="spread-label">The Catchphrase</div>
              <h3>EUGHHH!</h3>
              <p>The sound that opens every video and lives rent-free in your head. The uniform for anyone who's locked in.</p>
            </div>
          </Link>
        </motion.div>
        <motion.div
          className="editorial-pair-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link to="/product/sip-community-tee" className="editorial-pair-link">
            <img src="/images/sip-community-tee-back.png" alt="Sip On Community Tee - Back" loading="lazy" />
            <div className="editorial-pair-caption">
              <div className="spread-label">The Message</div>
              <h3>Sip On Community, Baby</h3>
              <p>Good coffee, good people, good energy. Let's get up and go — do what you told.</p>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* FULL-WIDTH — Crew */}
      <section className="editorial-banner">
        <img src="/images/crew-studio-mixing.png" alt="The crew at the mixing board wearing Stef's Kitchen" loading="lazy" />
        <motion.div
          className="editorial-banner-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>The Kitchen Is A Family</h2>
          <p>Every piece was made to be worn by the people who show up — to the studio, to the stage, to each other. This isn't merch. It's a uniform.</p>
        </motion.div>
      </section>

      {/* MARQUEE 2 */}
      <Marquee>
        <span className="purple">EUGHHH!</span> <span>&rarr;</span> <span className="filled">KEEP COOKIN'</span> <span>&rarr;</span> <span>$TEF THE CHEF</span> <span>&rarr;</span>
      </Marquee>

      {/* SPREAD — Smooth Ride */}
      <section className="spread spread-reverse">
        <motion.div
          className="spread-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="spread-label">The Hoodie</div>
          <h2 className="spread-title">Smooth Ride, All The Time</h2>
          <p className="spread-body">
            "Who is that? Make the whole block shake." Front, back, and down both sleeves — this hoodie talks before you do. Heavyweight tan pullover built for late nights and long drives.
          </p>
          <Link to="/product/smooth-ride-hoodie" className="spread-link">
            Shop Smooth Ride <ArrowRight size={14} />
          </Link>
        </motion.div>
        <div className="spread-img">
          <img src="/images/smooth-ride-hoodie-frontback.png" alt="Smooth Ride Hoodie Front & Back" loading="lazy" />
        </div>
      </section>

      {/* FULL-WIDTH — Crocs + Portrait */}
      <section className="editorial-duo">
        <motion.div
          className="editorial-duo-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="/images/my-crocs-tee-bar.png" alt="My Crocs Tee" loading="lazy" />
          <div className="editorial-duo-caption">
            <h3>Comfy Is A Lifestyle</h3>
            <p>"I cannot leave the crib without my Crocs." If you know, you know.</p>
          </div>
        </motion.div>
        <motion.div
          className="editorial-duo-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <img src="/images/chef-stef-portrait-tee-night.png" alt="Chef Stef Portrait Tee" loading="lazy" />
          <div className="editorial-duo-caption">
            <h3>Late Nights, Good Vibes</h3>
            <p>The Chef Stef portrait tee. Neon glow, starry energy. Made for the night shift.</p>
          </div>
        </motion.div>
      </section>

      {/* PULLQUOTE 2 */}
      <motion.section
        className="pullquote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="pullquote-text">
          "Every piece has a story behind it. A session, a late night, a feeling. When you wear it, you carry that with you."
        </p>
      </motion.section>

      {/* SPREAD — The Jacket */}
      <section className="spread">
        <div className="spread-img">
          <img src="/images/kitchens-cookin-jacket-street.png" alt="Kitchen's Cookin' Jacket NYC" loading="lazy" />
        </div>
        <motion.div
          className="spread-text"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="spread-label">The Statement Piece</div>
          <h2 className="spread-title">NYC At 2AM</h2>
          <p className="spread-body">
            Wet pavement, yellow cabs, neon reflections. The Kitchen's Cookin' jacket was designed for moments like this — when you're walking through the city and the city is watching back.
          </p>
          <Link to="/product/the-kitchens-cookin-jacket" className="spread-link">
            Shop The Jacket <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* SPREAD — Jingle */}
      <section className="spread spread-reverse">
        <motion.div
          className="spread-text"
          style={{ background: 'var(--bg-raised)' }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="spread-label">Services</div>
          <h2 className="spread-title">Need A Jingle?</h2>
          <p className="spread-body">
            Custom hooks, brand anthems, and viral jingles cooked to order. Staples, and dozens of brands trust $tef to bring the heat.
          </p>
          <Link to="/book" className="spread-link">
            Book A Jingle <ArrowRight size={14} />
          </Link>
        </motion.div>
        <div className="spread-img">
          <img src="/images/IMG_0503.JPG" alt="Stef NYC" loading="lazy" />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="newsletter-label">Stay Locked In</div>
          <h3 className="newsletter-title">Join The Kitchen</h3>
          <p className="newsletter-sub">Early access to drops, exclusive merch, and updates from $tef.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </motion.div>
      </section>
    </>
  );
}

/* ─── Shop Page ─── */
function ShopPage({ products }) {
  return (
    <>
      <div className="shop-header">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="shop-title">Shop All</h1>
        </motion.div>
      </div>
      <div className="shop-grid">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </>
  );
}

/* ─── Product Page ─── */
function ProductPage({ products }) {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = products.find(p => p.handle === handle);
    if (found) {
      setProduct(found);
      setSelectedVariant(found.variants[0]);
      setLoading(false);
    } else {
      getProduct(handle).then(p => {
        setProduct(p);
        if (p) setSelectedVariant(p.variants[0]);
        setLoading(false);
      });
    }
  }, [handle, products]);

  if (loading) return <div className="pdp" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loader" /></div>;
  if (!product) return <div className="pdp" style={{ padding: '200px 40px', textAlign: 'center', color: 'var(--gray)' }}>Product not found</div>;

  return (
    <div className="pdp">
      <div className="pdp-layout">
        <div className="pdp-images">
          <img className="pdp-gallery-img" src={product.images[selectedImage]?.url} alt={product.title} />
          {product.images.length > 1 && (
            <div className="pdp-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`pdp-thumb ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img.url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          className="pdp-info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="pdp-breadcrumb">
            <Link to="/shop">Shop</Link> <ChevronRight size={10} style={{ margin: '0 6px' }} /> {product.title}
          </div>

          <h1 className="pdp-name">{product.title}</h1>
          <div className="pdp-price">{selectedVariant && formatPrice(selectedVariant.price.amount)}</div>
          <p className="pdp-desc">{product.description}</p>

          {product.variants.length > 1 && product.variants[0].title !== 'Default' && (
            <>
              <div className="pdp-label">Size</div>
              <div className="size-options">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    className={`size-btn ${selectedVariant?.id === v.id ? 'active' : ''}`}
                    onClick={() => v.availableForSale && setSelectedVariant(v)}
                    disabled={!v.availableForSale}
                    style={{ opacity: v.availableForSale ? 1 : 0.3 }}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            className="add-btn"
            onClick={() => selectedVariant && addToCart(product, selectedVariant)}
            style={{ opacity: selectedVariant?.availableForSale ? 1 : 0.5 }}
          >
            {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'} <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── About Page ─── */
function AboutPage() {
  return (
    <>
      <div className="shop-header" style={{ paddingBottom: 0 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 16 }}>The Story</div>
          <h1 className="shop-title">$tef The Chef</h1>
        </motion.div>
      </div>

      <motion.section
        className="intro"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ paddingTop: 60 }}
      >
        <p className="intro-body">
          Stefan Todd — aka $tef the Chef — is a rapper, music mixer, and the internet's favorite jingle king.
          From Jackson, Mississippi, to mixing hits at Studio Plug Memphis, to going viral with custom brand jingles
          that rack up millions of views.
        </p>
        <p className="intro-body" style={{ marginTop: 24 }}>
          When $tef started cooking up custom jingles for brands, the internet took notice. His TikTok blew up on
          April 17, 2026, and he hasn't slowed down since. Jingles for Staples, and a growing list of brands who
          want that EUGHHH! energy.
        </p>
        <p className="intro-body" style={{ marginTop: 24 }}>
          "Too Blessed 2 Be Stressed" — that's the motto. Whether he's in the booth, on stage, or walking
          through Times Square, $tef brings the same energy everywhere. Stef's Kitchen is where it all gets cooked up.
        </p>
      </motion.section>

      <div className="pullquote">
        <p className="pullquote-text">
          "Too Blessed 2 Be Stressed. The kitchen never closes — we're <em>always</em> cooking."
        </p>
      </div>

      <section className="spread">
        <div className="spread-img">
          <img src="/images/IMG_0503.JPG" alt="Stef NYC" loading="lazy" />
        </div>
        <div className="spread-text" style={{ alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 48, letterSpacing: 4, marginBottom: 12 }}>STEF'S KITCHEN</h2>
          <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.8 }}>Where The Hooks Get Cooked.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://soundcloud.com/stefan-todd-628273407" target="_blank" rel="noopener noreferrer" className="spread-link"><Headphones size={14} /> SoundCloud</a>
            <a href="https://www.tiktok.com/@stefisthechef" target="_blank" rel="noopener noreferrer" className="spread-link"><Music size={14} /> TikTok</a>
          </div>
        </div>
      </section>

      <div className="photo-grid">
        <div className="photo-grid-item">
          <img src="/images/IMG_0503.JPG" alt="NYC" loading="lazy" />
        </div>
        <div className="photo-grid-item tall">
          <img src="/images/chef-stef-portrait-tee-night.png" alt="Chef Stef Portrait Tee" loading="lazy" />
        </div>
        <div className="photo-grid-item">
          <img src="/images/IMG_0509.PNG" alt="Studio" loading="lazy" />
        </div>
        <div className="photo-grid-item">
          <img src="/images/still-cookin-hoodie-studio.png" alt="Still Cookin' Hoodie" loading="lazy" />
        </div>
        <div className="photo-grid-item tall">
          <img src="/images/kitchens-cookin-jacket-street.png" alt="Kitchen's Cookin' Jacket NYC" loading="lazy" />
        </div>
        <div className="photo-grid-item">
          <img src="/images/eughhh-speaker-tee-studio.png" alt="EUGHHH! Tee" loading="lazy" />
        </div>
        <div className="photo-grid-item">
          <img src="/images/sip-community-tee-cafe.png" alt="Sip On Community Tee" loading="lazy" />
        </div>
        <div className="photo-grid-item">
          <img src="/images/IMG_0521.PNG" alt="Empire studio" loading="lazy" />
        </div>
        <div className="photo-grid-item">
          <img src="/images/smooth-ride-hoodie-cars.png" alt="Smooth Ride Hoodie" loading="lazy" />
        </div>
        <div className="photo-grid-item">
          <img src="/images/my-crocs-tee-bar.png" alt="My Crocs Tee" loading="lazy" />
        </div>
      </div>
    </>
  );
}

/* ─── Book A Jingle Page ─── */
function BookPage() {
  const [form, setForm] = useState({ name: '', email: '', brand: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div className="shop-header">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 16 }}>Services</div>
          <h1 className="shop-title">Book A Jingle</h1>
          <p style={{ fontSize: 15, color: 'var(--gray)', marginTop: 12, maxWidth: 560 }}>
            Get a custom jingle, hook, or brand anthem cooked up by $tef the Chef.
          </p>
        </motion.div>
      </div>

      <div className="book-layout">
        <div className="book-features">
          <div className="book-feature">
            <Mic size={24} />
            <div>
              <h3>Custom Jingles</h3>
              <p>Original hooks and melodies written specifically for your brand.</p>
            </div>
          </div>
          <div className="book-feature">
            <Headphones size={24} />
            <div>
              <h3>Full Production</h3>
              <p>Studio-quality mixing and mastering. Ready to post.</p>
            </div>
          </div>
          <div className="book-feature">
            <Play size={24} />
            <div>
              <h3>Video Content</h3>
              <p>TikTok-ready video of $tef performing your jingle.</p>
            </div>
          </div>
          <div className="book-img">
            <img src="/images/IMG_0509.PNG" alt="Stef in the studio" />
          </div>
        </div>

        <div className="book-form-wrap">
          {submitted ? (
            <motion.div
              className="book-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>EUGHHH!</h3>
              <p>Request received. $tef will be in touch to start cooking your jingle.</p>
            </motion.div>
          ) : (
            <form className="book-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <h3>Get Started</h3>
              <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input type="text" placeholder="Brand / Business name" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required />
              <textarea placeholder="Tell us about your brand and what kind of jingle you're looking for..." rows={5} value={form.details} onChange={e => setForm({...form, details: e.target.value})} required />
              <button type="submit" className="add-btn">Submit Request <ArrowRight size={14} /></button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── App ─── */
export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route path="/shop" element={<ShopPage products={products} />} />
        <Route path="/product/:handle" element={<ProductPage products={products} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book" element={<BookPage />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
