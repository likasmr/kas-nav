// 樱花飘落效果（精简版）
class SakuraPetal {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.innerHTML = '🌸';
        this.element.style.position = 'fixed';
        this.reset();
        container.appendChild(this.element);
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -50;
        this.speed = 2 + Math.random() * 3;
        this.angle = Math.random() * 360;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.opacity = 0.7;
    }

    update() {
        this.y += this.speed;
        this.angle += 2;
        this.x += Math.sin(this.angle * Math.PI / 180) * 2;
        
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.angle}deg)`;
        
        if (this.y > window.innerHeight) this.reset();
    }
}

// 创建樱花雨
const container = document.getElementById('sakura-container');
const petals = Array.from({ length: 15 }, () => new SakuraPetal(container));

function animate() {
    petals.forEach(petal => petal.update());
    requestAnimationFrame(animate);
}
animate(); 