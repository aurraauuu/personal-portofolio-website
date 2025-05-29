// navbar
 const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("text-blue-500", "font-bold");
            if (link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("text-blue-500", "font-bold");
            }
          });
        }
      });
    },
    {
      threshold: 0.6, // lebih dari 60% terlihat baru aktif
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });



/// hero section 
const nameElement = document.getElementById("typing-name");
  const nameText = "Aura Fadila M";
  let index = 0;

  function typeText() {
    if (index <= nameText.length) {
      nameElement.innerText = nameText.substring(0, index);
      index++;
      setTimeout(typeText, 120); // kecepatan ketik
    }
  }

  // Mulai saat halaman dimuat
  window.addEventListener("DOMContentLoaded", typeText);


// Skill
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll('.skill-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    skillItems.forEach(item => {
      observer.observe(item);
    });
  } else {
    skillItems.forEach(item => {
      animateSkill(item);
    });
  }

  function animateSkill(skillItem) {
    const circle = skillItem.querySelector('.progress-ring');
    const text = skillItem.querySelector('div.absolute'); // tempat angka di tengah

    if (!circle || !text) return;

    const percentage = parseInt(circle.getAttribute('data-percentage'));
    const radius = circle.getAttribute('r');
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;

    let startTimestamp = null;
    const duration = 1500; // durasi animasi dalam ms (1.5 detik)
    
    // Mulai dari dashoffset penuh (lingkaran penuh terisi)
    const startOffset = circumference;
    // Target dashoffset sesuai persentase skill
    const endOffset = circumference - (percentage / 100) * circumference;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;

      // Hitung progress animasi 0..1
      let progress = Math.min(elapsed / duration, 1);

      // Animasi stroke dashoffset dari startOffset ke endOffset
      const currentOffset = startOffset - (startOffset - endOffset) * progress;
      circle.style.strokeDashoffset = currentOffset;

      // Animasi angka dari 0 ke percentage
      const currentNumber = Math.floor(percentage * progress);
      text.textContent = currentNumber + '%';

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Pastikan angka akhir pas dengan target
        text.textContent = percentage + '%';
      }
    }

    // Mulai animasi
    requestAnimationFrame(step);
  }
});



//Award Sction 

    const images = [
      {
        src: "image/certificate/certificate1.png",
        title: "Certificate in Web Development",
        description: "Recognized for completing a comprehensive web development course."
      },
      {
        src: "image/certificate/certificate2.png",
        title: "Award of Excellence in Coding",
        description: "Awarded for demonstrating exceptional programming skills."
      },
      {
        src: "image/certificate/certificate3.png",
        title: "JavaScript Mastery Certificate",
        description: "Certified for mastering advanced JavaScript concepts."
      },
      {
        src: "image/certificate/certificate4.png",
        title: "Best Design Project",
        description: "Won the best design project award for UI/UX creativity."
      },
      {
        src: "image/certificate/certificate5.png",
        title: "Python Programming Award",
        description: "Earned for outstanding performance in Python programming."
      }
    ];

    let currentIndex = 0;

    function updateDetails(index) {
      const title = images[index].title;
      const description = images[index].description;
      const detailBox = document.getElementById("awardDetail");

      detailBox.innerHTML = `
        <div class='bg-white shadow-lg rounded-lg p-5 border border-indigo-200'>
          <h3 class='text-xl font-bold mb-2 text-indigo-700'>${title}</h3>
          <p class='text-gray-700 text-base'>${description}</p>
        </div>
      `;
      detailBox.classList.remove("hidden");
      detailBox.classList.add("fade-in");
    }

    function showImage(index, direction = 'next') {
      const img = document.getElementById("awardImage");

      img.classList.remove("flip-next", "flip-prev");
      void img.offsetWidth;

      if (direction === "next") {
        img.classList.add("flip-next");
      } else {
        img.classList.add("flip-prev");
      }

      setTimeout(() => {
        img.src = images[index].src;
        img.alt = images[index].title;
        img.setAttribute("data-title", images[index].title);
        img.setAttribute("data-description", images[index].description);

        const detailBox = document.getElementById("awardDetail");
        detailBox.classList.add("hidden");
        detailBox.innerHTML = "";
      }, 350);
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex, "next");
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex, "prev");
    }

    window.addEventListener("DOMContentLoaded", () => {
      showImage(currentIndex);
    });

//Portofolio section
  const data = {
    concert: {
      img: "image/portofolio/portofolio1.png",
      desc: "Introducing the Concert Project — your ultimate gateway to unforgettable live music experiences. This website is designed to connect music lovers with the latest concerts, festivals, and performances happening around them. Whether you're searching for your favorite band, discovering new genres, or simply planning your next night out, the Concert Project provides everything you need in one convenient platform. With features like artist profiles, event schedules, ticket booking, and location maps, users can explore the world of music in a simple, engaging, and interactive way. It's more than just a concert directory — it's a complete digital experience for fans who live for the rhythm.",
      link: "https://aurraauuu.github.io/konser/"
    },
    history: {
      img: "image/portofolio/portofolio2.png",
      desc: "Welcome to the History Project — a digital journey through time that brings the past to life. From ancient civilizations to modern revolutions, this website allows users to explore key moments in history through images, stories, and interactive timelines, all presented in a user-friendly and visually engaging format. Designed to spark curiosity and deepen understanding, the History Project serves as a learning platform for students, educators, and history enthusiasts alike. Whether you're uncovering the mysteries of the pyramids, tracing the rise and fall of empires, or following the evolution of global events, this project makes history accessible, immersive, and relevant for everyone.",
      link: "https://aurraauuu.github.io/history/"
    },
    ecomer: {
      img: "image/portofolio/portofolio3.png",
      desc: "This is the Ecomer Project — an innovative e-commerce website designed to provide a seamless online shopping experience. Built with user convenience in mind, Ecomer offers a clean interface, responsive design, and a wide range of product categories to meet everyday needs. From browsing items and reading product details to managing your cart and completing secure checkouts, every feature is developed to ensure a smooth and enjoyable experience for the user. Whether you're a first-time buyer or a regular customer, Ecomer is your go-to platform for smart, fast, and hassle-free online shopping.",
      link: "https://aurraauuu.github.io/store/"
    },
    travel: {
      img: "image/portofolio/portofolio4.png",
      desc: "Travel Project is an initiative aimed at exploring unique and lesser-known travel destinations. This project seeks to introduce local cultures, natural beauty, and tourism potential from various regions through firsthand experiences, travel documentation, and digital media.",
      link: "https://aurraauuu.github.io/travel/"
    },
    hospital: {
      img: "image/portofolio/portofolio5.png",
      desc: "This is the Hospital Project.An initiative to transform the way we see and experience healthcare.We’re building more than just a hospital — we're creating a healing space that combines modern technology, warm design, and a deep sense of care.Here, patients aren’t just treated, they’re truly cared for.This is where innovation meets compassion, and where every life matters.",
      link: "https://aurraauuu.github.io/hospital/"
    },
    travel2: {
      img: "image/portofolio/portofolio6.png",
      desc: "This is the Travel2 Project. It’s a journey to uncover hidden destinations, celebrate diverse cultures, and showcase the natural beauty that often goes unnoticed. Through immersive travel experiences and compelling digital storytelling, Travel2 invites people to see the world through a new lens — one that values authenticity, local wisdom, and unforgettable adventures. More than just exploring places, Travel2 is about connecting with people, embracing new perspectives, and inspiring others to travel with purpose.",
      link: " https://aurraauuu.github.io/travel2/"
    },
  };

  function showContent(key) {
    const project = data[key];
    document.getElementById("mainImage").src = project.img;
    document.getElementById("description").textContent = project.desc;
    document.getElementById("projectLink").href = project.link;
  }

  // Testimonial Section

   const testimonials = [
      { image: 'image/testimonial/testimonial1.jpeg', text: 'Excellent cooperation. Our project was handled quickly and the quality was very satisfactory.', name: 'Liam Carter', profession: '' },
      { image: 'image/testimonial/testimonial2.jpeg', text: 'Another great experience working with them. Highly recommended!', name: 'Sophia Miller', profession: 'Marketing Manager' },
      { image: 'image/testimonial/testimonial3.jpeg', text: 'The team was very professional and delivered beyond our expectations.', name: 'Ethan Davis', profession: 'CEO' },
      { image: 'image/testimonial/testimonial4.jpeg', text: 'Impressed with their attention to detail and commitment to quality.', name: 'Olivia Wilson', profession: 'Project Lead' },
      { image: 'image/testimonial/testimonial5.jpeg', text: 'A pleasure to work with. They are responsive and truly understand our needs.', name: 'Noah Garcia', profession: 'Sales Director' },
    ];

    const mainImage = document.getElementById('main-image');
    const testimonialText = document.getElementById('testimonial-text');
    const clientName = document.getElementById('client-name');
    const clientProfession = document.getElementById('client-profession');
    const navContainer = document.getElementById('testimonial-navigation');

    let activeIndex = 0;

    function updateTestimonial(index) {
      const t = testimonials[index];
      testimonialText.classList.add('opacity-0');
      setTimeout(() => {
        mainImage.src = t.image;
        testimonialText.textContent = t.text;
        clientName.textContent = t.name;
        clientProfession.textContent = t.profession;
        testimonialText.classList.remove('opacity-0');
      }, 300);

      document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('bg-indigo-600'));
      const activeDot = document.getElementById(`dot-${index}`);
      if (activeDot) activeDot.classList.add('bg-indigo-600');

      activeIndex = index;
    }

    // Orbit image click
    document.querySelectorAll('img[data-index]').forEach(img => {
      img.addEventListener('click', () => {
        const index = parseInt(img.getAttribute('data-index'));
        updateTestimonial(index);
      });
    });

    // Dot navigation
    function createDots() {
      testimonials.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'w-4 h-4 rounded-full bg-gray-300 nav-dot cursor-pointer transition-all duration-300 ease-in-out';
        dot.id = `dot-${i}`;
        if (i === 0) dot.classList.add('bg-indigo-600');
        dot.addEventListener('click', () => updateTestimonial(i));
        navContainer.appendChild(dot);
      });
    }

    // Main image click (next)
    mainImage.addEventListener('click', () => {
      const next = (activeIndex + 1) % testimonials.length;
      updateTestimonial(next);
    });


    createDots();
    updateTestimonial(0);

    //contact section
  function animateAndOpenModal(img) {
    img.classList.add('img-bounce');
    setTimeout(() => {
      img.classList.remove('img-bounce');
      openModal();
    }, 600);
  }

  function openModal() {
    const modal = document.getElementById('locationModal');
    const content = document.getElementById('modalContent');
    modal.classList.remove('hidden');
    content.classList.add('modal-enter');
    content.classList.remove('opacity-0');
  }

  function closeModal() {
    const modal = document.getElementById('locationModal');
    const content = document.getElementById('modalContent');
    modal.classList.add('hidden');
    content.classList.remove('modal-enter');
    content.classList.add('opacity-0');
  }

  // keterangan terkirim
    const form = document.getElementById("contactForm");
  const notif = document.getElementById("notification");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    })
      .then(res => {
        if (res.ok) {
          // Show notification
          notif.classList.remove("opacity-0", "pointer-events-none", "translate-y-[-20px]");
          notif.classList.add("opacity-100", "translate-y-0");

          form.reset();

          setTimeout(() => {
            notif.classList.add("opacity-0", "pointer-events-none", "translate-y-[-20px]");
            notif.classList.remove("opacity-100", "translate-y-0");
          }, 3000);
        } else {
          alert("❌ Failed to send message. Please try again.");
        }
      })
      .catch(() => alert("⚠️ There was an error sending the message."));
  });

