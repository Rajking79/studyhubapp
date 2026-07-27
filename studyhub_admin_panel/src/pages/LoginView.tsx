import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, User, Phone, Key, CheckCircle2, UserPlus, LogIn } from 'lucide-react';
import { adminApiService } from '../services/adminApiService';

interface LoginViewProps {
  onLoginSuccess: (token: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login Form States
  const [email, setEmail] = useState('admin@studyhub.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Registration Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSecretKey, setRegSecretKey] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        setErrorMsg('Please enter both Admin Email and Password');
        setIsLoading(false);
        return;
      }

      const res = await adminApiService.login(email, password);
      if (res && res.token) {
        onLoginSuccess(res.token);
      } else {
        setErrorMsg('Invalid Credentials! Please check your details.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Please fill in Name, Email and Password');
      return;
    }

    setIsLoading(true);
    try {
      await adminApiService.register(regName, regEmail, regPassword, regPhone);
      setEmail(regEmail);
      setPassword(regPassword);
      setSuccessMsg('🎉 Admin Account Created Successfully! You can now Sign In below.');
      setActiveTab('login');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-4 relative overflow-hidden font-['Inter']">
      {/* Decorative Background Glow Blobs */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Official StudyHub Authentication Card */}
      <div className="w-full max-w-md bg-white rounded-[28px] border border-slate-100 shadow-2xl p-8 space-y-6 relative z-10 animate-in fade-in zoom-in duration-300">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto flex items-center justify-center transition-transform hover:scale-105 duration-200">
            <img
              src={logoImg}
              alt="StudyHub Official Logo"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight pt-1">
            StudyHub Admin
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Enterprise Control & Authentication Portal
          </p>
        </div>

        {/* Login / Register Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'login'
                ? 'bg-white text-[#2563EB] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'register'
                ? 'bg-white text-[#2563EB] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Admin</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: SIGN IN FORM */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@studyhub.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 font-medium transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 font-medium transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 accent-[#2563EB] cursor-pointer" />
                <span>Remember this session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* TAB 2: REGISTER NEW ADMIN FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB] font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="rahul@studyhub.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB] font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Create Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB] font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Creating Admin Account...</span>
              ) : (
                <>
                  <span>Create Admin Account</span>
                  <UserPlus className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Security Footer */}
        <div className="pt-2 text-center border-t border-slate-100 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secured with Encrypted JWT Token Authentication</span>
          </div>
          <p className="text-[10px] text-slate-400">© 2026 StudyHub. All Rights Reserved.</p>
        </div>

      </div>
    </div>
  );
};
