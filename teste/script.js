document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('h1');
    if (!h1) return;

    const text = h1.textContent.trim();
    h1.innerHTML = ''; // Clear original text

    // Split letters into spans to animate individually for a wave/rainbow effect
    const letterSpans = [...text].map(char => {
        const span = document.createElement('span');
        if (char === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = char;
        }
        h1.appendChild(span);
        return span;
    });

    let baseHue = 0;

    function animate() {
        baseHue = (baseHue + 1.5) % 360; // Speed of color transition

        letterSpans.forEach((span, index) => {
            // Shift the hue per character to create a smooth wave effect
            const hue = (baseHue + (index * 25)) % 360;
            
            span.style.color = `hsl(${hue}, 100%, 60%)`;
            span.style.textShadow = `
                0 0 10px hsl(${hue}, 100%, 65%),
                0 0 20px hsl(${hue}, 100%, 55%),
                0 0 45px hsl(${hue}, 100%, 45%)
            `;
        });

        requestAnimationFrame(animate);
    }

    animate();
});

