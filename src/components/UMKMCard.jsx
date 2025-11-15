import { Link } from 'react-router-dom';
import { checkOpenStatus } from '../data/umkmData';

function UMKMCard({ data }) {
  const isOpen = checkOpenStatus(data.operatingHours);
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden position-relative hover-effect">
        
        {/* --- BADGE STATUS BUKA/TUTUP (BARU) --- */}
        <span className={`position-absolute top-0 start-0 m-3 py-1 px-3 rounded-pill fw-bold small shadow-sm ${isOpen ? 'bg-success text-white' : 'bg-secondary text-white'}`} style={{zIndex: 5}}>
            {isOpen ? '• Buka' : '• Tutup'}
        </span>
        
        {/* Badge Promo/Kategori (Yang lama) */}
        {data.badge && (
            <span className="badge bg-danger position-absolute top-0 end-0 m-3 py-2 px-3 rounded-pill" style={{zIndex: 5}}>
                {data.badge}
            </span>
        )}

        {/* Cover Image */}
        <img 
            src={data.coverImage} 
            className="card-img-top" 
            alt={data.name} 
            style={{ height: '220px', objectFit: 'cover' }}
        />

        <div className="card-body p-4 d-flex flex-column">
          <h5 className="fw-bold mb-1 text-dark">{data.name}</h5>
          
          {/* Menampilkan Jam Buka (Opsional) */}
          <div className="d-flex justify-content-between align-items-center mb-2">
             <div className="text-danger fw-semibold small">{data.category}</div>
             <small className={`fw-bold ${isOpen ? 'text-success' : 'text-muted'}`} style={{fontSize: '0.75rem'}}>
                {isOpen ? `Buka sampai ${data.operatingHours?.close}:00` : `Buka jam ${data.operatingHours?.open}:00`}
             </small>
          </div>

          <p className="text-muted small flex-grow-1" style={{lineHeight: '1.6'}}>
            {data.shortDesc}
          </p>

          <div className="d-flex justify-content-between align-items-center mb-3 small">
             <div className="text-warning">
                <i className="fas fa-star me-1"></i>
                <span className="text-dark fw-bold">{data.rating}</span>
                <span className="text-muted ms-1">({data.reviews})</span>
             </div>
             <div className="text-muted">
                <i className="fas fa-map-marker-alt me-1"></i>
                {data.distance}
             </div>
          </div>

          <Link to={`/detail/${data.id}`} className="btn btn-danger w-100 rounded-pill py-2 fw-semibold">
             Kunjungi Profil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UMKMCard;