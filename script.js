

//Mobil menüde sidebarın açılması için 
const sidebar = document.getElementById('sidebar');
const openSidebarButton = document.getElementById('open-sidebar');
const hamburgerCheckbox =document.getElementById('hamburgerCheckbox');

openSidebarButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if(e.target.tagName == "INPUT"){
        sidebar.classList.toggle('-translate-x-full');
    }
    if (hamburgerCheckbox.checked == true) {
        hamburgerCheckbox.checked = false;
    }
    else{
        hamburgerCheckbox.checked = true;
    }
});

//Mobil menüde sidebarın kapanması için Başlangıç
    //Mobil menü boşluğa tıklayınca sidebar kapansın
        document.addEventListener('click', sidebarKapansin);
        function sidebarKapansin(e) {
            if (!sidebar.contains(e.target) && !openSidebarButton.contains(e.target)) {
                sidebar.classList.add('-translate-x-full');
                hamburgerCheckbox.checked = false;
            }}

    //Mobil menüde linke tıklayınca sidebar kapansın
        sidebar.addEventListener("click", denemelikFonksiyon);
        function denemelikFonksiyon(e){
            if (e.target.id == "mobilAltbasliklar") {
                sidebar.classList.add('-translate-x-full');
                hamburgerCheckbox.checked = false;
            }}
//Mobil menüde sidebarın kapanması için Bitiş













// Header menü listesi başlangıç
let navbarBasliklar = fetch("header-menu.json")
    .then((response) => response.json())
    .then((menuListesi)=>{
        setMenu(menuListesi);
        const navbarBasliklar = Array.from(document.querySelectorAll(".navbarBaslik"))
        return navbarBasliklar
    })
    .catch((err) => console.log(err))
    const navbarWrapper = document.querySelector("#navbarWrapper");
    const headerFrame = document.querySelector("#head")

    function setMenu(menuListesi) {
        menuListesi.forEach(menu => {
            // Web tasarımda menü ekleme
            const divMenu = document.createElement("div");
            divMenu.classList="navbarBaslik relative text-sm font-medium";


            const aMenu = document.createElement("a");
            aMenu.setAttribute("href", menu.link);
            
            const buttonMenu = document.createElement("button");
            buttonMenu.classList="baslikButonu uppercase whitespace-nowrap dark:text-white btn btn-ghost btn-sm";
            buttonMenu.innerText = menu.baslik;

            if (menu.link != undefined && menu.link != "" && menu.link != "#") {
                divMenu.appendChild(aMenu).appendChild(buttonMenu);
                navbarWrapper.appendChild(divMenu);
            }
            else{
                divMenu.appendChild(buttonMenu);
                navbarWrapper.appendChild(divMenu);
            }
            // <div class="navbarBaslik relative rounded-md hover:bg-gray-700 hover:text-white">
            //     <a href="#"><button class="baslikButonu uppercase font-extralight btn btn-ghost btn-sm">Hakkımızda</button></a>
            // </div>

            if (menu.altbasliklar != undefined) {
                if (menu.altbasliklar != "") {
                    var altMenuYukseklik = menu.altbasliklar.length

                    const divAltMenu = document.createElement("div");
                    divAltMenu.classList=`absolute min-w-36 whitespace-nowrap w-auto top-full z-[2] left-0  rounded-md *:space-y-2 px-3 *:py-4 *:space-y-4 bg-white text-slate-800 navbarAltMenu font-extralight ${altMenuYukseklik}`;
                    divAltMenu.setAttribute("id", "navbarAltMenu");
                    const ulAltMenu = document.createElement("ul");

                    for (let i = 0; i < menu.altbasliklar.length; i++) {
                        const altbaslik = menu.altbasliklar[i];
                        const liAltBaslik = document.createElement("li");
                        liAltBaslik.classList = "link link-hover";

                        const aAltBaslik = document.createElement("a");
                        for (let j = 0; j < altbaslik.length; j++) {
                            if (altbaslik[0] == altbaslik[j]) {
                                aAltBaslik.innerText = altbaslik[0]
                            }
                            if (altbaslik[1] == altbaslik[j]) {
                                aAltBaslik.setAttribute("href", altbaslik[1])
                            }
                        }
                        ulAltMenu.appendChild(liAltBaslik).appendChild(aAltBaslik)
                    }
            
                    divMenu.appendChild(divAltMenu).appendChild(ulAltMenu);

                    
                    // <div class="navbarAltMenu absolute min-w-36 whitespace-nowrap w-auto top-10 left-0 rounded-b-md *:space-y-2 px-3 *:py-2 bg-slate-800 bg-opacity-90">
                    //     <ul>
                    //         <li><a href="">madde 2</a></li>
                    //         <li><a href="">madde 2</a></li>
                    //         <li><a href="">madde 2</a></li>
                    //     </ul>
                    // </div>

                }
            }


            //Alt Menu açılması için başlangıç (WEB)
            navbarWrapper.addEventListener("mousemove", altMenuAc);
            
            function altMenuAc(e) {
                if (e.target.nextElementSibling != null && e.target.classList[0]=="baslikButonu") {
                    e.target.addEventListener("mouseover", altmenuGoster(e.target.nextElementSibling));
                }
            }

            function altmenuGoster(AltMenu) {
                AltMenu.style.transitionTimingFunction = "linear";
                
                for (let i = 0; i < Array.from(AltMenu.classList).length; i++) {
                    let altMenuyukseklik = Array.from(AltMenu.classList)[Array.from(AltMenu.classList).length-1]*32+32;
                    AltMenu.style.height= `${altMenuyukseklik}px`;
                }
            }
            //Alt Menu açılması için bitiş (WEB)
            
            
            
            //Alt Menu kapanması için başlangıç (WEB)
            navbarBasliklar.then(navbarBaslik => navbarBaslik.forEach(navbarBaslik => {
                
                Array.from(navbarBaslik.children).forEach(altMenu => {
                    navbarBaslik.addEventListener("mouseleave", altMenuKapat)
                    function altMenuKapat(){
                        if (altMenu.className.includes("navbarAltMenu") && altMenu.style.height !="0px" && altMenu.style.height !=undefined && altMenu.style.height !="" && altMenu.style.height !=null) {
                            altmenuGizle(altMenu)
                            
                            
                        }
                    }
                    
                });
            }));

            function altmenuGizle(AltMenu) {
                AltMenu.style.transitionTimingFunction = "linear";
                AltMenu.style.height= "0px";
            }
            //Alt Menu kapanması için bitiş (WEB)

            




            // Mobil tasarımda menü ekleme
            const mobilNavbarWrapper = document.querySelector("#mobilNavbarWrapper");

            const ilkDivMobilMenu = document.createElement("div");
            ilkDivMobilMenu.classList="w-full flex flex-col";
            
            const ikinciDivMobilMenu = document.createElement("div");
            ikinciDivMobilMenu.classList="group flex flex-row w-full items-center";

            const ucuncuDivMobilMenu = document.createElement("div");
            ucuncuDivMobilMenu.classList=`${menu.link} uppercase whitespace-nowrap font-extralight group-hover:text-temarengi2 w-full bg-transparent hover:bg-transparent hover:border-none hover:shadow-none shadow-none`;
            ucuncuDivMobilMenu.innerText = menu.baslik;

            ilkDivMobilMenu.appendChild(ikinciDivMobilMenu).appendChild(ucuncuDivMobilMenu);

            if (menu.altbasliklar != undefined && menu.altbasliklar != "") {
                const spanMobilMenu = document.createElement("span");
                spanMobilMenu.classList="group-hover:text-temarengi2 text-xl";
                spanMobilMenu.innerText = "+";
                spanMobilMenu.id = "sidebarSpan";

                ikinciDivMobilMenu.appendChild(spanMobilMenu);


                //Alt menü başlangıç (Mobil)
                var mobilAltMenuYukseklik = menu.altbasliklar.length

                const divMobilAltMenu = document.createElement("div");
                divMobilAltMenu.classList=`whitespace-nowrap *:space-y-2 px-3 *:py-2 ${mobilAltMenuYukseklik}`;
                divMobilAltMenu.setAttribute("id", "mobilNavbarAltMenu");

                    
                    const ulMobilAltMenu = document.createElement("ul");

                    for (let i = 0; i < menu.altbasliklar.length; i++) {
                        const mobilAltbaslik = menu.altbasliklar[i];
                        const liMobilAltBaslik = document.createElement("li");
                        liMobilAltBaslik.classList = "link link-hover";

                        const aMobilAltBaslik = document.createElement("a");
                        for (let j = 0; j < mobilAltbaslik.length; j++) {
                            if (mobilAltbaslik[0] == mobilAltbaslik[j]) {
                                aMobilAltBaslik.innerText = mobilAltbaslik[0]
                                aMobilAltBaslik.id = "mobilAltbasliklar"
                            }
                            if (mobilAltbaslik[1] == mobilAltbaslik[j]) {
                                aMobilAltBaslik.setAttribute("href", mobilAltbaslik[1])
                            }
                        }
                        ulMobilAltMenu.appendChild(liMobilAltBaslik).appendChild(aMobilAltBaslik);
                    }
            
                    ilkDivMobilMenu.appendChild(divMobilAltMenu).appendChild(ulMobilAltMenu);
                    //Alt menü bitiş (Mobil)

            }


            mobilNavbarWrapper.appendChild(ilkDivMobilMenu);


            //                 <div class="w-full flex flex-col">
            //                 <div class="group flex flex-row w-full items-center">
            //                   <div class="uppercase whitespace-nowrap font-extralight group-hover:text-temarengi2 w-full bg-transparent hover:bg-transparent hover:border-none hover:shadow-none shadow-none">Betül</div>
            //                   <span class="sidebarSpan group-hover:text-temarengi2 text-xl">+</span>
            //                 </div>


            //                                  ALT MENÜ
            //                                 <div id="mobilNavbarAltMenu" class="whitespace-nowrap *:space-y-2 px-3 *:py-2">
            //                                     <ul>
            //                                         <li><a href="">madde 2</a></li>
            //                                         <li><a href="">madde 2</a></li>
            //                                         <li><a href="">madde 2</a></li>
            //                                     </ul>
            //                                 </div>
            //               </div>


        })
    }
// Header menü listesi bitiş
    





    //mobil Sidebar tıklanınca altmenü açılması - kapanması başlangıç
    mobilNavbarWrapper.addEventListener("click", mobilAltMenuAc);
    function mobilAltMenuAc(e) {
        // console.log(e.target.parentElement.className);
        if (e.target.parentElement.nextElementSibling != undefined && e.target.parentElement.nextElementSibling != null && e.target.parentElement.nextElementSibling.id == "mobilNavbarAltMenu") {

            const mobilAltMenu = e.target.parentElement.nextElementSibling;
            mobilAltMenu.style.transitionTimingFunction = "linear";

            //Diğer altmenüleri kapama başlangıç
            let mobilNavbarAltMenuler = Array.from(document.querySelectorAll("#mobilNavbarAltMenu"));

            mobilNavbarAltMenuler.forEach(mobilNavbarAltMenu => {
                if (mobilNavbarAltMenu != mobilAltMenu) {
                    mobilNavbarAltMenu.style.height = "0px";
                }
            });
            //Diğer altmenüleri kapama bitiş

            //Tıklanan altmenüyü kapama başlangıç
            if (mobilAltMenu.style.height != "0px" && mobilAltMenu.style.height !="0px" && mobilAltMenu.style.height !=undefined && mobilAltMenu.style.height !="" && mobilAltMenu.style.height !=null) {
                mobilAltMenu.style.height = "0px";
                mobilAltMenu.previousElementSibling.children[1].classList.remove("rotate-45");
                mobilAltMenu.previousElementSibling.children[1].classList.add("rotate-0");
            }
            //Tıklanan altmenüyü kapama bitiş
            //Tıklanan altmenüyü açma başlangıç
            else{
                for (let i = 0; i < Array.from(mobilAltMenu.classList).length; i++) {
                    let mobilAltMenuyukseklik = Array.from(mobilAltMenu.classList)[Array.from(mobilAltMenu.classList).length-1]*32+10;
                    mobilAltMenu.style.height= `${mobilAltMenuyukseklik}px`;
                    mobilAltMenu.previousElementSibling.children[1].classList.add("rotate-45");
                    mobilAltMenu.previousElementSibling.children[1].classList.remove("rotate-0");
                }
            }
            //Tıklanan altmenüyü açma bitiş
        }

        //Altmenü yoksa linke git ve sidebarı kapat.
        if (e.target.parentElement.nextElementSibling === null && e.target.parentElement.className.includes("group")) {
            window.location.replace(Array.from(e.target.classList)[0]);
            console.log("Altmenu yok");
            console.log(Array.from(e.target.classList)[0]);
            
            sidebar.classList.add('-translate-x-full');
            hamburgerCheckbox.checked = false;
            
        }
        
        if (e.target.id == "mobilAltbasliklar") {
            sidebar.classList.add('-translate-x-full');
            hamburgerCheckbox.checked = false;
        }
    }

    //Mobil altmenü açılması kapanması bitiş




































// Header görünümü değiştirme (mause hareketlerine göre) başlangıç
const logoNavbarContainer = document.querySelector("#logoNavbarContainer");
const HamburgerButton = document.querySelector(".HamburgerButton");
const HamburgerButtonColorOff = document.querySelector(".HamburgerButtonColorOff");
const HamburgerButtonColorOn = document.querySelector(".HamburgerButtonColorOn");
const head = document.querySelector("#head");

var prevScrollpos = window.scrollY;
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
      head.style.top = "0px";
    if (window.pageYOffset==0) {
        seffafArkaPlanHeader();
    }
}
else {
    head.style.top = "-55px";
    renkliArkaPlanHeader();
  }
  prevScrollpos = currentScrollPos;
}

function renkliArkaPlanHeader(){
    head.classList.add("bg-white");
    head.classList.add("dark:bg-slate-900");
    head.classList.add("text-slate-800");
    head.classList.add("dark:text-white");
    head.style.transitionTimingFunction = "linear";
    head.style.transition= "all 1s";
    HamburgerButton.classList.remove("top-3");
    HamburgerButton.classList.add("top-2");
    HamburgerButtonColorOff.classList.remove("fill-white");
    HamburgerButtonColorOff.classList.add("text-slate-800");
    HamburgerButtonColorOff.classList.add("dark:text-white");
    HamburgerButtonColorOn.classList.remove("fill-white");
    HamburgerButtonColorOn.classList.add("text-slate-800");
    logoNavbarContainer.classList.remove("h-16");
    logoNavbarContainer.classList.add("h-12");
    logoNavbarContainer.classList.add("*:text-slate-800");
    logoNavbarContainer.style.transitionTimingFunction = "linear";
    logoNavbarContainer.style.transition= "all 1s";
    
}
function seffafArkaPlanHeader(){
    head.classList.remove("bg-white");
    head.classList.remove("dark:bg-slate-900");
    head.classList.remove("text-slate-800");
    head.classList.remove("dark:text-white");
    head.style.transitionTimingFunction = "linear";
    head.style.transition= "all 1s";
    HamburgerButton.classList.add("top-3");
    HamburgerButton.classList.remove("top-2");
    HamburgerButtonColorOff.classList.add("fill-white");
    HamburgerButtonColorOff.classList.remove("text-slate-800");
    HamburgerButtonColorOn.classList.add("fill-white");
    HamburgerButtonColorOn.classList.remove("text-slate-800");
    logoNavbarContainer.classList.add("h-16");
    logoNavbarContainer.classList.remove("*:text-slate-800");
    logoNavbarContainer.classList.remove("h-14");
    logoNavbarContainer.style.transitionTimingFunction = "linear";
    logoNavbarContainer.style.transition= "all 1s";
}
// Header görünümü değiştirme (mause hareketlerine göre) bitiş 

//Header görünümünü sayfa yenilendiğinde header ayarla başlangış
window.addEventListener("load", (event) => {
    if (window.pageYOffset==0) {
        seffafArkaPlanHeader();
    }
    else{
        renkliArkaPlanHeader();
    }
  });
//Header görünümünü sayfa yenilendiğinde ayarla bitiş































//theme-controller light-dark değişimi başlangıç
const themeController = document.querySelector(".theme-controller");
const html = document.querySelector("html");

themeController.addEventListener("click", temayiDegistir);

function temayiDegistir() {
    if (themeController.checked == true) {
        html.classList.add("dark");
        html.classList.remove("light");
        html.setAttribute("data-theme", "dark");
    }
    else {
        html.classList.remove("dark");
        html.classList.add("light");
        html.setAttribute("data-theme", "light");
    }
}

//theme-controller light-dark değişimi bitiş
























//Eğitimleri Listele başlangıç

const egitimlerWrapper = document.querySelector("#egitimlerWrapper");

if (egitimlerWrapper != null) {
    let egitimlerJson = fetch("egitimler.json").then((response)=>response.json()).then((egitimListesi)=>{
        setEgitimler(egitimListesi);
        return egitimListesi;
    }).catch((err) => console.log(err))
}


 function setEgitimler(egitimListesiJson) {


    egitimListesiJson.forEach(egitim => {

        const egitimDiv1 = document.createElement("div");
        egitimDiv1.className = "egitim relative";

        const egitimImg = document.createElement("img");
        egitimImg.classList = "rounded-t-lg shadow-inner";
        egitimImg.setAttribute("src", `resimler/egitimler/${egitim.gorsel}`)
        egitimImg.setAttribute("alt", egitim.baslik);


        const egitimDivAbsolute = document.createElement("div");
        egitimDivAbsolute.classList = "absolute bottom-0 z-30 w-full";
        egitimDivAbsolute.id = "egitimAciklamaBolumu";
        
        
        const egitimDiv2 = document.createElement("div");
        egitimDiv2.classList = "flex flex-col py-3 items-center justify-center justify-self-end w-full h-full z-20 bg-white dark:bg-slate-900 rounded-b-xl";

        const egitimDiv3 = document.createElement("div");
        egitimDiv3.classList = "flex flex-col space-y-3 pb-5 w-full *:text-center";

        const egitimH2 = document.createElement("h2");
        egitimH2.classList = "text-3xl sm:text-2xl ";
        egitimH2.textContent = egitim.baslik.slice(0, 20) + (egitim.baslik.length > 20 ? "..." : "");

        const egitimP = document.createElement("p");
        egitimP.classList = "font-extralight space-x-4";

        const egitimSpan1 = document.createElement("span");
        egitimSpan1.textContent = egitim.baslangicTarihi +" - "+ egitim.saat;

        const egitimSpan2 = document.createElement("span");
        egitimSpan2.textContent="|";

        const egitimSpan3 = document.createElement("span");
        egitimSpan3.textContent = egitim.konum;

        const egitimDiv4 = document.createElement("div");
        egitimDiv4.classList = "flex flex-row justify-center space-x-3  w-full";

        const egitimButtonKayitOl = document.createElement("button");
        egitimButtonKayitOl.classList = "btn btn-outline w-32 bg-temarengi2 text-white border-temarengi2 hover:bg-temarengi hover:border-temarengi font-extralight";
        egitimButtonKayitOl.textContent = "Kayıt Ol";
        egitimButtonKayitOl.addEventListener("click", egitimDetayinaGit)

        egitimlerWrapper.appendChild(egitimDiv1)

        egitimDiv1.appendChild(egitimImg)
        egitimDiv1.appendChild(egitimDivAbsolute).appendChild(egitimDiv2)

        egitimDiv2.appendChild(egitimDiv3)
        egitimDiv2.appendChild(egitimDiv4)

        egitimDiv4.appendChild(egitimButtonKayitOl)

        egitimDiv3.appendChild(egitimH2)
        egitimDiv3.appendChild(egitimP)

        egitimP.appendChild(egitimSpan1)
        egitimP.appendChild(egitimSpan2)
        egitimP.appendChild(egitimSpan3)
        
    //     <div class="absolute bottom-0" id="egitimAciklamaBolumu">
    //     <div class="flex flex-col p-5 items-center w-full h-full z-20  bg-black rounded-b-xl">
    //       <div class="flex flex-col space-y-3 pb-5 w-full *:text-center">
    //         <h2 class="text-2xl">Nitelikli Çocuk Edebiyatı ve Yaratıcı Drama İlişkisi </h2>
    //         <p class="font-extralight space-x-4"><span>2 Aralık Pzt</span> <span>|</span> <span>Çevrimiçi</span> </p>
    //       </div>
    //       <button class="btn btn-outline w-40 bg-temarengi2 text-white border-temarengi2 hover:bg-temarengi font-extralight">Katıl</button>
    //     </div>
    //   </div>

    });




    //Eğitimin üzerine gelince animasyon oynat başlangıç
    
    
    const egitimlerFromWeb = Array.prototype.slice.call(egitimlerWrapper.children);
    egitimlerFromWeb.forEach(egitim => {
        egitim.addEventListener("mouseenter", egitimAnimasyonUzat)
        egitim.addEventListener("mouseleave", egitimAnimasyonKisalt)
    });

    function egitimAnimasyonUzat(e) {
        egitimListesiJson.forEach(egitimJson => {
            if (egitimJson.baslik == e.target.firstChild.alt) {
                e.target.firstChild.nextElementSibling.style.height= "70%";
                // console.log(egitimJson.baslik);
                e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.textContent= egitimJson.baslik;
                e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.nextElementSibling.textContent = `${egitimJson.baslangicTarihi} - ${egitimJson.bitisTarihi}`

                const egitimPSaatKonum = document.createElement("p");
                egitimPSaatKonum.textContent= `Saat: ${egitimJson.saat}   -  Konum: ${egitimJson.konum}`;
                egitimPSaatKonum.classList= "font-extralight space-x-4";
                
                const egitimPKonum = document.createElement("p");
                egitimPKonum.textContent= `Konum: ${egitimJson.konum}`;
                egitimPKonum.classList= "font-extralight";
                
                const egitimPFiyat = document.createElement("p");
                egitimPFiyat.textContent= egitimJson.fiyat;
                egitimPFiyat.classList= "text-xl";

                e.target.firstChild.nextElementSibling.firstChild.firstChild.appendChild(egitimPSaatKonum);
                e.target.firstChild.nextElementSibling.firstChild.firstChild.appendChild(egitimPFiyat);

            }
        });
    }

    function egitimDetayinaGit(e) {
        const tiklananBaslik = e.target.parentElement.previousElementSibling.firstChild.textContent;
        
        egitimListesiJson.forEach(egitimJson => {
            if (tiklananBaslik == egitimJson.baslik) {
                window.location.pathname = egitimJson.link;
            }
        });
    }
    

    function egitimAnimasyonKisalt(e) {
        egitimListesiJson.forEach(egitimJson => {
            if (egitimJson.baslik == e.target.firstChild.alt) {
                e.target.firstChild.nextElementSibling.style.height= "200px";
                e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.textContent= egitimJson.baslik.slice(0, 20) + (egitimJson.baslik.length > 20 ? "..." : "");

                e.target.firstChild.nextElementSibling.firstChild.firstChild.removeChild(e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.nextElementSibling);
                e.target.firstChild.nextElementSibling.firstChild.firstChild.removeChild(e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.nextElementSibling.nextElementSibling);

                const egitimSpan1 = document.createElement("span");
                egitimSpan1.textContent = egitimJson.baslangicTarihi +" - "+ egitimJson.saat;

                const egitimSpan2 = document.createElement("span");
                egitimSpan2.textContent="|";

                const egitimSpan3 = document.createElement("span");
                egitimSpan3.textContent = egitimJson.konum;
                e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.nextElementSibling.textContent="";
                        
                e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.nextElementSibling.appendChild(egitimSpan1)
                e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.nextElementSibling.appendChild(egitimSpan2)
                e.target.firstChild.nextElementSibling.firstChild.firstChild.firstChild.nextElementSibling.appendChild(egitimSpan3)
            }
        });
    }

    //Eğitimin üzerine gelince animasyon oynat bitiş
    

 }

//Eğitimleri Listele bitiş






//iletisimFormu açılması ve kapanması için başlangıç
const iletisimFormunuAcButton = document.querySelector("#iletisimFormunuAc");
const iFromBG = document.querySelector("#iFromBG");
const iForm = document.querySelector("#iForm");
const iFormXButton = document.querySelector("#iFormXButton");
const iFromXButtonSvg = document.querySelector("#iFromXButtonSvg");

iletisimFormunuAcButton.addEventListener("click", iFormAcilmasi);
iFormXButton.addEventListener("click", iFormKapanmasi1);
iFromBG.addEventListener("click", iFormKapanmasi2);
document.addEventListener("keydown", iFormKapanmasi3);

function iFormAcilmasi(){
    iFromBG.hidden = false;
};

//X 'e basarak iletisimFormu kapatma
function iFormKapanmasi1(){
    iFromBG.hidden = true;
};

//pencere dışına basarak iletisimFormu kapatma
function iFormKapanmasi2(e){
    if (!iForm.contains(e.target) && !iFormXButton.contains(e.target)) {
        iFormKapanmasi1();
    }
}
//ESC ile iletisimFormu kapatma 
function iFormKapanmasi3(e) {
    if (e.key === "Escape") {
      if (!iFromBG.hidden) {
        iFormKapanmasi1();
      }
      }
  };
//iletisimFormu açılması ve kapanması için bitiş








//Sık sorulan sorular cevap göster / gizle başlangıç
var acc = document.querySelectorAll("#accordion");
var i;
const sssCevaplar = Array.from(document.querySelectorAll(".soruAciklamasi"));
const sss = document.querySelector("#SSS");

sss.addEventListener("click", cevaplariGosterGizle);
function cevaplariGosterGizle(e){
if (e.target.className.includes("soruBasligi") || e.target.className.includes("soruKutusu")) {
    let tiklananCevap;
    if (e.target.className.includes("soruBasligi")) {
        tiklananCevap = e.target.parentElement.children[1];
    }
    else{
        tiklananCevap = e.target.children[1];
    }
    sssCevaplar.forEach(cevap => {
        if (cevap.previousElementSibling.innerHTML == tiklananCevap.previousElementSibling.innerHTML) {
            if (cevap.hidden) {
                cevap.hidden = false;
                cevap.nextElementSibling.style.transform ="rotate(90deg)";
            }
            else{
                cevap.hidden = true;
                cevap.nextElementSibling.style.transform ="rotate(0deg)";
            }
        }
        else{
            cevap.hidden = true;
            cevap.nextElementSibling.style.transform ="rotate(0deg)";
        }
    });
}
}
//Sık sorulan sorular cevap göster / gizle bitiş




















































































// //PopUp (Kırıkkale) açılması ve kapanması için başlangıç
//     const kirikkaleIletisimButton = document.querySelector(".kirikkaleIletisimButton");
//     const popUpContent = document.querySelector("#popUp");
//     const popUpBg = document.querySelector("#popUpBg");
//     const popUpXButton = document.querySelector("#popUpXButton");
//     const popUpXButtonSvg = document.querySelector("#popUpXButtonSvg");
//     const bodyTag = document.querySelector("body");

//     kirikkaleIletisimButton.addEventListener("click", popupAcilmasi);
//     popUpXButton.addEventListener("click", popupKapanmasi);
//     popUpBg.addEventListener("click", popupKapanmasi2);
//     document.addEventListener("keydown", popupKapanmasi3);

//     function popupAcilmasi(){
//         popUpBg.hidden = false;
//         bodyTag.classList.add("overflow-y-hidden");
//     };

//     //X 'e basarak popUp kapatma
//     function popupKapanmasi(){
//         popUpBg.hidden = true;
//         bodyTag.classList.remove("overflow-y-hidden")
//     };

//     //pencere dışına basarak popUp kapatma
//     function popupKapanmasi2(e){
//         if (!popUpContent.contains(e.target) && !popUpXButton.contains(e.target)) {
//             popupKapanmasi();
//         }
//     }
//     //ESC ile popUp kapatma 
//     function popupKapanmasi3(e) {
//         if (e.key === "Escape") {
//           if (!popUpBg.hidden) {
//             popupKapanmasi();
//           }}
//     };
// //PopUp (Kırıkkale) açılması ve kapanması için bitiş


















// //Seminerlerimiz sekmelerin değişmesi başlangıç --------------------------
// const projectTabs = document.querySelector("#seminerlerimiz");

// projectTabs.addEventListener("click", activeProjectTabsFunc);

// function activeProjectTabsFunc(e) {
//     //Active - Passive Tabs
//     let tabs=e.target.parentElement.children;
//     for (let i = 0; i < tabs.length; i++) {
//         if (tabs[i].textContent==e.target.textContent) {
//             if (tabs[i].parentElement.id=="navTabs") {
//             tabs[i].style.backgroundColor = "white";
//             tabs[i].style.color = "#1e293b";
//             }
//         }
//     else{
//       if (tabs[i].parentElement.id=="navTabs") {
//         tabs[i].style.color = "";
//         tabs[i].style.backgroundColor = "";
//       }
//     }
//   }
//   //Active - Passive Windows
//   let tabsContents =e.target.parentElement.nextElementSibling.children;
//   for (let i = 0; i < tabsContents.length; i++) {
//     if (tabsContents[i].id==e.target.textContent) {
//       tabsContents[i].style.display = "block";
//     }
//     else{
//         tabsContents[i].style.display = "none";
//     }
//   }
// }
// //Seminerlerimiz sekmelerin değişmesi bitiş --------------------------





























// // Temsilciliklerimiz Swiper başlangıç
// var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 2,
//     spaceBetween: 15,
//     mousewheel: true,
//     autoplay: {
//        delay: 2000,
//        disableOnInteraction: true,
//      },
//     breakpoints: {
//       640: {
//         slidesPerView: 3,
//         spaceBetween: 20,
//       },
//       768: {
//         slidesPerView: 4,
//         spaceBetween: 20,
//       },
//       1024: {
//         slidesPerView: 5,
//         spaceBetween: 30,
//       },
//     },
//   });
//   // Temsilciliklerimiz Swiper bitiş








