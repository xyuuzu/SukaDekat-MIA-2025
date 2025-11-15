import MyNavbar from '../components/NavBar';
import Footer from '../components/Footer';
import SearchCard from '../components/SearchCard';
import PostCard from '../components/PostCard';
import { umkmData } from '../data/umkmData';
import { Link } from 'react-router-dom';

function Home() {
  const allPosts = umkmData.flatMap(umkm => 
    umkm.posts.map(post => ({
        ...post,
        umkmId: umkm.id,
        name: umkm.name,
        profileImg: umkm.profileImg,
        category: umkm.category,
        location: umkm.location,
        promo: umkm.promo,
    }))
  );

  return (
    <>
      <MyNavbar />
      
      <section className="hero-section position-relative d-flex align-items-center" style={{minHeight: '85vh', paddingTop: '80px'}}>
        <div className="floating-elements position-absolute w-100 h-100 overflow-hidden top-0 start-0">
            <div className="floating-element bg-white opacity-10 rounded-circle position-absolute" style={{width: '80px', height: '80px', top: '15%', left: '10%'}}></div>
            <div className="floating-element bg-white opacity-10 rounded-circle position-absolute" style={{width: '120px', height: '120px', top: '60%', left: '80%'}}></div>
        </div>
        
        <div className="container position-relative z-2">
            <div className="row justify-content-center">
                <div className="col-lg-10 text-center text-white">
                    <div className="hero-content mb-5">
                        <h1 className="display-3 fw-bold mb-3">Solusi Lokal, Selalu Dekat. <span className="d-block">Sukadekat!</span></h1>
                        <p className="lead opacity-75 mb-4">Temukan tempat terdekat dengan ulasan terpercaya dari komunitas lokal.</p>
                        
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <SearchCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <main className="container mt-5 pt-4">
        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2 border-danger">
            <h2 className="fw-bold m-0 text-dark">Kabar Terbaru UMKM</h2>
            <Link to="/umkm" className="text-danger text-decoration-none fw-semibold">Lihat Semua <i className="fas fa-arrow-right ms-1"></i></Link>
        </div>

        <div className="row g-4 justify-content-center">
          {allPosts.slice(0, 6).map((postItem) => (
            <PostCard key={postItem.id} data={postItem} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;