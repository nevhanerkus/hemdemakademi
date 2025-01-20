// Eğitim Detayını göster başlangıç

const gelenLink = window.location.pathname;
const egitimBasligi = document.querySelector("#baslik");
const egitimOzeti = document.querySelector("#ozet");
const egitimTarihSaati = document.querySelector("#TarihSaat");
const egitimMekani = document.querySelector("#mekan");
const egitimAciklama = document.querySelector("#aciklama");
const egitimFiyati = document.querySelector("#fiyat");
const egitimBuyukGorsel = document.querySelector("#buyukGorsel");
const toplamBiletTutari = document.querySelector("#toplam");
const biletAdeti = document.querySelector("#biletAdeti");
biletAdeti.addEventListener("change", adetSecinceToplamiHesapla);
const devamEtButonu = document.querySelector("#devamEtButonu");
devamEtButonu.addEventListener("click", devamEtFunc);
const BiletDetaylariContent = document.getElementById("BiletDetaylariContent");
const biletDetaylariOzet = document.getElementById("biletDetaylariOzet");
const EtkinlikPolitikalariContent = document.getElementById("EtkinlikPolitikalariContent");
const EtkinlikPolitikalariBaslik = document.getElementById("EtkinlikPolitikalariBaslik");



let girisYapanUyeler =[];
let islemNo = 262760;
let UyeVerileri = {}; // Eposta, AlinanBiletler, odemeDurumu
localStorageKontrol(); //girisYapanUyeler değişkenini localdeki veri ile dolduruyor.

document.addEventListener("DOMContentLoaded", ToplamiHesapla); //sayfa açıldığında toplm tutarı hesaplar. 

let biletTutariText;
let biletTutariNum ;
let secilenBiletAdeti = 1;
let toplamTutar;




const egitimlerJson2 = fetch("egitimler.json").then((response)=>response.json()).then((egitimListesi)=>{
    setEgitimDetaylari(egitimListesi);
    return egitimListesi;
}).catch((err) => console.log(err))

function setEgitimDetaylari(egitimListesi) {
    egitimListesi.forEach(egitim => {
        if (gelenLink.includes(egitim.link)) {
            egitimBasligi.textContent = egitim.baslik
            egitimOzeti.textContent = egitim.ozet
            egitimTarihSaati.textContent = `${egitim.baslangicTarihi} ${egitim.saat} - ${egitim.bitisTarihi} ${egitim.saat}`;
            egitimMekani.textContent = egitim.konum;
            const dahaFazlaGoster = document.createElement("a");
            dahaFazlaGoster.classList = "text-sky-700 cursor-pointer";
            dahaFazlaGoster.innerText = "(Daha fazla göster...)";
            dahaFazlaGoster.addEventListener("click", dahaFazlaGosterFunc);

            egitimAciklama.textContent = egitim.aciklama.slice(0, 300) + (egitim.aciklama.length > 300 ? "" : "")
            egitimAciklama.appendChild(dahaFazlaGoster);


            egitimFiyati.textContent = `₺${egitim.fiyat}`;
            egitimBuyukGorsel.src = `resimler/egitimler/buyuk-gorseller/${egitim.buyukGorsel}`;
            toplamBiletTutari.textContent= `₺${egitim.fiyat}`;

            biletTutariText = egitim.fiyat;
            return biletTutariText;
        }

    });
    

    function dahaFazlaGosterFunc(e) {
        egitimListesi.forEach(egitim => {
            if (gelenLink.includes(egitim.link)) {
                e.target.parentElement.textContent = egitim.aciklama; 
            } 
        });
    };
}
// Eğitim Detayını göster bitiş



function adetSecinceToplamiHesapla(e) {
    biletTutariText = e.target.parentElement.previousElementSibling.children[1].textContent;
    
    biletTutariNum = biletTutariText.slice(1, biletTutariText.length);
    biletTutariNum = biletTutariNum.replace(",", ".");
    biletTutariNum = parseFloat(biletTutariNum);

    secilenBiletAdeti = e.target.value;

    toplamTutar = new Intl.NumberFormat("de-DE").format(biletTutariNum*secilenBiletAdeti);

    toplamBiletTutari.textContent = `₺${toplamTutar}`;
    return secilenBiletAdeti;
    // return toplamTutar, biletTutariNum, secilenBiletAdeti
}
function ToplamiHesapla() {
    
    // biletTutariNum = biletTutariText.slice(1, biletTutariText.length);
    // biletTutariNum = biletTutariNum.replace(",", ".");

    toplamTutar = new Intl.NumberFormat("de-DE").format(biletTutariNum*secilenBiletAdeti);
    
    toplamBiletTutari.textContent = `₺${toplamTutar}`;
    return secilenBiletAdeti;

}



function devamEtFunc() {
    const biletAlimDetaylari = document.getElementById("bilet-alim-detaylari");
    const UyelikBilgileriContent = document.getElementById("UyelikBilgileriContent");
    const BiletDetayi = document.getElementById("BiletDetayi");
    
    if (devamEtButonu.innerText == "Düzenle") {
        biletAdeti.disabled = false;
        devamEtButonu.innerText = "Devam Et";
        BiletDetayi.classList.remove("opacity-50");
        BiletDetayi.classList.remove("cursor-not-allowed");
    }
    else
    {
        biletAlimDetaylari.style.height="auto";
        UyelikBilgileriContent.style.height="auto";
        biletAdeti.disabled = ("true");
        devamEtButonu.innerText = "Düzenle"
        biletAlimDetaylari.scrollIntoView();
        BiletDetayi.classList.add("opacity-50");
        BiletDetayi.classList.add("cursor-not-allowed");

        
        const uyeAd = document.getElementById("uyeAd");
        const uyeSoyad = document.getElementById("uyeSoyad");
        const uyeEposta = document.getElementById("uyeEposta");
        
        if (girisYapanUyeler.length != 0 && uyeAd.value =="" && uyeSoyad.value=="" && uyeEposta.value=="") {
            girisYapanUyeler.forEach(uye => {
                uyeAd.value =uye.ad;
                uyeSoyad.value =uye.soyad;
                uyeEposta.value =uye.eposta;
            });
        }

        const UyelikBilgileriSonrakiButonu = document.getElementById("UyelikBilgileriSonrakiButonu");
        UyelikBilgileriSonrakiButonu.addEventListener("click", UyelikBilgileriSonrakiButonuFunc);

        BiletDetaylariGirisiniOlustur();
        BiletDetaylariContent.hidden=false;

        if (biletDetaylariOzet.children[0]!= undefined){
            islemNo -=1;
            biletDetaylariOzet.classList.add("hidden")
            biletDetaylariOzet.classList.remove("flex");
            biletDetaylariOzet.innerHTML =``;
        }
    }
} 


function UyelikBilgileriSonrakiButonuFunc(e) {
    const UyelikBilgileriUyari = document.getElementById("UyelikBilgileriUyari");
    const uyeAd = document.getElementById("uyeAd");
    const uyeSoyad = document.getElementById("uyeSoyad");
    const uyeEposta = document.getElementById("uyeEposta");
    if (uyeAd.value =="" || uyeSoyad.value=="" || uyeEposta.value =="") {
        UyelikBilgileriUyari.hidden = false;
        uyeAd.classList.add("placeholder:text-red-600")
        uyeSoyad.classList.add("placeholder:text-red-600")
        uyeEposta.classList.add("placeholder:text-red-600")
    }
    else{
        var re1 = /\S+@\S+\.\S+/;
        let postaKontrol =re1.test(uyeEposta.value);
        if (postaKontrol) {
            UyeVerileri.ad=uyeAd.value;
            UyeVerileri.soyad=uyeSoyad.value;
            UyeVerileri.eposta=uyeEposta.value;
            // UyeVerileri.islemler=[];
            uyeAd.classList.remove("placeholder:text-red-600")
            uyeSoyad.classList.remove("placeholder:text-red-600")
            uyeEposta.classList.remove("placeholder:text-red-600")

                if (girisYapanUyeler.length === 0 ) {
                    girisYapanUyelerDiziniGüncelle(girisYapanUyeler, UyeVerileri);
                    uyelikBilgileriniOzetle(uyeAd.value, uyeSoyad.value, uyeEposta.value);
                    BiletDetaylariGirisiniGoster()

                   
                }
                if (girisYapanUyeler.length > 0){
                    let tumEpostalar =[];
                    girisYapanUyeler.forEach(uye => {
                        tumEpostalar.push(uye.eposta)
                    });
                    if (tumEpostalar.includes(uyeEposta.value) == false) {
                        girisYapanUyelerDiziniGüncelle(girisYapanUyeler, UyeVerileri)
                        uyelikBilgileriniOzetle(uyeAd.value, uyeSoyad.value, uyeEposta.value);
                        BiletDetaylariGirisiniGoster()
                    }
                    else{
                        uyelikBilgileriniOzetle(uyeAd.value, uyeSoyad.value, uyeEposta.value);
                        BiletDetaylariGirisiniGoster()
                    }
                }
        }
        else{alert("Mail adresinizi kontrol edin");
        }
    }
    e.preventDefault();
}

function BiletDetaylariGirisiniGoster() {
    // let BiletDetaylariBaslik =document.getElementById("BiletDetaylariBaslik");
    BiletDetaylariContent.style.height ="auto";
    BiletDetaylariContent.scrollIntoView();
}

function BiletDetaylariGirisiniOlustur() {
    let tabsLifted = document.querySelector(".tabs-lifted");
    tabsLifted.innerHTML = "";
    for (let i = 0; i < secilenBiletAdeti; i++) {

        const inputBiletDetaylari = document.createElement("input");
        inputBiletDetaylari.setAttribute("type","radio");
        inputBiletDetaylari.setAttribute("name","my_tabs_2");
        // inputBiletDetaylari.setAttribute("role","tab");
        inputBiletDetaylari.setAttribute("class","tab");
        inputBiletDetaylari.setAttribute("aria-label",`${i+1}. Bilet`);
        inputBiletDetaylari.setAttribute("id",`${i+1}. Bilet`);
        if (i == 0) {
            inputBiletDetaylari.setAttribute("checked","checked");
        }

        const divBiletDetaylari = document.createElement("div");
        divBiletDetaylari.setAttribute("role","tabpanel");
        divBiletDetaylari.setAttribute("class","tab-content bg-base-100 border-base-300 rounded-box p-6");

        const div2BiletDetaylari = document.createElement("div");
        div2BiletDetaylari.setAttribute("class","grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 *:p-3 *:rounded-lg *:bg-transparent *:border-slate-500 *:dark:border-white *:border *:placeholder-slate-500");
        
        const ADInputBiletDetaylari = document.createElement("input");
        ADInputBiletDetaylari.setAttribute("type","text");
        ADInputBiletDetaylari.setAttribute("id",`isim${i+1}`);
        ADInputBiletDetaylari.setAttribute("placeholder",`* Ad`);
        ADInputBiletDetaylari.setAttribute("name",`${i+1}`);
        ADInputBiletDetaylari.setAttribute("required","required");
        
        const SOYADInputBiletDetaylari = document.createElement("input");
        SOYADInputBiletDetaylari.setAttribute("type","text");
        SOYADInputBiletDetaylari.setAttribute("id",`soyad${i+1}`);
        SOYADInputBiletDetaylari.setAttribute("name",`${i+1}`);
        SOYADInputBiletDetaylari.setAttribute("placeholder",`* Soyad`);
        SOYADInputBiletDetaylari.setAttribute("required","required");
        
        const EPOSTAInputBiletDetaylari = document.createElement("input");
        EPOSTAInputBiletDetaylari.setAttribute("type","email");
        EPOSTAInputBiletDetaylari.setAttribute("id",`eposta${i+1}`);
        EPOSTAInputBiletDetaylari.setAttribute("name",`${i+1}`);
        EPOSTAInputBiletDetaylari.setAttribute("placeholder",`* E-Posta`);
        EPOSTAInputBiletDetaylari.setAttribute("required","required");
        // EPOSTAInputBiletDetaylari.addEventListener("input",setEpostaPattern);

        const TCInputBiletDetaylari = document.createElement("input");
        TCInputBiletDetaylari.setAttribute("type","tel");
        TCInputBiletDetaylari.setAttribute("id",`tckimlikno${i+1}`);
        TCInputBiletDetaylari.setAttribute("name",`${i+1}`);
        TCInputBiletDetaylari.setAttribute("placeholder",`* TC Kimlik No`);
        TCInputBiletDetaylari.setAttribute("pattern","[0-9]{11}");
        TCInputBiletDetaylari.setAttribute("maxlength", 11);
        TCInputBiletDetaylari.setAttribute("required","required");
        TCInputBiletDetaylari.addEventListener("input", setTCPattern)

        const TELEFONInputBiletDetaylari = document.createElement("input");
        TELEFONInputBiletDetaylari.setAttribute("type","tel");
        TELEFONInputBiletDetaylari.setAttribute("id",`telefonnumarasi${i+1}`);
        TELEFONInputBiletDetaylari.setAttribute("name",`${i+1}`);
        TELEFONInputBiletDetaylari.setAttribute("placeholder",`* (532) 222 3344`);
        // TELEFONInputBiletDetaylari.setAttribute("pattern","[0-9]{5} [0-9]{3} [0-9]{4}");
        TELEFONInputBiletDetaylari.setAttribute("required","required");
        TELEFONInputBiletDetaylari.addEventListener("input", setTelefonPattern)
        
        const ADRESInputBiletDetaylari = document.createElement("input");
        ADRESInputBiletDetaylari.setAttribute("type","text");
        ADRESInputBiletDetaylari.setAttribute("id",`adres${i+1}`);
        ADRESInputBiletDetaylari.setAttribute("name",`${i+1}`);
        ADRESInputBiletDetaylari.setAttribute("placeholder",`Adres`);
        
        const NOTInputBiletDetaylari = document.createElement("textarea");
        NOTInputBiletDetaylari.setAttribute("id",`not${i+1}`);
        NOTInputBiletDetaylari.setAttribute("name",`${i+1}`);
        NOTInputBiletDetaylari.setAttribute("class","sm:col-span-2");
        NOTInputBiletDetaylari.setAttribute("placeholder","Varsa notunuz...");
            
        const div3BiletDetaylari = document.createElement("div");
        div3BiletDetaylari.setAttribute("class","flex flex-col mt-4 justify-end");

        const BUTTONBiletDetayiButon = document.createElement("button");
        BUTTONBiletDetayiButon.setAttribute("id", `BiletDetayiButon${i+1}`);
        BUTTONBiletDetayiButon.setAttribute("class","btn btn-outline max-w-40");
        BUTTONBiletDetayiButon.setAttribute("type","submit");
        BUTTONBiletDetayiButon.textContent = "Sonraki";
        BUTTONBiletDetayiButon.addEventListener("click", biletDetayiSonrakiButton);

        const bosAlanUyariYazisi = document.createElement("p");
        bosAlanUyariYazisi.setAttribute("class","mt-2 text-red-600 text-sm bosAlanUyariYazisi");
        bosAlanUyariYazisi.setAttribute("id",`bosAlanUyariYazisi${i+1}`);
        bosAlanUyariYazisi.setAttribute("hidden","true");
        bosAlanUyariYazisi.textContent ="Lütfen gerekli alanları kontrol edin";

        const biletDetaylariKontrolUyari = document.createElement("p");
        biletDetaylariKontrolUyari.setAttribute("class","mt-2 text-red-600 text-sm bosAlanUyariYazisi");
        biletDetaylariKontrolUyari.setAttribute("id",`bosAlanUyariYazisi${i+1}`);
        biletDetaylariKontrolUyari.setAttribute("hidden","true");
        biletDetaylariKontrolUyari.textContent ="Lütfen her biletin gerekli alanlarını doldurun.";


        // tabsLifted.appendChild(formBiletDetaylari);
        tabsLifted.appendChild(inputBiletDetaylari);
        tabsLifted.appendChild(divBiletDetaylari)
        divBiletDetaylari.appendChild(div2BiletDetaylari);
        divBiletDetaylari.appendChild(div3BiletDetaylari)
        
        div2BiletDetaylari.appendChild(ADInputBiletDetaylari);
        div2BiletDetaylari.appendChild(SOYADInputBiletDetaylari);
        div2BiletDetaylari.appendChild(EPOSTAInputBiletDetaylari);
        div2BiletDetaylari.appendChild(TCInputBiletDetaylari);
        div2BiletDetaylari.appendChild(TELEFONInputBiletDetaylari);
        div2BiletDetaylari.appendChild(ADRESInputBiletDetaylari);
        div2BiletDetaylari.appendChild(NOTInputBiletDetaylari);

        div3BiletDetaylari.appendChild(BUTTONBiletDetayiButon)
        div3BiletDetaylari.appendChild(bosAlanUyariYazisi)
        if (i == (secilenBiletAdeti-1)) {
            div3BiletDetaylari.appendChild(biletDetaylariKontrolUyari)
        }
    }
    
}

let biletaliciAD, biletaliciSOYAD, biletaliciEPOSTA, biletaliciTCKIMLIK, biletaliciTELEFON, biletaliciADRES, biletaliciNOT;
let biletler =[];
const bilet1 ={biletAdi: "Bilet #1"};
const bilet2 ={biletAdi: "Bilet #2"};
const bilet3 ={biletAdi: "Bilet #3"};
const bilet4 ={biletAdi: "Bilet #4"};
const bilet5 ={biletAdi: "Bilet #5"};


function biletDetayiSonrakiButton(e) {
   

    // Girilen bilet detaylarını objeye dönüştür.
    let biletDetayiARRAY = Array.from(e.target.parentElement.previousElementSibling.children);
    let bosAlanlarDolumu = 0;
    const biletinFiyati = document.querySelector("#fiyat").textContent;

    biletDetayiARRAY.forEach(input => {
        if (input.name == "1") {
            if (input.id.includes("isim")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet1.ad =input.value;
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("soyad")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet1.soyad =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("eposta")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    var re = /\S+@\S+\.\S+/;
                    let postaKontrol =re.test(input.value);
                    if (postaKontrol) {
                        bilet1.eposta =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("Mail adresinizi kontrol edin");
                    }
                }
            }
            if (input.id.includes("tckimlikno")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    if (input.value.length == 11) {
                        bilet1.tckimlik =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("TC Kimlik numaranız 11 haneli olmalı");
                    }
                }
            }
            if (input.id.includes("telefonnumarasi")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet1.telefon =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("adres")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet1.adres =input.value
                }
            }
            if (input.id.includes("not")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet1.not =input.value;
                }
            };
            bilet1.biletNo= islemNo+"-1";
            bilet1.biletFiyati=biletinFiyati;

        }

        if (input.name == "2") {
            if (input.id.includes("isim")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet2.ad =input.value;
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("soyad")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet2.soyad =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("eposta")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    var re = /\S+@\S+\.\S+/;
                    let postaKontrol =re.test(input.value);
                    if (postaKontrol) {
                        bilet2.eposta =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("Mail adresinizi kontrol edin");
                    }
                }
            }
            if (input.id.includes("tckimlikno")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    if (input.value.length == 11) {
                        bilet2.tckimlik =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("TC Kimlik numarası 11 haneli olmalı");
                    }
                }
            }
            if (input.id.includes("telefonnumarasi")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet2.telefon =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("adres")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet2.adres =input.value
                }
            }
            if (input.id.includes("not")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet2.not =input.value;
                }
            };
            bilet2.biletNo= islemNo+"-2";
            bilet2.biletFiyati=biletinFiyati;
        }

        if (input.name == "3") {
            if (input.id.includes("isim")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet3.ad =input.value;
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("soyad")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet3.soyad =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("eposta")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    var re = /\S+@\S+\.\S+/;
                    let postaKontrol =re.test(input.value);
                    if (postaKontrol) {
                        bilet3.eposta =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("Mail adresinizi kontrol edin");
                    }
                }
            }
            if (input.id.includes("tckimlikno")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    if (input.value.length == 11) {
                        bilet3.tckimlik =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("TC Kimlik numarası 11 haneli olmalı");
                    }
                }
            }
            if (input.id.includes("telefonnumarasi")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet3.telefon =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("adres")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet3.adres =input.value
                }
            }
            if (input.id.includes("not")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet3.not =input.value;
                }
            };
            bilet3.biletNo= islemNo+"-3";
            bilet3.biletFiyati=biletinFiyati;
        }

        if (input.name == "4") {
            if (input.id.includes("isim")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet4.ad =input.value;
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("soyad")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet4.soyad =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("eposta")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    var re = /\S+@\S+\.\S+/;
                    let postaKontrol =re.test(input.value);
                    if (postaKontrol) {
                        bilet4.eposta =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("Mail adresinizi kontrol edin");
                    }
                }
            }
            if (input.id.includes("tckimlikno")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    if (input.value.length == 11) {
                        bilet4.tckimlik =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("TC Kimlik numarası 11 haneli olmalı");
                    }
                }
            }
            if (input.id.includes("telefonnumarasi")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet4.telefon =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("adres")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet4.adres =input.value
                }
            }
            if (input.id.includes("not")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet4.not =input.value;
                }
            };
            bilet4.biletNo= islemNo+"-4";
            bilet4.biletFiyati=biletinFiyati;
        }

        if (input.name == "5") {
            if (input.id.includes("isim")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet5.ad =input.value;
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("soyad")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet5.soyad =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("eposta")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    var re = /\S+@\S+\.\S+/;
                    let postaKontrol =re.test(input.value);
                    if (postaKontrol) {
                        bilet5.eposta =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("Mail adresinizi kontrol edin");
                    }
                }
            }
            if (input.id.includes("tckimlikno")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    if (input.value.length == 11) {
                        bilet5.tckimlik =input.value
                        bosAlanlarDolumu += 1;
                    }
                    else{alert("TC Kimlik numarası 11 haneli olmalı");
                    }
                }
            }
            if (input.id.includes("telefonnumarasi")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet5.telefon =input.value
                    bosAlanlarDolumu += 1;
                }
            }
            if (input.id.includes("adres")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet5.adres =input.value
                }
            }
            if (input.id.includes("not")) {
                if (input.value !="" && input.value!=null && input.value!=undefined) {
                    bilet5.not =input.value;
                }
            };
            bilet5.biletNo= islemNo+"-5";
            bilet5.biletFiyati=biletinFiyati;
        }
    });
    
    
    if (e.target.parentElement.parentElement.nextElementSibling) {
        if (bosAlanlarDolumu == 5) {
            e.target.parentElement.parentElement.nextElementSibling.checked= true;
            e.target.nextElementSibling.hidden = true;

        }
        else{
            e.target.nextElementSibling.hidden = false;
            let placeholderlariKirmiziYapilacak = Array.from(e.target.parentElement.previousElementSibling.children);
            for (let i = 0; i < 5; i++) {
                placeholderlariKirmiziYapilacak[i].setAttribute("class", "placeholder:text-red-600")
            }
            
        }
    }
    else{
        
        if (bosAlanlarDolumu == 5) {
            e.target.nextElementSibling.nextElementSibling.hidden=true;
            e.target.nextElementSibling.hidden=true;
            let TumBiletlerKontrol =1;
            let alinacakBiletSayisi = e.target.parentElement.parentElement.parentElement.children.length/2;
            
            let sondanIkinciBiletKontrol = {sonuc:true, mesaj:""};
            let sondanUcuncuBiletKontrol = {sonuc:true, mesaj:""};
            let sondanDorduncuBiletKontrol = {sonuc:true, mesaj:""};
            let sondanBesinciBiletKontrol = {sonuc:true, mesaj:""};

            if (e.target.parentElement.parentElement.previousElementSibling.previousElementSibling) { //SONDAN 2. BİLET VARSA KONTROL ET
                sondanIkinciBiletKontrol = biletinBilgileriEksikMi(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling) 
                //fonsiyona biletin divBiletDetaylarini tagini bulup ekle (role = "tabpanel")
                if (!(sondanIkinciBiletKontrol.sonuc)) {
                    e.target.nextElementSibling.nextElementSibling.hidden = sondanIkinciBiletKontrol.sonuc;
                    e.target.nextElementSibling.nextElementSibling.textContent = sondanIkinciBiletKontrol.mesaj;
                }
                else{TumBiletlerKontrol +=1}
            }

            if (alinacakBiletSayisi >= 3) { // SONDAN 3.BİLET VARSA KONTROL ET
                sondanUcuncuBiletKontrol = biletinBilgileriEksikMi(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling) 
                if (!(sondanUcuncuBiletKontrol.sonuc)) {
                    e.target.nextElementSibling.nextElementSibling.hidden = sondanUcuncuBiletKontrol.sonuc;
                    e.target.nextElementSibling.nextElementSibling.textContent = sondanUcuncuBiletKontrol.mesaj;
                }
                else{TumBiletlerKontrol +=1}
            }

            if (alinacakBiletSayisi>=4) { // SONDAN 4.BİLET VARSA KONTROL ET
                sondanDorduncuBiletKontrol = biletinBilgileriEksikMi(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling) 
                if (!(sondanDorduncuBiletKontrol.sonuc)) {
                    e.target.nextElementSibling.nextElementSibling.hidden = sondanDorduncuBiletKontrol.sonuc;
                    e.target.nextElementSibling.nextElementSibling.textContent = sondanDorduncuBiletKontrol.mesaj;
                }
                else{TumBiletlerKontrol +=1}
            }


            if (alinacakBiletSayisi == 5) { // SONDAN 5.BİLET VARSA KONTROL ET
                sondanBesinciBiletKontrol = biletinBilgileriEksikMi(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling) 
                //fonsiyona biletin divBiletDetaylarini tagini bulup ekle (role = "tabpanel")
                if (!(sondanBesinciBiletKontrol.sonuc)) {
                    e.target.nextElementSibling.nextElementSibling.hidden = sondanBesinciBiletKontrol.sonuc;
                    e.target.nextElementSibling.nextElementSibling.textContent = sondanBesinciBiletKontrol.mesaj;
                }
                else{TumBiletlerKontrol +=1}
            }
            
            if (TumBiletlerKontrol == alinacakBiletSayisi) {
                console.log("Bütün biletler tamamdır. Sonraki adıma git.");
                switch (alinacakBiletSayisi) {
                    case 1:
                        biletler.push(bilet1);
                        break;
                    case 2:
                        biletler.push(bilet1, bilet2);
                        break;
                    case 3:
                        biletler.push(bilet1, bilet2, bilet3);
                        break;
                    case 4:
                        biletler.push(bilet1, bilet2, bilet3, bilet4);
                        break;
                    case 5:
                        biletler.push(bilet1, bilet2, bilet3, bilet4, bilet5);
                        break;
                    default:
                        break;
                }
                BiletDetaylariniOzetle()
                setEtkinlikPolitikalari();
                EtkinlikPolitikalariContent.style.height = "auto";

            EtkinlikPolitikalariBaslik.scrollIntoView();
            }
            
        }
        else{
            e.target.nextElementSibling.hidden = false;
            let placeholderlariKirmiziYapilacak = Array.from(e.target.parentElement.previousElementSibling.children);
            for (let i = 0; i < 5; i++) {
                placeholderlariKirmiziYapilacak[i].setAttribute("class", "placeholder:text-red-600")
            }
            
        }
        
    }
}

function setEtkinlikPolitikalari() {
    
    fetch("politikalarimiz.json")
    .then(response => response.json())
    .then(politikalar => {
        politikalar.forEach(politika => {
            const politikaLabel = document.createElement("label");
            politikaLabel.classList="flex flex-row w-full mt-4 peer h-auto has-[:checked]:text-slate-500";
            politikaLabel.id ="";

            const politikaInputCheckBox = document.createElement("input");
            politikaInputCheckBox.classList="checkbox isaretsiz border-slate-600 mr-3 dark:border-white";
            politikaInputCheckBox.type ="checkbox";
            politikaInputCheckBox.name ="";
            politikaInputCheckBox.checked =false;
            politikaInputCheckBox.addEventListener("click", politikaOnayKontrol)
            

            const politikaP = document.createElement("p");
            politikaP.classList="underline underline-offset-1 cursor-pointer";
            politikaP.textContent=politika.baslik;
            politikaP.addEventListener("click", politikaPopUpAcilmasi);

            politikaLabel.appendChild(politikaInputCheckBox);
            politikaLabel.appendChild(politikaP);
            EtkinlikPolitikalariContent.appendChild(politikaLabel);

        });
    })
    .catch((err) => console.log(err));
    
}


let OdemeBaslik = document.querySelector(".OdemeBaslik")
const odemePopUpBg = document.querySelector("#odemePopUpBG");
odemePopUpBg.addEventListener("click", popupKapanmasi2);

const odemepopUpContent = document.querySelector("#odemepopUpFrame");
const odemepopUpXButton = document.querySelector("#odemepopUpXButton");
odemepopUpXButton.addEventListener("click", popupKapanmasi);
const odemepopUpXButtonSvg = document.querySelector("#odemepopUpXButtonSvg");
document.addEventListener("keydown", popupKapanmasi3);




const popUpBg = document.querySelector("#politikaPopUpBG");
popUpBg.addEventListener("click", popupKapanmasi2);
const politikamizBaslik = document.querySelector("#politikamizBaslik");
const politikamizIcerik = document.querySelector("#politikamizIcerik");
const popUpContent = document.querySelector("#popUpFrame");
const popUpXButton = document.querySelector("#popUpXButton");
popUpXButton.addEventListener("click", popupKapanmasi);
const popUpXButtonSvg = document.querySelector("#popUpXButtonSvg");
document.addEventListener("keydown", popupKapanmasi3);




function politikaPopUpAcilmasi(e){
    fetch("politikalarimiz.json")
    .then(response => response.json())
    .then(politikalar => {
        politikalar.forEach(politika => {
            if (politika.baslik == e.target.textContent) {
                politikamizBaslik.innerText = politika.baslik  ;
                politikamizIcerik.innerText = politika.metin;
            }
        });
    })
    .catch((err) => console.log(err));
    popUpBg.hidden = false;
}

    //X 'e basarak popUp kapatma
    function popupKapanmasi(e){ 
        console.log(e.target);
        
        popUpBg.hidden = true;
        odemePopUpBg.hidden = true;
        politikamizBaslik.innerText = "Bir Hata Oluştu"  ;
        politikamizIcerik.innerText = "Lütfen bizimle iletişime geçin.";
    };

    //pencere dışına basarak popUp kapatma
    function popupKapanmasi2(e){
        if (!popUpContent.contains(e.target) && !popUpXButton.contains(e.target)) {
            popupKapanmasi();
        }
    }
    //ESC ile popUp kapatma 
    function popupKapanmasi3(e) {
        if (e.key === "Escape") {
          if (!popUpBg.hidden) {
            popupKapanmasi();
          }}
    };
//PopUp (Politikalarımız) açılması ve kapanması için bitiş


function politikaOnayKontrol(e) {
    let isaretliPolitikaSayisi = 0;
    let politikalarArray = Array.from(e.target.parentElement.parentElement.children);
    politikalarArray.forEach(politikaninAnnanesi => {
        let politika =Array.from(politikaninAnnanesi.children);
        politika.forEach(politika => {
            if (politika.checked) {
                isaretliPolitikaSayisi +=1;
            }
            //     console.log(politika.textContent);
            // // console.log(politikaninAnnanesi.children[0].children);
        });
    });
    if (isaretliPolitikaSayisi == 3) {

        // Ödeme bilgilendirmesi
        
        let OdemeContent = document.getElementById("OdemeContent");
        let odemeBilgi = document.getElementById("odemeBilgi");

        const odemeBilgiP1 = document.createElement("p");
        odemeBilgiP1.classList = "text-lg"
        odemeBilgiP1.textContent = `Toplam tutarı ${toplamBiletTutari.textContent} olan #${(islemNo-1)} nolu işleminiz, ödeme aşamasından sonra tamamlanacaktır. Ödemenizi aşağıdaki banka hesaplarımıza EFT/Havale yapabilirsiniz.`;
        
        const odemeBilgiP2 = document.createElement("p");
        
        const odemeBilgiP2Text1 = document.createElement("span");
        odemeBilgiP2Text1.textContent = "Açıklama bölümüne;";

        const odemeBilgiP2Text2 = document.createElement("b");
        odemeBilgiP2Text2.textContent = ` #${(islemNo-1)} nolu işlem ödemesi`;

        const odemeBilgiP2Text3 = document.createElement("span");
        odemeBilgiP2Text3.textContent = ` yazmanızı rica ederiz. İlginiz için teşekkürler`;
        
        odemeBilgiP2.appendChild(odemeBilgiP2Text1)
        odemeBilgiP2.appendChild(odemeBilgiP2Text2)
        odemeBilgiP2.appendChild(odemeBilgiP2Text3)

        odemeBilgi.appendChild(odemeBilgiP1);
        odemeBilgi.appendChild(odemeBilgiP2);
   
        
        // Banka hesaplarını göster başlangıç
        let bankaHesaplariWrapper = document.getElementById("bankaHesaplari");

        fetch("banka-hesaplarimiz.json")
        .then(response => response.json())
        .then(bankaHesaplari => {

            bankaHesaplari.forEach(bankaHesabi => {
                console.log(bankaHesabi);
                const bankaHesabiTR = document.createElement("tr");
                bankaHesabiTR.classList = "odd:bg-slate-100 even:bg-white *:p-2";
                
                const bankaHesabiTd1 = document.createElement("td");
                
                const bankaHesabiTd1IMG = document.createElement("img");
                bankaHesabiTd1IMG.src =`resimler/${bankaHesabi.bankaLogosu}`;
                
                const bankaHesabiTd2 = document.createElement("td");
                
                const bankaHesabiTd2Div = document.createElement("div");
                bankaHesabiTd2Div.classList = "tooltip";
                bankaHesabiTd2Div.setAttribute("data-tip", "Kopyala");

                const bankaHesabiTd2P = document.createElement("p");
                bankaHesabiTd2P.textContent = bankaHesabi.aliciAdi;
                bankaHesabiTd2P.addEventListener("click", yaziyiKopyala);
                bankaHesabiTd2P.addEventListener("mouseleave", kopyalamaBitti);

                const bankaHesabiTd3 = document.createElement("td");

                const bankaHesabiTd3Div = document.createElement("div");
                bankaHesabiTd3Div.classList = "tooltip";
                bankaHesabiTd3Div.setAttribute("data-tip", "Kopyala");

                const bankaHesabiTd3P = document.createElement("p");
                bankaHesabiTd3P.textContent = bankaHesabi.iban;
                bankaHesabiTd3P.addEventListener("click", yaziyiKopyala);
                bankaHesabiTd3P.addEventListener("mouseleave", kopyalamaBitti);

                const bankaHesabiTd4 = document.createElement("td");

                const bankaHesabiTd4Div = document.createElement("div");
                bankaHesabiTd4Div.classList = "tooltip";
                bankaHesabiTd4Div.setAttribute("data-tip", "Kopyala");

                const bankaHesabiTd4P = document.createElement("p");
                bankaHesabiTd4P.textContent = bankaHesabi.bankaSubesi;
                bankaHesabiTd4P.addEventListener("click", yaziyiKopyala);
                bankaHesabiTd4P.addEventListener("mouseleave", kopyalamaBitti);

                const bankaHesabiTd5 = document.createElement("td");


                const bankaHesabiTd5Div = document.createElement("div");
                bankaHesabiTd5Div.classList = "tooltip";
                bankaHesabiTd5Div.setAttribute("data-tip", "Kopyala");

                const bankaHesabiTd5P = document.createElement("p");
                bankaHesabiTd5P.textContent = bankaHesabi.hesapNo;
                bankaHesabiTd5P.addEventListener("click", yaziyiKopyala);
                bankaHesabiTd5P.addEventListener("mouseleave", kopyalamaBitti);


                bankaHesaplariWrapper.appendChild(bankaHesabiTR)
                bankaHesabiTR.appendChild(bankaHesabiTd1).appendChild(bankaHesabiTd1IMG);
                bankaHesabiTR.appendChild(bankaHesabiTd2).appendChild(bankaHesabiTd2Div).appendChild(bankaHesabiTd2P);
                bankaHesabiTR.appendChild(bankaHesabiTd3).appendChild(bankaHesabiTd3Div).appendChild(bankaHesabiTd3P);
                bankaHesabiTR.appendChild(bankaHesabiTd4).appendChild(bankaHesabiTd4Div).appendChild(bankaHesabiTd4P);
                bankaHesabiTR.appendChild(bankaHesabiTd5).appendChild(bankaHesabiTd5Div).appendChild(bankaHesabiTd5P);
            });

            OdemeContent.style.height="auto";

            function kopyalamaBitti(e) {
                setTimeout(() => {
                    e.target.parentElement.setAttribute("data-tip", "Kopyala")
                }, 200);
            }
            function yaziyiKopyala (e) {
                navigator.clipboard.writeText(e.target.textContent).then(()=>{
                    e.target.parentElement.setAttribute("data-tip", "Kopyalandı!")
                }).catch(err => {
                    console.log(err);
                    
                });
            }
        })
        .catch((err) => console.log(err));
        
        // Banka hesaplarını göster bitiş

        odemePopUpBg.hidden=false
    }
}




function BiletDetaylariniOzetle() {
    BiletDetaylariContent.hidden=true

    biletDetaylariOzet.classList.remove("hidden")
    biletDetaylariOzet.classList.add("flex")

    //Random İşlem id oluştur & Benzersiz olsun. !! YAPILACAK
    let uyelikEpostaOzetten = document.getElementById("uyelikEpostaOzet")
    girisYapanUyeler.forEach(uye => {
        if (uye.eposta == uyelikEpostaOzetten.textContent) {
            if (uye.islemler) {
                uye.islemler.forEach(islem=>{
                    if (islem.islemNo == islemNo) {
                        uye.islemler.splice(uye.islemler.indexOf(islem.islemNo), 1);
                    }
                });

                uye.islemler.push({islemNo: islemNo, biletler: biletler, toplamTutar:toplamBiletTutari.textContent, egitimBasligi:egitimBasligi.textContent, egitimTarihSaati: egitimTarihSaati.textContent, egitimMekani: egitimMekani.textContent, odemeDurumu:false, satinAlanUyeEpostasi: uye.eposta, alinanBiletAdeti:secilenBiletAdeti});
                islemNo +=1;
            }
            else{
                uye.islemler =[{islemNo: islemNo, biletler: biletler, toplamTutar:toplamBiletTutari.textContent, egitimBasligi:egitimBasligi.textContent, egitimTarihSaati: egitimTarihSaati.textContent, egitimMekani: egitimMekani.textContent, odemeDurumu:false, satinAlanUyeEpostasi: uye.eposta, alinanBiletAdeti:secilenBiletAdeti}];
                islemNo +=1;
            }

        }
    });
    
    //girilen bilet verilerinin özetini göstermek için DOM oluşturuluyor. 

    const biletDetayiOzetNavbarDiv = document.createElement("div"); 
    biletDetayiOzetNavbarDiv.classList = "grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full md:w-11/12";

    biletler.forEach(bilet => {
        
        const biletDetayiOzetFrameDiv = document.createElement("div");
        biletDetayiOzetFrameDiv.classList="text-slate-500";

        const biletDetayiOzetBiletAdi =document.createElement("p");
        biletDetayiOzetBiletAdi.id="biletDetayBiletAdi";
        biletDetayiOzetBiletAdi.classList ="mb-2 border-b-2";
        biletDetayiOzetBiletAdi.textContent= bilet.biletAdi;

        const biletDetayiOzetAdSoyad =document.createElement("p");
        biletDetayiOzetAdSoyad.id="biletDetayAdSoyadOzet";
        biletDetayiOzetAdSoyad.textContent= `${bilet.ad} ${bilet.soyad}`;

        const biletDetayiOzetEposta =document.createElement("p");
        biletDetayiOzetEposta.id="biletDetayEpostaOzet";
        biletDetayiOzetEposta.textContent= bilet.eposta;
        
        
        biletDetayiOzetNavbarDiv.appendChild(biletDetayiOzetFrameDiv)
        biletDetayiOzetFrameDiv.appendChild(biletDetayiOzetBiletAdi);
        biletDetayiOzetFrameDiv.appendChild(biletDetayiOzetAdSoyad);
        biletDetayiOzetFrameDiv.appendChild(biletDetayiOzetEposta);
    });

    biletler = []

    const biletDetaylariDuzenleButtonWrapper = document.createElement("div");
    biletDetaylariDuzenleButtonWrapper.classList="flex items-center justify-center text-right md:w-1/12";
    
    const biletDetaylariDuzenleButtonP = document.createElement("p");
    biletDetaylariDuzenleButtonP.id="biletDetaylariDuzenleButton";
    biletDetaylariDuzenleButtonP.classList="text-sky-600 underline underline-offset-1 cursor-pointer";
    biletDetaylariDuzenleButtonP.textContent="Düzenle";
    biletDetaylariDuzenleButtonP.addEventListener("click", biletDetayiniDuzenleFunc);
    
    biletDetaylariOzet.appendChild(biletDetayiOzetNavbarDiv);
    biletDetaylariOzet.appendChild(biletDetaylariDuzenleButtonWrapper).appendChild(biletDetaylariDuzenleButtonP);
}

function biletDetayiniDuzenleFunc(e) {
    e.target.parentElement.parentElement.previousElementSibling.hidden = false //Bilet detayı input göster

    islemNo -=1;

    e.target.parentElement.parentElement.classList.add("hidden"); //Özet Navbarını gizle
    e.target.parentElement.parentElement.classList.remove("flex"); 
    e.target.parentElement.parentElement.innerHTML =``;
}


function biletinBilgileriEksikMi(divBiletDetaylari) {
    let BiletinInputlari = Array.from(divBiletDetaylari.children[0].children);
    let puanTopla = 0;
    for (let i = 0; i < 5; i++) {
        if (BiletinInputlari[i].value=="" ) {
            // e.target.nextElementSibling.nextElementSibling.hidden=false
            // e.target.nextElementSibling.nextElementSibling.textContent= `${BiletinInputlari[i].name}. bilet için eksik veri girişi!`
            return {
                sonuc: false,
                mesaj: `${BiletinInputlari[i].name}. bilet için eksik veri girişi!`
            }
        }
        else{
            
            if (BiletinInputlari[i].id.includes("eposta")) {
                var re = /\S+@\S+\.\S+/;
                let postaKontrol =re.test(BiletinInputlari[i].value);
                if (!postaKontrol) {
                    // e.target.nextElementSibling.nextElementSibling.hidden=false
                    // e.target.nextElementSibling.nextElementSibling.textContent= `${BiletinInputlari[i].name}. bilet için girilen e-posta hatalı!`;
                    return {
                        sonuc: false,
                        mesaj: `${BiletinInputlari[i].name}. bilet için girilen e-posta hatalı!`
                    }
                }
                else{
                    puanTopla +=1;
                }
            }

            if (BiletinInputlari[i].id.includes("tckimlikno")) {
                if (BiletinInputlari[i].value.length !=11) {
                    // e.target.nextElementSibling.nextElementSibling.hidden=false
                    // e.target.nextElementSibling.nextElementSibling.textContent= `${BiletinInputlari[i].name}. bilet için girilen TC no hatalı!`;
                    return {
                        sonuc: false,
                        mesaj: `${BiletinInputlari[i].name}. bilet için girilen TC no hatalı!`
                    }
                }
                else{
                    puanTopla +=1;
                }
            }

            if (BiletinInputlari[i].id.includes("telefonnumarasi")) {
                if (BiletinInputlari[i].value.length !=14) {
                    // e.target.nextElementSibling.nextElementSibling.hidden=false
                    // e.target.nextElementSibling.nextElementSibling.textContent= `${BiletinInputlari[i].name}. bilet için girilen telefon no hatalı!`;
                    return {
                        sonuc: false,
                        mesaj: `${BiletinInputlari[i].name}. bilet için girilen telefon no hatalı!`
                    }
                }
                else{
                    puanTopla +=1;
                }
            }

            
        }
    }

    if (puanTopla == 3) {
        return {
            sonuc: true,
            mesaj: ``
        }
    }
}



function uyelikBilgileriniOzetle(ad, soyad, eposta) {
    let uyelikBilgileriOzet = document.getElementById("uyelikBilgileriOzet");
    uyelikBilgileriOzet.classList.remove("hidden");
    let UyelikBilgileriContent = document.getElementById("UyelikBilgileriContent");
    UyelikBilgileriContent.classList.add("hidden");
    let uyelikAdSoyadOzet = document.getElementById("uyelikAdSoyadOzet");
    let uyelikEpostaOzet = document.getElementById("uyelikEpostaOzet");
    let uyelikBilgileriDuzenleButton = document.getElementById("uyelikBilgileriDuzenleButton");

    uyelikAdSoyadOzet.textContent = `${ad} ${soyad}`;
    uyelikEpostaOzet.textContent = eposta;
    uyelikEpostaOzet.classList = "cursor-pointer";
    uyelikBilgileriDuzenleButton.textContent = "Düzenle";
    uyelikBilgileriDuzenleButton.addEventListener("click", uyelikBilgileriniDuzenle)
};



function uyelikBilgileriniDuzenle() {
    let uyelikBilgileriOzet = document.getElementById("uyelikBilgileriOzet");
    uyelikBilgileriOzet.classList.add("hidden");
    let UyelikBilgileriContent = document.getElementById("UyelikBilgileriContent");
    UyelikBilgileriContent.classList.remove("hidden");
    BiletDetaylariContent.style.height="0px";
}

function girisYapanUyelerDiziniGüncelle(girisYapanUyelerArray, girisYapanUyeVerileri) {
    girisYapanUyelerArray.push(girisYapanUyeVerileri);
    localStorage.setItem("girisYapanUyeler", JSON.stringify(girisYapanUyelerArray));
}

function setTelefonPattern(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' ' + x[3] : '');
}

function setTCPattern(e){
    if (e.target.value)
        {
            const x = e.target.value.replace(/\D/g, '').match(/(\d{0,11})/);
            e.target.value =  + x[1] + (x[2] ? `${x[2]}` : '') + (x[3] ? `${x[3]}` : '')
        }
}

function localStorageKontrol(){
    let uyeBilgileriFromLocal =JSON.parse(localStorage.getItem("girisYapanUyeler"));
    
    if (uyeBilgileriFromLocal == null) {
        girisYapanUyeler =[];
        
        
    }
    else{
        girisYapanUyeler = uyeBilgileriFromLocal ;
    }
}