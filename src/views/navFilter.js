function navFilter(name, type, key, onClick) {
  const filter = document.createElement('li');
  filter.classList.add('filter-item');
  filter.dataset.filterType = type;
  filter.dataset.filter = key;
  filter.onclick = onClick;
  const title = document.createElement('h3');
  title.textContent = name;

  filter.appendChild(title);

  return filter;
}

export default navFilter;
