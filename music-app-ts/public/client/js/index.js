//search suggest
const searchForm = document.querySelector(".search-form");
if(searchForm){
  const input = searchForm.querySelector("input");
  input.addEventListener('input',(e) => {
    const keyword = input.value.trim();
    const link = `http://localhost:3000/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          const suggest = document.querySelector(".search-suggest");
          const html = data.songs.map(item => {
            return `
              <div class="item">
                <div class="title">${item.title}</div>
                <div class="singer">${item.infoSinger.fullName}</div>
              </div>
            `;
          })
          if(data.songs.length > 0){
            suggest.classList.add("show");
            suggest.innerHTML = html.join("");
          }else{
             suggest.classList.remove("show");
          }
        }
      })
  })
}
//end search suggest
