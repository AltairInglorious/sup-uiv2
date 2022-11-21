import Navbar from "../components/Navbar/Navbar"


export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
