document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const tabBtns = document.querySelectorAll('.comp-tab');
    const tabContents = document.querySelectorAll('.comp-panel');
    
    console.log('Найдено кнопок компетенций:', tabBtns.length);
    console.log('Найдено панелей компетенций:', tabContents.length);
    
    function switchCompetencyTab(tabId) {
        tabContents.forEach(function(content) {
            content.classList.remove('active');
        });
        var targetPanel = document.getElementById('comp-' + tabId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
        tabBtns.forEach(function(btn) {
            btn.classList.remove('active');
        });
        var activeBtn = document.querySelector('.comp-tab[data-comp="' + tabId + '"]');
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    for (var i = 0; i < tabBtns.length; i++) {
        tabBtns[i].addEventListener('click', function() {
            var compId = this.getAttribute('data-comp');
            switchCompetencyTab(compId);
        });
    }

    const citizenSlider = document.getElementById('citizenSlider');
    const citizenPrev = document.getElementById('citizenPrev');
    const citizenNext = document.getElementById('citizenNext');
    const citizenDots = document.getElementById('citizenDots');

    let citizenIndex = 0;
    let citizenItems = 0;

    function initCitizenSlider() {
        if (!citizenSlider) return;
        const items = citizenSlider.querySelectorAll('.slide-item');
        citizenItems = items.length;
        if (citizenItems === 0) return;

        if (citizenDots) {
            citizenDots.innerHTML = '';
            for (var i = 0; i < citizenItems; i++) {
                var dot = document.createElement('div');
                dot.classList.add('indicator');
                if (i === citizenIndex) dot.classList.add('active');
                dot.addEventListener('click', (function(idx) {
                    return function() { goToCitizenSlide(idx); };
                })(i));
                citizenDots.appendChild(dot);
            }
        }

        if (citizenPrev) {
            citizenPrev.onclick = function() { goToCitizenSlide(citizenIndex - 1); };
        }
        if (citizenNext) {
            citizenNext.onclick = function() { goToCitizenSlide(citizenIndex + 1); };
        }
    }

    function goToCitizenSlide(index) {
        if (index < 0) index = 0;
        if (index >= citizenItems) index = citizenItems - 1;
        citizenIndex = index;

        var itemWidth = citizenSlider.querySelector('.slide-item') ? citizenSlider.querySelector('.slide-item').offsetWidth : 0;
        citizenSlider.scrollTo({ left: citizenIndex * (itemWidth + 16), behavior: 'smooth' });

        var dots = document.querySelectorAll('.indicator');
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === citizenIndex);
        }
    }

    if (citizenSlider) {
        citizenSlider.addEventListener('scroll', function() {
            var itemWidth = citizenSlider.querySelector('.slide-item') ? citizenSlider.querySelector('.slide-item').offsetWidth : 0;
            var newIndex = Math.round(citizenSlider.scrollLeft / (itemWidth + 16));
            if (newIndex !== citizenIndex && newIndex >= 0 && newIndex < citizenItems) {
                citizenIndex = newIndex;
                var dots = document.querySelectorAll('.indicator');
                for (var i = 0; i < dots.length; i++) {
                    dots[i].classList.toggle('active', i === citizenIndex);
                }
            }
        });
        initCitizenSlider();
        window.addEventListener('resize', function() { setTimeout(initCitizenSlider, 100); });
    }

    // ========== ПУСТОЕ МОДАЛЬНОЕ ОКНО ==========
    window.openEmptyModal = function() {
        const modalHTML = `
            <div class="modal-overlay" onclick="window.closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <button class="modal-close" onclick="window.closeModal()">&times;</button>
                    <h2 class="modal-title">🔮 Скоро здесь будут проекты</h2>
                    <div class="modal-tech">⏳ В разработке</div>
                    <p class="modal-description">На данный момент активные проекты находятся в стадии разработки. Следите за обновлениями!</p>
                    <div class="modal-features">
                        <h4>Планируемые направления:</h4>
                        <ul>
                            <li>✓ Веб-разработка</li>
                            <li>✓ Мобильные приложения</li>
                            <li>✓ Базы данных</li>
                            <li>✓ Информационные системы</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeModal();
        }
    });

    // ========== ГАЛЕРЕЯ ==========
    const galleryImages = [
        { src: "images/sertif.jpg", alt: "Сертификат участника" },
        { src: "images/sertif2.jpg", alt: "Сертификат 2" },
        { src: "images/samolet.jpg", alt: "Диплом за 1 место" },
        { src: "images/samolet2.jpg", alt: "Диплом за 2 место" },
    ];

    let currentImageIndex = 0;

    function renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        for (var i = 0; i < galleryImages.length; i++) {
            var image = galleryImages[i];
            var galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-index', i);
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
            `;

            galleryItem.addEventListener('click', (function(idx) {
                return function() { openLightbox(idx); };
            })(i));
            galleryGrid.appendChild(galleryItem);
        }
    }

    function openLightbox(index) {
        currentImageIndex = index;
        var image = galleryImages[currentImageIndex];

        var lightboxHTML = `
            <div class="lightbox" onclick="window.closeLightbox(event)">
                <button class="lightbox-close" onclick="window.closeLightbox()">&times;</button>
                <button class="lightbox-prev" onclick="window.prevImage(event)">❮</button>
                <img src="${image.src}" alt="${image.alt}">
                <button class="lightbox-next" onclick="window.nextImage(event)">❯</button>
                <div class="lightbox-counter">${currentImageIndex + 1} / ${galleryImages.length}</div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        document.body.style.overflow = 'hidden';
    }

    window.closeLightbox = function(event) {
        if (event && event.target !== event.currentTarget && !event.target.classList.contains('lightbox-close') && !event.target.classList.contains('lightbox-prev') && !event.target.classList.contains('lightbox-next')) return;
        var lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.remove();
            document.body.style.overflow = '';
        }
    };

    window.prevImage = function(event) {
        event.stopPropagation();
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }
        updateLightboxImage();
    };

    window.nextImage = function(event) {
        event.stopPropagation();
        currentImageIndex++;
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        updateLightboxImage();
    };

    function updateLightboxImage() {
        var lightbox = document.querySelector('.lightbox');
        if (!lightbox) return;

        var image = galleryImages[currentImageIndex];
        var imgElement = lightbox.querySelector('img');
        var counterElement = lightbox.querySelector('.lightbox-counter');

        if (imgElement) {
            imgElement.src = image.src;
            imgElement.alt = image.alt;
        }
        if (counterElement) {
            counterElement.textContent = (currentImageIndex + 1) + ' / ' + galleryImages.length;
        }
    }

    document.addEventListener('keydown', function(e) {
        var lightbox = document.querySelector('.lightbox');
        if (!lightbox) return;

        if (e.key === 'Escape') {
            window.closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            window.prevImage(e);
        } else if (e.key === 'ArrowRight') {
            window.nextImage(e);
        }
    });

    renderGallery();
});
