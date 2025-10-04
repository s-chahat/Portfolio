document.addEventListener('DOMContentLoaded', () => {
  
    // 1. TYPING ANIMATION
    // Target the specific <span> inside the <h2> for the main animation.
    const mainTypingElement = document.querySelector(".text-animation .string");
    const text1Element = document.querySelector(".text1");
    const text2Element = document.querySelector(".text2");

    if (mainTypingElement) {
        console.log("Element .text-animation .string found for main typing effect");
        var typed = new Typed(".text-animation .string", {
            strings: ["Front-end Developer","Backend Developer", "Java Developer", "OOPs", "DSA Specialist", "C++ Programmer", "Web Developer"],
            typeSpeed: 40,
            backSpeed: 40,
            backDelay: 1000,
            loop: true,
        });
    } else {
        console.log("Element .text-animation .string not found");
    }

    if (text1Element) {
        console.log("Element .text1 found");
        var typed1 = new Typed(".text1", {
            strings: ["Thank you for your interest in connecting with me on Facebook.<br> However, I currently do not have a Facebook account.<br> Please feel free to reach out to me through other available contact options on this website.<br> I look forward to connecting with you!"],
            typeSpeed: 10,
        });
    } else {
    
    }
    if (text2Element) {
        console.log("Element .text2 found");
        var typed2 = new Typed(".text2", {
            strings: [
                "Thank you for your interest in connecting with me on Twitter.<br> However, I currently do not have a Twitter account.<br> Please feel free to reach out to me through other available contact options on this website.<br> I look forward to connecting with you!",
            ],
            typeSpeed: 10,
        });
    } else {
        
    }
    
    // 2. TAB FUNCTIONALITY
    
    var tablinks = document.getElementsByClassName('tab-links');
    var tabcontents = document.getElementsByClassName('tab-contents');

    // This function must be globally accessible or attached to the window object 
    // because it is called directly from the HTML's onclick attribute.
    window.opentab = function(tabname, event) {
        for (let tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (let tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        // Use event.currentTarget if passed, or fallback if called programmatically
        if (event && event.currentTarget) {
            event.currentTarget.classList.add("active-link");
        }
        document.getElementById(tabname).classList.add("active-tab");
    }

    // 3. SIDE MENU FUNCTIONALITY
    
    var sidemenu = document.getElementById("sidemenu");

    // Must be globally accessible
    window.openmenu = function() {
        sidemenu.style.right = "0";
    }

    // Must be globally accessible
    window.closemenu = function() {
        sidemenu.style.right = "-200px";
    }

    
    // 4. GOOGLE SHEETS FORM SUBMISSION FUNCTIONALITY
    const scriptURL = "https://script.google.com/macros/s/AKfycbxCkxXflXmj49o4pmJ03ANqWfoVJMk-v1RVEXdT-WMd-kZDqN_hSBrZb49N7zLVmCo3_w/exec";

    const contactSection = document.querySelector('.contact-section');
    const nameInput = contactSection ? contactSection.querySelector('input[placeholder="Your Full name"]') : null;
    const emailInput = contactSection ? contactSection.querySelector('input[placeholder="Your Email"]') : null;
    const messageInput = contactSection ? contactSection.querySelector('.input-message') : null;
    const submitButton = contactSection ? contactSection.querySelector('.contact-box button') : null;

    // We need an element to display the message, but it's not present in the HTML.
    // Let's create a temporary message element near the button if it doesn't exist.
    let msg = document.getElementById("msg");
    if (!msg) {
        msg = document.createElement('p');
        msg.id = "msg";
        msg.className = "form-message-status";
        if (submitButton && submitButton.parentElement) {
            submitButton.parentElement.insertBefore(msg, submitButton.nextSibling);
        }
    }

    if (submitButton && nameInput && emailInput && messageInput) {
        submitButton.addEventListener('click', e => {
            e.preventDefault();

            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                msg.innerHTML = "Please fill out all fields.";
                setTimeout(() => { msg.innerHTML = ""; }, 3000);
                return;
            }

            // Prepare data manually since there is no <form> tag
            const formData = new FormData();
            formData.append('Name', nameInput.value);
            formData.append('Email', emailInput.value);
            formData.append('Message', messageInput.value);

            // Capture date, time, and day
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0];
            const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
            
            // Add date, time, and day to form data
            formData.append('date', date);
            formData.append('time', time);
            formData.append('day', dayName);

            // Temporarily disable button and show sending message
            submitButton.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            submitButton.disabled = true;

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    msg.innerHTML = "Message sent successfully! 😊";
                })
                .catch(error => {
                    msg.innerHTML = "An error occurred. Please try again or use the Email. 😔";
                    console.error('Submission Error:', error);
                })
                .finally(() => {
                    submitButton.innerHTML = 'Send Message <i class="bx bx-mail-send"></i>';
                    submitButton.disabled = false;
                    
                    // Clear fields and hide message after 5 seconds
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                    setTimeout(() => {
                        msg.innerHTML = "";
                    }, 5000);
                });
        });
    } else {
        console.warn("Contact form elements not found. Google Sheets submission will not work.");
    }
    // 5. SCROLL TO TOP BUTTON
   const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', function() {
        if (scrollToTopBtn) {
            if (window.scrollY > 300) { 
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });

    // Must be globally accessible
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

