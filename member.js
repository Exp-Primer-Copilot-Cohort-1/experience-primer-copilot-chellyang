function skillsMember() {
  const skills = document.querySelector('.skills');
  const skillsTitle = document.querySelector('.skills__title');
  const skillsList = document.querySelector('.skills__list');
  const skillsItems = document.querySelectorAll('.skills__item');
  const skillsItemsTitle = document.querySelectorAll('.skills__item-title');
  const skillsItemsText = document.querySelectorAll('.skills__item-text');

  if (skills) {
    skillsTitle.classList.add('title--active');
    skillsList.classList.add('skills__list--active');

    skillsItems.forEach((item, index) => {
      item.classList.add('skills__item--active');
      setTimeout(() => {
        item.classList.add('skills__item--show');
      }, 200 * index);
    });

    setTimeout(() => {
      skillsItemsTitle.forEach((item, index) => {
        item.classList.add('skills__item-title--active');
        setTimeout(() => {
          item.classList.add('skills__item-title--show');
        }, 200 * index);
      });

      skillsItemsText.forEach((item, index) => {
        item.classList.add('skills__item-text--active');
        setTimeout(() => {
          item.classList.add('skills__item-text--show');
        }, 200 * index);
      });
    }, 500);
  }
}