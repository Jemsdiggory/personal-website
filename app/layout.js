import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'

export const metadata = {
  metadataBase: new URL("https://jemsprojects.vercel.app/"),
  title: {
    default: "Kahlaa Aulia Jemima — Game & Web Developer",
    template: "%s | Kahlaa Aulia Jemima",
  },
  description: "Portfolio of Kahlaa Aulia Jemima — Game Technology student at Polimedia Jakarta. Unity programmer, game developer, and web developer.",
  keywords: ["Kahlaa Aulia Jemima", "game developer Indonesia", "Unity developer", "web developer Indonesia", "Polimedia Jakarta"],
  authors: [{ name: "Kahlaa Aulia Jemima" }],
  creator: "Kahlaa Aulia Jemima",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <LenisProvider>
             <Navbar />    
          <CustomCursor />
          <div className="relative z-10">
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  )
}