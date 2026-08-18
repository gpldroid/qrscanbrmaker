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
    function showToast(msg) {
        const t = document.getElementById('toast');
        const tm = document.getElementById('toastMsg');
        tm.textContent = msg;
        t.classList.add('show');
        clearTimeout(t._timeout);
        t._timeout = setTimeout(() => t.classList.remove('show'), 3000);
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
document.querySelectorAll('.js-event-3').forEach(el=>el.addEventListener('click',function(event){ acceptCookies() }));
document.querySelectorAll('.js-event-4').forEach(el=>el.addEventListener('click',function(event){ rejectCookies() }));
document.querySelectorAll('.js-event-5').forEach(el=>el.addEventListener('click',function(event){ window.scrollTo({top:0, behavior:'smooth'}) }));
