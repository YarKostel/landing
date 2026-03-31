// scripts/formHandler.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('callback-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Simulate async request (replace with actual API endpoint)
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Here you would typically send data to backend
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log('Form submitted:', data);
                
                // Success message
                showToast('Заявка успешно отправлена! Свяжемся с вами в ближайшее время.', 'success');
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                showToast('Произошла ошибка. Пожалуйста, попробуйте позже или позвоните нам.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    function showToast(message, type = 'success') {
        // Create toast element if not exists
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
            
            // Add styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .toast-notification {
                    position: fixed;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%) translateY(100px);
                    background: var(--gray-900);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 2rem;
                    font-weight: 500;
                    z-index: 1000;
                    opacity: 0;
                    transition: all 0.3s ease;
                    pointer-events: none;
                    box-shadow: var(--shadow-lg);
                    max-width: 90%;
                    text-align: center;
                }
                .toast-notification.show {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                .toast-notification.success {
                    background: var(--secondary);
                }
                .toast-notification.error {
                    background: var(--primary);
                }
            `;
            document.head.appendChild(style);
        }
        
        toast.textContent = message;
        toast.className = `toast-notification ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
});