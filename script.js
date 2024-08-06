document.addEventListener('DOMContentLoaded', function () {
  // Toggle mobile menu
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburgerIcon.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  // Popup functionality
  const logo = document.querySelector('.logo-company');
  const popup = document.querySelector('.popup-wrapper');
  const popupForm = document.querySelector('.popup-form');
  const popupBtn = document.querySelector('.popup-open');
  const popupClose = document.querySelector('.close-btn');

  popupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPopup();
  });

  popupClose.addEventListener('click', (e) => {
    e.preventDefault();
    removePopup();
  });

  popupForm.addEventListener('submit', () => {
    removePopup();
  });

  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup-wrapper')) {
      removePopup();
    }
  });

  function showPopup() {
    popup.classList.add('active');
    disableScroll();
  }

  function removePopup() {
    popup.classList.remove('active');
    enableScroll();
  }

  function disableScroll() {
    document.body.classList.add('no-scroll');
  }

  function enableScroll() {
    document.body.classList.remove('no-scroll');
  }

  // Logo reload
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
  });

  // Contact form submission
  const contactForm = document.querySelector('.popup-form');
  const contactName = document.getElementById('name');
  const contactEmail = document.getElementById('email');
  const contactSubject = document.getElementById('subject');
  const contactMessage = document.getElementById('message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: contactName.value,
      email: contactEmail.value,
      subject: contactSubject.value,
      message: contactMessage.value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.responseText === 'Email sent successfully') {
        Swal.fire({
          icon: 'success',
          title: 'Email wysłano pomyślnie!',
          text: 'Twoja wiadomość została wysłana.',
        });
        contactName.value = '';
        contactEmail.value = '';
        contactSubject.value = '';
        contactMessage.value = '';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Błąd!',
          text: 'Coś poszło nie tak. Wiadomość nie została wysłana.',
        });
      }
    };
    xhr.send(JSON.stringify(formData));
  });

  // Gallery modal
  const gallery = document.querySelector('.gallery');
  const modal = document.querySelector('.modal-reference');
  const projectGalleryModal = document.getElementById('project-gallery-modal');
  const closeGalleryBtn = document.querySelector('.close-gallery');
  const galleryImage = document.querySelector('.gallery-image');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentProjectImages = [];
  let currentImageIndex = 0;

  gallery.addEventListener('click', function (event) {
    const image = event.target.closest('.logo');

    if (image) {
      const dataModalSrc = image.getAttribute('data-modal-src');
      const captionText = image.getAttribute('alt');

      if (dataModalSrc) {
        modal.style.display = 'block';
        const modalContent = modal.querySelector('.modal-content');
        const caption = modal.querySelector('.caption');

        if (modalContent) {
          modalContent.setAttribute('src', dataModalSrc);
          caption.textContent = captionText;
          disableScroll();
        } else {
          console.error('Nie znaleziono zawartości modala');
        }
      } else {
        console.error('Brak atrybutu data-modal-src');
      }
    }
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      enableScroll();
    }
  };

  function openGallery(images, index) {
    currentProjectImages = images;
    currentImageIndex = index;
    updateGalleryImage();
    projectGalleryModal.style.display = 'block';
    disableScroll();
  }

  function closeGallery() {
    projectGalleryModal.style.display = 'none';
    enableScroll();
  }

  function updateGalleryImage() {
    if (currentProjectImages.length > 0) {
      galleryImage.src = currentProjectImages[currentImageIndex];
    }
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    updateGalleryImage();
  }

  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + currentProjectImages.length) %
      currentProjectImages.length;
    updateGalleryImage();
  }

  closeGalleryBtn.addEventListener('click', closeGallery);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  window.addEventListener('click', function (event) {
    if (event.target === projectGalleryModal) {
      closeGallery();
    }
  });

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', function () {
      const images = JSON.parse(this.getAttribute('data-images'));
      openGallery(images, 0);
    });
  });
});
