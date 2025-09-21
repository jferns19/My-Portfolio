// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.querySelector('.frame-20');
    this.nameInput = this.form.querySelector('input[placeholder="Your Name"]');
    this.lastNameInput = this.form.querySelector('input[placeholder="Last Name"]');
    this.emailInput = this.form.querySelector('input[placeholder="Your Email"]');
    this.messageTextarea = this.form.querySelector('textarea[placeholder="Your Message"]');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.addInputValidation();
    this.addRealTimeValidation();
  }

  addInputValidation() {
    // Add required attributes
    this.nameInput.required = true;
    this.lastNameInput.required = true;
    this.emailInput.required = true;
    this.messageTextarea.required = true;

    // Add input names for form data
    this.nameInput.name = 'firstName';
    this.lastNameInput.name = 'lastName';
    this.emailInput.name = 'email';
    this.messageTextarea.name = 'message';
  }

  addRealTimeValidation() {
    // Email validation
    this.emailInput.addEventListener('blur', () => {
      this.validateEmail(this.emailInput.value);
    });

    // Remove error styling on input
    [this.nameInput, this.lastNameInput, this.emailInput, this.messageTextarea].forEach(input => {
      input.addEventListener('input', () => {
        this.removeErrorStyling(input);
      });
    });
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid && email.length > 0) {
      this.addErrorStyling(this.emailInput);
      this.showError('Please enter a valid email address');
    } else {
      this.removeErrorStyling(this.emailInput);
    }
    
    return isValid;
  }

  validateForm() {
    let isValid = true;
    const errors = [];

    // Check required fields
    if (!this.nameInput.value.trim()) {
      this.addErrorStyling(this.nameInput);
      errors.push('First name is required');
      isValid = false;
    }

    if (!this.lastNameInput.value.trim()) {
      this.addErrorStyling(this.lastNameInput);
      errors.push('Last name is required');
      isValid = false;
    }

    if (!this.emailInput.value.trim()) {
      this.addErrorStyling(this.emailInput);
      errors.push('Email is required');
      isValid = false;
    } else if (!this.validateEmail(this.emailInput.value)) {
      isValid = false;
    }

    if (!this.messageTextarea.value.trim()) {
      this.addErrorStyling(this.messageTextarea);
      errors.push('Message is required');
      isValid = false;
    }

    if (errors.length > 0) {
      this.showError(errors[0]);
    }

    return isValid;
  }

  addErrorStyling(element) {
    element.style.borderColor = '#e74c3c';
    element.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
  }

  removeErrorStyling(element) {
    element.style.borderColor = '#4f4f4f';
    element.style.boxShadow = 'none';
  }

  showError(message) {
    this.removeExistingMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message error-message';
    errorDiv.textContent = message;
    
    this.form.insertBefore(errorDiv, this.submitButton);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  showSuccess(message) {
    this.removeExistingMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message success-message';
    successDiv.textContent = message;
    
    this.form.insertBefore(successDiv, this.submitButton);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  removeExistingMessages() {
    const existingMessages = this.form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    // Show loading state
    const originalText = this.submitButton.textContent;
    this.submitButton.textContent = 'Sending...';
    this.submitButton.disabled = true;

    try {
      // Simulate form submission (replace with actual API call)
      await this.simulateFormSubmission();
      
      // Show success message
      this.showSuccess('Thank you! Your message has been sent successfully.');
      
      // Reset form
      this.form.reset();
      
      // Remove any error styling
      [this.nameInput, this.lastNameInput, this.emailInput, this.messageTextarea].forEach(input => {
        this.removeErrorStyling(input);
      });

    } catch (error) {
      this.showError('Sorry, there was an error sending your message. Please try again.');
    } finally {
      // Reset button state
      this.submitButton.textContent = originalText;
      this.submitButton.disabled = false;
    }
  }

  async simulateFormSubmission() {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }
}

// Smooth scrolling for contact button
function initSmoothScrolling() {
  const contactButton = document.querySelector('.contact-button');
  const contactSection = document.querySelector('.div-4:last-child');
  
  if (contactButton && contactSection) {
    contactButton.addEventListener('click', (e) => {
      e.preventDefault();
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

// Add loading animation
function addLoadingAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #e8e8e8;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 1s ease-in-out infinite;
      margin-left: 8px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
  initSmoothScrolling();
  addLoadingAnimation();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effect to work items
  const workItems = document.querySelectorAll('.work');
  workItems.forEach(work => {
    work.addEventListener('mouseenter', () => {
      work.style.transform = 'translateY(-5px)';
      work.style.transition = 'transform 0.3s ease';
      work.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    });
    
    work.addEventListener('mouseleave', () => {
      work.style.transform = 'translateY(0)';
      work.style.boxShadow = 'none';
    });
  });

  // Add hover effect to skill tags
  const skillTags = document.querySelectorAll('.skill-badge');
  skillTags.forEach(tag => {
    if (tag.querySelector('.badge-text')) {
      tag.addEventListener('mouseenter', () => {
        tag.style.backgroundColor = 'rgba(141, 9, 73, 0.1)';
        tag.style.borderColor = '#8d0949';
        tag.style.transition = 'all 0.3s ease';
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.backgroundColor = 'transparent';
        tag.style.borderColor = '#4f4f4f';
      });
    }
  });
});
