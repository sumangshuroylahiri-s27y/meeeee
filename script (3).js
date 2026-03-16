document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        } else {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.remove('py-2');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.add('py-2');
        }
    });

    // EmailJS Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Change button state
            const btnText = document.getElementById('btn-text');
            const btnIcon = document.getElementById('btn-icon');
            const btnSpinner = document.getElementById('btn-spinner');
            
            const originalText = btnText.textContent;
            btnText.textContent = 'Sending...';
            btnIcon.classList.add('hidden');
            btnSpinner.classList.remove('hidden');
            submitBtn.disabled = true;

            // EmailJS parameters
            // IMPORTANT: Replace these with your actual EmailJS Service ID and Template ID
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        showStatus('Message sent successfully! I will get back to you soon.', 'success');
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error);
                        showStatus('Failed to send message. Please try again later or contact directly via email/phone.', 'error');
                    })
                    .finally(() => {
                        // Restore button state
                        btnText.textContent = originalText;
                        btnIcon.classList.remove('hidden');
                        btnSpinner.classList.add('hidden');
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback if EmailJS is not loaded/configured
                setTimeout(() => {
                    showStatus('EmailJS is not configured. Please set up your Public Key, Service ID, and Template ID in the code.', 'error');
                    btnText.textContent = originalText;
                    btnIcon.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.classList.remove('hidden', 'bg-green-500/20', 'text-green-400', 'bg-red-500/20', 'text-red-400');
        
        if (type === 'success') {
            formStatus.classList.add('bg-green-500/20', 'text-green-400', 'border', 'border-green-500/50');
        } else {
            formStatus.classList.add('bg-red-500/20', 'text-red-400', 'border', 'border-red-500/50');
        }
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    }
});
