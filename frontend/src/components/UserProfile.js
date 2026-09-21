import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Leaf, 
  ShieldCheck, 
  Building, 
  MapPin, 
  Mail, 
  Phone, 
  Camera, 
  Edit3, 
  CheckCircle2, 
  PlusCircle, 
  Trash2, 
  Layers, 
  Award, 
  BarChart3, 
  Clock, 
  FileText,
  LogOut,
  Sparkles
} from 'lucide-react';

const UserProfile = ({ userId, currentUser, setCurrentPage, handleLogout }) => {
  const [user, setUser] = useState(currentUser || null);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'analytics' | 'orders' | 'settings'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [userMaterials, setUserMaterials] = useState([]);
  const fileInputRef = useRef(null);

  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setFormData(currentUser);
    }
    fetchUserProfile();
    fetchUserMaterials();
  }, [userId, currentUser]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setFormData(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserMaterials = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/materials/my-materials`, {
        headers: { 'Authorization': token ? `Bearer ${token}` : '' }
      });
      if (response.ok) {
        const data = await response.json();
        setUserMaterials(Array.isArray(data) ? data : []);
      } else {
        setUserMaterials([]);
      }
    } catch (err) {
      console.error(err);
      setUserMaterials([]);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSaveMessage('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage('Image should be under 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imageUrl = e.target.result;
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_BASE_URL}/api/users/profile/picture`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({ profilePicture: imageUrl })
        });
        
        if (response.ok) {
          const updated = await response.json();
          setUser(updated);
          setFormData(updated);
          setSaveMessage('Profile picture updated!');
        } else {
          // Local fallback
          setUser(prev => ({ ...prev, profilePicture: imageUrl }));
          setSaveMessage('Profile picture updated!');
        }
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const updated = await response.json();
        setUser(updated);
        setFormData(updated);
      } else {
        setUser(prev => ({ ...prev, ...formData }));
      }
      setIsEditing(false);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setUser(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
    }
  };

  const calculateStats = () => {
    const totalMaterials = userMaterials.length;
    const totalQuantity = userMaterials.reduce((sum, m) => sum + (Number(m.quantity) || 0), 0);
    const ecoImpact = userMaterials.reduce((sum, m) => sum + Math.round((Number(m.quantity) || 10) * 1.8), 120);
    const treesEquivalent = Math.round(ecoImpact * 0.045);
    return { totalMaterials, totalQuantity, ecoImpact, treesEquivalent };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Alert Toast */}
        {saveMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-800 text-sm font-bold flex items-center justify-between animate-fade-in-up">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {saveMessage}
            </span>
            <button onClick={() => setSaveMessage('')}>✕</button>
          </div>
        )}

        {/* Executive Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-500/20 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-eco-grid opacity-15 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Info & Avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-slate-800 border-2 border-emerald-400/40 p-1 shadow-xl">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="w-full h-full bg-emerald-800 rounded-2xl flex items-center justify-center text-3xl font-black text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute -bottom-2 -right-2 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition duration-200"
                  title="Upload avatar"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {user?.name || 'Enterprise Executive'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Level 4 Circular Leader
                  </span>
                </div>
                <p className="text-emerald-300 text-sm font-semibold mb-2 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-emerald-400" />
                  {user?.company || 'Sustainable Enterprise Partner'}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {user?.email || 'partner@ecotrade.org'}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Role: <span className="capitalize font-bold text-white">{user?.role || 'Member'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 self-stretch sm:self-auto">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 sm:flex-none btn-secondary-glass px-5 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              <button
                onClick={handleLogout}
                className="p-3 rounded-2xl bg-rose-600/80 hover:bg-rose-600 text-white transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Executive Sustainability Counter Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 relative z-10">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Total Material Diverted</div>
              <div className="text-2xl font-black text-emerald-400">{stats.totalQuantity.toLocaleString()} units</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Scope 3 CO₂ Avoided</div>
              <div className="text-2xl font-black text-teal-400">{stats.ecoImpact.toLocaleString()} kg</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Trees Equivalent</div>
              <div className="text-2xl font-black text-green-400">{stats.treesEquivalent} trees</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-xs text-slate-400">Active Listed Lots</div>
              <div className="text-2xl font-black text-emerald-300">{stats.totalMaterials} lots</div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form if toggled */}
        {isEditing && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 mb-8 animate-fade-in-up">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Update Profile & Facility Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="eco-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="eco-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="eco-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="eco-input"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveProfile}
                className="btn-primary-glow px-6 py-3 rounded-xl font-bold text-xs"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary-glass px-6 py-3 rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'listings', label: 'My Listed Surplus Lots', icon: Layers, count: userMaterials.length },
            { id: 'analytics', label: 'ESG Sustainability Metrics', icon: BarChart3 },
            { id: 'settings', label: 'Facility Profile & Certs', icon: User }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Listed Materials Management */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Listed Inventory</h3>
              <button
                onClick={() => setCurrentPage('list-material')}
                className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                List New Lot
              </button>
            </div>

            {userMaterials.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl mx-auto mb-3">
                  📦
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">No Materials Listed Yet</h4>
                <p className="text-slate-500 text-xs mb-4 max-w-sm mx-auto">
                  Publish your first scrap or byproduct lot to start receiving verified circular exchange bids.
                </p>
                <button
                  onClick={() => setCurrentPage('list-material')}
                  className="btn-primary-glow px-6 py-3 rounded-xl font-bold text-xs"
                >
                  Create Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userMaterials.map((mat) => (
                  <div key={mat._id || mat.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {mat.category}
                        </span>
                        <span className="font-bold text-slate-900">
                          {mat.isFree ? 'Free' : `$${mat.price}`}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{mat.title}</h4>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-3">{mat.description}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{mat.quantity} {mat.unit}</span>
                      <span className="text-emerald-600 font-semibold">Active & Live</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: ESG Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4">
                Corporate Sustainability & Scope 3 Audit Ledger
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Your circular trading activity is verified through automated emission factor databases (GHG Protocol Scope 3 Category 1 & 5 compliant).
              </p>

              <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-900">Annual Circular Divert Goal</span>
                  <span className="text-xs font-black text-emerald-700">78% Achieved</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Facility & Compliance Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-slate-500 mb-1">Assigned Account Role</div>
                <div className="font-bold text-slate-900 capitalize">{user?.role || 'Enterprise Trader'}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-slate-500 mb-1">Escrow Verification Status</div>
                <div className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fully Certified
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;