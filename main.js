document.addEventListener('DOMContentLoaded', function() {
    // Declare gtag if it's not already defined
    if (typeof dataLayer === 'undefined') {
        window.dataLayer = window.dataLayer || [];
    }
    if (typeof gtag === 'undefined') {
        window.gtag = function() {
            dataLayer.push(arguments);
        }
    }
  
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Discord Webhook Integration for Commission Form
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const commissionType = document.getElementById('commissionType').value;
            const description = document.getElementById('description').value;
            const termsAgree = document.getElementById('termsAgree').checked;
            
            if (!name || !email || !commissionType || !description || !termsAgree) {
                alert('Please fill out all required fields and agree to the terms.');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Track form submission in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Commission',
                    'event_label': commissionType
                });
            }
            
            // Prepare data for Discord webhook
            const webhookUrl = 'https://discord.com/api/webhooks/1349790174833541171/LUkip0VuxBK54fj3EGlw_ytaULdMCnS_3HXF1FKjY6ocCBwLbqqXnzG10hpUQcaz85aT';
            
            // Create webhook payload
            const payload = {
                embeds: [{
                    title: 'New Commission Request',
                    color: 4886754, // Light blue color
                    fields: [
                        {
                            name: 'Name',
                            value: name,
                            inline: true
                        },
                        {
                            name: 'Email',
                            value: email,
                            inline: true
                        },
                        {
                            name: 'Commission Type',
                            value: commissionType,
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: description
                        }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };
            
            // Send data to Discord webhook
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    // Hide form and show success message
                    orderForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Track successful submission
                    if (typeof gtag === 'function') {
                        gtag('event', 'webhook_success', {
                            'event_category': 'Commission',
                            'event_label': commissionType
                        });
                    }
                } else {
                    throw new Error('Failed to submit form');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your request. Please try again or contact me directly via email.');
                
                // Track submission error
                if (typeof gtag === 'function') {
                    gtag('event', 'webhook_error', {
                        'event_category': 'Commission',
                        'event_label': error.message
                    });
                }
            });
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const contactSuccessMessage = document.getElementById('contactSuccessMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Track form submission in Google Analytics
            if (typeof(gtag) === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': subject
                });
            }
            
            // Prepare data for Discord webhook
            const webhookUrl = 'https://discord.com/api/webhooks/1349790174833541171/LUkip0VuxBK54fj3EGlw_ytaULdMCnS_3HXF1FKjY6ocCBwLbqqXnzG10hpUQcaz85aT';
            
            // Create webhook payload
            const payload = {
                embeds: [{
                    title: 'New Contact Form Message',
                    color: 5793266, // Green color
                    fields: [
                        {
                            name: 'Name',
                            value: name,
                            inline: true
                        },
                        {
                            name: 'Email',
                            value: email,
                            inline: true
                        },
                        {
                            name: 'Subject',
                            value: subject
                        },
                        {
                            name: 'Message',
                            value: message
                        }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };
            
            // Send data to Discord webhook
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    contactSuccessMessage.style.display = 'block';
                    
                    // Track successful submission
                    if (typeof(gtag) === 'function') {
                        gtag('event', 'webhook_success', {
                            'event_category': 'Contact',
                            'event_label': subject
                        });
                    }
                } else {
                    throw new Error('Failed to submit form');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your message. Please try again or contact me directly via email.');
                
                // Track submission error
                if (typeof(gtag) === 'function') {
                    gtag('event', 'webhook_error', {
                        'event_category': 'Contact',
                        'event_label': error.message
                    });
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image lightbox for gallery items
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                openLightbox(this.src, this.alt);
                
                // Track lightbox open in Google Analytics
                if (typeof(gtag) === 'function') {
                    gtag('event', 'lightbox_open', {
                        'event_category': 'Gallery',
                        'event_label': this.alt
                    });
                }
            });
        });
    }
    
    // Helper functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function openLightbox(src, alt) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        const image = document.createElement('img');
        image.src = src;
        image.alt = alt;
        
        // Append elements
        lightboxContent.appendChild(closeBtn);
        lightboxContent.appendChild(image);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
        
        // Close lightbox on click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === closeBtn) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
                
                // Track lightbox close in Google Analytics
                if (typeof(gtag) === 'function') {
                    gtag('event', 'lightbox_close', {
                        'event_category': 'Gallery',
                        'event_label': alt
                    });
                }
            }
        });
    }
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
  });