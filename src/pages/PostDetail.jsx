import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import MyNavbar from '../components/NavBar';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { umkmData, findPostById } from '../data/umkmData';

function PostDetail() {
  const { id } = useParams();
  const currentId = parseInt(id);
  const data = findPostById(id);
  
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!data) return <div className="text-center mt-5 pt-5">Postingan tidak ditemukan!</div>;

  const post = data; 
  const umkm = data.umkmData;


  const authorImage = post.authorImg || umkm.profileImg || "https://via.placeholder.com/50";

  const relatedPosts = umkmData
    .flatMap(u => u.posts.map(p => ({
        ...p,
        umkmId: u.id,
        name: u.name,    
        profileImg: u.profileImg, 
        category: u.category,
        location: u.location,
        stats: { likes: p.likes, comments: p.comments } 
    })))
    .filter(p => p.id !== currentId) 
    .slice(0, 3);

  return (
    <>
      <MyNavbar />

      {/* HERO SECTION */}
      <section className="post-hero text-white text-center py-5" style={{
          background: `linear-gradient(135deg, rgba(182, 37, 42, 0.9) 0%, rgba(237, 30, 40, 0.85) 100%)`,
          minHeight: '300px', display: 'flex', alignItems: 'center'
      }}>
         <div className="container">
             <h1 className="fw-bold">Detail Postingan</h1>
             <p className="lead opacity-75">Informasi lengkap tentang postingan UMKM</p>
         </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="post-detail-section" style={{ marginTop: '-100px' }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  
                  {/* 1. POST HEADER */}
                  <div className="card border-0 shadow-lg rounded-4 p-4 mb-4">
                      <div className="d-inline-block bg-danger text-white px-3 py-1 rounded-pill fw-bold small mb-3">
                          {umkm.category}
                      </div>
                      <h1 className="fw-bold text-dark mb-3" style={{fontSize: '2rem'}}>{post.title}</h1>

                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                          {/* Author Info */}
                          <div className="d-flex align-items-center gap-3">
                              {/* FIX: Use the safe authorImage variable */}
                              <img 
                                src={authorImage} 
                                alt={umkm.name} 
                                className="rounded-circle border border-danger border-2" 
                                style={{width: '50px', height: '50px', objectFit: 'cover'}} 
                              />
                              <div>
                                  <h6 className="mb-0 fw-bold text-dark">{umkm.name}</h6>
                                  <small className="text-muted">{post.date} • {post.distance || umkm.distance}</small>
                              </div>
                          </div>
                          
                          {/* Stats */}
                          <div className="d-flex gap-3 text-muted small">
                              <span>
                                <i className="far fa-eye me-1"></i> 
                                {post.stats?.views || "0"} dilihat
                              </span>
                              <span>
                                <i className="far fa-heart me-1"></i> 
                                {post.stats?.likes || post.likes || 0} suka
                              </span>
                          </div>
                      </div>
                  </div>

                  {/* 2. POST BODY */}
                  <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                      <img src={post.image} alt={post.title} className="w-100 rounded-3 mb-4" style={{height: '400px', objectFit: 'cover'}} />
                      
                      {/* Deskripsi HTML */}
                      <div className="post-body text-dark" style={{lineHeight: '1.8'}} dangerouslySetInnerHTML={{ __html: post.description || `<p>${post.text}</p>` }} />

                      {/* Features List (Jika ada) */}
                      {post.features && (
                        <div className="bg-light p-4 rounded-3 my-4">
                            <h5 className="fw-bold mb-3">Keunggulan:</h5>
                            <ul className="list-unstyled mb-0">
                                {post.features.map((feature, index) => (
                                    <li key={index} className="mb-2 d-flex align-items-start gap-2">
                                        <i className="fas fa-check text-danger mt-1"></i> <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                      )}

                      {/* Actions Buttons */}
                      <div className="d-flex gap-2 flex-wrap mt-3">
                          <button 
                            className={`btn ${isLiked ? 'btn-success' : 'btn-danger'} rounded-pill px-4`}
                            onClick={() => setIsLiked(!isLiked)}
                          >
                              <i className={`fas ${isLiked ? 'fa-check' : 'fa-heart'} me-2`}></i>
                              {isLiked ? 'Disukai' : 'Suka Postingan'}
                          </button>
                          <button className="btn btn-outline-danger rounded-pill px-4">
                              <i className="fas fa-share-alt me-2"></i> Bagikan
                          </button>
                          <button 
                             className={`btn ${isSaved ? 'btn-success' : 'btn-outline-danger'} rounded-pill px-4`}
                             onClick={() => setIsSaved(!isSaved)}
                          >
                              <i className={`fas ${isSaved ? 'fa-bookmark' : 'fa-bookmark'} me-2`}></i> 
                              {isSaved ? 'Disimpan' : 'Simpan'}
                          </button>
                      </div>
                  </div>

                  {/* 3. BUSINESS INFO */}
                  <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                      <h5 className="fw-bold mb-4 border-bottom pb-2">Informasi {umkm.name}</h5>
                      
                      <div className="row g-4">
                          <div className="col-md-6 d-flex align-items-start gap-3">
                              <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger"><i className="fas fa-map-marker-alt"></i></div>
                              <div>
                                  <h6 className="fw-bold mb-1">Alamat</h6>
                                  <p className="text-muted small mb-0">{umkm.location}</p>
                              </div>
                          </div>
                          <div className="col-md-6 d-flex align-items-start gap-3">
                              <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger"><i className="fas fa-clock"></i></div>
                              <div>
                                  <h6 className="fw-bold mb-1">Jam Operasional</h6>
                                  <p className="text-muted small mb-0">
                                    {umkm.operatingHours ? `${umkm.operatingHours.open}:00 - ${umkm.operatingHours.close}:00 WIB` : '08:00 - 22:00 WIB'}
                                  </p>
                              </div>
                          </div>
                      </div>
                      
                      <div className="mt-4 d-flex gap-2">
                          <Link to={`/detail/${umkm.id}`} className="btn btn-outline-dark w-100 rounded-pill">
                             Kunjungi Profil Toko
                          </Link>
                      </div>
                  </div>
                  
                  {/* 4. COMMENT SECTION REMOVED AS REQUESTED */}

               </div>
            </div>
         </div>
      </section>

      <section className="py-5 bg-light border-top">
          <div className="container">
            <div className="mb-4">
                <h3 className="fw-bold text-dark d-inline-block border-bottom border-danger border-3 pb-2">
                    Postingan Terkait
                </h3>
            </div>

            <div className="row g-4">
                {relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost) => (
                        <PostCard key={relatedPost.id} data={relatedPost} />
                    ))
                ) : (
                    <div className="col-12 text-center">Tidak ada postingan terkait lainnya.</div>
                )}
            </div>
          </div>
      </section>

      <Footer />
    </>
  );
}

export default PostDetail;