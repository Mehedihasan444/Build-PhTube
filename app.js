const loadButtonData = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
  const data = await response.json();
  const btnData = data.data;
  showButton(btnData);

}
loadButtonData();

const showButton = (categories) => {
  const btnContainer = document.getElementById('btns-container');

  categories.forEach(category => {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
    <button class="btn ${category.category === 'All' ? 'active' : ''}" id="${category.category_id}" onclick="handleButtonClick(${category.category_id})">${category.category}</button>

    `;
    btnContainer.appendChild(btnDiv);
  });

  loadVideosData(1000);
}
const handleButtonClick = (category_id) => {

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => button.classList.remove('active'));

  const clickedButton = document.getElementById(category_id);
  clickedButton.classList.add('active');

  loadVideosData(category_id);
};
let temp ;
const loadVideosData = async (id = 1000) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await response.json();
  const categories = data.data;
  showVideos(categories);
  temp=id;
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
    div.classList = `card w-[285px] bg-base-100 `;

    div.innerHTML =
      `
  <figure class="relative">
  <p class="text-xs absolute bottom-2 right-2 bg-[#171717] rounded-lg text-white p-1" id="">
  ${category?.others?.posted_date
        ? `${Math.floor((category?.others?.posted_date) / 3600)} hrs ${((category?.others?.posted_date) / 3600 - Math.floor((category?.others?.posted_date) / 3600)).toFixed(0) * 60} min ago`
        : ''}
  </p>
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


const sorting =async () => {
  const response =await fetch(`https://openapi.programming-hero.com/api/videos/category/${temp}`);
  const data =await response.json();
  const categories = data.data;
  categories.sort((a, b) => {

    const viewsA = parseFloat(a.others.views.replace('K', '000'));
    const viewsB = parseFloat(b.others.views.replace('K', '000'));


    return viewsB - viewsA;
  });
  
    
    showVideos(categories);
  
}
