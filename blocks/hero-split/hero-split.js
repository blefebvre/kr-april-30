export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const textRow = rows[1];

  imageRow.classList.add('hero-split-image');
  textRow.classList.add('hero-split-content');
}
