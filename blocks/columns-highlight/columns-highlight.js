export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  const row = rows[0];
  const cols = [...row.children];

  cols.forEach((col) => {
    const pic = col.querySelector('picture');
    if (pic) {
      col.classList.add('columns-highlight-img-col');
    } else {
      col.classList.add('columns-highlight-text-col');
    }
  });
}
