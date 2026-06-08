document.addEventListener('DOMContentLoaded', () => {
    const cardWrapper = document.getElementById('cardWrapper');
    const balloonContainer = document.getElementById('balloon-container');
    let isOpen = false;

    // Create floating decorations in the background
    const colors = ['#ff9a9e', '#fecfef', '#a1c4fd', '#fdcbf1', '#e0c3fc', '#84fab0', '#fccb90', '#ffe259'];
    
    for (let i = 0; i < 15; i++) {
        createBalloon(colors);
    }
    
    // Create floating sparkles/stars
    for (let i = 0; i < 20; i++) {
        createSparkle();
    }

    // Create floating petals in background
    createPetals();

    function createBalloon(colorsArray) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        const size = Math.random() * 40 + 40; // 40px to 80px
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.25}px`;
        balloon.style.background = `radial-gradient(circle at 30% 30%, #ffffff, ${color})`;
        balloon.style.left = `${Math.random() * 95}%`;
        balloon.style.animationDuration = `${Math.random() * 15 + 10}s`;
        balloon.style.animationDelay = `-${Math.random() * 10}s`;
        balloon.style.boxShadow = `inset -10px -10px 20px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05)`;
        
        balloonContainer.appendChild(balloon);

        balloon.addEventListener('animationend', () => {
            balloon.remove();
            createBalloon(colorsArray);
        });
    }

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const size = Math.random() * 10 + 5;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.background = Math.random() > 0.5 ? '#fff' : '#ffeaa7';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        sparkle.style.animationDelay = `-${Math.random() * 2}s`;
        
        balloonContainer.appendChild(sparkle);
    }

    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    let isAsking = false;

    // Handle card click (to show question)
    cardWrapper.addEventListener('click', (e) => {
        if (e.target === btnYes || e.target === btnNo) return;

        if (!isAsking && !isOpen) {
            isAsking = true;
            cardWrapper.classList.add('asking');
            
            // Start background music on first interaction
            const bgMusic = document.getElementById('bgMusic');
            bgMusic.play().catch(err => console.log('Audio blocked', err));
        }
    });

    // Runaway No button effect - Softer and catchable
    btnNo.addEventListener('mouseover', function () {
        // Random offset: it will jump around near the Yes button
        const x = Math.random() * 160 - 80; // -80px to 80px
        const y = Math.random() * 100 - 50; // -50px to 50px
        
        // Revert any fixed positioning from earlier
        this.style.position = 'relative';
        this.style.left = 'auto';
        this.style.top = 'auto';
        
        this.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)';
        this.style.transform = `translate(${x}px, ${y}px)`;
    });

    // If they somehow manage to click No
    const noPopup = document.getElementById('noPopup');
    const noSound = document.getElementById('noSound');
    
    btnNo.addEventListener('click', (e) => {
        e.stopPropagation();
        noPopup.classList.add('show');
        
        noSound.currentTime = 0;
        noSound.play().catch(err => console.log('Audio blocked', err));
    });

    // Dismiss the popup
    noPopup.addEventListener('click', () => {
        noPopup.classList.remove('show');
    });

    const cakePopup = document.getElementById('cakePopup');
    const cakeImage = document.getElementById('cakeImage');
    const blowTextPath = document.getElementById('blowTextPath');
    let isBlown = false;

    // Handle Yes click
    btnYes.addEventListener('click', (e) => {
        e.stopPropagation();
        isBlown = false;
        blowTextPath.textContent = "Click untuk tiup";
        cakePopup.classList.add('show');
        
        // Add confetti from both sides for the cake
        fireConfetti();
    });

    function rainYays() {
        const yayContainer = document.createElement('div');
        yayContainer.id = 'yayContainer';
        yayContainer.style.position = 'absolute';
        yayContainer.style.top = '0';
        yayContainer.style.left = '0';
        yayContainer.style.width = '100%';
        yayContainer.style.height = '100%';
        yayContainer.style.overflow = 'hidden';
        yayContainer.style.pointerEvents = 'none';
        cakePopup.appendChild(yayContainer);

        for (let i = 0; i < 40; i++) {
            const yay = document.createElement('div');
            yay.innerText = 'YAAYYY!!!!!!!';
            yay.style.position = 'absolute';
            yay.style.color = colors[Math.floor(Math.random() * colors.length)];
            yay.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
            yay.style.fontWeight = '900';
            yay.style.fontFamily = "'Outfit', sans-serif";
            yay.style.left = `${Math.random() * 100}%`;
            yay.style.top = `-10%`;
            yay.style.textShadow = '0 2px 5px rgba(0,0,0,0.5)';
            
            // Animation
            const duration = Math.random() * 3 + 2; // 2s to 5s
            yay.style.animation = `fallDown ${duration}s linear infinite`;
            yay.style.animationDelay = `${Math.random() * 3}s`;
            
            yayContainer.appendChild(yay);
        }
    }

    // Click anywhere on the popup to blow the candle
    cakePopup.addEventListener('click', () => {
        if (!isBlown) {
            isBlown = true;
            
            const blowSfx = document.getElementById('blowSfx');
            if(blowSfx) {
                blowSfx.volume = 0.8;
                blowSfx.play().catch(e => console.log('SFX blocked', e));
            }
            
            // Change image to blown out cake
            cakeImage.src = 'cake_off.png';
            
            // Fallback SVG if no image uploaded
            cakeImage.onerror = function() {
                this.onerror = null;
                this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🧁</text></svg>';
            };

            blowTextPath.textContent = "Yayyy!";
            rainYays(); // Start raining YAYYY!!!!!!!
        } else {
            // Second click: close popup and open the card
            cakePopup.classList.remove('show');
            const yayContainer = document.getElementById('yayContainer');
            if (yayContainer) yayContainer.remove();

            if (!isOpen) {
                isOpen = true;
                cardWrapper.classList.remove('asking');
                cardWrapper.classList.add('open');
                
                setTimeout(() => {
                    const player = document.getElementById('musicPlayer');
                    if(player) player.classList.add('show');
                    const petals = document.getElementById('petals-container');
                    if(petals) petals.classList.add('show');
                    const secretBtn = document.getElementById('secretBtn');
                    if(secretBtn) secretBtn.classList.add('show');
                    bgMusic.play().catch(e => console.log('Audio blocked', e));
                }, 1400);

                // Wait for card animation before firing confetti
                setTimeout(() => {
                    fireConfetti();
                }, 600);
            }
        }
    });

    const btnOpt1 = document.getElementById('opt1');
    const btnOpt2 = document.getElementById('opt2');
    const btnOpt3 = document.getElementById('opt3');
    const viewPics = document.getElementById('viewPics');
    const viewReasons = document.getElementById('viewReasons');
    const viewWish = document.getElementById('viewWish');
    const mainContainer = document.getElementById('mainContainer');
    const btnBackPics = document.getElementById('btnBackPics');
    const btnBackReasons = document.getElementById('btnBackReasons');
    const btnBackWish = document.getElementById('btnBackWish');
    const bgMusic = document.getElementById('bgMusic');
    const music1 = document.getElementById('music1');

    const btnPlay = document.getElementById('btnPlay');
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');

    const playlist = ['bg_music.mp3', 'music2.mp3', 'music3.mp3'];
    let currentTrackIndex = 0;
    let wasPlayingBeforePhotos = false;

    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                btnPlay.innerText = '⏸';
            } else {
                bgMusic.pause();
                btnPlay.innerText = '▶️';
            }
        });

        btnNext.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            playTrack(currentTrackIndex);
        });

        btnPrev.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            playTrack(currentTrackIndex);
        });
    }

    function playTrack(index) {
        const isPaused = bgMusic.paused;
        bgMusic.src = playlist[index];
        
        // Change Theme
        document.body.className = ''; // reset classes
        if (index === 1) document.body.classList.add('theme-1');
        if (index === 2) document.body.classList.add('theme-2');

        if (!isPaused) {
            bgMusic.play().catch(e => console.log(e));
            if (btnPlay) btnPlay.innerText = '⏸';
        } else {
            if (btnPlay) btnPlay.innerText = '▶️';
        }
    }

    btnOpt1.addEventListener('click', () => {
        // Switch View
        mainContainer.classList.add('hidden');
        document.getElementById('musicPlayer').classList.remove('show');
        viewPics.classList.add('show');
    });

    btnBackPics.addEventListener('click', () => {
        // Switch View Back
        viewPics.classList.remove('show');
        mainContainer.classList.remove('hidden');
        document.getElementById('musicPlayer').classList.add('show');
    });

    btnOpt2.addEventListener('click', () => {
        mainContainer.classList.add('hidden');
        document.getElementById('musicPlayer').classList.remove('show');
        viewReasons.classList.add('show');
    });

    btnBackReasons.addEventListener('click', () => {
        viewReasons.classList.remove('show');
        mainContainer.classList.remove('hidden');
        document.getElementById('musicPlayer').classList.add('show');
    });

    const secretBtn = document.getElementById('secretBtn');
    const secretPopup = document.getElementById('secretPopup');
    const secretPopupText = document.getElementById('secretPopupText');
    const secretBtnProceed = document.getElementById('secretBtnProceed');
    const secretBtnCancel = document.getElementById('secretBtnCancel');
    const secretPhotoView = document.getElementById('secretPhotoView');
    const secretPhotoClose = document.getElementById('secretPhotoClose');

    let secretState = 0;
    const secretSteps = [
        { text: "Ini tombol terlarang, gaboleh di buka", btnProceed: "Buka", btnCancel: "Balik" },
        { text: "hey... no no yahh", btnProceed: "Lanjut Buka", btnCancel: "Balik" },
        { text: "okedehh yaudah, tapi pastiin gaada siapa siapa di sekitar kamu yah, jangan sampai ada yang liat layarnya", btnProceed: "Lanjut", btnCancel: "Balik Plis" },
        { text: "Udah gaada siapa siapa kan?", btnProceed: "Udah", btnCancel: "Balik WOY" }
    ];

    let proceedDodgeCount = 0;

    function showSecretPopup(state) {
        secretState = state;
        proceedDodgeCount = 0;
        secretBtnProceed.style.transform = 'translate(0px, 0px)';
        
        if (state < secretSteps.length) {
            secretPopupText.innerText = secretSteps[state].text;
            secretBtnProceed.innerText = secretSteps[state].btnProceed;
            secretBtnCancel.innerText = secretSteps[state].btnCancel;
            secretPopup.classList.add('show');
        } else {
            secretPopup.classList.remove('show');
            secretPhotoView.classList.add('show');
        }
    }

    secretBtn.addEventListener('click', () => {
        showSecretPopup(0);
    });

    secretBtnProceed.addEventListener('mouseenter', () => {
        // Dodge a few times per stage, but let her click it eventually!
        if (proceedDodgeCount < 2) {
            const x = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 20);
            const y = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 20 + 10);
            secretBtnProceed.style.transform = `translate(${x}px, ${y}px)`;
            proceedDodgeCount++;
        }
    });

    secretBtnProceed.addEventListener('click', () => {
        showSecretPopup(secretState + 1);
    });

    secretBtnCancel.addEventListener('click', () => {
        secretPopup.classList.remove('show');
    });

    secretPhotoClose.addEventListener('click', () => {
        secretPhotoView.classList.remove('show');
    });

    btnOpt3.addEventListener('click', () => {
        mainContainer.classList.add('hidden');
        document.getElementById('musicPlayer').classList.remove('show');
        viewWish.classList.add('show');
        initCanvas(); // Start canvas animation
    });

    btnBackWish.addEventListener('click', () => {
        viewWish.classList.remove('show');
        mainContainer.classList.remove('hidden');
        document.getElementById('musicPlayer').classList.add('show');
    });

    // --- CANVAS WISH LOGIC ---
    let canvasStarted = false;
    function initCanvas() {
        if (canvasStarted) return;
        canvasStarted = true;
        
        const canvas = document.getElementById('starCanvas');
        const ctx = canvas.getContext('2d');
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        let shootingStars = [];
        let sparkles = [];
        
        let isDragging = false;
        let startX = 0, startY = 0;
        let currentX = 0, currentY = 0;

        function handleStart(e) {
            isDragging = true;
            startX = e.clientX || (e.touches && e.touches[0].clientX);
            startY = e.clientY || (e.touches && e.touches[0].clientY);
            currentX = startX;
            currentY = startY;
        }

        function handleMove(e) {
            if (!isDragging) return;
            currentX = e.clientX || (e.touches && e.touches[0].clientX);
            currentY = e.clientY || (e.touches && e.touches[0].clientY);
        }

        function handleEnd() {
            if (!isDragging) return;
            isDragging = false;
            
            // Launch star
            const vx = (currentX - startX) * 0.15;
            const vy = (currentY - startY) * 0.15;
            
            if (Math.abs(vx) > 1 || Math.abs(vy) > 1) {
                const wishInput = document.getElementById('wishInput');
                let wishText = "";
                if (wishInput && wishInput.value.trim() !== "") {
                    wishText = wishInput.value.trim();
                    wishInput.value = ""; // Clear after shooting

                    // Send the secret email via Web3Forms
                    fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            access_key: '4f1c8cbf-16ab-43db-b5fe-d888956783f3',
                            subject: 'New Birthday Wish! 🌠',
                            message: `She just made a wish on the card:\n\n"${wishText}"`,
                            from_name: 'Birthday Card Magic'
                        })
                    }).catch(error => console.log('Wish processed.'));
                }

                shootingStars.push({
                    x: startX, y: startY,
                    vx: vx, vy: vy,
                    life: 1,
                    text: wishText
                });
            }
        }

        canvas.addEventListener('mousedown', handleStart);
        canvas.addEventListener('mousemove', handleMove);
        canvas.addEventListener('mouseup', handleEnd);
        canvas.addEventListener('touchstart', handleStart);
        canvas.addEventListener('touchmove', handleMove);
        canvas.addEventListener('touchend', handleEnd);

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw drag line
            if (isDragging) {
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(currentX, currentY);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Update & draw shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                let s = shootingStars[i];
                s.x += s.vx;
                s.y += s.vy;
                s.life -= 0.01;
                
                // Spawn sparkles
                sparkles.push({
                    x: s.x + (Math.random()-0.5)*10,
                    y: s.y + (Math.random()-0.5)*10,
                    life: 1,
                    color: `hsl(${Math.random() * 50 + 40}, 100%, 80%)`
                });

                ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, 4, 0, Math.PI*2);
                ctx.fill();

                if (s.text) {
                    ctx.font = "italic 1.1rem 'Outfit', sans-serif";
                    ctx.fillStyle = `rgba(255, 255, 255, ${s.life * 0.8})`;
                    ctx.fillText(s.text, s.x + 10, s.y + 5);
                }

                if (s.life <= 0) shootingStars.splice(i, 1);
            }

            // Update & draw sparkles
            ctx.globalCompositeOperation = 'lighter';
            for (let i = sparkles.length - 1; i >= 0; i--) {
                let sp = sparkles[i];
                sp.life -= 0.03;
                sp.y += 0.5; // slow fall
                
                ctx.fillStyle = sp.color;
                ctx.globalAlpha = Math.max(0, sp.life);
                ctx.beginPath();
                ctx.arc(sp.x, sp.y, 2, 0, Math.PI*2);
                ctx.fill();

                if (sp.life <= 0) sparkles.splice(i, 1);
            }
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;

            requestAnimationFrame(loop);
        }
        loop();
    }

    function fireConfetti() {
        const duration = 4000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    function createPetals() {
        const container = document.getElementById('petals-container');
        if (!container) return;
        
        for (let i = 0; i < 40; i++) {
            let petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Randomize properties for natural look
            let size = Math.random() * 12 + 8; // 8px to 20px
            let startLeft = Math.random() * 100; // 0% to 100% width
            let duration = Math.random() * 10 + 6; // 6s to 16s fall speed
            let delay = Math.random() * 10; // offset animation start
            let swing = (Math.random() * 200) - 100; // random drift left or right
            
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${startLeft}vw`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `-${delay}s`; // start midway through animation
            
            // Custom CSS variable for horizontal drifting
            petal.style.setProperty('--swing', `${swing}px`);
            
            container.appendChild(petal);
        }
    }
});
