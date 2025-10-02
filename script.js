class GameStateManager {
    constructor() {
        this.currentState = 'start';
        this.selectedCharacter = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('startScreen');
    }

    bindEvents() {
        const playButton = document.getElementById('playButton');
        const rectangles = document.querySelectorAll('.game-rectangle');
        const backButton = document.getElementById('backButton');

        playButton.addEventListener('click', () => this.transitionToSelection());

        rectangles.forEach(rectangle => {
            rectangle.addEventListener('click', (e) => {
                const character = e.currentTarget.dataset.character;
                this.selectCharacter(character);
            });
        });

        backButton.addEventListener('click', () => this.goBackToMenu());
    }

    showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    transitionToSelection() {
        this.currentState = 'selection';
        this.fadeTransition('startScreen', 'selectionScreen');
    }

    selectCharacter(characterNumber) {
        this.selectedCharacter = characterNumber;
        this.currentState = 'game';
        this.startGameAnimation();
    }

    fadeTransition(fromScreenId, toScreenId) {
        const fromScreen = document.getElementById(fromScreenId);
        const toScreen = document.getElementById(toScreenId);

        fromScreen.style.opacity = '0';
        fromScreen.style.pointerEvents = 'none';

        setTimeout(() => {
            fromScreen.classList.remove('active');
            toScreen.classList.add('active');
            toScreen.style.opacity = '1';
            toScreen.style.pointerEvents = 'all';
        }, 800);
    }

    startGameAnimation() {
        this.fadeTransition('selectionScreen', 'gameScreen');

        setTimeout(() => {
            this.playLoadingAnimation();
        }, 1000);
    }

    playLoadingAnimation() {
        const loadingText = document.querySelector('.loading-text');
        const loadingProgress = document.querySelector('.loading-progress');

        const messages = [
            'Entering the Night...',
            'Awakening the Eye...',
            'Shadows Stirring...',
            'Darkness Beckons...'
        ];

        let messageIndex = 0;

        const messageInterval = setInterval(() => {
            loadingText.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
        }, 800);

        setTimeout(() => {
            clearInterval(messageInterval);
            loadingText.textContent = 'Welcome to Night Eye';
            this.startGame();
        }, 3200);
    }

    startGame() {
        setTimeout(() => {
            this.startDemonCatAnimation();
        }, 1000);
    }

    startDemonCatAnimation() {
        this.fadeTransition('gameScreen', 'demonCatScreen');

        setTimeout(() => {
            this.triggerVillageCatReactions();
        }, 1000);

        setTimeout(() => {
            this.fadeTransition('demonCatScreen', 'gameScreen');
            this.displayGameWorld();
        }, 13000);
    }

    triggerVillageCatReactions() {
        const villageCats = document.querySelectorAll('.village-cat');

        setTimeout(() => {
            if (villageCats[0]) villageCats[0].classList.add('fleeing');
        }, 2000);

        setTimeout(() => {
            if (villageCats[1]) villageCats[1].classList.add('fleeing');
        }, 4000);

        setTimeout(() => {
            if (villageCats[2]) villageCats[2].classList.add('fleeing');
        }, 6000);

        setTimeout(() => {
            if (villageCats[3]) villageCats[3].classList.add('fleeing');
        }, 8000);
    }

    displayGameWorld() {
        const gameArea = document.querySelector('.game-area');
        gameArea.innerHTML = `
            <div class="game-world">
                <div class="character-info">
                    <h2 class="night-eye-title">
                        NIGHT
                        <span class="flickering-eye">👁</span>
                        EYE
                    </h2>
                    <p>The demon has awakened. Your journey begins...</p>
                    <div class="game-controls">
                        <button class="restart-btn" onclick="gameManager.restart()">Return to Start</button>
                    </div>
                </div>
                <div class="world-container">
                    <div class="animated-background">
                        <div class="floating-particle"></div>
                        <div class="floating-particle"></div>
                        <div class="floating-particle"></div>
                        <div class="floating-particle"></div>
                        <div class="floating-particle"></div>
                    </div>
                </div>
            </div>
        `;
        this.addGameWorldStyles();
    }

    addGameWorldStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-world {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .character-info {
                text-align: center;
                z-index: 10;
                position: relative;
            }

            .night-eye-title {
                font-size: 2.5rem;
                margin-bottom: 20px;
                text-shadow: 0 0 20px #ffffff;
                letter-spacing: 0.1em;
            }

            .flickering-eye {
                display: inline-block;
                margin: 0 15px;
                animation: eyeFlicker 2s infinite;
                filter: drop-shadow(0 0 15px #ffffff);
            }

            .character-info p {
                font-size: 1.2rem;
                margin-bottom: 30px;
                opacity: 0.8;
            }

            .restart-btn {
                background: transparent;
                border: 2px solid #ffffff;
                color: #ffffff;
                padding: 10px 25px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                letter-spacing: 0.05em;
            }

            .restart-btn:hover {
                background: #ffffff;
                color: #000000;
                box-shadow: 0 0 20px #ffffff;
            }

            .world-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .animated-background {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .floating-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffffff;
                border-radius: 50%;
                opacity: 0.7;
                animation: float 6s ease-in-out infinite;
            }

            .floating-particle:nth-child(1) {
                top: 20%;
                left: 10%;
                animation-delay: 0s;
            }

            .floating-particle:nth-child(2) {
                top: 60%;
                left: 80%;
                animation-delay: 1s;
            }

            .floating-particle:nth-child(3) {
                top: 80%;
                left: 20%;
                animation-delay: 2s;
            }

            .floating-particle:nth-child(4) {
                top: 30%;
                left: 70%;
                animation-delay: 3s;
            }

            .floating-particle:nth-child(5) {
                top: 70%;
                left: 50%;
                animation-delay: 4s;
            }

            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.7;
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-10px) translateX(-15px);
                    opacity: 0.5;
                }
                75% {
                    transform: translateY(-30px) translateX(5px);
                    opacity: 1;
                }
            }

            @keyframes eyeFlicker {
                0%, 85%, 100% { opacity: 1; }
                87%, 89%, 91% { opacity: 0.3; }
                93%, 95% { opacity: 1; }
                97% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }

    goBackToMenu() {
        this.currentState = 'start';
        this.fadeTransition('selectionScreen', 'startScreen');
    }

    restart() {
        this.currentState = 'start';
        this.selectedCharacter = null;

        const gameArea = document.querySelector('.game-area');
        gameArea.innerHTML = `
            <div class="loading-animation">
                <div class="loading-text">Entering the Night...</div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;

        this.fadeTransition('gameScreen', 'startScreen');
    }
}

const gameManager = new GameStateManager();

document.addEventListener('DOMContentLoaded', () => {
    console.log('Night Eye Game Loaded');
});