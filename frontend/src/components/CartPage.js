import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Tag, 
  Building, 
  MapPin, 
  CreditCard,
  FileCheck2,
  X
} from 'lucide-react';

const CartPage = ({ cartItems = [], removeFromCart, setCurrentPage, user, clearCart }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState('');
  
  // Checkout Modal State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('escrow');
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderReceipt, setCompletedOrderReceipt] = useState(null);

  // Totals calculations
  const subtotal = cartItems
    .filter(item => !item.isFree)
    .reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const freeItemsCount = cartItems.filter(item => item.isFree).length;
  const discountAmount = discountApplied ? (subtotal * discountPercent) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  // Carbon Impact total
  const totalCarbonOffset = cartItems.reduce((sum, item) => sum + Math.round((item.quantity || 50) * 1.6), 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setDiscountError('');
    if (!discountCode.trim()) return;

    const code = discountCode.trim().toUpperCase();
    if (code === 'CIRCULAR2026' || code === 'ECOTRADE15' || code === 'ZEROWASTE') {
      setDiscountApplied(true);
      setDiscountPercent(0.15);
    } else {
      setDiscountError('Invalid code. Try "CIRCULAR2026" or "ECOTRADE15"');
    }
  };

  const handleProcessOrder = () => {
    const orderReceipt = {
      orderId: `ECO-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cartItems],
      subtotal,
      discountAmount,
      grandTotal,
      carbonOffset: totalCarbonOffset,
      paymentMethod,
      buyerName: user?.name || 'Enterprise Buyer',
      buyerCompany: user?.company || 'Circular Partner'
    };

    setCompletedOrderReceipt(orderReceipt);
    setOrderComplete(true);
    if (clearCart) clearCart();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">
            🔒
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Sign In to View Cart</h2>
          <p className="text-slate-500 text-sm mb-6">
            Log in to your account to review saved requisitions, apply corporate green credits, and trade securely.
          </p>
          <button
            onClick={() => setCurrentPage('authform')}
            className="w-full btn-primary-glow py-3.5 rounded-2xl font-bold text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 text-center max-w-md w-full animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center text-4xl">
            🛍️
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Requisition Cart is Empty</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            You have no secondary resources queued for checkout. Explore the marketplace to find scrap lots, timber pallets, or clean polymers.
          </p>
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="w-full btn-primary-glow py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
          >
            Explore Circular Exchange
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
            Requisition Queue
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Order & Resource Checkout
          </h1>
        </div>

        {/* Order Complete Screen with Digital Impact Receipt */}
        {orderComplete && completedOrderReceipt ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-emerald-500/30 p-8 sm:p-12 animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                ✓
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                Order & Escrow Secured!
              </h2>
              <p className="text-xs text-slate-500">
                Order ID: <span className="font-mono font-bold text-slate-700">{completedOrderReceipt.orderId}</span> • {completedOrderReceipt.date}
              </p>
            </div>

            {/* Verifiable ESG Carbon Receipt Badge */}
            <div className="bg-gradient-to-br from-slate-950 to-emerald-950 rounded-2xl p-6 text-white mb-8 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Leaf className="w-4 h-4" />
                  Digital Scope 3 ESG Certificate
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  ISO 14001 Audited
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-2xl font-black text-emerald-400">+{completedOrderReceipt.carbonOffset} kg</div>
                  <div className="text-[11px] text-slate-300">Verified CO₂ Diverted</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-2xl font-black text-teal-400">${completedOrderReceipt.grandTotal.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-300">Escrow Value Allocated</div>
                </div>
              </div>
            </div>

            {/* Items Summary Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden mb-8">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Material Lot</th>
                    <th className="py-3 px-4">Supplier</th>
                    <th className="py-3 px-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedOrderReceipt.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4 font-semibold text-slate-900">{item.title}</td>
                      <td className="py-3 px-4 text-slate-500">{item.company || 'Circular Partner'}</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-700">
                        {item.isFree ? 'Free' : `$${item.price}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentPage('profile')}
                className="flex-1 btn-primary-glow py-3.5 rounded-2xl font-bold text-sm"
              >
                View in Sustainability Hub
              </button>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  setCurrentPage('marketplace');
                }}
                className="flex-1 btn-secondary-glass py-3.5 rounded-2xl font-bold text-sm"
              >
                Continue Trading
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.cartId || item._id || Math.random()} 
                  className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl || item.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80'}
                      alt={item.title}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-1 inline-block">
                        {item.category || 'Surplus'}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3 text-emerald-600" />
                          {item.company || 'Verified Supplier'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {item.location || 'San Francisco, CA'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-xl font-black text-emerald-700">
                      {item.isFree ? 'Free' : `$${item.price || 0}`}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="mt-1 text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary & Checkout Action (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              {/* Summary Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">
                  Requisition Summary
                </h3>

                {/* Scope 3 Carbon Impact Banner */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-900">+{totalCarbonOffset}kg Scope 3 CO₂ Reduction</div>
                    <div className="text-[11px] text-emerald-700">Verified carbon reduction certificate included</div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm text-slate-600 mb-6">
                  <div className="flex justify-between">
                    <span>Lot Materials Subtotal</span>
                    <span className="font-bold text-slate-900">${subtotal.toLocaleString()}</span>
                  </div>
                  
                  {freeItemsCount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Zero-Dollar Recycling Lots</span>
                      <span>{freeItemsCount} items ($0.00)</span>
                    </div>
                  )}

                  {discountApplied && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Green Credit Voucher (15%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Escrow Protection Fee</span>
                    <span className="text-emerald-600 font-bold">FREE ($0.00)</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-base">
                    <span className="font-black text-slate-900">Total Payable</span>
                    <span className="text-2xl font-black text-emerald-700">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Discount Code Form */}
                <form onSubmit={handleApplyCoupon} className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Promo / Voucher Code (e.g. CIRCULAR2026)"
                      className="eco-input text-xs uppercase"
                    />
                    <button
                      type="submit"
                      className="btn-secondary-glass px-4 py-2 rounded-xl text-xs font-bold shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {discountError && <p className="text-xs text-rose-600 mt-1 font-medium">{discountError}</p>}
                  {discountApplied && <p className="text-xs text-emerald-600 mt-1 font-bold">15% Green Credit Applied! ✓</p>}
                </form>

                {/* Checkout Trigger */}
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full btn-primary-glow py-4 rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Proceed to Secure Escrow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsCheckingOut(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Secure Escrow Checkout
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Funds are held safely in circular escrow until material quality inspection is completed upon freight delivery.
            </p>

            {/* Payment method selector */}
            <div className="space-y-3 mb-6">
              {[
                { id: 'escrow', title: 'EcoTrade Protected Escrow', desc: 'Released upon delivery inspection', icon: ShieldCheck },
                { id: 'po', title: 'Corporate Purchase Order (Net 30)', desc: 'For verified enterprise accounts', icon: FileCheck2 },
                { id: 'card', title: 'Corporate Card / Instant Transfer', desc: 'Immediate instant booking', icon: CreditCard }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    paymentMethod === m.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <m.icon className={`w-5 h-5 ${paymentMethod === m.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-bold text-xs">{m.title}</div>
                    <div className="text-[10px] text-slate-500">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Total */}
            <div className="bg-slate-100 rounded-2xl p-4 mb-6 flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700">Total Amount</span>
              <span className="text-xl font-black text-emerald-700">${grandTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={() => {
                setIsCheckingOut(false);
                handleProcessOrder();
              }}
              className="w-full btn-primary-glow py-3.5 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              Confirm & Issue ESG Receipt
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;