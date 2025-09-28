import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import NavBar from "../app/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header>
          <NavBar />
        </Header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
