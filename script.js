document.addEventListener('DOMContentLoaded', function() {

    const whatsAppCircle = document.querySelector('.float');
    const pecaScreen     = document.querySelector('#peca');

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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

    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('scroll', hideWhatsapp);
    setActiveLink(); 
});
