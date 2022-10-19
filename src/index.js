import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './style.css';
let kereso = document.getElementById('kereso')
let listaz = document.getElementById('listaz')
let sd_karytak_filter;
let Kivalasztott_meret = "";
let radiobuttons =  document.querySelectorAll('input[name="meretValaszt"]')

const SD_KARTYAK = [
    {
      "nev": "Maxi Ultra",
      "meret": "128"
    },
    {
      "nev": "Maxi Ultra S",
      "meret": "256"
    },
    {
      "nev": "Maxi Ultra X",
      "meret": "512"
    },
    {
      "nev": "Átlagos SD kártya",
      "meret": "128"
    },
    {
      "nev": "Átlagos SD kártya 2",
      "meret": "256"
    },
    {
      "nev": "Átlagos SD kártya 2.1",
      "meret": "256"
    },
    {
      "nev": "Ólcsó microSD",
      "meret": "32"
    },
    {
      "nev": "Kevésbé olcsó microSD",
      "meret": "64"
    }
  ]

  let sdMeret = null;

  function sdSzures(inputNev, sdMeret) {
    if (inputNev.length >= 3) {
      console.log(inputNev.value)
      sd_karytak_filter = SD_KARTYAK.filter(
          e => e.nev.toLowerCase().includes(inputNev.toLowerCase())
      )
      if(sdMeret != null) {
        sd_karytak_filter = sd_karytak_filter.filter(
          e => e.meret == sdMeret
        )
      }
      sd_karytak_filter.sort((a, b) => a.meret - b.meret)
      Render_bootstrapCards(sd_karytak_filter)
      
    } else {
      sd_karytak_filter = []
      Render_bootstrapCards(sd_karytak_filter)
    }
    console.log(sd_karytak_filter)
  }

  function Render_bootstrapCards(sd_cardList) {
        listaz.innerHTML = ''
        sd_cardList.forEach(element => {
            //L
            let divmd = document.createElement('div')
            divmd.classList.add("col-md-4")
            divmd.style.margintop = "10px"
            divmd.style.marginBottom = "10px"
    
            let divcard = document.createElement('div')
            divcard.classList.add("card")
            divcard.classList.add("text-center")
    
            let divcardheader = document.createElement('div')
            divcardheader.classList.add("card-header")
            divcardheader.textContent = ""+ element.nev
    
            let divcardbody = document.createElement('div')
            divcardbody.classList.add("card-body")
            divcardbody.textContent= "" + element.meret + " GB"
    
            divcard.appendChild(divcardheader)
            divcard.appendChild(divcardbody)
            divmd.appendChild(divcard)
            listaz.appendChild(divmd)
        });
  }

document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded')
    radiobuttons.forEach(e => {
        e.checked = false
        
    })

    kereso.addEventListener('input', () => {
            let input = kereso.value
            sdSzures(input, sdMeret)
 
    })
    radiobuttons.forEach(e => { 
      e.addEventListener('click', () => {
          sdMeret = e.value
          sdSzures(kereso.value, e.value)
    })
    })
})