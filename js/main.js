/**
 * SAKA Korea - Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements Selection
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mainHeader = document.getElementById('main-header');

  // Sticky Header Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('shadow-lg', 'bg-white/95');
      mainHeader.classList.remove('bg-white/80');
    } else {
      mainHeader.classList.remove('shadow-lg', 'bg-white/95');
      mainHeader.classList.add('bg-white/80');
    }
  });

  // Toggle Mobile Drawer
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isDrawerHidden = mobileDrawer.classList.contains('hidden');
      
      if (isDrawerHidden) {
        // Open Drawer
        mobileDrawer.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Prevent background scrolling
      } else {
        // Close Drawer
        mobileDrawer.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });

    // Close Mobile Drawer when a drawer anchor link is clicked
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // Web3Forms 문의 폼 전송 처리
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '전송 중...';
      btn.disabled = true;
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(contactForm)
        });
        const json = await res.json();
        if (json.success) {
          contactForm.classList.add('hidden');
          contactSuccess.classList.remove('hidden');
        } else {
          alert('전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
          btn.textContent = '문의 보내기';
          btn.disabled = false;
        }
      } catch {
        alert('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
        btn.textContent = '문의 보내기';
        btn.disabled = false;
      }
    });
  }
});

/**
 * Mobile Submenu Accordion Toggle
 * Exposed globally so the onclick attribute in HTML can invoke it.
 * @param {string} submenuId - The ID of the submenu container
 */
window.toggleMobileSubmenu = function(submenuId) {
  const submenu = document.getElementById(submenuId);
  if (!submenu) return;
  
  const allSubmenus = ['mob-sub-1', 'mob-sub-2'];
  
  // Close others, toggle current with smooth visibility
  allSubmenus.forEach(id => {
    const item = document.getElementById(id);
    if (item) {
      if (id === submenuId) {
        item.classList.toggle('hidden');
      } else {
        item.classList.add('hidden');
      }
    }
  });
};
