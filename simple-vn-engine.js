const VNEngine = {
    currentScene: 0,
    currentLine: 0,
    gameData: {},
    choices: [],
    isTyping: false,
    typewriterTimeout: null,
    
    // Système audio
    audioContext: null,
    currentAmbiance: null,
    ambianceVolume: 0.3,
    fadeSpeed: 2000, // durée du fade en ms
    
    // Système lecture automatique
    autoPlayTimeout: null,
    isAutoPlaying: false,
    
    init() {
        this.gameContainer = document.getElementById('game-container');
        this.mainMenu = document.getElementById('main-menu');
        this.saveMenu = document.getElementById('save-menu');
        this.loadMenu = document.getElementById('load-menu');
        this.customPopup = document.getElementById('custom-popup');
        this.dialogueBox = document.getElementById('dialogue-box');
        this.characterName = document.getElementById('character-name');
        this.dialogueText = document.getElementById('dialogue-text');
        this.choicesDiv = document.getElementById('choices');
        this.nextBtn = document.getElementById('next-btn');
        this.background = document.getElementById('background');
        this.characters = document.getElementById('characters');
        
        this.popupTitle = document.getElementById('popup-title');
        this.popupMessage = document.getElementById('popup-message');
        this.popupConfirm = document.getElementById('popup-confirm');
        this.popupCancel = document.getElementById('popup-cancel');
        
        this.playBtn = document.getElementById('play-btn');
        this.loadBtn = document.getElementById('load-btn');
        this.optionsBtn = document.getElementById('options-btn');
        this.creditsBtn = document.getElementById('credits-btn');
        
        this.saveGameBtn = document.getElementById('save-game-btn');
        this.menuBtn = document.getElementById('menu-btn');
        
        this.saveBackBtn = document.getElementById('save-back-btn');
        this.loadBackBtn = document.getElementById('load-back-btn');
        
        this.audioToggle = document.getElementById('audio-toggle');
        this.volumeSlider = document.getElementById('volume-slider');
        
        // Menu Options
        this.optionsMenu = document.getElementById('options-menu');
        this.optionsBackBtn = document.getElementById('options-back-btn');
        this.masterVolumeSlider = document.getElementById('master-volume');
        this.masterVolumeValue = document.getElementById('master-volume-value');
        this.ambianceVolumeSlider = document.getElementById('ambiance-volume');
        this.ambianceVolumeValue = document.getElementById('ambiance-volume-value');
        this.audioEnabledBtn = document.getElementById('audio-enabled');
        this.textSpeedSlider = document.getElementById('text-speed');
        this.textSpeedValue = document.getElementById('text-speed-value');
        this.autoPlayBtn = document.getElementById('auto-play');
        this.optionsResetBtn = document.getElementById('options-reset');
        
        this.nextBtn.addEventListener('click', () => this.handleNext());
        this.playBtn.addEventListener('click', () => this.startGame());
        this.loadBtn.addEventListener('click', () => this.showLoadMenu());
        this.optionsBtn.addEventListener('click', () => this.showOptions());
        this.creditsBtn.addEventListener('click', () => this.showCredits());
        this.saveGameBtn.addEventListener('click', () => this.showSaveMenu());
        this.menuBtn.addEventListener('click', () => this.showMainMenu());
        this.saveBackBtn.addEventListener('click', () => this.hideSaveMenu());
        this.loadBackBtn.addEventListener('click', () => this.hideLoadMenu());
        
        this.audioToggle.addEventListener('click', () => this.toggleAudio());
        this.volumeSlider.addEventListener('input', (e) => this.setAmbianceVolume(e.target.value / 100));
        
        // Event listeners pour menu options
        this.optionsBackBtn.addEventListener('click', () => this.hideOptionsMenu());
        this.masterVolumeSlider.addEventListener('input', (e) => this.setMasterVolume(e.target.value / 100));
        this.ambianceVolumeSlider.addEventListener('input', (e) => this.setAmbianceVolumeFromOptions(e.target.value / 100));
        this.audioEnabledBtn.addEventListener('click', () => this.toggleAudioEnabled());
        this.textSpeedSlider.addEventListener('input', (e) => this.setTextSpeed(e.target.value));
        this.autoPlayBtn.addEventListener('click', () => this.toggleAutoPlay());
        this.optionsResetBtn.addEventListener('click', () => this.resetOptions());
        
        // Event listener pour les raccourcis clavier
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        this.gameData = {
            aikoAffection: 0,
            reinaAffection: 0,
            playerChoice: ''
        };
        
        // Options par défaut
        this.gameOptions = {
            masterVolume: 0.3,
            ambianceVolume: 0.3,
            audioEnabled: true,
            textSpeed: 3,
            autoPlay: false
        };
        
        // Charger les options sauvegardées
        this.loadOptions();
        
        // Initialiser le système audio
        this.initAudio();
        
        // Initialiser l'affichage des options
        if (this.optionsMenu) {
            this.updateOptionsDisplay();
        }
        
        // Initialiser l'affichage auto-play
        this.updateAutoPlayStatus();
        
        const logo = document.getElementById('game-logo');
        if (logo) {
            console.log('Logo trouvé, affichage normal');
        }
    },
    
    startGame() {
        this.mainMenu.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        this.loadScene('start');
    },
    
    showMainMenu() {
        this.mainMenu.style.display = 'flex';
        this.gameContainer.style.display = 'none';
    },
    
    showLoadMenu() {
        this.loadMenu.style.display = 'flex';
        this.renderLoadSlots();
    },
    
    showSaveMenu() {
        this.saveMenu.style.display = 'flex';
        this.renderSaveSlots();
    },
    
    hideSaveMenu() {
        this.saveMenu.style.display = 'none';
    },
    
    hideLoadMenu() {
        this.loadMenu.style.display = 'none';
    },
    
    saveGame(slotNumber) {
        const saveData = {
            timestamp: new Date().toLocaleString('fr-FR'),
            currentScene: this.currentScene,
            currentLine: this.currentLine,
            gameData: { ...this.gameData },
            sceneInfo: this.getSceneInfo()
        };
        
        localStorage.setItem(`starclub_save_${slotNumber}`, JSON.stringify(saveData));
        console.log(`Jeu sauvegardé dans le slot ${slotNumber}`);
        
        this.renderSaveSlots();
        
        this.showNotification('Jeu sauvegardé !');
    },
    
    loadGame(slotNumber) {
        const saveData = localStorage.getItem(`starclub_save_${slotNumber}`);
        
        if (saveData) {
            const data = JSON.parse(saveData);
            
            this.currentScene = data.currentScene;
            this.currentLine = data.currentLine;
            this.gameData = { ...data.gameData };
            
            this.hideLoadMenu();
            this.showMainMenu = () => {};
            this.gameContainer.style.display = 'flex';
            this.mainMenu.style.display = 'none';
            
            this.showLine();
            
            console.log(`Jeu chargé depuis le slot ${slotNumber}`);
            this.showNotification('Jeu chargé !');
        }
    },
    
    deleteSave(slotNumber) {
        this.showCustomPopup(
            'Supprimer la sauvegarde',
            `Êtes-vous sûr de vouloir supprimer la sauvegarde du slot ${slotNumber} ?`,
            true,
            () => {
                localStorage.removeItem(`starclub_save_${slotNumber}`);
                this.renderSaveSlots();
                this.renderLoadSlots();
                this.showNotification('Sauvegarde supprimée');
            },
            () => {
            }
        );
    },
    
    getSceneInfo() {
        const scene = Story[this.currentScene];
        if (scene && this.currentLine < scene.length) {
            const line = scene[this.currentLine];
            if (typeof line === 'string') {
                return line.substring(0, 60) + '...';
            } else if (line.character && line.text) {
                return `${line.character}: ${line.text.substring(0, 40)}...`;
            }
        }
        return 'Scene inconnue';
    },
    
    renderSaveSlots() {
        const container = document.getElementById('save-slots');
        container.innerHTML = '';
        
        for (let i = 1; i <= 12; i++) {
            const saveData = localStorage.getItem(`starclub_save_${i}`);
            const slot = this.createSaveSlot(i, saveData, true);
            container.appendChild(slot);
        }
    },
    
    renderLoadSlots() {
        const container = document.getElementById('load-slots');
        container.innerHTML = '';
        
        for (let i = 1; i <= 12; i++) {
            const saveData = localStorage.getItem(`starclub_save_${i}`);
            const slot = this.createSaveSlot(i, saveData, false);
            container.appendChild(slot);
        }
    },
    
    createSaveSlot(slotNumber, saveData, isSaveMode) {
        const slot = document.createElement('div');
        slot.className = saveData ? 'save-slot' : 'save-slot empty';
        
        if (saveData) {
            const data = JSON.parse(saveData);
            slot.innerHTML = `
                <div class="slot-header">
                    <span class="slot-number">Slot ${slotNumber}</span>
                    <span class="slot-date">${data.timestamp}</span>
                </div>
                <div class="slot-info">
                    <div class="slot-scene">${data.sceneInfo}</div>
                    <div class="slot-stats">
                        Affection Aiko: ${data.gameData.aikoAffection} | 
                        Affection Reina: ${data.gameData.reinaAffection}
                    </div>
                </div>
            `;
            
            if (isSaveMode) {
                slot.addEventListener('click', () => this.saveGame(slotNumber));
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '🗑️';
                deleteBtn.className = 'delete-btn';
                deleteBtn.style.cssText = `
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: rgba(191, 97, 106, 0.8);
                    border: none;
                    border-radius: 5px;
                    color: white;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                `;
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteSave(slotNumber);
                });
                slot.style.position = 'relative';
                slot.appendChild(deleteBtn);
            } else {
                slot.addEventListener('click', () => this.loadGame(slotNumber));
            }
        } else {
            slot.innerHTML = `
                <div class="slot-header">
                    <span class="slot-number">Slot ${slotNumber}</span>
                    <span class="slot-date">Vide</span>
                </div>
                <div class="slot-info">
                    ${isSaveMode ? 'Cliquez pour sauvegarder' : 'Aucune sauvegarde'}
                </div>
            `;
            
            if (isSaveMode) {
                slot.addEventListener('click', () => this.saveGame(slotNumber));
            }
        }
        
        return slot;
    },
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #A3BE8C 0%, #8FBCBB 100%);
            color: #2E3440;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(163, 190, 140, 0.4);
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    showOptions() {
        this.mainMenu.style.display = 'none';
        this.optionsMenu.style.display = 'flex';
        this.updateOptionsDisplay();
    },
    
    showCredits() {
        this.showCustomPopup(
            'Crédits',
            'Le Club des Étoiles\nVisual Novel créé avec un moteur custom\n\nDéveloppé avec ❤️',
            false
        );
    },
    
    showCustomPopup(title, message, showCancel = false, onConfirm = null, onCancel = null) {
        this.popupTitle.textContent = title;
        this.popupMessage.innerHTML = message.replace(/\n/g, '<br>');
        
        this.popupCancel.style.display = showCancel ? 'block' : 'none';
        
        const newConfirm = this.popupConfirm.cloneNode(true);
        const newCancel = this.popupCancel.cloneNode(true);
        this.popupConfirm.parentNode.replaceChild(newConfirm, this.popupConfirm);
        this.popupCancel.parentNode.replaceChild(newCancel, this.popupCancel);
        this.popupConfirm = newConfirm;
        this.popupCancel = newCancel;
        
        this.popupConfirm.addEventListener('click', () => {
            this.hideCustomPopup();
            if (onConfirm) onConfirm();
        });
        
        if (showCancel) {
            this.popupCancel.addEventListener('click', () => {
                this.hideCustomPopup();
                if (onCancel) onCancel();
            });
        }
        
        this.customPopup.style.display = 'flex';
    },
    
    hideCustomPopup() {
        this.customPopup.style.display = 'none';
    },
    
    // ===== FONCTIONS OPTIONS =====
    
    hideOptionsMenu() {
        this.optionsMenu.style.display = 'none';
        this.mainMenu.style.display = 'flex';
        this.saveOptions();
    },
    
    updateOptionsDisplay() {
        // Mettre à jour les valeurs affichées
        this.masterVolumeSlider.value = this.gameOptions.masterVolume * 100;
        this.masterVolumeValue.textContent = Math.round(this.gameOptions.masterVolume * 100) + '%';
        
        this.ambianceVolumeSlider.value = this.gameOptions.ambianceVolume * 100;
        this.ambianceVolumeValue.textContent = Math.round(this.gameOptions.ambianceVolume * 100) + '%';
        
        this.audioEnabledBtn.textContent = this.gameOptions.audioEnabled ? 'ON' : 'OFF';
        this.audioEnabledBtn.classList.toggle('active', this.gameOptions.audioEnabled);
        
        this.textSpeedSlider.value = this.gameOptions.textSpeed;
        const speedLabels = ['Très Lent', 'Lent', 'Normal', 'Rapide', 'Très Rapide'];
        this.textSpeedValue.textContent = speedLabels[this.gameOptions.textSpeed - 1];
        
        this.autoPlayBtn.textContent = this.gameOptions.autoPlay ? 'ON' : 'OFF';
        this.autoPlayBtn.classList.toggle('active', this.gameOptions.autoPlay);
    },
    
    setMasterVolume(volume) {
        this.gameOptions.masterVolume = Math.max(0, Math.min(1, volume));
        this.masterVolumeValue.textContent = Math.round(this.gameOptions.masterVolume * 100) + '%';
        
        // Appliquer le volume maître à tous les sons
        if (this.currentAmbiance) {
            this.currentAmbiance.volume = this.gameOptions.ambianceVolume * this.gameOptions.masterVolume;
        }
        console.log('Volume maître défini à:', this.gameOptions.masterVolume);
    },
    
    setAmbianceVolumeFromOptions(volume) {
        this.gameOptions.ambianceVolume = Math.max(0, Math.min(1, volume));
        this.ambianceVolumeValue.textContent = Math.round(this.gameOptions.ambianceVolume * 100) + '%';
        
        // Mettre à jour le volume de l'ambiance actuelle
        if (this.currentAmbiance) {
            this.currentAmbiance.volume = this.gameOptions.ambianceVolume * this.gameOptions.masterVolume;
        }
        
        // Synchroniser avec le slider de jeu
        this.volumeSlider.value = this.gameOptions.ambianceVolume * 100;
        console.log('Volume ambiance défini à:', this.gameOptions.ambianceVolume);
    },
    
    toggleAudioEnabled() {
        this.gameOptions.audioEnabled = !this.gameOptions.audioEnabled;
        this.audioEnabledBtn.textContent = this.gameOptions.audioEnabled ? 'ON' : 'OFF';
        this.audioEnabledBtn.classList.toggle('active', this.gameOptions.audioEnabled);
        
        if (!this.gameOptions.audioEnabled && this.currentAmbiance) {
            this.currentAmbiance.pause();
        } else if (this.gameOptions.audioEnabled && this.currentAmbiance) {
            this.currentAmbiance.play();
        }
        
        console.log('Audio', this.gameOptions.audioEnabled ? 'activé' : 'désactivé');
    },
    
    setTextSpeed(speed) {
        this.gameOptions.textSpeed = parseInt(speed);
        const speedLabels = ['Très Lent', 'Lent', 'Normal', 'Rapide', 'Très Rapide'];
        this.textSpeedValue.textContent = speedLabels[this.gameOptions.textSpeed - 1];
        
        // Calculer la vitesse en ms par caractère
        const baseSpeed = 50;
        this.typewriterSpeed = baseSpeed / this.gameOptions.textSpeed;
        
        console.log('Vitesse du texte définie à:', speedLabels[this.gameOptions.textSpeed - 1]);
    },
    
    toggleAutoPlay() {
        this.gameOptions.autoPlay = !this.gameOptions.autoPlay;
        this.autoPlayBtn.textContent = this.gameOptions.autoPlay ? 'ON' : 'OFF';
        this.autoPlayBtn.classList.toggle('active', this.gameOptions.autoPlay);
        
        // Mettre à jour l'affichage du bouton de jeu
        this.updateAutoPlayStatus();
        
        // Si on vient d'activer l'auto-play et qu'on n'est pas en train de taper
        if (this.gameOptions.autoPlay && !this.isTyping) {
            this.startAutoPlayTimer();
        } else if (!this.gameOptions.autoPlay) {
            this.stopAutoPlayTimer();
        }
        
        console.log('Lecture auto', this.gameOptions.autoPlay ? 'activée' : 'désactivée');
    },
    
    saveOptions() {
        try {
            localStorage.setItem('vn_options', JSON.stringify(this.gameOptions));
            console.log('Options sauvegardées');
        } catch (error) {
            console.warn('Impossible de sauvegarder les options:', error);
        }
    },
    
    loadOptions() {
        try {
            const saved = localStorage.getItem('vn_options');
            if (saved) {
                this.gameOptions = { ...this.gameOptions, ...JSON.parse(saved) };
                console.log('Options chargées:', this.gameOptions);
            }
        } catch (error) {
            console.warn('Impossible de charger les options:', error);
        }
    },
    
    resetOptions() {
        this.gameOptions = {
            masterVolume: 0.3,
            ambianceVolume: 0.3,
            audioEnabled: true,
            textSpeed: 3,
            autoPlay: false
        };
        this.updateOptionsDisplay();
        this.saveOptions();
        console.log('Options réinitialisées');
    },
    
    // ===== FONCTIONS AUTO-PLAY =====
    
    startAutoPlayTimer() {
        if (!this.gameOptions.autoPlay || this.choices.length > 0) {
            return; // Pas d'auto-play si désactivé ou en cas de choix
        }
        
        // Arrêter tout timer existant
        this.stopAutoPlayTimer();
        
        // Calculer le délai basé sur la longueur du texte et la vitesse
        const textLength = this.dialogueText.textContent.length;
        const baseDelay = 2000; // 2 secondes minimum
        const readingTime = Math.max(textLength * 100, baseDelay); // 100ms par caractère minimum
        
        console.log('Auto-play: prochain texte dans', readingTime, 'ms');
        
        this.autoPlayTimeout = setTimeout(() => {
            if (this.gameOptions.autoPlay) {
                this.next();
            }
        }, readingTime);
        
        this.isAutoPlaying = true;
    },
    
    stopAutoPlayTimer() {
        if (this.autoPlayTimeout) {
            clearTimeout(this.autoPlayTimeout);
            this.autoPlayTimeout = null;
        }
        this.isAutoPlaying = false;
    },
    
    updateAutoPlayStatus() {
        // Mettre à jour l'indicateur visuel d'auto-play
        this.isAutoPlaying = this.gameOptions.autoPlay;
        
        if (this.gameOptions.autoPlay) {
            // Ajouter un indicateur visuel que l'auto-play est actif
            this.nextBtn.textContent = 'Suivant (Auto)';
            this.nextBtn.classList.add('auto-mode');
        } else {
            this.nextBtn.textContent = 'Suivant';
            this.nextBtn.classList.remove('auto-mode');
        }
    },
    
    // ===== RACCOURCIS CLAVIER =====
    
    handleKeyPress(event) {
        // Ignorer si on est dans un champ de texte
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Ignorer si on n'est pas dans le jeu
        if (this.gameContainer.style.display === 'none') {
            return;
        }
        
        switch (event.key) {
            case ' ': // Espace pour avancer
            case 'Enter':
                event.preventDefault();
                if (this.nextBtn.style.display !== 'none') {
                    this.handleNext();
                }
                break;
                
            case 'a': // A pour toggle auto-play
            case 'A':
                event.preventDefault();
                this.toggleAutoPlay();
                this.updateOptionsDisplay(); // Mettre à jour l'affichage dans le menu
                break;
                
            case 'Escape': // Echap pour menu
                event.preventDefault();
                this.showMainMenu();
                break;
        }
    },
    
    start() {
        this.showMainMenu();
    },
    
    loadScene(sceneName) {
        if (Story[sceneName]) {
            this.currentScene = sceneName;
            this.currentLine = 0;
            this.showLine();
        }
    },
    
    showLine() {
        const scene = Story[this.currentScene];
        if (!scene || this.currentLine >= scene.length) {
            this.showText('Fin de cette partie de l\'histoire...', '');
            return;
        }
        
        const line = scene[this.currentLine];
        
        if (typeof line === 'string') {
            this.showText(line, '');
        } else if (line.character) {
            this.showText(line.text, line.character);
            
            if (line.sprite) {
                this.showCharacter(line.character, line.sprite);
            }
        } else if (line.background) {
            this.setBackground(line.background);
            this.next();
            return;
        } else if (line.ambiance) {
            this.playAmbiance(line.ambiance, line.loop !== false, line.volume);
            this.next();
            return;
        } else if (line.stopAmbiance) {
            this.stopAmbiance();
            this.next();
            return;
        } else if (line.choice) {
            this.showChoices(line.choices);
            return;
        } else if (line.jump) {
            this.loadScene(line.jump);
            return;
        } else if (line.action) {
            this.executeAction(line.action, line.value);
            this.next();
            return;
        }
    },
    
    showText(text, character) {
        if (this.typewriterTimeout) {
            clearTimeout(this.typewriterTimeout);
            this.typewriterTimeout = null;
        }
        this.isTyping = false;
        
        this.characterName.textContent = character;
        this.characterName.style.display = character ? 'block' : 'none';
        
        this.dialogueText.textContent = '';
        
        this.isTyping = true;
        let i = 0;
        const typeWriter = () => {
            if (i < text.length && this.isTyping) {
                this.dialogueText.textContent += text.charAt(i);
                i++;
                this.typewriterTimeout = setTimeout(typeWriter, 30);
            } else if (i >= text.length) {
                this.isTyping = false;
                this.typewriterTimeout = null;
                
                // Démarrer l'auto-play si activé
                this.startAutoPlayTimer();
            }
        };
        typeWriter();
        
        this.choicesDiv.style.display = 'none';
        this.nextBtn.style.display = 'block';
    },
    
    handleNext() {
        // Arrêter l'auto-play si actif
        this.stopAutoPlayTimer();
        
        if (this.isTyping) {
            this.isTyping = false;
            if (this.typewriterTimeout) {
                clearTimeout(this.typewriterTimeout);
                this.typewriterTimeout = null;
            }
            
            const scene = Story[this.currentScene];
            if (scene && this.currentLine < scene.length) {
                const line = scene[this.currentLine];
                let fullText = '';
                
                if (typeof line === 'string') {
                    fullText = line;
                } else if (line.character && line.text) {
                    fullText = line.text;
                }
                
                this.dialogueText.textContent = fullText;
            }
            return;
        }
        
        this.next();
    },
    
    showChoices(choices) {
        // Arrêter l'auto-play lors de l'affichage des choix
        this.stopAutoPlayTimer();
        
        this.choicesDiv.innerHTML = '';
        this.choicesDiv.style.display = 'block';
        this.nextBtn.style.display = 'none';
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.className = 'choice-btn';
            button.addEventListener('click', () => {
                this.gameData.playerChoice = choice.text;
                if (choice.action) {
                    this.executeAction(choice.action, choice.value);
                }
                if (choice.jump) {
                    this.loadScene(choice.jump);
                } else {
                    this.next();
                }
            });
            this.choicesDiv.appendChild(button);
        });
    },
    
    setBackground(imagePath) {
        if (!this.background.style.backgroundImage || this.background.style.backgroundImage === 'none') {
            this.background.style.backgroundImage = `url(${imagePath})`;
            console.log('Premier background chargé:', imagePath);
            return;
        }

        const currentImage = this.background.style.backgroundImage;
        const newImage = `url(${imagePath})`;
        if (currentImage === newImage) {
            return; 
        }

        console.log('Transition background de', currentImage, 'vers', newImage);

        const newBackground = document.createElement('div');
        newBackground.className = 'background-transition';
        newBackground.style.backgroundImage = newImage;
        newBackground.style.opacity = '0';
        newBackground.style.transition = 'opacity 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        newBackground.style.zIndex = '2';

        this.background.style.zIndex = '1';

        const gameContainer = document.getElementById('game-container');
        gameContainer.insertBefore(newBackground, gameContainer.firstChild);

        const img = new Image();
        img.onload = () => {
            setTimeout(() => {
                newBackground.style.opacity = '1';
            }, 50);

            setTimeout(() => {
                this.background.style.backgroundImage = newImage;
                this.background.style.zIndex = '1';
                newBackground.remove();
                console.log('Transition background terminée');
            }, 1550);
        };
        
        img.onerror = () => {
            console.error('Erreur de chargement de l\'image:', imagePath);
            this.background.style.backgroundImage = newImage;
            newBackground.remove();
        };
        
        img.src = imagePath;
    },
    
    // ===== SYSTÈME AUDIO =====
    
    initAudio() {
        try {
            // Créer le contexte audio si pas déjà fait
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            console.log('Système audio initialisé');
        } catch (error) {
            console.warn('Impossible d\'initialiser le contexte audio:', error);
        }
    },
    
    playAmbiance(audioPath, loop = true, volume = null) {
        // Vérifier si l'audio est activé
        if (!this.gameOptions.audioEnabled) {
            console.log('Audio désactivé, ambiance ignorée');
            return;
        }
        
        if (volume === null) volume = this.gameOptions.ambianceVolume;
        
        // Si c'est déjà la même ambiance, ne rien faire
        if (this.currentAmbiance && this.currentAmbiance.src.includes(audioPath)) {
            return;
        }
        
        console.log('Changement d\'ambiance vers:', audioPath);
        
        // Créer le nouvel audio
        const newAudio = new Audio(audioPath);
        newAudio.loop = loop;
        newAudio.volume = 0; // Commencer à 0 pour le fade-in
        
        // Gérer les erreurs de chargement
        newAudio.onerror = () => {
            console.warn('Impossible de charger l\'audio:', audioPath);
        };
        
        newAudio.oncanplaythrough = () => {
            // Fade out l'ancienne ambiance si elle existe
            if (this.currentAmbiance) {
                this.fadeOut(this.currentAmbiance, () => {
                    this.currentAmbiance.pause();
                    this.currentAmbiance = null;
                });
            }
            
            // Jouer et fade in la nouvelle ambiance
            this.currentAmbiance = newAudio;
            newAudio.play().then(() => {
                const finalVolume = volume * this.gameOptions.masterVolume;
                this.fadeIn(newAudio, finalVolume);
            }).catch(error => {
                console.warn('Erreur lors de la lecture audio:', error);
            });
        };
        
        // Charger l'audio
        newAudio.load();
    },
    
    stopAmbiance() {
        if (this.currentAmbiance) {
            this.fadeOut(this.currentAmbiance, () => {
                this.currentAmbiance.pause();
                this.currentAmbiance = null;
            });
        }
    },
    
    fadeIn(audio, targetVolume, duration = null) {
        if (duration === null) duration = this.fadeSpeed;
        
        const steps = 50;
        const stepTime = duration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            audio.volume = Math.min(volumeStep * currentStep, targetVolume);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                audio.volume = targetVolume;
            }
        }, stepTime);
    },
    
    fadeOut(audio, callback = null, duration = null) {
        if (duration === null) duration = this.fadeSpeed;
        
        const steps = 50;
        const stepTime = duration / steps;
        const startVolume = audio.volume;
        const volumeStep = startVolume / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);
            
            if (currentStep >= steps || audio.volume <= 0) {
                clearInterval(fadeInterval);
                audio.volume = 0;
                if (callback) callback();
            }
        }, stepTime);
    },
    
    setAmbianceVolume(volume) {
        this.ambianceVolume = Math.max(0, Math.min(1, volume));
        if (this.currentAmbiance) {
            this.currentAmbiance.volume = this.ambianceVolume;
        }
        console.log('Volume ambiance défini à:', this.ambianceVolume);
    },
    
    toggleAudio() {
        if (this.currentAmbiance && this.currentAmbiance.volume > 0) {
            // Mute
            this.currentAmbiance.volume = 0;
            this.audioToggle.textContent = '🔇';
            this.audioToggle.classList.add('muted');
            this.volumeSlider.style.opacity = '0.5';
        } else {
            // Unmute
            if (this.currentAmbiance) {
                this.currentAmbiance.volume = this.ambianceVolume;
            }
            this.audioToggle.textContent = '🔊';
            this.audioToggle.classList.remove('muted');
            this.volumeSlider.style.opacity = '1';
        }
    },
    
    showCharacter(characterName, expression = 'normal') {
        const imagePath = `assets/characters/${characterName.toLowerCase()}/${expression}.png`;
        const fallbackPath = `assets/characters/${characterName.toLowerCase()}/normal.png`;
        
        const img = document.createElement('img');
        img.alt = characterName;
        img.className = 'character-sprite';
        
        img.onerror = function() {
            if (this.src !== fallbackPath) {
                console.log(`Image ${imagePath} non trouvée, fallback vers normal.png`);
                this.src = fallbackPath;
            }
        };
        
        img.src = imagePath;
        this.characters.innerHTML = '';
        this.characters.appendChild(img);
    },
    
    executeAction(action, value) {
        switch(action) {
            case 'increaseAffection':
                if (value === 'aiko') {
                    this.gameData.aikoAffection++;
                    console.log('Affection Aiko:', this.gameData.aikoAffection);
                } else if (value === 'reina') {
                    this.gameData.reinaAffection++;
                    console.log('Affection Reina:', this.gameData.reinaAffection);
                }
                break;
        }
    },
    
    next() {
        this.currentLine++;
        this.showLine();
        
        if (this.currentLine % 5 === 0) {
            this.autoSave();
        }
    },
    
    autoSave() {
        const saveData = {
            timestamp: new Date().toLocaleString('fr-FR'),
            currentScene: this.currentScene,
            currentLine: this.currentLine,
            gameData: { ...this.gameData },
            sceneInfo: 'Sauvegarde automatique'
        };
        
        localStorage.setItem('starclub_autosave', JSON.stringify(saveData));
        console.log('Sauvegarde automatique effectuée');
    }
};
