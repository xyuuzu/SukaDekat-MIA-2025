import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SearchCard({ initialValue = "" }) {
  const [keyword, setKeyword] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam !== null) {
      setKeyword(queryParam);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const val = e.target.value;
    setKeyword(val);
    if (val.trim() === "") {
      navigate('/umkm');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/umkm?q=${keyword}`);
    } else {
      navigate('/umkm');
    }
  };

  const handleCategoryClick = (cat) => {
    navigate(`/umkm?category=${cat}`);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolocation");
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setIsLoading(false);
        navigate(`/umkm?lat=${latitude}&lng=${longitude}&mode=nearby`);
      },
      (error) => {
        setIsLoading(false);
        alert("Gagal mengambil lokasi.");
        console.error(error);
      }
    );
  };

  const categories = [
    { label: 'Makanan', icon: 'fa-utensils' },
    { label: 'Minuman', icon: 'fa-mug-hot' }, 
    { label: 'Toko',    icon: 'fa-shopping-bag' },
    { label: 'Layanan', icon: 'fa-concierge-bell' }
  ];

  return (
    <div className="search-section mt-5 position-relative" style={{zIndex: 10}}>
      <div className="search-card text-start shadow-lg bg-white rounded-4 overflow-hidden">
        {/* Header Merah */}
        <div className="search-header text-center bg-danger text-white py-4">
          <h3 className="search-title fw-bold mb-1">Jelajahi Sekitarmu</h3>
          <p className="search-subtitle mb-0 opacity-75">Temukan restoran, toko, dan layanan terdekat</p>
        </div>

        {/* Body Pencarian */}
        <div className="search-body p-4">
          <form onSubmit={handleSearch} className="mb-4">
            <label htmlFor="location" className="form-label fw-bold text-dark">Pencarian</label>
            <div className="input-group shadow-sm rounded-3 overflow-hidden">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-0 bg-light py-3" 
                id="location" 
                placeholder="Cari nama toko, menu, atau lokasi..." 
                value={keyword}
                onChange={handleChange}
              />
              <button className="btn btn-danger px-4 fw-bold" type="submit">
                Jelajahi
              </button>
            </div>
            
            <div className="form-text mt-2 cursor-pointer" onClick={handleUseCurrentLocation}>
              <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-location-arrow'} me-1 text-danger`}></i>
              <span className="text-primary text-decoration-none" style={{cursor: 'pointer'}}>
                 {isLoading ? 'Mendeteksi lokasi...' : 'Gunakan lokasi saya saat ini (Cari Terdekat)'}
              </span>
            </div>
          </form>
          
          <div className="row g-3">
            {categories.map((item) => (
              <div key={item.label} className="col-md-3 col-6" onClick={() => handleCategoryClick(item.label)}>
                <div 
                  className="category-pill text-center p-3 rounded-3 border cursor-pointer h-100 d-flex flex-column align-items-center justify-content-center hover-effect"
                  style={{transition: 'all 0.3s ease'}}
                >
                  <i className={`fas ${item.icon} fa-lg text-danger mb-2`}></i>
                  <div className="small fw-bold text-dark">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SearchCard;