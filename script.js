		// fonction : Initialisation de la partie
	init();

	// Initialisation de toutes les variables et MAJ des classes
	function init() {

		activePlayer = 0;
		globalScore = [0, 0]; //Variable qui utilise un tableau pour chaque joueur
		currentScore = 0;
		gamePlaying = true;
		hasPlayed = false
		
		document.querySelector(".btn-roll").classList.remove("disable")
		document.querySelector(".btn-hold").classList.remove("disable")
		document.getElementById("score-0").textContent = "0";
		document.getElementById("score-1").textContent = "0";
		document.getElementById("current-0").textContent = "0";
		document.getElementById("current-1").textContent = "0";
		document.querySelector("#name-0").textContent = "Player 1";
		document.querySelector("#name-1").textContent = "Player 2";
		document.querySelector("#name-0").classList.remove("winner");
		document.querySelector("#name-1	").classList.remove("winner");
		document.querySelector(".player-0").classList.remove("winner");
		document.querySelector(".player-1").classList.remove("winner");
		document.querySelector(".player-0").classList.remove("active");
		document.querySelector(".player-1").classList.remove("active");
		document.querySelector(".player-0").classList.add("active");
		document.querySelector(".playerPointer-0").style.visibility = "visible";
		document.querySelector(".playerPointer-1").style.visibility = "hidden";
	
	rollTheDice(); //appel de la fonction du lancement de dé
	}

	//Fonction : lancer le dé
	function rollTheDice () {
		let diceDisplay = document.querySelector(".imgDice");
		diceDisplay.style.display = "block";
		diceDisplay.src =  "images/rollTheDice.png";
	}

	// Fonction : changer de joueur
	function nextPlayer() {
		currentScore = 0; //Initialisation de la variable de calcul
		if (activePlayer === 0) {
			activePlayer = 1;
				document.querySelector(".playerPointer-0").style.visibility = "hidden";
				document.querySelector(".playerPointer-1").style.visibility = "visible";
			} else if (activePlayer === 1)  {
			activePlayer = 0;
			document.querySelector(".playerPointer-1").style.visibility = "hidden";
			document.querySelector(".playerPointer-0").style.visibility = "visible";
		}
	// RAZ des scores courant et mise en place du joueur actif
		document.getElementById("current-0").textContent = "0";
		document.getElementById("current-1").textContent = "0";
		document.querySelector(".player-0").classList.toggle("active");
		document.querySelector(".player-1").classList.toggle("active");
		document.querySelector(".dice").style.visibility = "hidden";
	}

	// Fonction : lancer de dé
	document.querySelector(".btn-roll").addEventListener("click", function () {
		if (gamePlaying) { //true
			// Nombre aléatoire de 1 à 6
			let dice = Math.floor(Math.random() * 6) + 1;

			// Résultat du lancer de dé
			let diceDisplay = document.querySelector(".imgDice");
			diceDisplay.style.display = "block";
			diceDisplay.src ="images/dice-" + dice + ".png";

			// Ajouter du dé sur la variable "currentScore" du joueur actif
			if (dice !== 1) {
				currentScore += dice;
				document.querySelector("#current-" + activePlayer).textContent = currentScore;
			} else {
				// Le player a fait un "1" --> Changement de player
				nextPlayer();
				diceDisplay.src =  "images/dice-" + 1 + ".png";//on affiche le dé 1
			}
		}
	});

	// Gestion du dumping avec le bouton "hold"
	document.querySelector(".btn-hold").addEventListener("click", function () {
		
		if (gamePlaying && !hasPlayed && currentScore !==0) {
			// On ajoute au score global géré par la variable "globalScore"
			globalScore[activePlayer] += currentScore;

			// Mettre à jour l'affichage pour afficher le nouveau score GLOBAL du joueur actif
			document.querySelector("#score-" + activePlayer).textContent =
				globalScore[activePlayer];

			// Si les 100 points sont atteints
			if (globalScore[activePlayer] >= 15) {

				//Désigner le vainqueur avec un switch
				switch(activePlayer){
					case 0 :
						document.querySelector("#name-0").textContent = "winner !"
						document.querySelector("#name-0").classList.add("winner");
						document.querySelector("#btn-hold").classList.add("disable");
						document.querySelector("#btn-rollDice").classList.add("disable");
						break;
					case 1 :
						document.querySelector("#name-1").textContent = "winner !"
						document.querySelector("#name-1").classList.add("winner");
						document.querySelector("#btn-hold").classList.add("disable");
						document.querySelector("#btn-rollDice").classList.add("disable");
						break;
					;
				}	

				//Concaténation pour afficher le gagnant sur la class player de l'HTML
				//et mise en forme avec la class ".winner" dans le CSS
				document 
					.querySelector(".player-" + activePlayer)
					.classList.add(".winner");
				document
					.querySelector(".player-" + activePlayer)
					.classList.remove(".active");	
				
					gamePlaying = false;
				
			} else {
				// les 100 points ne sont pas atteint : on change de joueur
				nextPlayer(); 
				rollTheDice();
			}
			hasPlayed = true; // Le joueur vient de jouer
		
		}
	});

	// Fonction : Réinit quand la patie est terminée
	document.querySelector(".btn-new").addEventListener("click", init);
