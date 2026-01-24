import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 5%',
        backgroundColor: '#1976d2', // Strong blue background for visual priority
        color: 'white'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Shalom Bay</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Home</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Products</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>About</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Contact</a>
          
          {/* Cart Icon with Item Count */}
          <div style={{ 
            backgroundColor: 'white', 
            color: '#1976d2', 
            padding: '8px 16px', 
            borderRadius: '20px', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            cursor: 'pointer'
          }}>
            <span>🛒</span> Cart (2)
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#e3f2fd', // Light blue background to maintain brand feel
        padding: '50px 20px',       // Reduced vertical spacing for mobile
        textAlign: 'center'
      }}>
        {/* Value-driven headline */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0d47a1', marginBottom: '1rem' }}>
          Premium Health Supplements You Can Trust
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#546e7a', marginBottom: '2rem' }}>
          Vitamins • Proteins • Wellness Products — Delivered in Kumasi & Beyond
        </p>

        {/* 2 CTAs: Shop & WhatsApp */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button style={{
            backgroundColor: '#1976d2', color: 'white', padding: '15px 30px', // Larger touch target
            border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer'
          }}>
            Shop Products
          </button>
          <button style={{
            backgroundColor: '#25D366', color: 'white', padding: '15px 30px', // Larger touch target
            border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer'
          }}>
            Order on WhatsApp
          </button>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section style={{ padding: '30px 20px', textAlign: 'center' }}>
        {/* Search Bar with Contextual Placeholder */}
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search vitamins, protein, supplements…" 
            style={{
              width: '100%', maxWidth: '600px', padding: '15px 25px',
              borderRadius: '30px', border: '2px solid #e3f2fd', fontSize: '1.1rem',
              outline: 'none'
            }}
          />
        </div>
        
        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {['Vitamins', 'Protein', 'Energy', 'Immune Support'].map((category) => (
            <button key={category} style={{
              padding: '12px 24px', borderRadius: '25px', border: '1px solid #e0e0e0',
              backgroundColor: 'white', color: '#546e7a', cursor: 'pointer', fontWeight: '500'
            }}>
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section style={{ padding: '40px 20px', backgroundColor: '#fafafa' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontSize: '2rem' }}>Special Offers</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {/* Offer Card */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '380px',
            overflow: 'hidden'
          }}>
            {/* Reduced Image Height */}
            <div style={{ height: '200px', backgroundColor: '#eeeeee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#757575', fontSize: '5rem' }}>
              💊
            </div>
            
            <div style={{ padding: '25px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>Summer Vitamin Bundle</h3>
              <p style={{ fontSize: '1.1rem', margin: '0 0 15px 0', color: '#424242' }}>
                Get 20% off all vitamins this summer!
              </p>
              <p style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '20px' }}>
                ⏳ Limited stock available
              </p>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{
                  flex: 1, backgroundColor: '#1976d2', color: 'white', padding: '14px', // Min 44px height
                  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                }}>
                  Shop Vitamins
                </button>
                <button style={{
                  flex: 1, backgroundColor: 'white', color: '#25D366', border: '2px solid #25D366', // Min 44px height
                  padding: '14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                }}>
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontSize: '2rem' }}>Featured Products</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {[1, 2, 3].map((id) => (
            <div key={id} style={{ 
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: '300px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Product Image */}
              <div style={{ height: '200px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                💊
              </div>
              
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Product Name (bold) */}
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>Essential Vitamin C</h3>
                
                {/* Key benefit (short) */}
                <p style={{ color: '#616161', fontSize: '0.95rem', margin: '0 0 10px 0' }}>Boosts immunity & energy</p>
                
                {/* Price (bigger, bolder) */}
                <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1976d2', margin: '0 0 5px 0' }}>GH₵ 120.00</p>
                
                {/* Stock info (smaller, muted) */}
                <p style={{ fontSize: '0.85rem', color: '#757575', margin: '0 0 15px 0' }}>120 in stock</p>
                
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Primary CTA: Add to Cart (Blue) */}
                  <button style={{
                    backgroundColor: '#1976d2', color: 'white', padding: '14px', // Min 44px height
                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%'
                  }}>
                    Add to Cart
                  </button>
                  
                  {/* Secondary CTA: WhatsApp (Outline) */}
                  <button style={{
                    backgroundColor: 'transparent', color: '#25D366', border: '1px solid #25D366', // Min 44px height
                    padding: '14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%'
                  }}>
                    Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky WhatsApp Button (Mobile Optimized) */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        zIndex: 1000,
        fontSize: '2rem'
      }}>
        💬
      </div>
    </div>
  );
};

export default Home;
