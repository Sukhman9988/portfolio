//toggle icon 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll 
window.onscroll = () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 550;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height && id) {
            // navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']')?.classList.add('active');
            });

            sec.classList.add('show-animate');
        }
    });

    //sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    //remove toggle icon
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    //footer animation
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight);
}

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("372447ea-e89c-4be1-a8cc-fb06946b3090");

    // Modal functionality
    const modal = document.getElementById('readMoreModal');
    const closeBtn = document.querySelector('.close-modal');
    const readMoreBtn = document.getElementById('readMoreBtn');
    
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(event) {
            event.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn) {
        // Close modal - button click
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal - outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal - escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    // Function to close modal
    function closeModal() {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }
});

//Email Settings
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

function sendEmail() {
    // Form validation
    if (!fullName.value || !email.value || !message.value) {
        Toastify({
            text: "📝 Please fill all fields",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "#ff4444",
                borderRadius: "1rem",
                fontSize: "1.4rem",
                padding: "1rem 2rem",
            },
        }).showToast();
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        Toastify({
            text: "📧 Please enter a valid email",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "#ff4444",
                borderRadius: "1rem",
                fontSize: "1.4rem",
                padding: "1rem 2rem",
            },
        }).showToast();
        return;
    }

    // Show sending notification
    Toastify({
        text: "📤 Sending...",
        duration: 1000,
        gravity: "top",
        position: "right",
        style: {
            background: "#00abf0",
            borderRadius: "1rem",
            fontSize: "1.4rem",
            padding: "1rem 2rem",
        },
    }).showToast();

    // Send email using EmailJS
    return emailjs.send("service_iqxvxwh", "template_iqxvxwh", {
        from_name: fullName.value,
        from_email: email.value,
        to_name: "Sukhmandeep",
        message: message.value,
        reply_to: email.value,
    }).then(
        function() {
            // Success notification
            Toastify({
                text: "✅ Message sent successfully!",
                duration: 2000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#00c851",
                    borderRadius: "1rem",
                    fontSize: "1.4rem",
                    padding: "1rem 2rem",
                },
            }).showToast();

            // Clear the form
            form.reset();
        },
        function(error) {
            // Error notification
            Toastify({
                text: "❌ Failed to send message",
                duration: 2000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#ff4444",
                    borderRadius: "1rem",
                    fontSize: "1.4rem",
                    padding: "1rem 2rem",
                },
            }).showToast();
            console.error("Email error:", error);
        }
    );
}

// Contact form submit handling
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    const submitIcon = submitBtn.querySelector('i');
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitIcon.classList.remove('bx-send');
    submitIcon.classList.add('bx-loader-alt');
    
    // Your existing email sending code here
    sendEmail().then(() => {
        // Remove loading state after sending
        submitBtn.classList.remove('loading');
        submitIcon.classList.remove('bx-loader-alt');
        submitIcon.classList.add('bx-send');
    });
});

document.getElementById('downloadCv').addEventListener('click', function(event) {
    event.preventDefault(); 
    // Open CV in new tab
    window.open("https://drive.google.com/file/d/1Up6bpPYpf7pd6B-ctf_dxU0DVI8qeRT0/view?usp=drivesdk", "_blank");
    
    // Show notification
    Toastify({
        text: "📥 Opening CV...",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
            background: "#00abf0",
            borderRadius: "1rem",
            fontSize: "1.4rem",
            padding: "1rem 2rem",
        },
    }).showToast();
});