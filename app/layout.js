import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import { UserProvider } from "../lib/UserContext";

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata = {
    title: "Glassmorphic Dashboard",
    description: "Futuristic Glassmorphic App",
};

import Header from "../components/Header";
import { LanguageProvider } from "../lib/LanguageContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased flex h-[100dvh] overflow-hidden p-0 bg-slate-50 dark:bg-slate-900">
                <UserProvider>
                    <LanguageProvider>
                        {/* Main container */}
                        <div className="w-full h-full flex flex-col md:flex-row overflow-hidden relative z-10">

                            <Sidebar className="hidden md:block w-[280px] lg:w-[300px] shrink-0 h-full border-r border-slate-200 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl" />

                            <div className="flex-1 flex flex-col overflow-hidden w-full relative z-10 bg-transparent">
                                <div className="hidden md:block w-full">
                                    <Header />
                                </div>
                                <main className="flex-1 overflow-y-auto scroll-smooth w-full p-0 pt-16 md:pt-0">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </LanguageProvider>
                </UserProvider>
            </body>
        </html>
    );
}


