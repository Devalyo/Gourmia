document.addEventListener('DOMContentLoaded', function() {

    const whatsAppCircle  = document.querySelector('.float');
    const pecaScreen      = document.querySelector('#peca');

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = navLinks.forEach(link => {

        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const slider          = document.querySelector('.slider');
    const slides          = document.querySelectorAll('.slide');
    const prevBtn         = document.querySelector('.prev');
    const nextBtn         = document.querySelector('.next');
    const dots            = document.querySelectorAll('.dot');
    const sliderContainer = document.querySelector('.slider-container');

    function setActiveLink() {
        const scrollPos = window.scrollY + 100; 
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) 
            {
                link.classList.add('active');
            } 
            else 
            {
                link.classList.remove('active');
            }
        });
    
    }

    function hideWhatsapp()
    {
        const windowHeight = window.innerHeight;
        const pecaRect = pecaScreen.getBoundingClientRect();

        if(pecaRect.top < windowHeight && pecaRect.bottom >= 0)
        {
            whatsAppCircle.setAttribute("style", "display: none")
        }
        else
        {
            whatsAppCircle.setAttribute("style", "display: block")
        }

    }

    let currentIndex = 0; 
    let autoSlideInterval; 

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function showSlides(index) {
        if (index >= slides.length) {
            currentIndex = 0; // 
        } else if (index < 0) {
            currentIndex = slides.length - 1; 
        } else {
            currentIndex = index; 
        }
        slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide transition
        updateDots(); 
    }

    function nextSlide() {
        showSlides(currentIndex + 1);
    }

    function prevSlide() {
        showSlides(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval); 
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoSlide(); 
            showSlides(parseInt(dot.dataset.index)); 
            startAutoSlide(); 
        });
    });

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    sliderContainer.addEventListener('mouseover', stopAutoSlide);
    sliderContainer.addEventListener('mouseout', startAutoSlide);

    startAutoSlide();
    updateDots(); 

    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('scroll', hideWhatsapp);
    setActiveLink(); 
});