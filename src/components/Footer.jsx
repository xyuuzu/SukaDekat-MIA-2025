import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Sukadekat</h5>
            <p>Temukan tempat terdekat dengan ulasan terpercaya.<br />Butuh yang cepat? Sukadekat!</p>
          </div>

          {/* Kolom 2: Tautan Navigasi */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold">Tautan</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Beranda</Link></li>
              <li className="mb-2"><Link to="/umkm">Kategori</Link></li>
              <li className="mb-2"><Link to="/umkm">UMKM</Link></li>
              <li className="mb-2"><Link to="/about">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kategori Populer */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Kategori Populer</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/umkm?category=Restoran">Restoran</Link></li>
              <li className="mb-2"><Link to="/umkm?category=Kafe">Kafe</Link></li>
              <li className="mb-2"><Link to="/umkm?category=Toko">Toko</Link></li>
              <li className="mb-2"><Link to="/umkm?category=Layanan">Layanan</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Ikuti Kami (Sosmed) */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Ikuti Kami</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white text-decoration-none fs-5">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white text-decoration-none fs-5">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white text-decoration-none fs-5">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="my-4 border-light opacity-25" />

        {/* Copyright */}
        <div className="text-center">
          <p className="mb-0 small">&copy; 2025 Sukadekat. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;