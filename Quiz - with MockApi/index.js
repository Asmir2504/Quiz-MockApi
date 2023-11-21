// navigacija buttons
const navButtonPocetak = document.getElementById("nav_button_pocetak");
const navButtonKviz = document.getElementById("nav_button_kviz");
const navButtonRezultati = document.getElementById("nav_button_rezultati");

// container
const conPocetak = document.getElementById("con_pocetak");
const conKviz = document.getElementById("con_kviz");
const conRezultati = document.getElementById("con_rezultati");
const conKvizPitanja = document.getElementById("kviz-pitanja");

// form
const formNewUser = document.getElementById("form-new-user");
const formNewUserButton = document.getElementById("form-create-user-button");

/* navigacija display */
navButtonPocetak.onclick = () => {
  navButtonPocetak.classList.add("active");
  navButtonKviz.classList.remove("active");
  navButtonRezultati.classList.remove("active");

  conPocetak.classList.remove("display-none");
  conKviz.classList.add("display-none");
  conRezultati.classList.add("display-none");
};

navButtonKviz.onclick = () => {
  navButtonKviz.classList.add("active");
  navButtonPocetak.classList.remove("active");
  navButtonRezultati.classList.remove("active");

  conKviz.classList.remove("display-none");
  conPocetak.classList.add("display-none");
  conRezultati.classList.add("display-none");
};

navButtonRezultati.onclick = () => {
  navButtonRezultati.classList.add("active");
  navButtonKviz.classList.remove("active");
  navButtonPocetak.classList.remove("active");

  conRezultati.classList.remove("display-none");
  conKviz.classList.add("display-none");
  conPocetak.classList.add("display-none");

  const tabelaRezultata = document.getElementById("tabela-korisnika");

  // Povlačenje rezultatata iz baze svaki put kada se klikne na rezultate

  function getAndRenderUsers() {
    fetch("https://6433dd5b582420e2316d74c6.mockapi.io/kviz/igraci/igraci_kviza")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        renderUsers(data, tabelaRezultata);
      });
  }

  const renderUsers = (users, tabelaRezultata) => {
    let content = "";
    users.forEach((players) => {
      content += `
      <div class="tabela-red pozadina-red">
        <div class="tabela-kolona">${players.ime}</div>
        <div class="tabela-kolona">${players.prezime}</div>
        <div class="tabela-kolona">${players.rezultat}</div>
      </div>
    `;
    });

    tabelaRezultata.innerHTML = content;
  };

  getAndRenderUsers();
};

/* Ime i prezime */

let imeKorisnika = document.getElementById("kviz-ime-korisnika");
let prezimeKorisnika = document.getElementById("prezime-korisnika");
let ImeZaPozdrav = [];

let imeRezultat = [];
let prezimeRezultat = prezimeKorisnika;

const imePocetak = document.getElementById("ime-korisnika");
const prezimePocetak = document.getElementById("prezime-korisnika");
const porukaGreska = document.getElementById("form-new-user-error");

/* Obavještenje i prelazak na kviz */

formNewUserButton.addEventListener("click", pozdravIme);

function pozdravIme() {
  if (imePocetak.value.length < 1 && prezimePocetak.value.length < 1) {
    alert("Unesite vaše IME I PREZIME kako biste započeli kviz");
  } else if (imePocetak.value.length < 1 && prezimePocetak.value.length >= 1) {
    alert("Unesite vaše IME kako biste započeli kviz");
  } else if (imePocetak.value.length >= 1 && prezimePocetak.value.length < 1) {
    alert("Unesite vaše PREZIME kako biste započeli kviz");
  } else {
    const ime = document.getElementById("ime-korisnika");

    imeRezultat = ime.value;
    imeKorisnika.innerText = "Zdravo" + " " + ime.value;

    navButtonKviz.classList.add("active");
    navButtonPocetak.classList.remove("active");
    navButtonRezultati.classList.remove("active");

    conKviz.classList.remove("display-none");
    conPocetak.classList.add("display-none");
    conRezultati.classList.add("display-none");
    conKvizPitanja.classList.remove("display-none");
  }
}

//Pitanja

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
  return choice === this.answer;
};

//Brojanje rezultata
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function () {
  return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().correctAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

//Prikaz rezultata
function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Prikaz pitanja
    let element = document.getElementById("pitanje-okvir");
    element.innerHTML = quiz.getQuestionIndex().text;

    // Prikaz mogućih odgovora
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let element = document.getElementById("odgovor" + i);
      element.innerHTML = choices[i];
      guess("opcija" + i, choices[i]);

      let trenutnoPitanje = document.getElementById("broj-trenutnog-pitanja");
      let brojPitanja = quiz.questionIndex + 1;
      trenutnoPitanje.innerHTML =
        "Pitanje broj " +
        brojPitanja +
        " od 10.   Vaš trenutni rezultat je " +
        quiz.score +
        ".";
    }
  }
}

function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

//Prikaz rezultata na kraju kviza

function showScores() {
  let gameOverHtml = "<h2 id='prikazRezultata'>Rezultat</h2>";
  gameOverHtml += "<h1 id='score'>Vaš rezultat je: " + quiz.score + "</h1>";
  gameOverHtml += "<div id='snimanje'>Snimite vaš rezultat</div>";
  gameOverHtml +=
    "<a href='/index.html' id='dugme-pocetak'>Pokušajte ponovo</a>";
  let element = document.getElementById("kviz-okvir");
  element.innerHTML = gameOverHtml;

  let rezultatKviza = [];

  rezultatKviza = quiz.score;
  console.log(rezultatKviza);
  console.log(imeRezultat);
  console.log(prezimeRezultat.value);

  let dataRezultat = {
    ime: imeRezultat,
    prezime: prezimeRezultat.value,
    rezultat: rezultatKviza,
  };

  console.log(dataRezultat);

  /*Snimanje rezultata u bazu */

  const rezultatDataZaBazu = dataRezultat;
  const dugmeZaBazu = document.getElementById("snimanje");

  const noviKorisnikZaBazu = async (form) => {
    console.log(form);
    const data = dataRezultat;
    console.log(data);
    let response = await fetch(
      /*`https://63be8ced585bedcb36b03978.mockapi.io/players`,*/
      `https://6433dd5b582420e2316d74c6.mockapi.io/kviz/igraci/igraci_kviza`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin":
            "https://mockapi.io/projects/6433dd5b582420e2316d74c7",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  };
  // Obavještenje o uspješnom snimanju
  dugmeZaBazu.onclick = () => {
    noviKorisnikZaBazu(rezultatDataZaBazu);
    alert("Snimanje rezultata je uspješno!");
  };
}

// Pitanja

let questions = [
  new Question(
    "Koji je glavni grad Bosne i Hercegovine?",
    ["Banja Luka", "Sarajevo", "Novi Sad", "Mostar"],
    "Sarajevo"
  ),
  new Question(
    "Koji je glavni grad Njemačke?",
    ["Berlin", "Hamburg", "Frankfurt", "Minhen"],
    "Berlin"
  ),
  new Question(
    "Koji je glavni grad Kanade?",
    ["Toronto", "Vankuver", "Otava", "Montreal"],
    "Otava"
  ),
  new Question(
    "Koji je glavni grad Brazila?",
    ["Rio de Ženeiro", "Sao Paolo", "Salvador", "Brazilija"],
    "Brazilija"
  ),
  new Question(
    "Koji je glavni grad Angole?",
    ["Huambo", "Luanda", "Lobito", "N'dalatando"],
    "Luanda"
  ),
  new Question(
    "Koji je glavni grad Somalije?",
    ["Borama", "Kismajo", "Mogadišu", "Hargejsa"],
    "Mogadišu"
  ),
  new Question(
    "Koji je glavni grad Norveške?",
    ["Štokholm", "Kopenhagen", "Helsinki", "Oslo"],
    "Oslo"
  ),
  new Question(
    "Koji je glavni grad Nepala?",
    ["Katmandu", "Pokhara", "Baratpur", "Lalitpur"],
    "Katmandu"
  ),
  new Question(
    "Koji je glavni grad Mongolije?",
    ["Erdenet", "Darkhan", "Ulanbator", "Choibalsan"],
    "Ulanbator"
  ),
  new Question(
    "Koji je glavni grad Litvanije?",
    ["Vilnius", "Riga", "Talin", "Tbilisi"],
    "Vilnius"
  ),
];

let quiz = new Quiz(questions);

populate();
