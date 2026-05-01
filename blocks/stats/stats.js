export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length >= 2) {
      cols[0].className = 'stats-value';
      cols[1].className = 'stats-description';
    } else if (cols.length === 1) {
      cols[0].className = 'stats-value';
    }
    row.className = 'stats-item';
  });
}
