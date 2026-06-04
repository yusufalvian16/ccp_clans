// Add smooth interactions and analytics tracking
document.addEventListener('DOMContentLoaded', () => {
    // Copy clan tag to clipboard
    const clanTags = document.querySelectorAll('.clan-tag, .clan-tag-inline');
    const copyNotification = document.getElementById('copyNotification');
    
    clanTags.forEach(clanTag => {
        clanTag.addEventListener('click', async function(e) {
            e.stopPropagation(); // Stop parent link click
            const tagText = this.textContent.trim();
            
            try {
                // Modern clipboard API
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(tagText);
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = tagText;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                
                // Show notification
                copyNotification.classList.add('show');
                
                // Haptic feedback for mobile
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
                // Hide notification after 2 seconds
                setTimeout(() => {
                    copyNotification.classList.remove('show');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy:', err);
                copyNotification.textContent = '❌ Gagal menyalin';
                copyNotification.classList.add('show');
                setTimeout(() => {
                    copyNotification.classList.remove('show');
                    copyNotification.textContent = '✓ Tersalin!';
                }, 2000);
            }
        });
    });
    
    // Add ripple effect on card click
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });

        // Add haptic feedback for mobile
        card.addEventListener('touchstart', () => {
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.link-card').forEach(card => {
        observer.observe(card);
    });

    // Add loading state
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Track link clicks (optional - for analytics)
    linkCards.forEach(card => {
        card.addEventListener('click', function() {
            const linkName = this.querySelector('h3').textContent;
            console.log(`Link clicked: ${linkName}`);
            
            // You can add Google Analytics or other tracking here
            // Example: gtag('event', 'click', { 'event_category': 'Link', 'event_label': linkName });
        });
    });

    // Add dynamic time-based greeting (optional enhancement)
    const hour = new Date().getHours();
    let greeting = '⚔️ Clash of Clans Community ⚔️';
    
    if (hour >= 5 && hour < 12) {
        greeting = '🌅 Selamat Pagi, Clasher! ⚔️';
    } else if (hour >= 12 && hour < 18) {
        greeting = '☀️ Selamat Siang, Clasher! ⚔️';
    } else if (hour >= 18 && hour < 22) {
        greeting = '🌆 Selamat Sore, Clasher! ⚔️';
    } else {
        greeting = '🌙 Selamat Malam, Clasher! ⚔️';
    }
    
    const descElement = document.querySelector('.clan-description');
    if (descElement) {
        descElement.textContent = greeting;
    }
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .loaded {
        /* Add any post-load styles here */
    }
`;
document.head.appendChild(style);
