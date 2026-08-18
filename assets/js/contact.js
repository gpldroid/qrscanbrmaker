// ============================================================
    // THEME
    // ============================================================
    function toggleTheme() {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const icon = document.querySelector('#themeToggle i');
        if (document.body.classList.contains('dark')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    function loadTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark');
        }
        updateThemeIcon();
    }

    // ============================================================
    // LANGUAGE
    // ============================================================
    let currentLang = 'ar';

    function toggleLang() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.getElementById('langToggle').textContent = currentLang === 'ar' ? 'EN' : 'عربي';
    }

    // ============================================================
    // FORM HANDLING
    // ============================================================
    function handleSubmit(event) {
        event.preventDefault();
        
        const name = document.getElementById('fullName');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const spinner = document.getElementById('btnSpinner');
        
        let isValid = true;

        // Validate Name
        if (name.value.trim().length < 3) {
            name.classList.add('error');
            document.getElementById('nameError').classList.add('show');
            isValid = false;
        } else {
            name.classList.remove('error');
            document.getElementById('nameError').classList.remove('show');
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add('error');
            document.getElementById('emailError').classList.add('show');
            isValid = false;
        } else {
            email.classList.remove('error');
            document.getElementById('emailError').classList.remove('show');
        }

        // Validate Message
        if (message.value.trim().length < 10) {
            message.classList.add('error');
            document.getElementById('messageError').classList.add('show');
            isValid = false;
        } else {
            message.classList.remove('error');
            document.getElementById('messageError').classList.remove('show');
        }

        if (!isValid) {
            showToast('الرجاء تصحيح الأخطاء في النموذج', 'error');
            return false;
        }

        // Simulate sending
        submitBtn.disabled = true;
        btnText.textContent = 'جاري الإرسال...';
        spinner.classList.add('show');

        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.innerHTML = '<i class="fa-regular fa-paper-plane"></i> إرسال الرسالة';
            spinner.classList.remove('show');
            
            // Hide form, show success
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('successMessage').classList.add('show');
            showToast('✅ تم إرسال رسالتك بنجاح!');
        }, 2000);

        return false;
    }

    function resetForm() {
        document.getElementById('contactForm').reset();
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('successMessage').classList.remove('show');
        
        // Remove error states
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
        
        window.scrollTo({ top: document.querySelector('.contact-card').offsetTop - 80, behavior: 'smooth' });
    }

    // ============================================================
    // COOKIES
    // ============================================================
    function initCookies() {
        if (!localStorage.getItem('cookieConsent')) {
            document.getElementById('cookieBanner').style.display = 'flex';
        }
    }

    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        document.getElementById('cookieBanner').style.display = 'none';
        showToast('✅ تم قبول الكوكيز!');
    }

    function rejectCookies() {
        localStorage.setItem('cookieConsent', 'rejected');
        document.getElementById('cookieBanner').style.display = 'none';
        showToast('❌ تم رفض الكوكيز.');
    }

    // ============================================================
    // TOAST
    // ============================================================
    function showToast(msg, type = 'success') {
        const t = document.getElementById('toast');
        const tm = document.getElementById('toastMsg');
        t.style.background = type === 'error' ? '#ef4444' : '#1e293b';
        tm.textContent = msg;
        t.classList.add('show');
        clearTimeout(t._timeout);
        t._timeout = setTimeout(() => t.classList.remove('show'), 3500);
    }

    // ============================================================
    // BACK TO TOP
    // ============================================================
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('backToTop');
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });

    // ============================================================
    // INIT
    // ============================================================
    loadTheme();
    initCookies();


/* Externalized HTML event handlers */
document.querySelectorAll('.js-event-1').forEach(el=>el.addEventListener('click',function(event){ toggleTheme() }));
document.querySelectorAll('.js-event-2').forEach(el=>el.addEventListener('click',function(event){ toggleLang() }));
document.querySelectorAll('.js-event-3').forEach(el=>el.addEventListener('submit',function(event){ return handleSubmit(event) }));
document.querySelectorAll('.js-event-4').forEach(el=>el.addEventListener('click',function(event){ resetForm() }));
document.querySelectorAll('.js-event-5').forEach(el=>el.addEventListener('click',function(event){ acceptCookies() }));
document.querySelectorAll('.js-event-6').forEach(el=>el.addEventListener('click',function(event){ rejectCookies() }));
document.querySelectorAll('.js-event-7').forEach(el=>el.addEventListener('click',function(event){ window.scrollTo({top:0, behavior:'smooth'}) }));
