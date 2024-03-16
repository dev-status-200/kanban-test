import "./styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MainLayout} from "./MainLayout";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable:'--font-plus-jakarta-sans'
});

export const metadata = {
  title: "Kanban",
  description: "Advanced Todo-List",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.variable}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}