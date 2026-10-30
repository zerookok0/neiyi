import { Link, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { HomePage } from './pages/HomePage';
import { CatalogPage, CategoryIndex } from './pages/CatalogPage';
import { AudiencePage } from './pages/AudiencePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage, LoginPage, RegisterPage } from './pages/AccountPage';
import { StoryPage, ContactPage } from './pages/StoryPage';

function NotFound() {
  return (
    <div className="mx-auto max-w-[520px] px-5 py-24 text-center">
      <p className="eyebrow">Lỗi 404</p>
      <h1 className="display-md mt-3">Trang bạn tìm không tồn tại</h1>
      <p className="mt-3 body-sm">
        Có thể đường dẫn đã thay đổi. Bạn quay về trang chủ để tiếp tục khám phá nhé.
      </p>
      <Link to="/" className="btn-dark mt-7">
        Về trang chủ
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/nu" element={<AudiencePage />} />
        <Route path="/nam" element={<AudiencePage />} />
        <Route path="/danh-muc" element={<CatalogPage />} />
        <Route path="/danh-muc/:slug" element={<CatalogPage />} />
        <Route path="/danh-muc-tat-ca" element={<CategoryIndex />} />
        <Route path="/san-pham/:slug" element={<ProductPage />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/thanh-toan" element={<CheckoutPage />} />
        <Route path="/don-hang/:id" element={<OrderConfirmationPage />} />
        <Route path="/yeu-thich" element={<WishlistPage />} />
        <Route path="/tai-khoan" element={<AccountPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/cau-chuyen" element={<StoryPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
