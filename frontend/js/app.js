// --- Preloader & Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('loaderBar');
    const preloader = document.getElementById('preloader');
    let progress = 0;
    const animationInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if(progress >= 100) {
            progress = 100;
            clearInterval(animationInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.transform = 'scale(1.02)';
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 300);
        }
        bar.style.width = `${progress}%`;
    }, 50);
    
    // Check hash for direct links
    const hash = window.location.hash.replace('#/', '');
    if(hash === 'admin') switchToAdminPanelLayout();
    else if(hash) navigateToRoute(hash);
});

// --- Core Routing ---
function navigateToRoute(routeId) {
    document.querySelectorAll('.app-view-container').forEach(el => el.classList.remove('active-route'));
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    
    const target = document.getElementById(`view-${routeId}`);
    if(target) target.classList.add('active-route');
    
    const link = document.querySelector(`.nav-link[data-route="${routeId}"]`);
    if(link) link.classList.add('active');
    
    window.location.hash = `/${routeId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Layout Switching ---
function switchToAdminPanelLayout() {
    document.getElementById('websiteMasterLayout').style.display = 'none';
    document.getElementById('adminPanelMasterLayout').style.display = 'block';
    window.location.hash = '/admin';
}

function switchToWebsiteLayout() {
    document.getElementById('adminPanelMasterLayout').style.display = 'none';
    document.getElementById('websiteMasterLayout').style.display = 'block';
    navigateToRoute('home');
}

function switchAdminSubview(viewId) {
    document.querySelectorAll('.admin-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-menu li').forEach(el => el.classList.remove('active'));
    
    document.getElementById(viewId).classList.add('active');
    document.querySelector(`.admin-menu li[data-subview="${viewId}"]`).classList.add('active');
}

function toggleMobileDrawerMenu() {
    document.getElementById('mobileDrawer').classList.toggle('active');
    document.getElementById('menuTrigger').classList.toggle('active');
}

// --- Visual Effects ---
const mouseGlow = document.getElementById('mouseGlow');
let mx = 0, my = 0, lmx = 0, lmy = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateGlow() {
    lmx += (mx - lmx) * 0.1; lmy += (my - lmy) * 0.1;
    mouseGlow.style.left = `${lmx}px`; mouseGlow.style.top = `${lmy}px`;
    requestAnimationFrame(animateGlow);
}
if(mouseGlow) {
    animateGlow();
}

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if(nav) {
        if(window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
});

// --- Chat Interactions ---
const chatUploadBtn = document.getElementById('chatUploadBtn');
const chatUploadMenu = document.getElementById('chatUploadMenu');

if(chatUploadBtn && chatUploadMenu) {
    chatUploadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chatUploadMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
        chatUploadMenu.classList.remove('active');
    });
}

const chatInput = document.getElementById('chatMainInput');
if(chatInput) {
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Enter to send in chat
    chatInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            simulateChatResponse();
        }
    });
}

function simulateChatResponse() {
    if(!chatInput) return;
    const text = chatInput.value.trim();
    if(!text) return;
    
    const scroller = document.getElementById('chatScroller');
    
    // Append User
    scroller.insertAdjacentHTML('beforeend', `
        <div class="chat-bubble user">
            <div class="chat-avatar user">ME</div>
            <div>
                <div style="text-align: right; font-weight: 600; margin-bottom: 4px; font-size: 0.9rem;">You</div>
                <div class="chat-content">${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
        </div>
    `);
    
    chatInput.value = '';
    chatInput.style.height = 'auto';
    scroller.scrollTop = scroller.scrollHeight;
    
    // Show typing
    const typing = document.getElementById('typingIndicator');
    if(typing) {
        typing.style.display = 'flex';
        scroller.appendChild(typing); // move to bottom
        scroller.scrollTop = scroller.scrollHeight;
        
        setTimeout(() => {
            typing.style.display = 'none';
            scroller.insertAdjacentHTML('beforeend', `
                <div class="chat-bubble">
                    <div class="chat-avatar ai"><i class="fa-solid fa-bolt"></i></div>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px; font-size: 0.9rem;">HyperStudio</div>
                        <div class="chat-content">Execution context validated. Generating optimized solution blueprint targeting your specific parameters.</div>
                        <div class="chat-actions">
                            <button class="btn-icon" title="Copy"><i class="fa-regular fa-copy"></i></button>
                            <button class="btn-icon" title="Regenerate"><i class="fa-solid fa-rotate-right"></i></button>
                        </div>
                    </div>
                </div>
            `);
            scroller.scrollTop = scroller.scrollHeight;
        }, 1500);
    }
}
