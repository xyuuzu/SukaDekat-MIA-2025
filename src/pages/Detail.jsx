import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MyNavbar from '../components/NavBar';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { umkmData, checkOpenStatus } from '../data/umkmData';

const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(' ');
    let initials = words[0].charAt(0);
    if (words.length > 1) {
        initials += words[1].charAt(0);
    }
    return initials.toUpperCase();
};

const getAvatarColor = (name) => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8', '#33FFF5', '#F3FF33'];
    const index = name.length % colors.length; 
    return colors[index];
};

function Detail() {
  const { id } = useParams();
  const data = umkmData.find(item => item.id === parseInt(id));

  const handleContact = () => {
    const phone = data.phoneNumber || "628123456789"; 
    const message = `Halo ${data.name}, saya lihat profil Anda di Sukadekat...`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`, '_blank');
  };

  if (!data) return <div className="text-center mt-5">Data tidak ditemukan!</div>;

  const isOpen = checkOpenStatus(data.operatingHours);

  // Cek apakah gambar ada
  const hasCover = data.coverImage && data.coverImage !== "";
  const hasProfile = data.profileImg && data.profileImg !== "";

  return (
    <>
      <MyNavbar />
      
      {/* --- SECTION 1: HEADER (LOGIC BARU) --- */}
      <section className="profile-header" style={{
          position: 'relative',
          height: '350px',
          background: hasCover 
            ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${data.coverImage}') center/cover no-repeat`
            : '#ed1e28', 
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center'
      }}>
        
        {/* Jika Tidak Ada Cover Image, Tampilkan Nama UMKM Besar di Tengah */}
        {!hasCover && (
            <h1 className="text-white fw-bold display-3 text-center px-4" style={{opacity: 0.3, userSelect: 'none'}}>
                {data.name}
            </h1>
        )}

        {/* Container untuk Foto Profil (Posisi tetap di bawah kiri) */}
        <div className="container h-100 position-absolute top-0 start-50 translate-middle-x d-flex align-items-end pb-5">
            <div className="d-flex align-items-end">
                
                {/* LOGIC FOTO PROFIL */}
                {hasProfile ? (
                    <img 
                        src={data.profileImg} 
                        alt={data.name} 
                        className="rounded-circle border border-4 border-white shadow"
                        style={{width: '140px', height: '140px', objectFit: 'cover', marginBottom: '-50px', position: 'relative', zIndex: 2, backgroundColor: '#fff'}} 
                    />
                ) : (
                    <div 
                        className="rounded-circle border border-4 border-white shadow d-flex align-items-center justify-content-center"
                        style={{
                            width: '140px', 
                            height: '140px', 
                            marginBottom: '-50px', 
                            position: 'relative', 
                            zIndex: 2,
                            backgroundColor: getAvatarColor(data.name),
                            color: 'white',
                            fontSize: '3rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {getInitials(data.name)}
                    </div>
                )}
                
            </div>
        </div>
      </section>

      {/* --- SECTION 2: INFO UMKM --- */}
      <section className="profile-info pt-5 mt-4 pb-4">
        <div className="container">
           <div className="row">
              <div className="col-lg-8">
                 <div className="d-flex align-items-center gap-3 mb-2">
                     <h1 className="fw-bold text-dark mb-0">{data.name}</h1>
                     <span className={`badge rounded-pill ${isOpen ? 'bg-success' : 'bg-secondary'}`}>
                        {isOpen ? 'Buka Sekarang' : 'Tutup'}
                     </span>
                 </div>

                 <div className="text-danger fw-bold mb-3">{data.category}</div>
                 
                 <div className="d-flex align-items-center mb-4">
                    <div className="text-warning me-2">
                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                    </div>
                    <span className="fw-bold text-dark me-2">{data.rating}</span>
                    <span className="text-muted">({data.reviews} ulasan)</span>
                 </div>
                 
                 <p className="mb-4 text-muted" style={{lineHeight: '1.7'}}>{data.desc}</p>
                 
                 <div className="d-flex gap-3">
                    <button onClick={handleContact} className="btn btn-danger px-4 py-2 rounded-pill shadow-sm">
                        <i className="fas fa-phone-alt me-2"></i>Hubungi
                    </button>
                    <button onClick={handleDirections} className="btn btn-outline-danger px-4 py-2 rounded-pill shadow-sm">
                        <i className="fas fa-directions me-2"></i>Petunjuk Arah
                    </button>
                 </div>
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0">
                 <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-header bg-danger text-white py-3 fw-bold">
                       <i className="fas fa-info-circle me-2"></i>Informasi UMKM
                    </div>
                    <div className="card-body p-4">
                       <div className="d-flex mb-3">
                            <div className="text-danger me-3"><i className="fas fa-clock fa-lg"></i></div>
                            <div><div className="fw-bold text-dark">Jam Operasional</div><div className="text-muted small">{data.operatingHours?.open}:00 - {data.operatingHours?.close}:00 WIB</div></div>
                       </div>
                       <div className="d-flex">
                            <div className="text-danger me-3"><i className="fas fa-map-marker-alt fa-lg"></i></div>
                            <div><div className="fw-bold text-dark">Alamat</div><div className="text-muted small">{data.location}</div></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- SECTION 3: PETA --- */}
      <section className="py-4 bg-light">
         <div className="container">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div style={{ height: '300px', width: '100%' }}>
                   <MapContainer center={data.coordinates} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© OpenStreetMap contributors' />
                      <Marker position={data.coordinates}>
                        <Popup><b>{data.name}</b><br />{data.location}</Popup>
                      </Marker>
                   </MapContainer>
                </div>
            </div>
         </div>
      </section>

      {/* --- SECTION 4: POSTINGAN TERBARU --- */}
      <section className="py-5">
        <div className="container">
            <h3 className="fw-bold text-dark mb-4 pb-2 border-bottom border-danger border-3 d-inline-block">
                Postingan Terbaru
            </h3>
            <div className="row g-4">
                {data.posts && data.posts.length > 0 ? (
                    data.posts.map((post) => {
                        const combinedPostData = {
                            ...post,
                            umkmId: data.id,
                            name: data.name,
                            profileImg: data.profileImg,
                            stats: post.stats || { likes: post.likes, comments: post.comments }
                        };
                        return <PostCard key={post.id} data={combinedPostData} />;
                    })
                ) : (
                    <div className="col-12 text-center py-5"><p className="text-muted">Belum ada postingan terbaru.</p></div>
                )}
            </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Detail;