import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Menu, ChevronLeft, Music, ArrowRight, ExternalLink, Mic, Headphones, Play, Camera, Tv } from 'lucide-react';
import { getProducts, getProduct, formatPrice } from './lib/shopify';
import './App.css';

/* ─── Cart Context ─── */
const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product, variant, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.variantId === variant.id);
      if (existing) {
        return prev.map(i =>
          i.variantId === variant.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price.amount,
        image: product.images[0]?.url,
        quantity,
      }];
    });
    setIsOpen(true);
  };

  const removeItem = (variantId) => {
    setItems(prev => prev.filter(i => i.variantId !== variantId));
  };

  const updateQuantity = (variantId, quantity) => {
    if (quantity <= 0) return removeItem(variantId);
    setItems(prev => prev.map(i =>
      i.variantId === variantId ? { ...i, quantity } : i
    ));
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (parseFloat(i.price) * i.quantity), 0);

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() { return useContext(CartContext); }

/* ─── Scroll to top on route change ─── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─── Section Reveal ─── */
function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Header ─── */
function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
          <Menu size={22} />
        </button>

        <Link to="/" className="header-logo">
          <span className="logo-text">STEF'S KITCHEN</span>
        </Link>

        <nav className="header-nav desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/book">Book A Jingle</Link>
        </nav>

        <button className="cart-btn" onClick={() => setIsOpen(true)}>
          <ShoppingBag size={20} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
            <Link to="/shop" onClick={() => setMobileMenu(false)}>Shop</Link>
            <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
            <Link to="/book" onClick={() => setMobileMenu(false)}>Book A Jingle</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Cart Drawer ─── */
function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="cart-header">
              <h3>YOUR BAG</h3>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={48} strokeWidth={1} />
                <p>Your bag is empty</p>
                <button className="btn-primary" onClick={() => setIsOpen(false)}>Keep Shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map(item => (
                    <div key={item.variantId} className="cart-item">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="cart-item-img" />
                      )}
                      <div className="cart-item-info">
                        <h4>{item.title}</h4>
                        {item.variantTitle !== 'Default' && <span className="cart-item-variant">{item.variantTitle}</span>}
                        <span className="cart-item-price">{formatPrice(item.price)}</span>
                        <div className="cart-item-qty">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.variantId)}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice.toFixed(2))}</span>
                  </div>
                  <button className="btn-checkout">
                    CHECKOUT
                  </button>
                  <p className="cart-note">Shipping calculated at checkout</p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/product/${product.handle}`)}
    >
      <div className="product-card-img">
        <img src={product.images[0]?.url} alt={product.title} />
        <div className="product-card-overlay">
          <span>View Product</span>
        </div>
      </div>
      <div className="product-card-info">
        <h3>{product.title}</h3>
        <span className="product-card-price">{formatPrice(product.priceRange.minVariantPrice.amount)}</span>
      </div>
    </motion.div>
  );
}

/* ─── Ticker / Marquee ─── */
function Ticker() {
  const phrases = [
    'EUGHHH!',
    'WHERE THE HOOKS GET COOKED',
    'TOO BLESSED 2 BE STRESSED',
    'STEF\'S KITCHEN',
    '$TEF THE CHEF',
    'EUGHHH!',
    'JACKSON MS TO THE WORLD',
    'MUSIC ON ALL PLATFORMS',
    'EUGHHH!',
    'WHERE THE HOOKS GET COOKED',
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {[...phrases, ...phrases].map((phrase, i) => (
          <span key={i} className="ticker-item">
            {phrase}
            <span className="ticker-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="/images/IMG_0503.JPG" alt="Stef in NYC" className="hero-img" />
        <div className="hero-gradient" />
      </div>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">STEF'S<br />KITCHEN</h1>
          <p className="hero-subtitle">WHERE THE HOOKS GET COOKED</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary">SHOP NOW</Link>
            <Link to="/book" className="btn-outline">BOOK A JINGLE</Link>
          </div>
        </motion.div>
      </div>
      <div className="hero-scroll-hint">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="scroll-arrow"
        >
          <ChevronLeft size={20} style={{ transform: 'rotate(-90deg)' }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Featured Drop ─── */
function FeaturedDrop({ products }) {
  const featured = products.filter(p => p.tags?.includes('featured'));
  const display = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <section className="section featured-section">
      <Reveal>
        <div className="section-header">
          <span className="section-tag">NEW DROP</span>
          <h2 className="section-title">FRESH OUT THE KITCHEN</h2>
          <p className="section-desc">The latest heat from $tef. Limited runs, premium quality.</p>
        </div>
      </Reveal>
      <div className="featured-grid">
        {display.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.1}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
      <Reveal>
        <Link to="/shop" className="btn-text">
          View All Products <ArrowRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}

/* ─── Collection Cards ─── */
function CollectionCards() {
  const collections = [
    { title: 'APPAREL', desc: 'Hoodies, tees, and more', image: '/images/kitchens-cookin-jacket.png', link: '/shop' },
    { title: 'ACCESSORIES', desc: 'Stickers, prints, extras', image: '/images/IMG_0523.PNG', link: '/shop' },
    { title: 'MUSIC', desc: 'Stream on all platforms', image: '/images/too-blessed-tee-studio.png', link: '/about' },
  ];

  return (
    <section className="section collections-section">
      <div className="collections-grid">
        {collections.map((col, i) => (
          <Reveal key={col.title} delay={i * 0.1}>
            <Link to={col.link} className="collection-card">
              <img src={col.image} alt={col.title} />
              <div className="collection-card-overlay">
                <h3>{col.title}</h3>
                <p>{col.desc}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Story Section ─── */
function StorySection() {
  return (
    <section className="section story-section">
      <div className="story-grid">
        <Reveal className="story-images">
          <div className="story-img-stack">
            <img src="/images/IMG_0521.PNG" alt="Stef in the studio" className="story-img-1" />
            <img src="/images/IMG_0509.PNG" alt="Mixing desk" className="story-img-2" />
          </div>
        </Reveal>
        <Reveal className="story-content" delay={0.2}>
          <span className="section-tag">THE STORY</span>
          <h2 className="section-title">FROM JACKSON, MS<br />TO THE WORLD</h2>
          <p className="story-text">
            Stefan Todd — aka $tef the Chef — is a rapper, producer, and the internet's
            favorite jingle king. From mixing hits at Studio Plug Memphis to going viral
            with custom brand jingles that rack up millions of views.
          </p>
          <p className="story-text">
            "Too Blessed 2 Be Stressed" isn't just a tagline — it's the whole vibe.
            Stef's Kitchen is where the hooks get cooked, and this merch is how you
            rep the movement.
          </p>
          <Link to="/about" className="btn-text">
            Read More <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Music / SoundCloud Section ─── */
function MusicSection() {
  return (
    <section className="section music-section">
      <Reveal>
        <div className="section-header">
          <span className="section-tag">LISTEN</span>
          <h2 className="section-title">HEAR WHAT'S COOKIN'</h2>
          <p className="section-desc">
            Stream $tef the Chef on all platforms. From "Stargazer" to viral jingles —
            the kitchen never closes.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="music-embed">
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/stefan-todd-628273407&color=%239B5DE5&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            title="SoundCloud Player"
          />
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="music-platforms">
          <a href="https://soundcloud.com/stefan-todd-628273407" target="_blank" rel="noopener noreferrer" className="music-platform-link">
            <Headphones size={20} />
            <span>SoundCloud</span>
          </a>
          <a href="https://www.youtube.com/@stefan.toddbusiness" target="_blank" rel="noopener noreferrer" className="music-platform-link">
            <Tv size={20} />
            <span>YouTube</span>
          </a>
          <a href="https://www.tiktok.com/@stefisthechef" target="_blank" rel="noopener noreferrer" className="music-platform-link">
            <Music size={20} />
            <span>TikTok</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Viral Moment / Social Proof ─── */
function ViralSection() {
  return (
    <section className="section viral-section">
      <div className="viral-bg">
        <div className="viral-gradient" />
      </div>
      <Reveal>
        <div className="viral-content">
          <span className="section-tag">VIRAL</span>
          <h2 className="section-title">32.7K+ LIKES AND COUNTING</h2>
          <p className="section-desc">
            Custom jingles for the biggest brands. The hooks that live rent-free in your head?
            Yeah, those came from this kitchen.
          </p>
          <div className="viral-stats">
            <div className="viral-stat">
              <span className="stat-number">32.7K+</span>
              <span className="stat-label">TikTok Likes</span>
            </div>
            <div className="viral-stat">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="viral-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Brand Jingles</span>
            </div>
          </div>
          <div className="viral-images">
            <img src="/images/IMG_0524.PNG" alt="TikTok viral" className="viral-img" />
            <img src="/images/IMG_0527.PNG" alt="Staples jingle" className="viral-img" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Jingle Booking CTA ─── */
function JingleCTA() {
  return (
    <section className="section jingle-cta-section">
      <Reveal>
        <div className="jingle-cta-inner">
          <div className="jingle-cta-content">
            <Mic size={40} className="jingle-icon" />
            <h2 className="section-title">NEED A JINGLE?</h2>
            <p className="section-desc">
              Custom hooks, brand anthems, and viral jingles cooked to order.
              $tef has created jingles for Staples, and dozens of other brands.
              Your brand could be next.
            </p>
            <Link to="/book" className="btn-primary">BOOK A JINGLE <ArrowRight size={16} /></Link>
          </div>
          <div className="jingle-cta-img">
            <img src="/images/IMG_0517.PNG" alt="Stef NYC" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── All Products Grid ─── */
function AllProducts({ products }) {
  return (
    <section className="section products-section">
      <Reveal>
        <div className="section-header">
          <span className="section-tag">SHOP</span>
          <h2 className="section-title">ALL PRODUCTS</h2>
        </div>
      </Reveal>
      <div className="products-grid">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.08}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Email Signup ─── */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section newsletter-section">
      <Reveal>
        <div className="newsletter-inner">
          <h2 className="section-title">JOIN THE KITCHEN</h2>
          <p className="section-desc">
            Get early access to drops, exclusive merch, and updates from $tef.
          </p>
          {submitted ? (
            <motion.p
              className="newsletter-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              EUGHHH! You're in the kitchen now.
            </motion.p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">JOIN</button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-text footer-logo">STEF'S KITCHEN</span>
          <p>Where the hooks get cooked.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>SHOP</h4>
            <Link to="/shop">All Products</Link>
            <Link to="/shop">New Arrivals</Link>
          </div>
          <div className="footer-col">
            <h4>INFO</h4>
            <Link to="/about">About</Link>
            <Link to="/book">Book A Jingle</Link>
          </div>
          <div className="footer-col">
            <h4>FOLLOW</h4>
            <a href="https://www.tiktok.com/@stefisthechef" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://soundcloud.com/stefan-todd-628273407" target="_blank" rel="noopener noreferrer">SoundCloud</a>
            <a href="https://www.instagram.com/stefan.toddbusiness/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@stefan.toddbusiness" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
        <div className="footer-socials">
          <a href="https://www.tiktok.com/@stefisthechef" target="_blank" rel="noopener noreferrer"><Music size={18} /></a>
          <a href="https://soundcloud.com/stefan-todd-628273407" target="_blank" rel="noopener noreferrer"><Headphones size={18} /></a>
          <a href="https://www.instagram.com/stefan.toddbusiness/" target="_blank" rel="noopener noreferrer"><Camera size={18} /></a>
          <a href="https://www.youtube.com/@stefan.toddbusiness" target="_blank" rel="noopener noreferrer"><Tv size={18} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Stef's Kitchen. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Home Page ─── */
function HomePage({ products }) {
  return (
    <>
      <Hero />
      <Ticker />
      <FeaturedDrop products={products} />
      <CollectionCards />
      <StorySection />
      <MusicSection />
      <ViralSection />
      <JingleCTA />
      <AllProducts products={products} />
      <Newsletter />
    </>
  );
}

/* ─── Shop Page ─── */
function ShopPage({ products }) {
  return (
    <div className="page-content">
      <section className="section shop-hero">
        <h1 className="page-title">SHOP</h1>
        <p className="section-desc">Official merch from Stef's Kitchen. Limited runs, premium quality.</p>
      </section>
      <section className="section">
        <div className="products-grid">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── Product Detail Page ─── */
function ProductPage({ products }) {
  const { handle } = useParams();
  const { addItem } = useCart();
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

  if (loading) return <div className="page-content loading"><div className="loader" /></div>;
  if (!product) return <div className="page-content"><p>Product not found</p></div>;

  return (
    <div className="page-content">
      <div className="pdp">
        <Link to="/shop" className="pdp-back"><ChevronLeft size={16} /> Back to Shop</Link>
        <div className="pdp-grid">
          <div className="pdp-images">
            <div className="pdp-main-img">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]?.url}
                alt={product.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
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
          <div className="pdp-info">
            <h1 className="pdp-title">{product.title}</h1>
            <span className="pdp-price">
              {selectedVariant && formatPrice(selectedVariant.price.amount)}
            </span>
            <p className="pdp-desc">{product.description}</p>

            {product.variants.length > 1 && product.variants[0].title !== 'Default' && (
              <div className="pdp-variants">
                <label>SIZE</label>
                <div className="pdp-size-grid">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      className={`pdp-size ${selectedVariant?.id === v.id ? 'active' : ''} ${!v.availableForSale ? 'sold-out' : ''}`}
                      onClick={() => v.availableForSale && setSelectedVariant(v)}
                      disabled={!v.availableForSale}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className="btn-add-to-cart"
              onClick={() => selectedVariant && addItem(product, selectedVariant)}
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'ADD TO BAG' : 'SOLD OUT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── About Page ─── */
function AboutPage() {
  return (
    <div className="page-content">
      <section className="section about-hero">
        <h1 className="page-title">ABOUT</h1>
      </section>
      <section className="section about-section">
        <div className="about-grid">
          <Reveal className="about-images">
            <img src="/images/IMG_0517.PNG" alt="Stef in NYC" className="about-img-main" />
            <div className="about-img-row">
              <img src="/images/IMG_0509.PNG" alt="Studio" />
              <img src="/images/IMG_0521.PNG" alt="Empire studio" />
            </div>
          </Reveal>
          <Reveal className="about-content" delay={0.2}>
            <h2>STEFAN TODD</h2>
            <h3 className="about-aka">aka $tef the Chef</h3>
            <p>
              From Jackson, Mississippi — Stefan Todd is a rapper, music mixer, and the
              viral jingle king taking over the internet. What started in the studio mixing
              beats at Studio Plug Memphis turned into something much bigger.
            </p>
            <p>
              When $tef started cooking up custom jingles for brands, the internet took notice.
              His TikTok blew up on April 17, 2026, and he hasn't slowed down since. Jingles
              for Staples, and a growing list of brands who want that EUGHHH! energy.
            </p>
            <p>
              "Too Blessed 2 Be Stressed" — that's the motto. Whether he's in the booth,
              on stage, or walking through Times Square, $tef brings the same energy everywhere.
              Stef's Kitchen is where it all gets cooked up.
            </p>
            <div className="about-links">
              <a href="https://soundcloud.com/stefan-todd-628273407" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Headphones size={16} /> SoundCloud
              </a>
              <a href="https://www.tiktok.com/@stefisthechef" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Music size={16} /> TikTok
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section about-gallery">
        <Reveal>
          <h2 className="section-title">THE VISUALS</h2>
        </Reveal>
        <div className="gallery-grid">
          {['IMG_0503.JPG', 'IMG_0514.PNG', 'IMG_0511.PNG', 'IMG_0516.PNG', 'IMG_0518.PNG', 'IMG_0504.JPG'].map((img, i) => (
            <Reveal key={img} delay={i * 0.08}>
              <div className="gallery-item">
                <img src={`/images/${img}`} alt="Stef" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── Book A Jingle Page ─── */
function BookPage() {
  const [form, setForm] = useState({ name: '', email: '', brand: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-content">
      <section className="section book-hero">
        <h1 className="page-title">BOOK A JINGLE</h1>
        <p className="section-desc">
          Get a custom jingle, hook, or brand anthem cooked up by $tef the Chef.
          The same energy behind those viral TikToks — now for your brand.
        </p>
      </section>
      <section className="section book-section">
        <div className="book-grid">
          <Reveal className="book-info">
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
            </div>
            <div className="book-img">
              <img src="/images/IMG_0524.PNG" alt="Stef making jingle" />
            </div>
          </Reveal>
          <Reveal className="book-form-wrap" delay={0.2}>
            {submitted ? (
              <motion.div
                className="book-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3>EUGHHH! Request received.</h3>
                <p>$tef will be in touch to start cooking your jingle.</p>
              </motion.div>
            ) : (
              <form className="book-form" onSubmit={handleSubmit}>
                <h3>GET STARTED</h3>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Brand / Business name"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Tell us about your brand and what kind of jingle you're looking for..."
                  rows={5}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  required
                />
                <button type="submit" className="btn-primary">SUBMIT REQUEST</button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ─── App ─── */
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(p => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/shop" element={<ShopPage products={products} />} />
          <Route path="/product/:handle" element={<ProductPage products={products} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book" element={<BookPage />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
