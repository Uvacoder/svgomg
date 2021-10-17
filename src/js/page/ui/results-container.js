export default function resultsContainer(results) {
  const container = document.querySelector('.results-container');
  const mobileContainer = document.querySelector('.results-container-mobile');
  const query = matchMedia('(min-width: 640px)');

  const positionResults = () => {
    if (query.matches) {
      container.append(results.container);
    } else {
      mobileContainer.append(results.container);
    }
  };

  // TODO: addListener() is deprecated but Safari prior to v14 is using it
  // Replace it with: addEventListener('change', () => positionResults()
  query.addListener(() => positionResults());
  positionResults();
}
