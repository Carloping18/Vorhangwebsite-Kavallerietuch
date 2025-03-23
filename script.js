document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-button');
    const orderFormSection = document.getElementById('orderForm');
    const productInput = document.getElementById('product');
    const form = document.getElementById('form');
  
    if (!orderFormSection || !productInput || !form) {
      console.error('Einige Elemente wurden nicht gefunden.');
      return;
    }
  
    const showOrderForm = product => {
      productInput.value = product;
      orderFormSection.style.display = 'block';
      // Smooth scrolling for a better user experience
      window.scrollTo({ top: orderFormSection.offsetTop, behavior: 'smooth' });
    };
  
    orderButtons.forEach(button => {
      button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        if (product) {
          showOrderForm(product);
        }
      });
    });
  
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      // Hier wird der Bestellvorgang simuliert. In einem echten Szenario würdest du hier Daten an den Server senden.
      alert(`Bestellung für ${productInput.value} wurde abgeschickt!`);
      form.reset();
      orderFormSection.style.display = 'none';
    });
  });
  
  