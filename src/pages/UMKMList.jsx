import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyNavbar from '../components/NavBar';
import Footer from '../components/Footer';
import UMKMCard from '../components/UMKMCard';
import SearchCard from '../components/SearchCard';
import { umkmData } from '../data/umkmData';

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c;
}

function UMKMList() {
  const [searchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState(umkmData);
  const [title, setTitle] = useState("Semua UMKM");

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const mode = searchParams.get('mode');

  useEffect(() => {
    let results = umkmData;

    if (!query && !category && !mode) {
        setFilteredData(umkmData);
        setTitle("Semua UMKM");
        return; 
    }

    if (query) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(item => 
            item.name.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery) ||
            item.location.toLowerCase().includes(lowerQuery)
        );
        setTitle(`Hasil pencarian: "${query}"`);
    } 
    else if (category) {
        results = results.filter(item => 
            item.category.toLowerCase().includes(category.toLowerCase())
        );
        setTitle(`Kategori: ${category}`);
    }
    else if (mode === 'nearby' && lat && lng) {
        results = results.map(item => {
            const dist = calculateDistance(parseFloat(lat), parseFloat(lng), item.coordinates[0], item.coordinates[1]);
            return { ...item, realDistance: dist }; 
        })
        .filter(item => item.realDistance <= 10) 
        .sort((a, b) => a.realDistance - b.realDistance); 

        results = results.map(item => ({
            ...item,
            distance: `${item.realDistance.toFixed(1)} km`
        }));

        setTitle("UMKM Terdekat di Sekitar Anda");
    }

    setFilteredData(results);
  }, [query, category, lat, lng, mode]);

  return (
    <>
      <MyNavbar />
      
      {/* --- HEADER PENCARIAN --- */}
      <div className="position-relative bg-danger" style={{paddingTop: '60px', paddingBottom: '10rem'}}> 
        
        {/* Background Pattern/Gradient */}
        <div className="position-absolute w-100 h-100 top-0 start-0" 
             style={{
                 background: 'linear-gradient(135deg, #ed1e28 0%, #b6252a 100%)',
                 zIndex: 0
             }}>
             <div className="position-absolute rounded-circle bg-white opacity-10" style={{width: '300px', height: '300px', top: '-50px', right: '-50px', opacity: 0.1}}></div>
             <div className="position-absolute rounded-circle bg-white opacity-10" style={{width: '150px', height: '150px', bottom: '50px', left: '50px', opacity: 0.1}}></div>
        </div>

        <div className="container position-relative text-center" style={{zIndex: 2}}>
             <h1 className="text-white fw-bold mb-2 display-5">Temukan UMKM Terbaik</h1>
             <p className="text-white opacity-75 lead mb-0">Cari makanan enak, tempat nongkrong, atau jasa terpercaya.</p>
        </div>
      </div>

      {/* --- SEARCH CARD OVERLAP --- */}
      <div className="container position-relative" style={{marginTop: '-7rem', zIndex: 10}}>
          <div className="row justify-content-center">
              <div className="col-lg-8">
                 <SearchCard initialValue={query} />
              </div>
          </div>
      </div>

      {/* --- LIST HASIL --- */}
      <div className="bg-light py-5">
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">{title}</h2>
                <span className="text-muted bg-white px-3 py-1 rounded-pill border shadow-sm small">{filteredData.length} hasil ditemukan</span>
            </div>

            {filteredData.length > 0 ? (
                <div className="row g-4">
                    {filteredData.map((item) => (
                        <UMKMCard key={item.id} data={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="opacity-50 mb-3" style={{fontSize: '4rem'}}>🔍</div>
                    <h4 className="text-muted">Tidak ada UMKM yang cocok</h4>
                    <p>Coba kata kunci lain atau klik tombol "Jelajahi" tanpa teks untuk melihat semua.</p>
                    <button onClick={() => window.location.href='/umkm'} className="btn btn-outline-danger mt-2">
                        Reset Pencarian
                    </button>
                </div>
            )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UMKMList;