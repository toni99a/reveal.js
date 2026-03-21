const bt = `<!--\r
	NOTE: You need to build the notes plugin after making changes to this file.\r
-->\r
<html lang="en">\r
<head>\r
	<meta charset="utf-8">\r
\r
	<title>reveal.js - Spitter View</title>\r
\r
	<style>\r
    body {\r
      font-family: Helvetica;\r
      font-size: 18px;\r
    }\r
\r
    #current-slide,\r
    #upcoming-slide,\r
    #speaker-controls {\r
      padding: 6px;\r
      box-sizing: border-box;\r
      -moz-box-sizing: border-box;\r
    }\r
\r
    #current-slide iframe,\r
    #upcoming-slide iframe {\r
      width: 100%;\r
      height: 100%;\r
      border: 1px solid #ddd;\r
    }\r
\r
    #current-slide .label,\r
    #upcoming-slide .label {\r
      position: absolute;\r
      top: 10px;\r
      left: 10px;\r
      z-index: 2;\r
    }\r
\r
    #connection-status {\r
      position: absolute;\r
      top: 0;\r
      left: 0;\r
      width: 100%;\r
      height: 100%;\r
      z-index: 20;\r
      padding: 30% 20% 20% 20%;\r
      font-size: 18px;\r
      color: #222;\r
      background: #fff;\r
      text-align: center;\r
      box-sizing: border-box;\r
      line-height: 1.4;\r
    }\r
\r
    .overlay-element {\r
      height: 34px;\r
      line-height: 34px;\r
      padding: 0 10px;\r
      text-shadow: none;\r
      background: rgba(220, 220, 220, 0.8);\r
      color: #222;\r
      font-size: 14px;\r
    }\r
\r
    .overlay-element.interactive:hover {\r
      background: rgba(220, 220, 220, 1);\r
    }\r
\r
    #current-slide {\r
      position: absolute;\r
      width: 60%;\r
      height: 100%;\r
      top: 0;\r
      left: 0;\r
      padding-right: 0;\r
    }\r
\r
    #upcoming-slide {\r
      position: absolute;\r
      width: 40%;\r
      height: 40%;\r
      right: 0;\r
      top: 0;\r
    }\r
\r
    /* Speaker controls */\r
    #speaker-controls {\r
      position: absolute;\r
      top: 40%;\r
      right: 0;\r
      width: 40%;\r
      height: 60%;\r
      overflow: auto;\r
      font-size: 18px;\r
    }\r
\r
    .speaker-controls-time.hidden,\r
    .speaker-controls-notes.hidden {\r
      display: none;\r
    }\r
\r
    .speaker-controls-time .label,\r
    .speaker-controls-pace .label,\r
    .speaker-controls-notes .label {\r
      text-transform: uppercase;\r
      font-weight: normal;\r
      font-size: 0.66em;\r
      color: #666;\r
      margin: 0;\r
    }\r
\r
    .speaker-controls-time, .speaker-controls-pace {\r
      border-bottom: 1px solid rgba(200, 200, 200, 0.5);\r
      margin-bottom: 10px;\r
      padding: 10px 16px;\r
      padding-bottom: 20px;\r
      cursor: pointer;\r
    }\r
\r
    .speaker-controls-time .reset-button {\r
      opacity: 0;\r
      float: right;\r
      color: #666;\r
      text-decoration: none;\r
    }\r
\r
    .speaker-controls-time:hover .reset-button {\r
      opacity: 1;\r
    }\r
\r
    .speaker-controls-time .timer,\r
    .speaker-controls-time .clock {\r
      width: 50%;\r
    }\r
\r
    .speaker-controls-time .timer,\r
    .speaker-controls-time .clock,\r
    .speaker-controls-time .pacing .hours-value,\r
    .speaker-controls-time .pacing .minutes-value,\r
    .speaker-controls-time .pacing .seconds-value {\r
      font-size: 1.9em;\r
    }\r
\r
    .speaker-controls-time .timer {\r
      float: left;\r
    }\r
\r
    .speaker-controls-time .clock {\r
      float: right;\r
      text-align: right;\r
    }\r
\r
    .speaker-controls-time span.mute {\r
      opacity: 0.3;\r
    }\r
\r
    .speaker-controls-time .pacing-title {\r
      margin-top: 5px;\r
    }\r
\r
    .speaker-controls-time .pacing.ahead {\r
      color: blue;\r
    }\r
\r
    .speaker-controls-time .pacing.on-track {\r
      color: green;\r
    }\r
\r
    .speaker-controls-time .pacing.behind {\r
      color: red;\r
    }\r
\r
    .speaker-controls-notes {\r
      padding: 10px 16px;\r
    }\r
\r
    .speaker-controls-notes .value {\r
      margin-top: 5px;\r
      line-height: 1.4;\r
      font-size: 1.2em;\r
    }\r
\r
    /* Layout selector */\r
    #speaker-layout {\r
      position: absolute;\r
      top: 10px;\r
      right: 10px;\r
      color: #222;\r
      z-index: 10;\r
    }\r
\r
    #speaker-layout select {\r
      position: absolute;\r
      width: 100%;\r
      height: 100%;\r
      top: 0;\r
      left: 0;\r
      border: 0;\r
      box-shadow: 0;\r
      cursor: pointer;\r
      opacity: 0;\r
\r
      font-size: 1em;\r
      background-color: transparent;\r
\r
      -moz-appearance: none;\r
      -webkit-appearance: none;\r
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r
    }\r
\r
    #speaker-layout select:focus {\r
      outline: none;\r
      box-shadow: none;\r
    }\r
\r
    .clear {\r
      clear: both;\r
    }\r
\r
    /* Speaker layout: Wide */\r
    body[data-speaker-layout="wide"] #current-slide,\r
    body[data-speaker-layout="wide"] #upcoming-slide {\r
      width: 50%;\r
      height: 45%;\r
      padding: 6px;\r
    }\r
\r
    body[data-speaker-layout="wide"] #current-slide {\r
      top: 0;\r
      left: 0;\r
    }\r
\r
    body[data-speaker-layout="wide"] #upcoming-slide {\r
      top: 0;\r
      left: 50%;\r
    }\r
\r
    body[data-speaker-layout="wide"] #speaker-controls {\r
      top: 45%;\r
      left: 0;\r
      width: 100%;\r
      height: 50%;\r
      font-size: 1.25em;\r
    }\r
\r
    /* Speaker layout: Tall */\r
    body[data-speaker-layout="tall"] #current-slide,\r
    body[data-speaker-layout="tall"] #upcoming-slide {\r
      width: 45%;\r
      height: 50%;\r
      padding: 6px;\r
    }\r
\r
    body[data-speaker-layout="tall"] #current-slide {\r
      top: 0;\r
      left: 0;\r
    }\r
\r
    body[data-speaker-layout="tall"] #upcoming-slide {\r
      top: 50%;\r
      left: 0;\r
    }\r
\r
    body[data-speaker-layout="tall"] #speaker-controls {\r
      padding-top: 40px;\r
      top: 0;\r
      left: 45%;\r
      width: 55%;\r
      height: 100%;\r
      font-size: 1.25em;\r
    }\r
\r
    /* Speaker layout: Notes only */\r
    body[data-speaker-layout="notes-only"] #current-slide,\r
    body[data-speaker-layout="notes-only"] #upcoming-slide {\r
      display: none;\r
    }\r
\r
    body[data-speaker-layout="notes-only"] #speaker-controls {\r
      padding-top: 40px;\r
      top: 0;\r
      left: 0;\r
      width: 100%;\r
      height: 100%;\r
      font-size: 1.25em;\r
    }\r
\r
    @media screen and (max-width: 1080px) {\r
      body[data-speaker-layout="default"] #speaker-controls {\r
        font-size: 16px;\r
      }\r
    }\r
\r
    @media screen and (max-width: 900px) {\r
      body[data-speaker-layout="default"] #speaker-controls {\r
        font-size: 14px;\r
      }\r
    }\r
\r
    @media screen and (max-width: 800px) {\r
      body[data-speaker-layout="default"] #speaker-controls {\r
        font-size: 12px;\r
      }\r
    }\r
\r
	</style>\r
</head>\r
\r
<body>\r
\r
<div id="connection-status">Loading speaker view...</div>\r
\r
<div id="current-slide"></div>\r
<div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div>\r
<div id="speaker-controls">\r
	<div class="speaker-controls-time">\r
		<h4 class="label">Time</h4>\r
		<div class="clock">\r
			<span class="clock-value">0:00 AM</span>\r
		</div>\r
		<div class="timer">\r
			<span class="hours-value">00</span><span class="minutes-value">:00</span><span\r
			class="seconds-value">:00</span>\r
		</div>\r
		<div class="clear"></div>\r
\r
		<h4 class="label pacing-title" style="display: none">Pacing – Time to finish current slide</h4>\r
		<div class="pacing" style="display: none">\r
			<span class="hours-value">00</span><span class="minutes-value">:00</span><span\r
			class="seconds-value">:00</span>\r
		</div>\r
	</div>\r
\r
	<div id="botc-controls">\r
		<div id="init">\r
			<h3>Initialize Game</h3>\r
			<button onclick="startGame()">Start Game</button>\r
			<input id="Participants" placeholder="Name,Name,Name">\r
		</div>\r
		<h3>Phase Controls</h3>\r
		<button onclick="previousPhase()">Previous Phase</button>\r
		<button onclick="nextPhase()">Next Phase</button>\r
		<input id="day minutes" placeholder="Length of Day in Minutes">\r
		<button onclick="startDay()">Start Day</button>\r
		<h3>Nominations</h3>\r
		<select id="nominator">\r
			<option>Need to Initialize Players!</option>\r
		</select>\r
		<span>=> Nominates =></span>\r
		<select id="nominee">\r
			<option>Need to Initialize Players!</option>\r
		</select>\r
		<button onclick="showNomination()">Show Nomination</button>\r
		<br>\r
		<button onclick="startVote()">Start Vote</button>\r
		<input id="vote result" placeholder="Number of Votes">\r
		<button onclick="voteResult()">Send Result</button>\r
		<h3>God Controls</h3>\r
		<select id="life token">\r
			<option>Need to Initialize Players!</option>\r
		</select>\r
		<button onclick="killPlayer()">Kill Player</button>\r
		<button onclick="revivePlayer()">Revive Player</button>\r
	</div>\r
</div>\r
<div id="speaker-layout" class="overlay-element interactive">\r
	<span class="speaker-layout-label"></span>\r
	<select class="speaker-layout-dropdown"></select>\r
</div>\r
\r
<script>\r
\r
	(function() {\r
\r
		var notes,\r
			notesValue,\r
			currentState,\r
			currentSlide,\r
			upcomingSlide,\r
			layoutLabel,\r
			layoutDropdown,\r
			pendingCalls = {},\r
			lastRevealApiCallId = 0,\r
			connected = false;\r
\r
		var connectionStatus = document.querySelector('#connection-status');\r
\r
		var SPEAKER_LAYOUTS = {\r
			'default': 'Default',\r
			'wide': 'Wide',\r
			'tall': 'Tall',\r
			'notes-only': 'Notes only',\r
		};\r
\r
		setupLayout();\r
\r
		let openerOrigin;\r
\r
		try {\r
			openerOrigin = window.opener.location.origin;\r
		} catch (error) {\r
			console.warn(error);\r
		}\r
\r
		// In order to prevent XSS, the speaker view will only run if its\r
		// opener has the same origin as itself\r
		if (window.location.origin !== openerOrigin) {\r
			connectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';\r
			return;\r
		}\r
\r
		var connectionTimeout = setTimeout(function() {\r
			connectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';\r
		}, 5000);\r
\r
		window.addEventListener('message', function(event) {\r
\r
			// Validate the origin of all messages to avoid parsing messages\r
			// that aren't meant for us. Ignore when running off file:// so\r
			// that the speaker view continues to work without a web server.\r
			if (window.location.origin !== event.origin && window.location.origin !== 'file://') {\r
				return;\r
			}\r
\r
			clearTimeout(connectionTimeout);\r
			connectionStatus.style.display = 'none';\r
\r
			var data = JSON.parse(event.data);\r
\r
			// The overview mode is only useful to the reveal.js instance\r
			// where navigation occurs so we don't sync it\r
			if (data.state) {\r
				delete data.state.overview;\r
			}\r
\r
			// Messages sent by the notes plugin inside of the main window\r
			if (data && data.namespace === 'reveal-notes') {\r
				if (data.type === 'connect') {\r
					handleConnectMessage(data);\r
				} else if (data.type === 'state') {\r
					handleStateMessage(data);\r
				} else if (data.type === 'return') {\r
					pendingCalls[data.callId](data.result);\r
					delete pendingCalls[data.callId];\r
				}\r
			}\r
			// Messages sent by the reveal.js inside of the current slide preview\r
			else if (data && data.namespace === 'reveal') {\r
				const supportedEvents = [\r
					'slidechanged',\r
					'fragmentshown',\r
					'fragmenthidden',\r
					'paused',\r
					'resumed',\r
					'previewiframe',\r
					'previewimage',\r
					'previewvideo',\r
					'closeoverlay',\r
				];\r
\r
				if (/ready/.test(data.eventName)) {\r
					// Send a message back to notify that the handshake is complete\r
					window.opener.postMessage(\r
						JSON.stringify({ namespace: 'reveal-notes', type: 'connected' }), '*');\r
				} else if (supportedEvents.includes(data.eventName) && currentState !== JSON.stringify(\r
					data.state)) {\r
					dispatchStateToMainWindow(data.state);\r
				}\r
			}\r
\r
		});\r
\r
		/**\r
		 * Updates the presentation in the main window to match the state\r
		 * of the presentation in the notes window.\r
		 */\r
		const dispatchStateToMainWindow = debounce((state) => {\r
			window.opener.postMessage(JSON.stringify({ method: 'setState', args: [state] }), '*');\r
		}, 500);\r
\r
		/**\r
		 * Asynchronously calls the Reveal.js API of the main frame.\r
		 */\r
		function callRevealApi(methodName, methodArguments, callback) {\r
\r
			var callId = ++lastRevealApiCallId;\r
			pendingCalls[callId] = callback;\r
			window.opener.postMessage(JSON.stringify({\r
				namespace: 'reveal-notes',\r
				type: 'call',\r
				callId: callId,\r
				methodName: methodName,\r
				arguments: methodArguments,\r
			}), '*');\r
\r
		}\r
\r
		/**\r
		 * Called when the main window is trying to establish a\r
		 * connection.\r
		 */\r
		function handleConnectMessage(data) {\r
\r
			if (connected === false) {\r
				connected = true;\r
\r
				setupIframes(data);\r
				setupKeyboard();\r
				setupNotes();\r
				setupTimer();\r
				setupHeartbeat();\r
			}\r
\r
		}\r
\r
		/**\r
		 * Called when the main window sends an updated state.\r
		 */\r
		function handleStateMessage(data) {\r
\r
			// Store the most recently set state to avoid circular loops\r
			// applying the same state\r
			currentState = JSON.stringify(data.state);\r
\r
			// No need for updating the notes in case of fragment changes\r
			if (data.notes) {\r
				notes.classList.remove('hidden');\r
				notesValue.style.whiteSpace = data.whitespace;\r
				if (data.markdown) {\r
					notesValue.innerHTML = marked.parse(data.notes);\r
				} else {\r
					notesValue.innerHTML = data.notes;\r
				}\r
			} else {\r
				notes.classList.add('hidden');\r
			}\r
\r
			// Don't show lightboxes in the upcoming slide\r
			const { previewVideo, previewImage, previewIframe, ...upcomingState } = data.state;\r
\r
			// Update the note slides\r
			currentSlide.contentWindow.postMessage(\r
				JSON.stringify({ method: 'setState', args: [data.state] }), '*');\r
			upcomingSlide.contentWindow.postMessage(\r
				JSON.stringify({ method: 'setState', args: [upcomingState] }), '*');\r
			upcomingSlide.contentWindow.postMessage(JSON.stringify({ method: 'next' }), '*');\r
\r
		}\r
\r
		// Limit to max one state update per X ms\r
		handleStateMessage = debounce(handleStateMessage, 200);\r
\r
		/**\r
		 * Forward keyboard events to the current slide window.\r
		 * This enables keyboard events to work even if focus\r
		 * isn't set on the current slide iframe.\r
		 *\r
		 * Block F5 default handling, it reloads and disconnects\r
		 * the speaker notes window.\r
		 */\r
		function setupKeyboard() {\r
\r
			document.addEventListener('keydown', function(event) {\r
				if (event.keyCode === 116 || (event.metaKey && event.keyCode === 82)) {\r
					event.preventDefault();\r
					return false;\r
				}\r
				currentSlide.contentWindow.postMessage(\r
					JSON.stringify({ method: 'triggerKey', args: [event.keyCode] }), '*');\r
			});\r
\r
		}\r
\r
		/**\r
		 * Creates the preview iframes.\r
		 */\r
		function setupIframes(data) {\r
\r
			var params = [\r
				'receiver',\r
				'progress=false',\r
				'history=false',\r
				'transition=none',\r
				'autoSlide=0',\r
				'backgroundTransition=none',\r
			].join('&');\r
\r
			var urlSeparator = /\\?/.test(data.url) ? '&' : '?';\r
			var hash = '#/' + data.state.indexh + '/' + data.state.indexv;\r
			var currentURL = data.url + urlSeparator + params\r
				+ '&scrollActivationWidth=false&postMessageEvents=true' + hash;\r
			var upcomingURL = data.url + urlSeparator + params\r
				+ '&scrollActivationWidth=false&controls=false' + hash;\r
\r
			currentSlide = document.createElement('iframe');\r
			currentSlide.setAttribute('width', 1280);\r
			currentSlide.setAttribute('height', 1024);\r
			currentSlide.setAttribute('src', currentURL);\r
			document.querySelector('#current-slide').appendChild(currentSlide);\r
\r
			upcomingSlide = document.createElement('iframe');\r
			upcomingSlide.setAttribute('width', 640);\r
			upcomingSlide.setAttribute('height', 512);\r
			upcomingSlide.setAttribute('src', upcomingURL);\r
			document.querySelector('#upcoming-slide').appendChild(upcomingSlide);\r
\r
		}\r
\r
		/**\r
		 * Setup the notes UI.\r
		 */\r
		function setupNotes() {\r
\r
			notes = document.querySelector('.speaker-controls-notes');\r
			notesValue = document.querySelector('.speaker-controls-notes .value');\r
\r
		}\r
\r
		/**\r
		 * We send out a heartbeat at all times to ensure we can\r
		 * reconnect with the main presentation window after reloads.\r
		 */\r
		function setupHeartbeat() {\r
\r
			setInterval(() => {\r
				window.opener.postMessage(JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat' }),\r
					'*');\r
			}, 1000);\r
\r
		}\r
\r
		function getTimings(callback) {\r
\r
			callRevealApi('getSlidesAttributes', [], function(slideAttributes) {\r
				callRevealApi('getConfig', [], function(config) {\r
					var totalTime = config.totalTime;\r
					var minTimePerSlide = config.minimumTimePerSlide || 0;\r
					var defaultTiming = config.defaultTiming;\r
					if ((defaultTiming == null) && (totalTime == null)) {\r
						callback(null);\r
						return;\r
					}\r
					// Setting totalTime overrides defaultTiming\r
					if (totalTime) {\r
						defaultTiming = 0;\r
					}\r
					var timings = [];\r
					for (var i in slideAttributes) {\r
						var slide = slideAttributes[i];\r
						var timing = defaultTiming;\r
						if (slide.hasOwnProperty('data-timing')) {\r
							var t = slide['data-timing'];\r
							timing = parseInt(t);\r
							if (isNaN(timing)) {\r
								console.warn(\r
									'Could not parse timing \\'' + t + '\\' of slide ' + i + '; using default of '\r
									+ defaultTiming);\r
								timing = defaultTiming;\r
							}\r
						}\r
						timings.push(timing);\r
					}\r
					if (totalTime) {\r
						// After we've allocated time to individual slides, we summarize it and\r
						// subtract it from the total time\r
						var remainingTime = totalTime - timings.reduce(function(a, b) {\r
							return a + b;\r
						}, 0);\r
						// The remaining time is divided by the number of slides that have 0 seconds\r
						// allocated at the moment, giving the average time-per-slide on the remaining slides\r
						var remainingSlides = (timings.filter(function(x) {\r
							return x == 0;\r
						})).length;\r
						var timePerSlide = Math.round(remainingTime / remainingSlides, 0);\r
						// And now we replace every zero-value timing with that average\r
						timings = timings.map(function(x) {\r
							return (x == 0 ? timePerSlide : x);\r
						});\r
					}\r
					var slidesUnderMinimum = timings.filter(function(x) {\r
						return (x < minTimePerSlide);\r
					}).length;\r
					if (slidesUnderMinimum) {\r
						message = 'The pacing time for ' + slidesUnderMinimum\r
							+ ' slide(s) is under the configured minimum of ' + minTimePerSlide\r
							+ ' seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).';\r
						alert(message);\r
					}\r
					callback(timings);\r
				});\r
			});\r
\r
		}\r
\r
		/**\r
		 * Return the number of seconds allocated for presenting\r
		 * all slides up to and including this one.\r
		 */\r
		function getTimeAllocated(timings, callback) {\r
\r
			callRevealApi('getSlidePastCount', [], function(currentSlide) {\r
				var allocated = 0;\r
				for (var i in timings.slice(0, currentSlide + 1)) {\r
					allocated += timings[i];\r
				}\r
				callback(allocated);\r
			});\r
\r
		}\r
\r
		/**\r
		 * Create the timer and clock and start updating them\r
		 * at an interval.\r
		 */\r
		function setupTimer() {\r
\r
			var start = new Date(),\r
				timeEl = document.querySelector('.speaker-controls-time'),\r
				clockEl = timeEl.querySelector('.clock-value'),\r
				hoursEl = timeEl.querySelector('.hours-value'),\r
				minutesEl = timeEl.querySelector('.minutes-value'),\r
				secondsEl = timeEl.querySelector('.seconds-value'),\r
				pacingTitleEl = timeEl.querySelector('.pacing-title'),\r
				pacingEl = timeEl.querySelector('.pacing'),\r
				pacingHoursEl = pacingEl.querySelector('.hours-value'),\r
				pacingMinutesEl = pacingEl.querySelector('.minutes-value'),\r
				pacingSecondsEl = pacingEl.querySelector('.seconds-value');\r
\r
			var timings = null;\r
			getTimings(function(_timings) {\r
\r
				timings = _timings;\r
				if (_timings !== null) {\r
					pacingTitleEl.style.removeProperty('display');\r
					pacingEl.style.removeProperty('display');\r
				}\r
\r
				// Update once directly\r
				_updateTimer();\r
\r
				// Then update every second\r
				setInterval(_updateTimer, 1000);\r
\r
			});\r
\r
			function _resetTimer() {\r
\r
				if (timings == null) {\r
					start = new Date();\r
					_updateTimer();\r
				} else {\r
					// Reset timer to beginning of current slide\r
					getTimeAllocated(timings, function(slideEndTimingSeconds) {\r
						var slideEndTiming = slideEndTimingSeconds * 1000;\r
						callRevealApi('getSlidePastCount', [], function(currentSlide) {\r
							var currentSlideTiming = timings[currentSlide] * 1000;\r
							var previousSlidesTiming = slideEndTiming - currentSlideTiming;\r
							var now = new Date();\r
							start = new Date(now.getTime() - previousSlidesTiming);\r
							_updateTimer();\r
						});\r
					});\r
				}\r
\r
			}\r
\r
			function _displayTime(hrEl, minEl, secEl, time) {\r
\r
				var sign = Math.sign(time) == -1 ? '-' : '';\r
				time = Math.abs(Math.round(time / 1000));\r
				var seconds = time % 60;\r
				var minutes = Math.floor(time / 60) % 60;\r
				var hours = Math.floor(time / (60 * 60));\r
				hrEl.innerHTML = sign + zeroPadInteger(hours);\r
				if (hours == 0) {\r
					hrEl.classList.add('mute');\r
				} else {\r
					hrEl.classList.remove('mute');\r
				}\r
				minEl.innerHTML = ':' + zeroPadInteger(minutes);\r
				if (hours == 0 && minutes == 0) {\r
					minEl.classList.add('mute');\r
				} else {\r
					minEl.classList.remove('mute');\r
				}\r
				secEl.innerHTML = ':' + zeroPadInteger(seconds);\r
			}\r
\r
			function _updateTimer() {\r
\r
				var diff, hours, minutes, seconds,\r
					now = new Date();\r
\r
				diff = now.getTime() - start.getTime();\r
\r
				clockEl.innerHTML = now.toLocaleTimeString('en-US',\r
					{ hour12: true, hour: '2-digit', minute: '2-digit' });\r
				_displayTime(hoursEl, minutesEl, secondsEl, diff);\r
				if (timings !== null) {\r
					_updatePacing(diff);\r
				}\r
\r
			}\r
\r
			function _updatePacing(diff) {\r
\r
				getTimeAllocated(timings, function(slideEndTimingSeconds) {\r
					var slideEndTiming = slideEndTimingSeconds * 1000;\r
\r
					callRevealApi('getSlidePastCount', [], function(currentSlide) {\r
						var currentSlideTiming = timings[currentSlide] * 1000;\r
						var timeLeftCurrentSlide = slideEndTiming - diff;\r
						if (timeLeftCurrentSlide < 0) {\r
							pacingEl.className = 'pacing behind';\r
						} else if (timeLeftCurrentSlide < currentSlideTiming) {\r
							pacingEl.className = 'pacing on-track';\r
						} else {\r
							pacingEl.className = 'pacing ahead';\r
						}\r
						_displayTime(pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide);\r
					});\r
				});\r
			}\r
\r
		}\r
\r
		/**\r
		 * Sets up the speaker view layout and layout selector.\r
		 */\r
		function setupLayout() {\r
\r
			layoutDropdown = document.querySelector('.speaker-layout-dropdown');\r
			layoutLabel = document.querySelector('.speaker-layout-label');\r
\r
			// Render the list of available layouts\r
			for (var id in SPEAKER_LAYOUTS) {\r
				var option = document.createElement('option');\r
				option.setAttribute('value', id);\r
				option.textContent = SPEAKER_LAYOUTS[id];\r
				layoutDropdown.appendChild(option);\r
			}\r
\r
			// Monitor the dropdown for changes\r
			layoutDropdown.addEventListener('change', function(event) {\r
\r
				setLayout(layoutDropdown.value);\r
\r
			}, false);\r
\r
			// Restore any currently persisted layout\r
			setLayout(getLayout());\r
\r
		}\r
\r
		/**\r
		 * Sets a new speaker view layout. The layout is persisted\r
		 * in local storage.\r
		 */\r
		function setLayout(value) {\r
\r
			var title = SPEAKER_LAYOUTS[value];\r
\r
			layoutLabel.innerHTML = 'Layout' + (title ? (': ' + title) : '');\r
			layoutDropdown.value = value;\r
\r
			document.body.setAttribute('data-speaker-layout', value);\r
\r
			// Persist locally\r
			if (supportsLocalStorage()) {\r
				window.localStorage.setItem('reveal-speaker-layout', value);\r
			}\r
\r
		}\r
\r
		/**\r
		 * Returns the ID of the most recently set speaker layout\r
		 * or our default layout if none has been set.\r
		 */\r
		function getLayout() {\r
\r
			if (supportsLocalStorage()) {\r
				var layout = window.localStorage.getItem('reveal-speaker-layout');\r
				if (layout) {\r
					return layout;\r
				}\r
			}\r
\r
			// Default to the first record in the layouts hash\r
			for (var id in SPEAKER_LAYOUTS) {\r
				return id;\r
			}\r
\r
		}\r
\r
		function supportsLocalStorage() {\r
\r
			try {\r
				localStorage.setItem('test', 'test');\r
				localStorage.removeItem('test');\r
				return true;\r
			} catch (e) {\r
				return false;\r
			}\r
\r
		}\r
\r
		function zeroPadInteger(num) {\r
\r
			var str = '00' + parseInt(num);\r
			return str.substring(str.length - 2);\r
\r
		}\r
\r
		/**\r
		 * Limits the frequency at which a function can be called.\r
		 */\r
		function debounce(fn, ms) {\r
\r
			var lastTime = 0,\r
				timeout;\r
\r
			return function() {\r
\r
				var args = arguments;\r
				var context = this;\r
\r
				clearTimeout(timeout);\r
\r
				var timeSinceLastCall = Date.now() - lastTime;\r
				if (timeSinceLastCall > ms) {\r
					fn.apply(context, args);\r
					lastTime = Date.now();\r
				} else {\r
					timeout = setTimeout(function() {\r
						fn.apply(context, args);\r
						lastTime = Date.now();\r
					}, ms - timeSinceLastCall);\r
				}\r
\r
			};\r
\r
		}\r
\r
	})();\r
\r
	function sendCommand(type, data) {\r
		window.opener.postMessage({\r
			namespace: 'botc-control',\r
			type: type,\r
			data: data,\r
		}, '*');\r
	}\r
\r
	let players = [];\r
\r
	function nextPhase() {\r
		sendCommand('nextPhase');\r
	}\r
\r
	function previousPhase() {\r
		sendCommand('previousPhase');\r
	}\r
\r
	function killPlayer() {\r
		const name = document.getElementById('life token').value;\r
		sendCommand('killPlayer', name);\r
	}\r
\r
	function revivePlayer() {\r
		const name = document.getElementById('life token').value;\r
		sendCommand('revivePlayer', name);\r
	}\r
\r
	function startGame() {\r
		let names = document.getElementById('Participants').value;\r
		players = names.split(',');\r
		InitializeDropDowns();\r
\r
		sendCommand('startGame', names);\r
	}\r
\r
	let nominatorSelect = document.getElementById('nominator');\r
	let nomineeSelect = document.getElementById('nominee');\r
	let lifeTokenSelect = document.getElementById('life token');\r
\r
	// Put Alive Players into the DropDown Menu\r
	function InitializeDropDowns() {\r
		while (nominatorSelect.hasChildNodes()) {\r
			nominatorSelect.removeChild(nominatorSelect.firstChild);\r
		}\r
		while (nomineeSelect.hasChildNodes()) {\r
			nomineeSelect.removeChild(nomineeSelect.firstChild);\r
		}\r
		while (lifeTokenSelect.hasChildNodes()) {\r
			lifeTokenSelect.removeChild(lifeTokenSelect.firstChild);\r
		}\r
\r
		for (let i = 0; i < players.length; i++) {\r
			let player = players[i];\r
			let el1 = document.createElement('option');\r
			el1.textContent = player;\r
			el1.value = player;\r
			let el2 = document.createElement('option');\r
			el2.textContent = player;\r
			el2.value = player;\r
			let el3 = document.createElement('option');\r
			el3.textContent = player;\r
			el3.value = player;\r
			nominatorSelect.appendChild(el1);\r
			nomineeSelect.appendChild(el2);\r
			lifeTokenSelect.appendChild(el3);\r
		}\r
	}\r
\r
	function showNomination() {\r
		sendCommand('showNomination', nominatorSelect.value + ',' + nomineeSelect.value);\r
	}\r
\r
	function startVote() {\r
		sendCommand('startCountdown');\r
	}\r
\r
	function voteResult() {\r
		let result = {\r
			numberOfVotes: document.getElementById('vote result').value,\r
			nominee: nomineeSelect.value\r
		}\r
		sendCommand('voteResult', result);\r
	}\r
\r
	function startDay(){\r
		let minutes = document.getElementById('day minutes').value;\r
		sendCommand('startDay', minutes);\r
	}\r
<\/script>\r
</body>\r
</html>`;
function H() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var R = H();
function it(r) {
  R = r;
}
var S = { exec: () => null };
function d(r, t = "") {
  let n = typeof r == "string" ? r : r.source, i = { replace: (e, a) => {
    let s = typeof a == "string" ? a : a.source;
    return s = s.replace(b.caret, "$1"), n = n.replace(e, s), i;
  }, getRegex: () => new RegExp(n, t) };
  return i;
}
var wt = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), b = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}#`), htmlBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}<(?:[a-z].*>|!--)`, "i"), blockquoteBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}>`) }, xt = /^(?:[ \t]*(?:\n|$))+/, yt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, vt = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, P = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, St = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Z = / {0,3}(?:[*+-]|\d{1,9}[.)])/, st = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, at = d(st).replace(/bull/g, Z).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Tt = d(st).replace(/bull/g, Z).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), U = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Rt = /^[^\n]+/, W = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Et = d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", W).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), At = d(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Z).getRegex(), M = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", j = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, $t = d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", j).replace("tag", M).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), lt = d(U).replace("hr", P).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", M).getRegex(), zt = d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", lt).getRegex(), J = { blockquote: zt, code: yt, def: Et, fences: vt, heading: St, hr: P, html: $t, lheading: at, list: At, newline: xt, paragraph: lt, table: S, text: Rt }, Y = d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", P).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", M).getRegex(), Pt = { ...J, lheading: Tt, table: Y, paragraph: d(U).replace("hr", P).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Y).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", M).getRegex() }, Ct = { ...J, html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", j).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: S, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: d(U).replace("hr", P).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", at).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Lt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, It = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ot = /^( {2,}|\\)\n(?!\s*$)/, _t = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, N = /[\p{P}\p{S}]/u, Q = /[\s\p{P}\p{S}]/u, ct = /[^\s\p{P}\p{S}]/u, Mt = d(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Q).getRegex(), pt = /(?!~)[\p{P}\p{S}]/u, Nt = /(?!~)[\s\p{P}\p{S}]/u, qt = /(?:[^\s\p{P}\p{S}]|~)/u, ut = /(?![*_])[\p{P}\p{S}]/u, Dt = /(?![*_])[\s\p{P}\p{S}]/u, Bt = /(?:[^\s\p{P}\p{S}]|[*_])/u, Ot = d(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", wt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), ht = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Ht = d(ht, "u").replace(/punct/g, N).getRegex(), Zt = d(ht, "u").replace(/punct/g, pt).getRegex(), dt = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Ut = d(dt, "gu").replace(/notPunctSpace/g, ct).replace(/punctSpace/g, Q).replace(/punct/g, N).getRegex(), Wt = d(dt, "gu").replace(/notPunctSpace/g, qt).replace(/punctSpace/g, Nt).replace(/punct/g, pt).getRegex(), jt = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ct).replace(/punctSpace/g, Q).replace(/punct/g, N).getRegex(), Jt = d(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, ut).getRegex(), Qt = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", Gt = d(Qt, "gu").replace(/notPunctSpace/g, Bt).replace(/punctSpace/g, Dt).replace(/punct/g, ut).getRegex(), Vt = d(/\\(punct)/, "gu").replace(/punct/g, N).getRegex(), Kt = d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Xt = d(j).replace("(?:-->|$)", "-->").getRegex(), Yt = d("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Xt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), L = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, Ft = d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", L).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), gt = d(/^!?\[(label)\]\[(ref)\]/).replace("label", L).replace("ref", W).getRegex(), mt = d(/^!?\[(ref)\](?:\[\])?/).replace("ref", W).getRegex(), te = d("reflink|nolink(?!\\()", "g").replace("reflink", gt).replace("nolink", mt).getRegex(), F = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, G = { _backpedal: S, anyPunctuation: Vt, autolink: Kt, blockSkip: Ot, br: ot, code: It, del: S, delLDelim: S, delRDelim: S, emStrongLDelim: Ht, emStrongRDelimAst: Ut, emStrongRDelimUnd: jt, escape: Lt, link: Ft, nolink: mt, punctuation: Mt, reflink: gt, reflinkSearch: te, tag: Yt, text: _t, url: S }, ee = { ...G, link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", L).getRegex(), reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", L).getRegex() }, D = { ...G, emStrongRDelimAst: Wt, emStrongLDelim: Zt, delLDelim: Jt, delRDelim: Gt, url: d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", F).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: d(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", F).getRegex() }, ne = { ...D, br: d(ot).replace("{2,}", "*").getRegex(), text: d(D.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, C = { normal: J, gfm: Pt, pedantic: Ct }, A = { normal: G, gfm: D, breaks: ne, pedantic: ee }, re = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, tt = (r) => re[r];
function v(r, t) {
  if (t) {
    if (b.escapeTest.test(r)) return r.replace(b.escapeReplace, tt);
  } else if (b.escapeTestNoEncode.test(r)) return r.replace(b.escapeReplaceNoEncode, tt);
  return r;
}
function et(r) {
  try {
    r = encodeURI(r).replace(b.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function nt(r, t) {
  let n = r.replace(b.findPipe, (a, s, o) => {
    let l = !1, u = s;
    for (; --u >= 0 && o[u] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), i = n.split(b.splitPipe), e = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !i.at(-1)?.trim() && i.pop(), t) if (i.length > t) i.splice(t);
  else for (; i.length < t; ) i.push("");
  for (; e < i.length; e++) i[e] = i[e].trim().replace(b.slashPipe, "|");
  return i;
}
function $(r, t, n) {
  let i = r.length;
  if (i === 0) return "";
  let e = 0;
  for (; e < i && r.charAt(i - e - 1) === t; )
    e++;
  return r.slice(0, i - e);
}
function ie(r, t) {
  if (r.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let i = 0; i < r.length; i++) if (r[i] === "\\") i++;
  else if (r[i] === t[0]) n++;
  else if (r[i] === t[1] && (n--, n < 0)) return i;
  return n > 0 ? -2 : -1;
}
function se(r, t = 0) {
  let n = t, i = "";
  for (let e of r) if (e === "	") {
    let a = 4 - n % 4;
    i += " ".repeat(a), n += a;
  } else i += e, n++;
  return i;
}
function rt(r, t, n, i, e) {
  let a = t.href, s = t.title || null, o = r[1].replace(e.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  let l = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: n, href: a, title: s, text: o, tokens: i.inlineTokens(o) };
  return i.state.inLink = !1, l;
}
function ae(r, t, n) {
  let i = r.match(n.other.indentCodeCompensation);
  if (i === null) return t;
  let e = i[1];
  return t.split(`
`).map((a) => {
    let s = a.match(n.other.beginningSpace);
    if (s === null) return a;
    let [o] = s;
    return o.length >= e.length ? a.slice(e.length) : a;
  }).join(`
`);
}
var I = class {
  options;
  rules;
  lexer;
  constructor(r) {
    this.options = r || R;
  }
  space(r) {
    let t = this.rules.block.newline.exec(r);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(r) {
    let t = this.rules.block.code.exec(r);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : $(n, `
`) };
    }
  }
  fences(r) {
    let t = this.rules.block.fences.exec(r);
    if (t) {
      let n = t[0], i = ae(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: i };
    }
  }
  heading(r) {
    let t = this.rules.block.heading.exec(r);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let i = $(n, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceChar.test(i)) && (n = i.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(r) {
    let t = this.rules.block.hr.exec(r);
    if (t) return { type: "hr", raw: $(t[0], `
`) };
  }
  blockquote(r) {
    let t = this.rules.block.blockquote.exec(r);
    if (t) {
      let n = $(t[0], `
`).split(`
`), i = "", e = "", a = [];
      for (; n.length > 0; ) {
        let s = !1, o = [], l;
        for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) o.push(n[l]), s = !0;
        else if (!s) o.push(n[l]);
        else break;
        n = n.slice(l);
        let u = o.join(`
`), c = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${u}` : u, e = e ? `${e}
${c}` : c;
        let h = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, a, !0), this.lexer.state.top = h, n.length === 0) break;
        let p = a.at(-1);
        if (p?.type === "code") break;
        if (p?.type === "blockquote") {
          let g = p, m = g.raw + `
` + n.join(`
`), k = this.blockquote(m);
          a[a.length - 1] = k, i = i.substring(0, i.length - g.raw.length) + k.raw, e = e.substring(0, e.length - g.text.length) + k.text;
          break;
        } else if (p?.type === "list") {
          let g = p, m = g.raw + `
` + n.join(`
`), k = this.list(m);
          a[a.length - 1] = k, i = i.substring(0, i.length - p.raw.length) + k.raw, e = e.substring(0, e.length - g.raw.length) + k.raw, n = m.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: i, tokens: a, text: e };
    }
  }
  list(r) {
    let t = this.rules.block.list.exec(r);
    if (t) {
      let n = t[1].trim(), i = n.length > 1, e = { type: "list", raw: "", ordered: i, start: i ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
      let a = this.rules.other.listItemRegex(n), s = !1;
      for (; r; ) {
        let l = !1, u = "", c = "";
        if (!(t = a.exec(r)) || this.rules.block.hr.test(r)) break;
        u = t[0], r = r.substring(u.length);
        let h = se(t[2].split(`
`, 1)[0], t[1].length), p = r.split(`
`, 1)[0], g = !h.trim(), m = 0;
        if (this.options.pedantic ? (m = 2, c = h.trimStart()) : g ? m = t[1].length + 1 : (m = h.search(this.rules.other.nonSpaceChar), m = m > 4 ? 1 : m, c = h.slice(m), m += t[1].length), g && this.rules.other.blankLine.test(p) && (u += p + `
`, r = r.substring(p.length + 1), l = !0), !l) {
          let k = this.rules.other.nextBulletRegex(m), y = this.rules.other.hrRegex(m), K = this.rules.other.fencesBeginRegex(m), X = this.rules.other.headingBeginRegex(m), ft = this.rules.other.htmlBeginRegex(m), kt = this.rules.other.blockquoteBeginRegex(m);
          for (; r; ) {
            let q = r.split(`
`, 1)[0], E;
            if (p = q, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), E = p) : E = p.replace(this.rules.other.tabCharGlobal, "    "), K.test(p) || X.test(p) || ft.test(p) || kt.test(p) || k.test(p) || y.test(p)) break;
            if (E.search(this.rules.other.nonSpaceChar) >= m || !p.trim()) c += `
` + E.slice(m);
            else {
              if (g || h.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || K.test(h) || X.test(h) || y.test(h)) break;
              c += `
` + p;
            }
            g = !p.trim(), u += q + `
`, r = r.substring(q.length + 1), h = E.slice(m);
          }
        }
        e.loose || (s ? e.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (s = !0)), e.items.push({ type: "list_item", raw: u, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: !1, text: c, tokens: [] }), e.raw += u;
      }
      let o = e.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      e.raw = e.raw.trimEnd();
      for (let l of e.items) {
        if (this.lexer.state.top = !1, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
          if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
            l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let c = this.lexer.inlineQueue.length - 1; c >= 0; c--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)) {
              this.lexer.inlineQueue[c].src = this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let u = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (u) {
            let c = { type: "checkbox", raw: u[0] + " ", checked: u[0] !== "[ ]" };
            l.checked = c.checked, e.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({ type: "paragraph", raw: c.raw, text: c.raw, tokens: [c] }) : l.tokens.unshift(c);
          }
        }
        if (!e.loose) {
          let u = l.tokens.filter((h) => h.type === "space"), c = u.length > 0 && u.some((h) => this.rules.other.anyLine.test(h.raw));
          e.loose = c;
        }
      }
      if (e.loose) for (let l of e.items) {
        l.loose = !0;
        for (let u of l.tokens) u.type === "text" && (u.type = "paragraph");
      }
      return e;
    }
  }
  html(r) {
    let t = this.rules.block.html.exec(r);
    if (t) return { type: "html", block: !0, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
  }
  def(r) {
    let t = this.rules.block.def.exec(r);
    if (t) {
      let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), i = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", e = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: n, raw: t[0], href: i, title: e };
    }
  }
  table(r) {
    let t = this.rules.block.table.exec(r);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = nt(t[1]), i = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), e = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === i.length) {
      for (let s of i) this.rules.other.tableAlignRight.test(s) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? a.align.push("left") : a.align.push(null);
      for (let s = 0; s < n.length; s++) a.header.push({ text: n[s], tokens: this.lexer.inline(n[s]), header: !0, align: a.align[s] });
      for (let s of e) a.rows.push(nt(s, a.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: !1, align: a.align[l] })));
      return a;
    }
  }
  lheading(r) {
    let t = this.rules.block.lheading.exec(r);
    if (t) return { type: "heading", raw: t[0], depth: t[2].charAt(0) === "=" ? 1 : 2, text: t[1], tokens: this.lexer.inline(t[1]) };
  }
  paragraph(r) {
    let t = this.rules.block.paragraph.exec(r);
    if (t) {
      let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(r) {
    let t = this.rules.block.text.exec(r);
    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
  }
  escape(r) {
    let t = this.rules.inline.escape.exec(r);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(r) {
    let t = this.rules.inline.tag.exec(r);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: t[0] };
  }
  link(r) {
    let t = this.rules.inline.link.exec(r);
    if (t) {
      let n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        let a = $(n.slice(0, -1), "\\");
        if ((n.length - a.length) % 2 === 0) return;
      } else {
        let a = ie(t[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let s = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + a;
          t[2] = t[2].substring(0, a), t[0] = t[0].substring(0, s).trim(), t[3] = "";
        }
      }
      let i = t[2], e = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(i);
        a && (i = a[1], e = a[3]);
      } else e = t[3] ? t[3].slice(1, -1) : "";
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? i = i.slice(1) : i = i.slice(1, -1)), rt(t, { href: i && i.replace(this.rules.inline.anyPunctuation, "$1"), title: e && e.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(r, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(r)) || (n = this.rules.inline.nolink.exec(r))) {
      let i = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), e = t[i.toLowerCase()];
      if (!e) {
        let a = n[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return rt(n, e, n[0], this.lexer, this.rules);
    }
  }
  emStrong(r, t, n = "") {
    let i = this.rules.inline.emStrongLDelim.exec(r);
    if (!(!i || i[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(i[1] || i[2]) || !n || this.rules.inline.punctuation.exec(n))) {
      let e = [...i[0]].length - 1, a, s, o = e, l = 0, u = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (u.lastIndex = 0, t = t.slice(-1 * r.length + e); (i = u.exec(t)) != null; ) {
        if (a = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !a) continue;
        if (s = [...a].length, i[3] || i[4]) {
          o += s;
          continue;
        } else if ((i[5] || i[6]) && e % 3 && !((e + s) % 3)) {
          l += s;
          continue;
        }
        if (o -= s, o > 0) continue;
        s = Math.min(s, s + o + l);
        let c = [...i[0]][0].length, h = r.slice(0, e + i.index + c + s);
        if (Math.min(e, s) % 2) {
          let g = h.slice(1, -1);
          return { type: "em", raw: h, text: g, tokens: this.lexer.inlineTokens(g) };
        }
        let p = h.slice(2, -2);
        return { type: "strong", raw: h, text: p, tokens: this.lexer.inlineTokens(p) };
      }
    }
  }
  codespan(r) {
    let t = this.rules.inline.code.exec(r);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(n), e = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return i && e && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
    }
  }
  br(r) {
    let t = this.rules.inline.br.exec(r);
    if (t) return { type: "br", raw: t[0] };
  }
  del(r, t, n = "") {
    let i = this.rules.inline.delLDelim.exec(r);
    if (i && (!i[1] || !n || this.rules.inline.punctuation.exec(n))) {
      let e = [...i[0]].length - 1, a, s, o = e, l = this.rules.inline.delRDelim;
      for (l.lastIndex = 0, t = t.slice(-1 * r.length + e); (i = l.exec(t)) != null; ) {
        if (a = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !a || (s = [...a].length, s !== e)) continue;
        if (i[3] || i[4]) {
          o += s;
          continue;
        }
        if (o -= s, o > 0) continue;
        s = Math.min(s, s + o);
        let u = [...i[0]][0].length, c = r.slice(0, e + i.index + u + s), h = c.slice(e, -e);
        return { type: "del", raw: c, text: h, tokens: this.lexer.inlineTokens(h) };
      }
    }
  }
  autolink(r) {
    let t = this.rules.inline.autolink.exec(r);
    if (t) {
      let n, i;
      return t[2] === "@" ? (n = t[1], i = "mailto:" + n) : (n = t[1], i = n), { type: "link", raw: t[0], text: n, href: i, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(r) {
    let t;
    if (t = this.rules.inline.url.exec(r)) {
      let n, i;
      if (t[2] === "@") n = t[0], i = "mailto:" + n;
      else {
        let e;
        do
          e = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (e !== t[0]);
        n = t[0], t[1] === "www." ? i = "http://" + t[0] : i = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: i, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(r) {
    let t = this.rules.inline.text.exec(r);
    if (t) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: t[0], escaped: n };
    }
  }
}, w = class B {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || R, this.options.tokenizer = this.options.tokenizer || new I(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: b, block: C.normal, inline: A.normal };
    this.options.pedantic ? (n.block = C.pedantic, n.inline = A.pedantic) : this.options.gfm && (n.block = C.gfm, this.options.breaks ? n.inline = A.breaks : n.inline = A.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: C, inline: A };
  }
  static lex(t, n) {
    return new B(n).lex(t);
  }
  static lexInline(t, n) {
    return new B(n).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(b.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let i = this.inlineQueue[n];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], i = !1) {
    for (this.options.pedantic && (t = t.replace(b.tabCharGlobal, "    ").replace(b.spaceLine, "")); t; ) {
      let e;
      if (this.options.extensions?.block?.some((s) => (e = s.call({ lexer: this }, t, n)) ? (t = t.substring(e.raw.length), n.push(e), !0) : !1)) continue;
      if (e = this.tokenizer.space(t)) {
        t = t.substring(e.raw.length);
        let s = n.at(-1);
        e.raw.length === 1 && s !== void 0 ? s.raw += `
` : n.push(e);
        continue;
      }
      if (e = this.tokenizer.code(t)) {
        t = t.substring(e.raw.length);
        let s = n.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + e.raw, s.text += `
` + e.text, this.inlineQueue.at(-1).src = s.text) : n.push(e);
        continue;
      }
      if (e = this.tokenizer.fences(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      if (e = this.tokenizer.heading(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      if (e = this.tokenizer.hr(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      if (e = this.tokenizer.blockquote(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      if (e = this.tokenizer.list(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      if (e = this.tokenizer.html(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      if (e = this.tokenizer.def(t)) {
        t = t.substring(e.raw.length);
        let s = n.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + e.raw, s.text += `
` + e.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[e.tag] || (this.tokens.links[e.tag] = { href: e.href, title: e.title }, n.push(e));
        continue;
      }
      if (e = this.tokenizer.table(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      if (e = this.tokenizer.lheading(t)) {
        t = t.substring(e.raw.length), n.push(e);
        continue;
      }
      let a = t;
      if (this.options.extensions?.startBlock) {
        let s = 1 / 0, o = t.slice(1), l;
        this.options.extensions.startBlock.forEach((u) => {
          l = u.call({ lexer: this }, o), typeof l == "number" && l >= 0 && (s = Math.min(s, l));
        }), s < 1 / 0 && s >= 0 && (a = t.substring(0, s + 1));
      }
      if (this.state.top && (e = this.tokenizer.paragraph(a))) {
        let s = n.at(-1);
        i && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + e.raw, s.text += `
` + e.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : n.push(e), i = a.length !== t.length, t = t.substring(e.raw.length);
        continue;
      }
      if (e = this.tokenizer.text(t)) {
        t = t.substring(e.raw.length);
        let s = n.at(-1);
        s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + e.raw, s.text += `
` + e.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : n.push(e);
        continue;
      }
      if (t) {
        let s = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else throw new Error(s);
      }
    }
    return this.state.top = !0, n;
  }
  inline(t, n = []) {
    return this.inlineQueue.push({ src: t, tokens: n }), n;
  }
  inlineTokens(t, n = []) {
    let i = t, e = null;
    if (this.tokens.links) {
      let l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (e = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; ) l.includes(e[0].slice(e[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, e.index) + "[" + "a".repeat(e[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (e = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; ) i = i.slice(0, e.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let a;
    for (; (e = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; ) a = e[2] ? e[2].length : 0, i = i.slice(0, e.index + a) + "[" + "a".repeat(e[0].length - a - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    i = this.options.hooks?.emStrongMask?.call({ lexer: this }, i) ?? i;
    let s = !1, o = "";
    for (; t; ) {
      s || (o = ""), s = !1;
      let l;
      if (this.options.extensions?.inline?.some((c) => (l = c.call({ lexer: this }, t, n)) ? (t = t.substring(l.raw.length), n.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.escape(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.tag(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.link(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(l.raw.length);
        let c = n.at(-1);
        l.type === "text" && c?.type === "text" ? (c.raw += l.raw, c.text += l.text) : n.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(t, i, o)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.codespan(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.br(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.del(t, i, o)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.autolink(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (!this.state.inLink && (l = this.tokenizer.url(t))) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      let u = t;
      if (this.options.extensions?.startInline) {
        let c = 1 / 0, h = t.slice(1), p;
        this.options.extensions.startInline.forEach((g) => {
          p = g.call({ lexer: this }, h), typeof p == "number" && p >= 0 && (c = Math.min(c, p));
        }), c < 1 / 0 && c >= 0 && (u = t.substring(0, c + 1));
      }
      if (l = this.tokenizer.inlineText(u)) {
        t = t.substring(l.raw.length), l.raw.slice(-1) !== "_" && (o = l.raw.slice(-1)), s = !0;
        let c = n.at(-1);
        c?.type === "text" ? (c.raw += l.raw, c.text += l.text) : n.push(l);
        continue;
      }
      if (t) {
        let c = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(c);
          break;
        } else throw new Error(c);
      }
    }
    return n;
  }
}, _ = class {
  options;
  parser;
  constructor(r) {
    this.options = r || R;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: t, escaped: n }) {
    let i = (t || "").match(b.notSpaceStart)?.[0], e = r.replace(b.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + v(i) + '">' + (n ? e : v(e, !0)) + `</code></pre>
` : "<pre><code>" + (n ? e : v(e, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: r }) {
    return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
  }
  html({ text: r }) {
    return r;
  }
  def(r) {
    return "";
  }
  heading({ tokens: r, depth: t }) {
    return `<h${t}>${this.parser.parseInline(r)}</h${t}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    let t = r.ordered, n = r.start, i = "";
    for (let s = 0; s < r.items.length; s++) {
      let o = r.items[s];
      i += this.listitem(o);
    }
    let e = t ? "ol" : "ul", a = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + e + a + `>
` + i + "</" + e + `>
`;
  }
  listitem(r) {
    return `<li>${this.parser.parse(r.tokens)}</li>
`;
  }
  checkbox({ checked: r }) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: r }) {
    return `<p>${this.parser.parseInline(r)}</p>
`;
  }
  table(r) {
    let t = "", n = "";
    for (let e = 0; e < r.header.length; e++) n += this.tablecell(r.header[e]);
    t += this.tablerow({ text: n });
    let i = "";
    for (let e = 0; e < r.rows.length; e++) {
      let a = r.rows[e];
      n = "";
      for (let s = 0; s < a.length; s++) n += this.tablecell(a[s]);
      i += this.tablerow({ text: n });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    let t = this.parser.parseInline(r.tokens), n = r.header ? "th" : "td";
    return (r.align ? `<${n} align="${r.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${v(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: t, tokens: n }) {
    let i = this.parser.parseInline(n), e = et(r);
    if (e === null) return i;
    r = e;
    let a = '<a href="' + r + '"';
    return t && (a += ' title="' + v(t) + '"'), a += ">" + i + "</a>", a;
  }
  image({ href: r, title: t, text: n, tokens: i }) {
    i && (n = this.parser.parseInline(i, this.parser.textRenderer));
    let e = et(r);
    if (e === null) return v(n);
    r = e;
    let a = `<img src="${r}" alt="${v(n)}"`;
    return t && (a += ` title="${v(t)}"`), a += ">", a;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : v(r.text);
  }
}, V = class {
  strong({ text: r }) {
    return r;
  }
  em({ text: r }) {
    return r;
  }
  codespan({ text: r }) {
    return r;
  }
  del({ text: r }) {
    return r;
  }
  html({ text: r }) {
    return r;
  }
  text({ text: r }) {
    return r;
  }
  link({ text: r }) {
    return "" + r;
  }
  image({ text: r }) {
    return "" + r;
  }
  br() {
    return "";
  }
  checkbox({ raw: r }) {
    return r;
  }
}, x = class O {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || R, this.options.renderer = this.options.renderer || new _(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new V();
  }
  static parse(t, n) {
    return new O(n).parse(t);
  }
  static parseInline(t, n) {
    return new O(n).parseInline(t);
  }
  parse(t) {
    let n = "";
    for (let i = 0; i < t.length; i++) {
      let e = t[i];
      if (this.options.extensions?.renderers?.[e.type]) {
        let s = e, o = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (o !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(s.type)) {
          n += o || "";
          continue;
        }
      }
      let a = e;
      switch (a.type) {
        case "space": {
          n += this.renderer.space(a);
          break;
        }
        case "hr": {
          n += this.renderer.hr(a);
          break;
        }
        case "heading": {
          n += this.renderer.heading(a);
          break;
        }
        case "code": {
          n += this.renderer.code(a);
          break;
        }
        case "table": {
          n += this.renderer.table(a);
          break;
        }
        case "blockquote": {
          n += this.renderer.blockquote(a);
          break;
        }
        case "list": {
          n += this.renderer.list(a);
          break;
        }
        case "checkbox": {
          n += this.renderer.checkbox(a);
          break;
        }
        case "html": {
          n += this.renderer.html(a);
          break;
        }
        case "def": {
          n += this.renderer.def(a);
          break;
        }
        case "paragraph": {
          n += this.renderer.paragraph(a);
          break;
        }
        case "text": {
          n += this.renderer.text(a);
          break;
        }
        default: {
          let s = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return n;
  }
  parseInline(t, n = this.renderer) {
    let i = "";
    for (let e = 0; e < t.length; e++) {
      let a = t[e];
      if (this.options.extensions?.renderers?.[a.type]) {
        let o = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          i += o || "";
          continue;
        }
      }
      let s = a;
      switch (s.type) {
        case "escape": {
          i += n.text(s);
          break;
        }
        case "html": {
          i += n.html(s);
          break;
        }
        case "link": {
          i += n.link(s);
          break;
        }
        case "image": {
          i += n.image(s);
          break;
        }
        case "checkbox": {
          i += n.checkbox(s);
          break;
        }
        case "strong": {
          i += n.strong(s);
          break;
        }
        case "em": {
          i += n.em(s);
          break;
        }
        case "codespan": {
          i += n.codespan(s);
          break;
        }
        case "br": {
          i += n.br(s);
          break;
        }
        case "del": {
          i += n.del(s);
          break;
        }
        case "text": {
          i += n.text(s);
          break;
        }
        default: {
          let o = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return i;
  }
}, z = class {
  options;
  block;
  constructor(r) {
    this.options = r || R;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
  emStrongMask(r) {
    return r;
  }
  provideLexer() {
    return this.block ? w.lex : w.lexInline;
  }
  provideParser() {
    return this.block ? x.parse : x.parseInline;
  }
}, le = class {
  defaults = H();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = x;
  Renderer = _;
  TextRenderer = V;
  Lexer = w;
  Tokenizer = I;
  Hooks = z;
  constructor(...r) {
    this.use(...r);
  }
  walkTokens(r, t) {
    let n = [];
    for (let i of r) switch (n = n.concat(t.call(this, i)), i.type) {
      case "table": {
        let e = i;
        for (let a of e.header) n = n.concat(this.walkTokens(a.tokens, t));
        for (let a of e.rows) for (let s of a) n = n.concat(this.walkTokens(s.tokens, t));
        break;
      }
      case "list": {
        let e = i;
        n = n.concat(this.walkTokens(e.items, t));
        break;
      }
      default: {
        let e = i;
        this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((a) => {
          let s = e[a].flat(1 / 0);
          n = n.concat(this.walkTokens(s, t));
        }) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
      }
    }
    return n;
  }
  use(...r) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((n) => {
      let i = { ...n };
      if (i.async = this.defaults.async || i.async || !1, n.extensions && (n.extensions.forEach((e) => {
        if (!e.name) throw new Error("extension name required");
        if ("renderer" in e) {
          let a = t.renderers[e.name];
          a ? t.renderers[e.name] = function(...s) {
            let o = e.renderer.apply(this, s);
            return o === !1 && (o = a.apply(this, s)), o;
          } : t.renderers[e.name] = e.renderer;
        }
        if ("tokenizer" in e) {
          if (!e.level || e.level !== "block" && e.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = t[e.level];
          a ? a.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
        }
        "childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
      }), i.extensions = t), n.renderer) {
        let e = this.defaults.renderer || new _(this.defaults);
        for (let a in n.renderer) {
          if (!(a in e)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let s = a, o = n.renderer[s], l = e[s];
          e[s] = (...u) => {
            let c = o.apply(e, u);
            return c === !1 && (c = l.apply(e, u)), c || "";
          };
        }
        i.renderer = e;
      }
      if (n.tokenizer) {
        let e = this.defaults.tokenizer || new I(this.defaults);
        for (let a in n.tokenizer) {
          if (!(a in e)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let s = a, o = n.tokenizer[s], l = e[s];
          e[s] = (...u) => {
            let c = o.apply(e, u);
            return c === !1 && (c = l.apply(e, u)), c;
          };
        }
        i.tokenizer = e;
      }
      if (n.hooks) {
        let e = this.defaults.hooks || new z();
        for (let a in n.hooks) {
          if (!(a in e)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let s = a, o = n.hooks[s], l = e[s];
          z.passThroughHooks.has(a) ? e[s] = (u) => {
            if (this.defaults.async && z.passThroughHooksRespectAsync.has(a)) return (async () => {
              let h = await o.call(e, u);
              return l.call(e, h);
            })();
            let c = o.call(e, u);
            return l.call(e, c);
          } : e[s] = (...u) => {
            if (this.defaults.async) return (async () => {
              let h = await o.apply(e, u);
              return h === !1 && (h = await l.apply(e, u)), h;
            })();
            let c = o.apply(e, u);
            return c === !1 && (c = l.apply(e, u)), c;
          };
        }
        i.hooks = e;
      }
      if (n.walkTokens) {
        let e = this.defaults.walkTokens, a = n.walkTokens;
        i.walkTokens = function(s) {
          let o = [];
          return o.push(a.call(this, s)), e && (o = o.concat(e.call(this, s))), o;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, t) {
    return w.lex(r, t ?? this.defaults);
  }
  parser(r, t) {
    return x.parse(r, t ?? this.defaults);
  }
  parseMarkdown(r) {
    return (t, n) => {
      let i = { ...n }, e = { ...this.defaults, ...i }, a = this.onError(!!e.silent, !!e.async);
      if (this.defaults.async === !0 && i.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      if (e.hooks && (e.hooks.options = e, e.hooks.block = r), e.async) return (async () => {
        let s = e.hooks ? await e.hooks.preprocess(t) : t, o = await (e.hooks ? await e.hooks.provideLexer() : r ? w.lex : w.lexInline)(s, e), l = e.hooks ? await e.hooks.processAllTokens(o) : o;
        e.walkTokens && await Promise.all(this.walkTokens(l, e.walkTokens));
        let u = await (e.hooks ? await e.hooks.provideParser() : r ? x.parse : x.parseInline)(l, e);
        return e.hooks ? await e.hooks.postprocess(u) : u;
      })().catch(a);
      try {
        e.hooks && (t = e.hooks.preprocess(t));
        let s = (e.hooks ? e.hooks.provideLexer() : r ? w.lex : w.lexInline)(t, e);
        e.hooks && (s = e.hooks.processAllTokens(s)), e.walkTokens && this.walkTokens(s, e.walkTokens);
        let o = (e.hooks ? e.hooks.provideParser() : r ? x.parse : x.parseInline)(s, e);
        return e.hooks && (o = e.hooks.postprocess(o)), o;
      } catch (s) {
        return a(s);
      }
    };
  }
  onError(r, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let i = "<p>An error occurred:</p><pre>" + v(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(i) : i;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
}, T = new le();
function f(r, t) {
  return T.parse(r, t);
}
f.options = f.setOptions = function(r) {
  return T.setOptions(r), f.defaults = T.defaults, it(f.defaults), f;
};
f.getDefaults = H;
f.defaults = R;
f.use = function(...r) {
  return T.use(...r), f.defaults = T.defaults, it(f.defaults), f;
};
f.walkTokens = function(r, t) {
  return T.walkTokens(r, t);
};
f.parseInline = T.parseInline;
f.Parser = x;
f.parser = x.parse;
f.Renderer = _;
f.TextRenderer = V;
f.Lexer = w;
f.lexer = w.lex;
f.Tokenizer = I;
f.Hooks = z;
f.parse = f;
f.options;
f.setOptions;
f.use;
f.walkTokens;
f.parseInline;
x.parse;
w.lex;
const oe = () => {
  let r, t = null, n;
  function i() {
    if (t && !t.closed)
      t.focus();
    else {
      if (t = window.open("about:blank", "reveal.js - Notes", "width=1100,height=700"), t.marked = f, t.document.write(bt), !t) {
        alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");
        return;
      }
      a();
    }
  }
  function e(h) {
    t && !t.closed ? t.focus() : (t = h, window.addEventListener("message", u), c());
  }
  function a() {
    const h = n.getConfig().url, p = typeof h == "string" ? h : window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
    r = setInterval(function() {
      t.postMessage(JSON.stringify({
        namespace: "reveal-notes",
        type: "connect",
        state: n.getState(),
        url: p
      }), "*");
    }, 500), window.addEventListener("message", u);
  }
  function s(h, p, g) {
    let m = n[h].apply(n, p);
    t.postMessage(JSON.stringify({
      namespace: "reveal-notes",
      type: "return",
      result: m,
      callId: g
    }), "*");
  }
  function o(h) {
    let p = n.getCurrentSlide(), g = p.querySelectorAll("aside.notes"), m = p.querySelector(".current-fragment"), k = {
      namespace: "reveal-notes",
      type: "state",
      notes: "",
      markdown: !1,
      whitespace: "normal",
      state: n.getState()
    };
    if (p.hasAttribute("data-notes") && (k.notes = p.getAttribute("data-notes"), k.whitespace = "pre-wrap"), m) {
      let y = m.querySelector("aside.notes");
      y ? (k.notes = y.innerHTML, k.markdown = typeof y.getAttribute("data-markdown") == "string", g = null) : m.hasAttribute("data-notes") && (k.notes = m.getAttribute("data-notes"), k.whitespace = "pre-wrap", g = null);
    }
    g && g.length && (g = Array.from(g).filter((y) => y.closest(".fragment") === null), k.notes = g.map((y) => y.innerHTML).join(`
`), k.markdown = g[0] && typeof g[0].getAttribute("data-markdown") == "string"), t.postMessage(JSON.stringify(k), "*");
  }
  function l(h) {
    try {
      return window.location.origin === h.source.location.origin;
    } catch {
      return !1;
    }
  }
  function u(h) {
    if (l(h))
      try {
        let p = JSON.parse(h.data);
        p && p.namespace === "reveal-notes" && p.type === "connected" ? (clearInterval(r), c()) : p && p.namespace === "reveal-notes" && p.type === "call" && s(p.methodName, p.arguments, p.callId);
      } catch {
      }
  }
  function c() {
    n.on("slidechanged", o), n.on("fragmentshown", o), n.on("fragmenthidden", o), n.on("overviewhidden", o), n.on("overviewshown", o), n.on("paused", o), n.on("resumed", o), n.on("previewiframe", o), n.on("previewimage", o), n.on("previewvideo", o), n.on("closeoverlay", o), o();
  }
  return {
    id: "notes",
    init: function(h) {
      n = h, /receiver/i.test(window.location.search) || (window.location.search.match(/(\?|\&)notes/gi) !== null ? i() : window.addEventListener("message", (p) => {
        if (!t && typeof p.data == "string") {
          let g;
          try {
            g = JSON.parse(p.data);
          } catch {
          }
          g && g.namespace === "reveal-notes" && g.type === "heartbeat" && e(p.source);
        }
      }), n.addKeyBinding({ keyCode: 83, key: "S", description: "Speaker notes view" }, function() {
        i();
      }));
    },
    open: i
  };
};
export {
  oe as default
};
