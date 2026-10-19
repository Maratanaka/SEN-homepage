const heroHeading = document.querySelector('.hero h1');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroHeading && !reduceMotion) {
  const headingLines = Array.from(heroHeading.childNodes).filter((node) =>
    node.textContent.trim()
  );
  const accessibleLabel = headingLines.map((line) => line.textContent.trim()).join(' ');

  heroHeading.setAttribute('aria-label', accessibleLabel);

  headingLines.forEach((line, lineIndex) => {
    const titleLine = document.createElement('span');
    titleLine.className = `hero-title-line hero-title-line--${lineIndex === 0 ? 'first' : 'accent'}`;
    titleLine.setAttribute('aria-hidden', 'true');

    Array.from(line.textContent).forEach((character, index) => {
      if (character === ' ') {
        titleLine.append(document.createTextNode(character));
        return;
      }

      const letter = document.createElement('span');
      letter.className = 'hero-letter';
      letter.style.setProperty('--letter-delay', `${(lineIndex * 14 + index) * 24}ms`);
      letter.textContent = character;
      titleLine.append(letter);
    });

    heroHeading.replaceChild(titleLine, line);
  });
}
