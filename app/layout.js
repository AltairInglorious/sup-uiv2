import './globals.css'
import Navbar from "../components/Navbar/Navbar"


export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Navbar/>
        <div className='flex flex-col container mx-auto'>
        {children}
        </div>
      </body>
    </html>
  )
}
