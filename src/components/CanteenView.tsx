import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Clock,
  Search,
  Plus,
  ShoppingBag,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CanteenItem } from '../types';

export const CanteenView: React.FC = () => {
  const {
    canteenItems,
    toggleCanteenAvailability,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    userRole
  } = useApp();

  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderPlacedNotification, setOrderPlacedNotification] = useState<string | null>(null);

  const categories = ['All', 'Hot Meals & Bowls', 'Bakery & Sandwiches', 'Beverages & Coffee', 'Snacks & Desserts'];
  const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein', 'Halal'];

  const filteredItems = canteenItems
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .filter(item => selectedDietary === 'All' || item.dietary.includes(selectedDietary as any))
    .filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    setOrderPlacedNotification(`Tray Pre-Order #${orderNumber} placed successfully! Collect at University Hall Window B in 10-12 mins.`);
    clearCart();
    setTimeout(() => {
      setOrderPlacedNotification(null);
    }, 6000);
  };

  return (
    <div className="space-y-6">
      {/* Header in Classic Academic Ivy Styling */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1 font-display">
              <span className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded font-mono">
                Dining Commons
              </span>
              <span aria-hidden="true">·</span>
              <span>University Hall & Commons</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 dark:text-white mt-1 font-display">
              Dining Commons Menu & Kitchen Inventory
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Live menu offerings, culinary dietary markers, and express tray preorder for lunch breaks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-amber-900 dark:text-amber-300 font-mono bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-3 py-1 rounded font-semibold">
              Hours: 07:30 AM - 08:00 PM
            </span>
          </div>
        </div>

        {/* Filters and search */}
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3.5">
          {/* Category Tabs */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap font-display ${
                    selectedCategory === cat
                      ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dining menu..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-3.5 py-1.5 text-xs md:text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 w-56 md:w-64"
              />
            </div>
          </div>

          {/* Dietary Preferences Filter */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-medium pt-1">
            <span className="text-stone-500 text-[11px] uppercase tracking-wider font-bold mr-1">
              Dietary:
            </span>
            {dietaryOptions.map(diet => (
              <button
                key={diet}
                onClick={() => setSelectedDietary(diet)}
                className={`px-2.5 py-1 rounded-md border text-xs whitespace-nowrap transition-colors ${
                  selectedDietary === diet
                    ? 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950 dark:text-amber-200 font-bold'
                    : 'bg-white dark:bg-[#111A30] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Success Toast Notice */}
      {orderPlacedNotification && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between text-sm text-emerald-950 dark:text-emerald-200 shadow-xs font-display">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{orderPlacedNotification}</span>
          </div>
          <button
            onClick={() => setOrderPlacedNotification(null)}
            className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Two Column Grid: Menu Items (Left) + Tray Pre-Order (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Menu Items Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`bg-white dark:bg-[#111A30] border rounded-xl p-5 transition-all shadow-2xs flex flex-col justify-between border-l-4 ${
                  item.isAvailable
                    ? 'border-stone-200 dark:border-stone-800 hover:border-amber-500 border-l-emerald-800'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 opacity-75 border-l-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-600 dark:text-stone-300">
                      {item.category}
                    </span>

                    {/* Stock Switch */}
                    <button
                      onClick={() => toggleCanteenAvailability(item.id)}
                      className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 border ${
                        item.isAvailable
                          ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                          : 'bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                      }`}
                      title="Toggle availability"
                    >
                      <span className={`w-2 h-2 rounded-full ${item.isAvailable ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                      {item.isAvailable ? 'In Stock' : 'Sold Out'}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 dark:text-white mt-2 leading-snug font-display">
                    {item.name}
                  </h3>

                  <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Dietary Markers - Clean Unboxed Text with Separators */}
                  {item.dietary.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2.5 text-xs text-amber-900 dark:text-amber-400 font-medium">
                      {item.dietary.map((d, i) => (
                        <React.Fragment key={d}>
                          {i > 0 && <span aria-hidden="true" className="text-stone-300">·</span>}
                          <span>{d}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 block font-mono">
                      Prep: {item.prepTime}
                    </span>
                  </div>

                  {item.isAvailable && (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#172554] text-amber-300 hover:bg-[#1E3A8A] transition-colors shadow-2xs font-display flex items-center gap-1 border border-amber-600/30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Tray
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tray Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-5 sticky top-24 shadow-2xs border-l-4 border-l-amber-600">
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <h2 className="text-base font-bold text-stone-900 dark:text-white font-display">
                  Express Lunch Tray
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-stone-500">
                {cartItems.reduce((acc, c) => acc + c.quantity, 0)} Items
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-10 text-center text-sm text-stone-400">
                <UtensilsCrossed className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                <p className="font-semibold text-stone-700 dark:text-stone-300 font-display">
                  Your lunch tray is empty
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Add lunch items to bypass long lines at 12:15 PM recess
                </p>
              </div>
            ) : (
              <div className="space-y-4 mt-3">
                <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-64 overflow-y-auto">
                  {cartItems.map(({ item, quantity }) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs md:text-sm font-semibold text-stone-900 dark:text-white truncate font-display">
                          {item.name}
                        </h4>
                        <span className="text-xs font-mono text-stone-500">
                          {quantity} × ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs font-bold text-stone-900 dark:text-white">
                          ${(item.price * quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>Express Pickup Fee</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">$0.00 (Student)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm md:text-base font-bold text-stone-900 dark:text-white font-mono pt-1 border-t border-stone-100 dark:border-stone-800">
                    <span>Tray Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-3 py-2.5 text-xs md:text-sm font-bold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 transition-colors shadow-2xs font-display flex items-center justify-center gap-1.5 border border-amber-600/40"
                  >
                    Confirm Lunch Pre-Order (${cartTotal.toFixed(2)})
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-1 text-xs text-stone-500 hover:text-rose-600 transition-colors"
                  >
                    Clear Tray
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
