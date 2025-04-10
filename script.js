// Animasi hati di latar belakang
document.addEventListener('DOMContentLoaded', function() {
    const loveContainer = document.getElementById('loveAnimation');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Konfigurasi untuk animasi hati
    const heartColors = [
      '#e91e63', // Pink
      '#d81b60', // Deep Pink
      '#ec407a', // Light Pink
      '#ad1457', // Dark Pink
      '#c2185b'  // Medium Pink
    ];
    
    const maxHearts = window.innerWidth < 600 ? 15 : 25; // Lebih sedikit di layar kecil
    
    // Membuat hati di interval tertentu
    function createHeart() {
      if (document.querySelectorAll('.heart').length >= maxHearts) return;
      
      const heart = document.createElement('div');
      heart.classList.add('heart');
      
      // Ukuran acak
      const size = Math.random() * 20 + 15; // 15px - 35px
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      
      // Posisi awal acak di bagian bawah
      const startX = Math.random() * containerWidth;
      heart.style.left = `${startX}px`;
      heart.style.bottom = '-50px';
      
      // Warna acak dari palet kita
      const colorIndex = Math.floor(Math.random() * heartColors.length);
      heart.style.filter = `hue-rotate(${Math.random() * 20 - 10}deg) opacity(${Math.random() * 0.3 + 0.7})`;
      
      // Durasi acak untuk animasi
      const duration = Math.random() * 6 + 10; // 10-16 detik
      heart.style.setProperty('--duration', `${duration}s`);
      
      // Efek melayang horizontal random
      const floatDistance = Math.random() * 100 - 50; // -50px to 50px
      heart.animate([
        { transform: `translateY(100vh) translateX(0) scale(0)` },
        { transform: `translateY(50vh) translateX(${floatDistance/2}px) scale(${Math.random() * 0.5 + 0.5})` },
        { transform: `translateY(0) translateX(${floatDistance}px) scale(1)` }
      ], {
        duration: duration * 1000,
        easing: 'ease-out',
        fill: 'forwards'
      });
      
      // Hapus hati setelah animasi selesai
      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
      
      loveContainer.appendChild(heart);
    }
    
    // Mulai animasi hati dengan interval acak
    function startHeartAnimation() {
      createHeart();
      setTimeout(startHeartAnimation, Math.random() * 900 + 600); // Interval 600-1500ms
    }
    
    // Mulai animasi setelah halaman dimuat
    startHeartAnimation();
    
    // Animasi tambahan saat mengklik container
    document.querySelector('.container').addEventListener('click', function(e) {
      // Hindari animasi jika mengklik tombol
      if (e.target.tagName !== 'BUTTON') {
        // Buat beberapa hati tambahan pada lokasi klik
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            const size = Math.random() * 15 + 10;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            // Posisikan di lokasi klik
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            
            const duration = Math.random() * 2 + 1;
            heart.style.setProperty('--duration', `${duration}s`);
            
            // Animasi melayang ke atas dari posisi klik
            heart.animate([
              { transform: 'scale(0)', opacity: 0.8 },
              { transform: `translateY(-${Math.random() * 50 + 50}px) scale(1)`, opacity: 0 }
            ], {
              duration: duration * 1000,
              easing: 'ease-out',
              fill: 'forwards'
            });
            
            this.appendChild(heart);
            
            setTimeout(() => {
              heart.remove();
            }, duration * 1000);
          }, i * 100);
        }
      }
    });
  });
  
  // Perbaikan fungsi transisi antar menu
  function tampilkan(id) {
    // Sembunyikan semua konten terlebih dahulu
    const konten = document.querySelectorAll('.konten');
    
    // Hapus kelas 'aktif' dari semua elemen konten
    konten.forEach(k => {
      k.classList.remove('aktif');
    });
    
    // Tambahkan jeda sebelum menampilkan konten baru
    setTimeout(() => {
      // Tampilkan konten yang dipilih
      document.getElementById(id).classList.add('aktif');
    }, 10); // Jeda sangat singkat untuk memastikan transisi berjalan dengan baik
  }
  
  // Mengatur musik latar
  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const tombol = document.getElementById('musicButton');
    let sudahDimainkan = false;
  
    // Untuk memastikan musik bisa dimulai setelah interaksi pertama
    document.body.addEventListener('click', () => {
      if (!sudahDimainkan) {
        audio.volume = 0.7; // Set volume lebih rendah
        audio.play().then(() => {
          tombol.textContent = "Jeda Melodi Cinta ⏸️";
        }).catch(() => {
          tombol.textContent = "Putar Melodi Cinta 🎵";
        });
        sudahDimainkan = true;
      }
    }, { once: true });
  });
  
  // Fungsi tombol play/pause
  function toggleMusik() {
    const audio = document.getElementById('bgMusic');
    const tombol = document.getElementById('musicButton');
    
    if (audio.paused) {
      audio.play().then(() => {
        tombol.textContent = "Jeda Melodi Cinta ⏸️";
        tombol.style.background = "linear-gradient(to right, #9c27b0, #7b1fa2)";
      });
    } else {
      audio.pause();
      tombol.textContent = "Putar Melodi Cinta 🎵";
      tombol.style.background = "linear-gradient(to right, #ba68c8, #9c27b0)";
    }
  }