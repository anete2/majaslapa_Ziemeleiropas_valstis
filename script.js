// DATUMS UN LAIKS
function atjaunotLaiku() {
    const tagad = new Date();
    
    // Formatējam datumu
    const datumaOpcijas = { year: 'numeric', month: 'long', day: 'numeric' };
    const datumsStr = tagad.toLocaleDateString('lv-LV', datumaOpcijas);
    
    // Formatējam laiku
    const laiksStr = tagad.toLocaleTimeString('lv-LV');

    if(document.getElementById("datums")) {
        document.getElementById("datums").innerText = datumsStr;
        document.getElementById("laiks").innerText = laiksStr;
    }
}
setInterval(atjaunotLaiku, 1000);

//MEKLĒTĀJS 
function mekletValsti() {
    let logs = document.getElementById("ievadi_valsti");
    let vards = logs.value.trim(); // Paņem tekstu no lodziņa
    let elements = document.getElementById(vards); // Meklē elementu pēc ID

    if (elements) {
        elements.scrollIntoView({ behavior: 'smooth', block: 'center' });
        elements.style.border = "5px solid gold"; // Izceļ atrasto
        setTimeout(() => { elements.style.border = "none"; }, 3000);
    } else {
        alert("Valsts '" + vards + "' nav atrasta! Pārliecinies, ka raksti ar lielo burtu.");
    }
}


function raditspeli() {
    document.getElementById("speles_sakums").style.display = "none";
    document.getElementById("speles_lapa").style.display = "block";
    sagatavotSpeli(); // Sāk jautājumu ielādi
}

function atpakal() {
    // Ja gribam vienkārši pārlādēt lapu uz sākuma stāvokli
    location.reload();
}

function raditTekstu(x) {
    let info = document.getElementById(x);
    info.style.display = (info.style.display == "block") ? "none" : "block";
}

// SPĒLE
const visiDati = [
    { jautajums: "Latvijas karogs ir viens no senākajiem pasaulē.", atbilde: true },
    { jautajums: "Ventas rumba ir platākais ūdenskritums pasaulē.", atbilde: false },
    { jautajums: "Latvijas ģerbonī ir attēlotas piecas zvaigznes, kas simbolizē piecus novadus.", atbilde: false },
    { jautajums: "Lietuvas karogā dzeltenā krāsa simbolizē sauli, bet zaļā - dabu.", atbilde: true },
    { jautajums: "Lietuviešu valoda ir viena no jaunākajām valodām pasaulē.", atbilde: false },
    { jautajums: "Igaunijas sastāvā ir tikai divas salas - Sāmsala un Hījumā.", atbilde: false },
    { jautajums: "Traķu pils atrodas uz salas ezera vidū.", atbilde: true },
    { jautajums: "Lielais Munameģis ir augstākā virsotne Baltijā.", atbilde: true },
    { jautajums: "Igaunijas karogā melnā krāsa simbolizē zemi un vēstures slogu.", atbilde: true },
    { jautajums: "Zviedrija kopš vikingu laikiem vienmēr ir bijusi NATO dalībvalsts.", atbilde: false },
    { jautajums: "Zviedrija ir vienīgā valsts pasaulē, kur zīmju valoda ir oficiāla valsts valoda.", atbilde: true },
    { jautajums: "Zviedrijas karogā ir attēlots dzeltens krusts uz zila fona.", atbilde: true },
    { jautajums: "Somijas karogā zils krusts uz balta fona simbolizē ezerus un sniegu.", atbilde: true },
    { jautajums: "Somijas karogā zilā krāsa simbolizē debesis.", atbilde: false },
    { jautajums: "Somijas augstākā virsotne ir Halti kalns.", atbilde: true },
    { jautajums: "Dānija robežojas tikai ar vienu valsti — Vāciju.", atbilde: false },
    { jautajums: "Dānijas karogs 'Dannebrog' ir viens no senākajiem lietošanā esošajiem valsts karogiem pasaulē.", atbilde: true },
    { jautajums: "Stokholma ir Zviedrijas galvaspilsēta.", atbilde: true },
    { jautajums: "Dānijas sastāvā ietilpst Grenlande un Fēru salas.", atbilde: true },
    { jautajums: "Dānija ir kalnaina valsts ar augstām virsotnēm.", atbilde: false },
    { jautajums: "Norvēģija gandrīz visu savu elektroenerģiju iegūst no hidroelektrostacijām.", atbilde: true },
    { jautajums: "Norvēģija atguva neatkarību no Krievijas Impērijas 1905. gadā.", atbilde: false },
    { jautajums: "Galhēpigens ir augstākā virsotne Skandināvijā.", atbilde: true },
    { jautajums: "Visa Norvēģijas teritorija atrodas aiz polārā loka.", atbilde: false },
    { jautajums: "Igaunija robežojas ar Latviju.", atbilde: true },
    { jautajums: "Uz Islandes salas neatrodas neviens vulkāns, jo tur ir tikai ledāji.", atbilde: false },
    { jautajums: "Islandes karogā krāsas simbolizē uguni, sniegu un okeānu.", atbilde: true },
    { jautajums: "Islande bija pirmā valsts pasaulē, kas 1991. gadā atzina Latvijas neatkarības atjaunošanu.", atbilde: true }
];

let punkti = 0;
let esosaisIndekss = 0;
const maxJautajumi = 20;
let aktivieJautajumi = [];

function sagatavotSpeli() {
    aktivieJautajumi = [...visiDati].sort(() => Math.random() - 0.5);
    punkti = 0;
    esosaisIndekss = 0;
    document.getElementById("punkti").innerText = punkti;
    raditJautajumu();
}

function raditJautajumu() {
    if (esosaisIndekss < maxJautajumi && esosaisIndekss < aktivieJautajumi.length) {
        let jautajumsObj = aktivieJautajumi[esosaisIndekss];
        document.getElementById("jautajums").innerText = jautajumsObj.jautajums;
        document.getElementById("atsauksme").innerText = "";
        // Atkal parādām pogas, ja tās bija paslēptas
        document.querySelector(".spelei_pogas").style.visibility = "visible";
    } else {
        beigtSpeli();
    }
}

function parbauda(lietotajaAtbilde) {
    let jautajumsObj = aktivieJautajumi[esosaisIndekss];
    let pazinot = document.getElementById("atsauksme");

    // Paslēpjam pogas uz brīdi, lai nevar saspaidīt vairāreiz
    document.querySelector(".spelei_pogas").style.visibility = "hidden";

    if (lietotajaAtbilde === jautajumsObj.atbilde) {
        pazinot.innerText = "Pareizi!";
        pazinot.style.color = "green";
        punkti++;
    } else {
        pazinot.innerText = "Nepareizi!";
        pazinot.style.color = "red";
    }

    document.getElementById("punkti").innerText = punkti;
    esosaisIndekss++;
    setTimeout(raditJautajumu, 1500);
}

function beigtSpeli() {
    document.getElementById("jautajums").innerText = "Spēle beigusies!";
    document.getElementById("atsauksme").innerText = "Tavi punkti: " + punkti + " no " + maxJautajumi;
    document.querySelector(".spelei_pogas").style.display = "none";
}


window.onload = function() {
    atjaunotLaiku();
};