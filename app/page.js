"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GraduationCap, ArrowRight, Lock, Mail, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useUser } from "../lib/UserContext";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
    const router = useRouter();
    const { login } = useUser();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password || password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            // Firebase Auth Login
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Fetch target role from Firestore
            let selectedRole = "student"; // fallback
            try {
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    selectedRole = userDoc.data().role || "student";
                } else {
                    // Create minimal mockup doc if they signed up directly via Firebase Console
                    await setDoc(userDocRef, {
                        email: firebaseUser.email,
                        role: "student",
                        name: "New User",
                        createdAt: new Date()
                    });
                }
            } catch (err) {
                console.error("Error fetching user role from Firestore:", err);
                // Even on firestore error, we allow them to pass as a fallback 'student' role.
            }

            // We do not need to call `login(userData, selectedRole)` manually anymore, 
            // since UserContext listener `onAuthStateChanged` will handle it.
            // But we must route them. We'll wait a tick to ensure context is updated.

            const path = `/${selectedRole}`;
            setTimeout(() => {
                router.push(path);
            }, 800);

        } catch (authError) {
            console.error(authError);
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 inset-0 absolute z-[100] overflow-hidden font-sans">
            {/* Left side: branding/photo - Minimalist & Serious */}
            <div className="hidden lg:flex w-5/12 bg-[#1e293b] text-white flex-col justify-between p-16 relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-slate-900 z-0"></div>

                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] border border-white/20 rounded-full"></div>
                    <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] border border-white/10 rounded-full"></div>
                </div>

                <div className="relative z-10 flex items-center space-x-3 text-2xl font-bold tracking-tight">
                    <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg ring-4 ring-indigo-500/20">
                        <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <span>Campus LMS</span>
                </div>

                <div className="relative z-10 max-w-md">
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>University Secure Access</span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-6 leading-[1.1] tracking-tight text-white">
                        Your Academic <br />
                        <span className="text-indigo-400">Journey Starts Here.</span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium">
                        Securely access your study materials, track academic results, and manage your campus life in one professional platform.
                    </p>
                </div>

                <div className="relative z-10 text-[13px] font-semibold text-slate-500 flex items-center space-x-6">
                    <span>© 2026 Campus University</span>
                    <span>Privacy Policy</span>
                    <span>Support</span>
                </div>
            </div>

            {/* Right side: Login form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 relative z-10 h-full bg-white">
                <div className="w-full max-w-[420px]">

                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Sign In</h2>
                        <p className="text-slate-500 font-medium">Enter your credentials to access your portal.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium text-red-800">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">University Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="email@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${error && !email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${error && (!password || password.length < 6) ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1e293b] hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-4.5 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300 transition-all flex justify-center items-center group relative overflow-hidden"
                            style={{ padding: '1.125rem' }}
                        >
                            <span className={loading ? "opacity-0" : "flex items-center"}>
                                Sign In
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin border-t-transparent"></div>
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
