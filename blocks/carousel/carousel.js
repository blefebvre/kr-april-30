export default function decorate(block) {
  const rows = [...block.children];
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'carousel-slides';

  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'carousel-details';

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    const imageCol = cols[0];
    const contentCol = cols[1];

    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.dataset.index = idx;
    if (idx === 0) slide.classList.add('active');

    if (imageCol) {
      slide.append(imageCol);
      imageCol.className = 'carousel-slide-image';
    }
    slidesContainer.append(slide);

    const detail = document.createElement('div');
    detail.className = 'carousel-detail';
    detail.dataset.index = idx;
    if (idx === 0) detail.classList.add('active');
    if (contentCol) {
      detail.append(contentCol);
      contentCol.className = 'carousel-detail-content';
    }
    detailsContainer.append(detail);

    slide.addEventListener('click', () => {
      block.querySelectorAll('.carousel-slide.active').forEach((s) => s.classList.remove('active'));
      block.querySelectorAll('.carousel-detail.active').forEach((d) => d.classList.remove('active'));
      slide.classList.add('active');
      detail.classList.add('active');
    });
  });

  const navButtons = document.createElement('div');
  navButtons.className = 'carousel-nav';
  navButtons.innerHTML = `
    <button type="button" class="carousel-prev" aria-label="Previous">&#10094;</button>
    <button type="button" class="carousel-next" aria-label="Next">&#10095;</button>
  `;

  navButtons.querySelector('.carousel-prev').addEventListener('click', () => {
    const active = block.querySelector('.carousel-slide.active');
    const prev = active.previousElementSibling || slidesContainer.lastElementChild;
    active.click();
    prev.click();
  });

  navButtons.querySelector('.carousel-next').addEventListener('click', () => {
    const active = block.querySelector('.carousel-slide.active');
    const next = active.nextElementSibling || slidesContainer.firstElementChild;
    active.click();
    next.click();
  });

  block.textContent = '';
  block.append(slidesContainer);
  block.append(navButtons);
  block.append(detailsContainer);
}
