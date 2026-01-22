document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOpenIcon = document.getElementById('menu-open-icon');
            const menuCloseIcon = document.getElementById('menu-close-icon');

            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                menuOpenIcon.classList.toggle('hidden');
                menuCloseIcon.classList.toggle('hidden');
            });
        });

        // Highlight link based on state
        const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("text-[#143887]", "font-semibold");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const speed = 200; // lower = faster

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const increment = target / speed;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = formatNumber(target);
      }
    };

    updateCount();
  };

  const formatNumber = (num) => {
    if (num >= 1000) return `${num / 1000}K+`;
    return `${num}+`;
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
          observer.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
});


// Send Message
const sentAlert = () => {
    alert("Thank you for leaving us a message. We appreciate and value your contribution and we'll get back to you soon")
}


// GALLERY FILTER
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll("[data-category]");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // reset buttons
    filterButtons.forEach(btn => {
      btn.classList.remove("bg-[#143887]", "text-white");
      btn.classList.add("bg-white", "text-gray-700");
    });

    // activate current
    button.classList.add("bg-[#143887]", "text-white");
    button.classList.remove("bg-white", "text-gray-700");

    // filter items
    galleryItems.forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});


function validateForm() {
    // Get form elements using common Tailwind classes
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const subjectSelect = document.querySelector('select');
    const messageTextarea = document.querySelector('textarea');
    const submitBtn = document.querySelector('button[onclick="sentAlert()"]');
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Validate name (required, min 2 chars)
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, "Full name is required (minimum 2 characters)");
        isValid = false;
    }
    
    // Validate email (required, valid format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        showError(emailInput, "Email address is required");
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address");
        isValid = false;
    }
    
    // Validate subject (required)
    if (!subjectSelect.value || subjectSelect.value === "Select a subject") {
        showError(subjectSelect, "Please select a subject");
        isValid = false;
    }
    
    // Validate message (required, min 10 chars)
    if (!messageTextarea.value.trim() || messageTextarea.value.trim().length < 10) {
        showError(messageTextarea, "Message is required (minimum 10 characters)");
        isValid = false;
    }
    
    if (isValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        
        // Simulate API call
        setTimeout(() => {
            alert("Thank you! Your message has been sent successfully.");
            resetForm();
        }, 1500);
    }
    
    return isValid;
}

function showError(element, message) {
    // Remove existing error
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    
    // Add red border to input
    element.style.borderColor = '#ef4444';
    element.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    element.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
    });
}

function resetForm() {
    document.querySelector('form')?.reset(); // If wrapped in form
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.value = '';
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
    const submitBtn = document.querySelector('button[onclick="sentAlert()"]');
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
}

// Update button onclick to use validation
document.querySelector('button[onclick="sentAlert()"]').onclick = function(e) {
    e.preventDefault();
    validateForm();
};


