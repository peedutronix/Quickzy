document.addEventListener('DOMContentLoaded', function() {
  const quoteForm = document.getElementById('quoteForm');
  
  if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      const serviceType = document.getElementById('serviceType').value;
      
      // Validate form
      if (!name || !email || !phone || !message || !serviceType) {
        showMessage('Please fill in all fields', 'error');
        return;
      }
      
      // Prepare data for submission
      const formData = {
        name,
        email,
        phone,
        message,
        serviceType
      };
      
      try {
        // Submit to backend API
        const response = await fetch('http://localhost:5000/api/quotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          // Clear form
          quoteForm.reset();
          showMessage('Thank you! Your quote request has been submitted.', 'success');
        } else {
          const error = await response.json();
          showMessage(error.message || 'Something went wrong. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('Network error. Please try again later.', 'error');
      }
    });
  }
  
  // Helper function to show messages
  function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) {
      const newMessageDiv = document.createElement('div');
      newMessageDiv.id = 'formMessage';
      quoteForm.parentNode.insertBefore(newMessageDiv, quoteForm.nextSibling);
      messageDiv = newMessageDiv;
    }
    
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = 'message';
    }, 5000);
  }
});