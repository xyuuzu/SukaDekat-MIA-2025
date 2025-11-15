import { Link } from 'react-router-dom';
import { umkmData, checkOpenStatus } from '../data/umkmData';

function PostCard({ data }) {
  const likeCount = data.stats?.likes || data.likes || 0;
  
  const parentUMKM = umkmData.find(u => u.id === data.umkmId);
  const isOpen = parentUMKM ? checkOpenStatus(parentUMKM.operatingHours) : false;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card post-card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-effect">
        <div className="card-body p-0">
           <div className="profile-section p-3 pb-0 d-flex align-items-center gap-2">
              <img src={data.profileImg || data.authorImg} className="rounded-circle border" width="40" height="40" alt="Profile" />
              <div className="profile-info">
                 <div className="d-flex align-items-center gap-2">
                    <h6 className="profile-name m-0 fw-bold text-dark">{data.name || data.author}</h6>
                    
                    {/* --- INDIKATOR STATUS (DOT) --- */}
                    <span 
                        className={`d-inline-block rounded-circle ${isOpen ? 'bg-success' : 'bg-secondary'}`} 
                        style={{width: '8px', height: '8px'}} 
                        title={isOpen ? "Sedang Buka" : "Sedang Tutup"}
                    ></span>
                 </div>
                 <small className="text-muted">{data.date || data.time}</small>
              </div>
           </div>
           
           <img src={data.image || data.postImg} className="card-img-top mt-3" style={{height: '220px', objectFit: 'cover'}} alt="Post" />
           
           <div className="p-3">
              <h5 className="card-title fw-bold mb-2">{data.title}</h5>
              <p className="card-text text-muted small text-truncate">{data.text || data.desc}</p>
              
              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <Link to={`/post/${data.id}`} className="text-danger text-decoration-none fw-semibold small stretched-link">
                     Baca Selengkapnya
                  </Link>
                  
                  <div className="text-muted small z-2 position-relative d-flex align-items-center"> 
                     <i className="far fa-heart me-1 text-danger"></i> 
                     <span className="fw-bold">{likeCount}</span>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;