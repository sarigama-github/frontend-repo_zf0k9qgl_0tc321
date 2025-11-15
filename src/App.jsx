import React, { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Star } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { products, loading, error };
}

function Navbar({ cartCount, onOpenMenu }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-white/50 border-b border-white/30">
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <button onClick={onOpenMenu} className="md:hidden p-2 rounded-lg hover:bg-white/60 transition">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 font-semibold tracking-tight text-gray-800">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-indigo-500" />
          FRAGRANCE.
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <a className="hover:text-gray-900 transition" href="#collections">Collections</a>
          <a className="hover:text-gray-900 transition" href="#bestsellers">Bestsellers</a>
          <a className="hover:text-gray-900 transition" href="#about">About</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/60 transition">
            <Search className="w-6 h-6" />
          </button>
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-white/60 transition">
              <ShoppingBag className="w-6 h-6" />
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-purple-600 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white pointer-events-none" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex items-center">
        <div className="max-w-2xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
            The Fragrance of Creativity
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 text-gray-700 md:text-lg">
            Minimalist aromas for modern minds. Discover clean, glassy compositions with iridescent nuance.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-8 flex gap-3">
            <a href="#bestsellers" className="px-5 py-3 rounded-lg bg-gray-900 text-white hover:bg-black transition">Shop bestsellers</a>
            <a href="#collections" className="px-5 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition">Explore collections</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ p, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className="group rounded-2xl bg-white/70 backdrop-blur border border-white/40 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">{p.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-xs text-gray-600">4.9</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-gray-900">${p.price.toFixed(2)}</span>
          <button className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:bg-black transition">Add to cart</button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductGrid() {
  const { products, loading, error } = useProducts();
  if (loading) return <div className="py-20 text-center text-gray-600">Loading products…</div>;
  if (error) return <div className="py-20 text-center text-red-600">{error}</div>;
  return (
    <div id="bestsellers" className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Bestsellers</h2>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">View all</a>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id || i} p={p} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-24 border-t border-gray-200/70">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 text-sm text-gray-600 flex flex-col md:flex-row gap-6 md:gap-0 items-center md:items-start justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 font-semibold tracking-tight text-gray-800">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-indigo-500" />
            FRAGRANCE.
          </div>
          <p className="mt-3">Minimal design. Modern aromas.</p>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="font-medium text-gray-900">Shop</p>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-gray-900" href="#">All products</a></li>
              <li><a className="hover:text-gray-900" href="#">New arrivals</a></li>
              <li><a className="hover:text-gray-900" href="#">Gifts</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-900">Company</p>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-gray-900" href="#">About</a></li>
              <li><a className="hover:text-gray-900" href="#">Careers</a></li>
              <li><a className="hover:text-gray-900" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-900">
      <Navbar cartCount={2} onOpenMenu={() => setMenuOpen(true)} />

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 left-0 bottom-0 w-72 z-50 bg-white/90 backdrop-blur border-r border-white/40 p-6 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold tracking-tight text-gray-800">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-indigo-500" />
                FRAGRANCE.
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="mt-8 space-y-2">
              <a href="#collections" className="block px-3 py-2 rounded hover:bg-gray-100">Collections</a>
              <a href="#bestsellers" className="block px-3 py-2 rounded hover:bg-gray-100">Bestsellers</a>
              <a href="#about" className="block px-3 py-2 rounded hover:bg-gray-100">About</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <Hero />
        <section className="mt-16">
          <ProductGrid />
        </section>
        <section id="about" className="mt-24 mx-auto max-w-5xl px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Design, distilled.</h3>
              <p className="mt-3 text-gray-600">We craft clean fragrances that feel like clarity. Minimal ingredients, maximum intention — bottled as glassy objects of focus.</p>
              <div className="mt-6 flex gap-4">
                <button className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition">Shop now</button>
                <button className="px-4 py-2 rounded-md border border-gray-300 hover:border-gray-400 transition">Learn more</button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/40 bg-white/60 backdrop-blur shadow-sm">
                <img alt="Perfume bottles" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
