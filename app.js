const loadVideosData = async (id = 1000) => {
  const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await response.json();
  const categories = data.data;
  // console.log(catagories);
  showVideos(categories);
  sorting(categories)
}


const showVideos = (categories) => {
  const videosContainer = document.getElementById('videos-container');
  const alertMessage = document.getElementById('alert');
  if (categories.length === 0) {
    alertMessage.classList.remove('hidden');
  }
  else {
    alertMessage.classList.add('hidden');
  }

  videosContainer.textContent = '';

  categories.forEach(category => {
    const div = document.createElement('div');
    div.classList = `card bg-base-100 `;

    div.innerHTML =
      `
  <figure>
  <img src="${category.thumbnail}" alt="" class="h-[184px] w-[285px]" />
  </figure>
  <div class="flex">
  <div class="pt-5" id="">
  <img src="${category.authors[0].profile_picture}" alt="" class="w-7 rounded-full" id="">
  </div>
  <div class="px-5 py-3" id="">
  <h2 class="text-xl font-bold">${category.title}</h2>
  <div class="flex gap-x-5" id="">
      <p class=" text-gray-400" id="">${category.authors[0].profile_name}</p>
      <span class="" id="verified-badge">${category.authors[0].verified ? '<img src="badge.svg" alt="Verified Badge">' : ''}</span>
  </div>
  <p class="" id="">${category.others?.views} views</p>
  </div>
  </div>
  `;

    videosContainer.appendChild(div);
  });
}

loadVideosData(1000);

const active = (id) => {
  const All = document.getElementById('all');
  All.classList.remove('active');
  const Music = document.getElementById('Music');
  Music.classList.remove('active');
  const Comedy = document.getElementById('Comedy');
  Comedy.classList.remove('active');
  const Drawing = document.getElementById('Drawing');
  Drawing.classList.remove('active');

  const idName = document.getElementById(id);
 
  if (idName.classList.contains(active)) {
    idName.classList.remove('active');

  } else {
    idName.classList.add('active');
  }
}




const sorting = (categories) => {

}