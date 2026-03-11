Reveal.initialize({
	hash: true,
	controls: false,
	keyboardCondition: 'focused',
	keyboard: {
		32: null,
		37: null,
		38: null,
		39: null,
		40: null,
		65: null,
		66: null,
		67: null,
		68: null,
		69: null,
		70: null,
		71: null,
		72: null,
		73: null,
		74: null,
		75: null,
		76: null,
		77: null,
		78: null,
		79: null,
		80: null,
		81: null,
		82: null,
		84: null,
		85: null,
		86: null,
		87: null,
		88: null,
		89: null,
		90: null,
	},

	plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
});

window.addEventListener('message', event => {
	if (event.data.namespace !== 'botc-control') {
		return;
	}

	switch (event.data.type) {
		case 'nextPhase':
			nextPhase();
			break;
		case 'previousPhase':
			previousPhase();
			break;
		case 'startGame':
			StartGame(event.data.data);
			break;
		case 'showNomination':
			showNomination(event.data.data);
			break;
		case 'startCountdown':
			countdown(6);
			break;
		case 'voteResult':
			voteResult(event.data.data);
			break;
		case 'killPlayer':
			killPlayer(event.data.data);
			break;
		case 'revivePlayer':
			revivePlayer(event.data.data);
			break;
	}
});

class Player {
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.alive = true;
		this.ghostVote = true;
	}
}

const roleDistributionTable = {
	5: {
		'Townsfolk': 3,
		'Outsiders': 0,
		'Minions': 1,
	},
	6: {
		'Townsfolk': 3,
		'Outsiders': 1,
		'Minions': 1,
	},
	7: {
		'Townsfolk': 5,
		'Outsiders': 0,
		'Minions': 1,
	},
	8: {
		'Townsfolk': 5,
		'Outsiders': 1,
		'Minions': 1,
	},
	9: {
		'Townsfolk': 5,
		'Outsiders': 2,
		'Minions': 1,
	},
	10: {
		'Townsfolk': 7,
		'Outsiders': 0,
		'Minions': 2,
	},
	11: {
		'Townsfolk': 7,
		'Outsiders': 1,
		'Minions': 2,
	},
	12: {
		'Townsfolk': 7,
		'Outsiders': 2,
		'Minions': 2,
	},
	13: {
		'Townsfolk': 9,
		'Outsiders': 0,
		'Minions': 3,
	},
	14: {
		'Townsfolk': 9,
		'Outsiders': 1,
		'Minions': 3,
	},
	15: {
		'Townsfolk': 9,
		'Outsiders': 2,
		'Minions': 3,
	},
};
let townsfolkCount = 0;
let outsiderCount = 0;
let minionCount = 0;
let players = [];

let currentPhase = -1;
let round = 0;

let aboutToDie = 'Nobody';
let currentHighestVote = -1;
let neededToDie = 0;

function StartGame(names) {
	let namesList = names.split(',');

	let id = 0;
	namesList.forEach(name => {
		players[id] = new Player(id, name);
		let playerCircle = document.getElementById("townsquare");
		let entry = document.createElement('div');
		entry.setAttribute("id", 'name' + id);
		entry.setAttribute("class", 'lifetoken');
		entry.setAttribute("style", 'position: absolute;\n'
			+ '  width: 60px;\n'
			+ '  height: 60px;\n'
			+ '  background: #4a90e2;\n'
			+ '  color: white;\n'
			+ '  border-radius: 8px;\n'
			+ '  display: flex;\n'
			+ '  align-items: center;\n'
			+ '  justify-content: center;\n'
			+ '  font-family: Arial, sans-serif;\n'
			+ '  font-size: 18px;\n')
		entry.appendChild(document.createTextNode(name));
		playerCircle.appendChild(entry);
		id++;
	});

	arrangeTownSquare(200,400);

	let roleDistribution = roleDistributionTable[players.length];
	townsfolkCount = roleDistribution.Townsfolk;
	outsiderCount = roleDistribution.Outsiders;
	minionCount = roleDistribution.Minions;
	//document.getElementById('Townsfolk').innerText = 'Townsfolk: '
	//	+ townsfolkCount;
	//document.getElementById('Outsiders').innerText = 'Outsiders: '
	//	+ outsiderCount;
	//document.getElementById('Minions').innerText = 'Minions: ' + minionCount;
}

function arrangeTownSquare(centerX, centerY, radius = 400){
	const container = document.getElementById("townsquare");
	const elements = container.querySelectorAll('.lifetoken');
	const total = elements.length;
	const startAngleRad = -Math.PI;
	const angleIncrement = (Math.PI / (total-1));

	console.log("Arranging " + total + " elements.");
	elements.forEach((element, i) => {
		const angle = startAngleRad + i * angleIncrement;
		const x = centerX + radius * Math.cos(angle);
		const y = centerY + radius * Math.sin(angle);

		const elementWidth = element.offsetWidth;
		const elementHeight = element.offsetHeight;

		element.style.left = `${x - elementWidth / 2}px`;
		element.style.top = `${y - elementHeight / 2}px`;
		element.style.position = `absolute`;

		const rotation = angle * 180/Math.PI + 90;
		element.style.transform = `rotate(${rotation}deg)`;
	})
}

function killPlayer(name) {
	let playerID = players.findIndex(p => p.name === name);
	if (playerID > -1) {
		players.at(playerID).alive = false;
	}
	console.log('That ' + playerID + ' ' + name + ' is alive, is ' + players.at(
		playerID).alive);
}

function revivePlayer(name) {
	let playerID = players.findIndex(p => p.name === name);
	if (playerID > -1) {
		players.at(playerID).alive = true;
		players.at(playerID).ghostVote = true;
	}
	console.log('That ' + playerID + ' ' + name + ' is alive, is ' + players.at(
		playerID).alive);
}

function nextPhase() {
	currentPhase = (currentPhase + 1) % 5;
	toCurrentPhaseSlide();
	if (currentPhase === 0) {
		IncrementRoundNumber(1);
	}
}

function previousPhase() {
	if (currentPhase === 0) {
		currentPhase = 4;
		IncrementRoundNumber(-1);
	} else {
		currentPhase--;
	}

	toCurrentPhaseSlide();
}

function jumpToPhase(phaseNumber) {
	currentPhase = phaseNumber;
	toCurrentPhaseSlide();
}

function toCurrentPhaseSlide() {
	Reveal.slide(currentPhase + 1, 0, 0);
}

function IncrementRoundNumber(addend) {
	round = (round + addend) % 5;
	UpdateRoundNumberTexts();
	ResetForNewRound();
}

function setRound(roundNumber) {
	round = roundNumber;
	UpdateRoundNumberTexts();
}

function UpdateRoundNumberTexts() {
	document.getElementById('night number').innerText = round;
	document.getElementById('dawn number').innerText = round;
	document.getElementById('day number').innerText = round;
	document.getElementById('evening number').innerText = round;
	document.getElementById('dusk number').innerText = round;
	Reveal.sync();
}

function ResetForNewRound() {
	aboutToDie = 'Nobody';
	currentHighestVote = -1;
	neededToDie = 0;

	UpdateAboutToDieText();
}

function showNomination(names) {
	if (currentPhase !== 3) {
		return;
	}

	let namesList = names.split(',');
	document.getElementById('nominator').innerText = namesList[0];
	document.getElementById('nominee').innerText = namesList[1];

	let nAlivePlayers = players.filter(p => p.alive).length;
	neededToDie = (nAlivePlayers + (nAlivePlayers % 2)) / 2;

	if (currentHighestVote !== -1) {
		neededToDie = Number(currentHighestVote) + 1;
		document.getElementById('needed to tie').innerText = currentHighestVote
			+ ' votes needed to tie, ';
	} else {
		document.getElementById('needed to tie').innerText = '';
	}

	document.getElementById('needed to die').innerText = neededToDie
		+ ' votes needed to die.';
	document.getElementById('countdown').innerText = '';
	Reveal.down();
}

function countdown(duration) {
	const startTime = Date.now();
	const targetTime = startTime + (duration * 1000);
	let interval = setInterval(function() {
		let elapsedTime = targetTime - Date.now();
		if (elapsedTime > 0) {
			document.getElementById('countdown').innerText = 'Vote in ' + (elapsedTime
				/ 1000).toFixed(
				0);
		} else {
			clearInterval(interval);
			document.getElementById('countdown').innerText = 'Vote!';
		}
	}, 1000);
}

function voteResult(nVotes) {
	if (nVotes === currentHighestVote) {
		aboutToDie = 'Nobody';
		currentHighestVote = nVotes;
	} else if (nVotes >= neededToDie) {
		aboutToDie = document.getElementById('nominee').innerText;
		currentHighestVote = nVotes;
	}

	UpdateAboutToDieText();
	Reveal.up();
}

function UpdateAboutToDieText() {
	document.getElementById('abouttodie').innerText = aboutToDie;
	document.getElementById('executee').innerText = aboutToDie;
}
