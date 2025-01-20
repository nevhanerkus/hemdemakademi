// Menü listesini butonlara dönüştür başlangıç
let navbarBasliklar = fetch("header-menu.json")
    .then((response) => response.json())
    .then((menuListesi)=>{
        setMenu(menuListesi);
    })
    .catch((err) => console.log(err))
    const navbarWrapper = document.querySelector("#menuWrapper");
    const mobilNavbarWrapper = document.querySelector("#mobilNavbarWrapper");

    function setMenu(menuListesi) {
        menuListesi.forEach(menu => {
            // Web tasarımda menü ekleme
            const aMenu = document.createElement("a");
            aMenu.classList="hover:skeleton hover:bg-opacity-90 w-full text-center hover:text-temarengi2";
            aMenu.setAttribute("href", menu.link);

            const h2Menu = document.createElement("h2");
            h2Menu.classList ="md:text-2xl w-full";
            h2Menu.innerText= menu.baslik;
            
            navbarWrapper.appendChild(aMenu).appendChild(h2Menu);
            
            // <a href="https://tevhiddersleri.org/kategori/akaid" class="hover:scale-110"><h2 class="text-base md:text-xl w-full">Eğitimler</h2></a>

        }); 
    }

// Menü listesini butonlara dönüştür bitiş



