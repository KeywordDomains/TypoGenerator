/**
 *	generateTypos
 *	Generate Typos from keywords
 *
 *	@param array keywords
 *	@param bool wrongKeys
 *	@param bool missedChars
 *	@param bool transposedChars
 *	@param bool doubleChars
 *
 *	@todo this script makes heavy use of ES5 features. Shimming is required to run this in "less enabled" browsers
 */
var generateTypos = function(keywords, wrongKeys, missedChars, transposedChars, doubleChars, flipBits) {
			
	// Adding a function to the String Prototype that allows to
	// change characters at a certain index.
	// Needed, since "string"[n] is read-only
	String.prototype.replaceAt=function(index, char) {
    	return this.substr(0, index) + char + this.substr(index+char.length);
   	};
			
	// Basically a JS Implementation of
	// http://web-professor.net/scripts/typo/cTypoGenerator.txt
	var keyboard = {"1":["2","q"],"2":["1","q","w","3"],"3":["2","w","e","4"],"4":["3","e","r","5"],"5":["4","r","t","6"],"6":["5","t","y","7"],"7":["6","y","u","8"],"8":["7","u","i","9"],"9":["8","i","o","0"],"0":["9","o","p","-"],"-":["0","p"],"q":["1","2","w","a"],"w":["q","a","s","e","3","2"],"e":["w","s","d","r","4","3"],"r":["e","d","f","t","5","4"],"t":["r","f","g","y","6","5"],"y":["t","g","h","u","7","6"],"u":["y","h","j","i","8","7"],"i":["u","j","k","o","9","8"],"o":["i","k","l","p","0","9"],"p":["o","l","-","0"],"a":["z","s","w","q"],"s":["a","z","x","d","e","w"],"d":["s","x","c","f","r","e"],"f":["d","c","v","g","t","r"],"g":["f","v","b","h","y","t"],"h":["g","b","n","j","u","y"],"j":["h","n","m","k","i","u"],"k":["j","m","l","o","i"],"l":["k","p","o"],"z":["x","s","a"],"x":["z","c","d","s"],"c":["x","v","f","d"],"v":["c","b","g","f"],"b":["v","n","h","g"],"n":["b","m","j","h"],"m":["n","k","j"]},
		typos = [];
			
	// Generate wrong key typos
	function wrongKeyTypos(word) {
		var word = word.toLocaleLowerCase(),
			typos = [],
			length = word.length;

		for(var i = 0; i < length; i++ ) {
			if(keyboard[word[i]]) {
				var tempWord = word;
				keyboard[word[i]].forEach(function(character) {
					typos.push(tempWord.replaceAt(i, character));
				});
			}
		}

		return typos;
	}

	// generate missed character typos
	function missedCharsTypos(word) {
		var word = word.toLocaleLowerCase(),
			typos = [],
			length = word.length;

		for(var i = 0; i < length; i++) {
			var tempWord = '';
			if(i === 0) {
				tempWord = word.substring(i + 1);
			}
			else if((i + 1) === length) {
				tempWord = word.substring(0, i);
			}
			else {
				tempWord = word.substring(0, i);
				tempWord += word.substring(i + 1);
			}

			typos.push(tempWord);

		}

		return typos;
	}

	// generate transposed character typos
	function transposedCharTypos(word) {
		var word = word.toLocaleLowerCase(),
			typos = [],
			length = word.length;

		for(var i = 0; i < length; i++) {
			if((i + 1) !== length) {
				var tempWord = word,
					tempChar = tempWord[i];
				tempWord = tempWord.replaceAt(i, tempWord[i + 1]);
				tempWord = tempWord.replaceAt((i + 1), tempChar);
				typos.push(tempWord);
			}
		}

		return typos;
	}

	// generate double character typos
	function doubleCharTypos(word) {
		var word = word.toLocaleLowerCase(),
			typos = [],
			length = word.length;

		for(var i = 0; i < length; i++) {
			var tempWord = word.substring(0, (i + 1));
				tempWord += word[i];

			if(i !== (length - 1)) {
				tempWord += word.substring(i + 1);
			}
			typos.push(tempWord);
		}

		return typos;
	}

	function bitflipping(word) {
		var characters = word.split(''),
			masks = [128,64,32,16,8,4,2,1],
			allowed_chars = /[a-zA-Z0-9_\-\.]/,
			typos = [];

		for(var i = 0; i < characters.length; i++) {
			var c = characters[i],
				flipped = masks.map(function(mask) {
					return String.fromCharCode(c.charCodeAt(0) ^ mask).toLocaleLowerCase();
				}).filter(function(x) {
					return x.match(allowed_chars);
				});
			typos.push(flipped.map(function(x) {
				var e = word;
				return e.replaceAt(i, x);
			}));
		}

		return typos.reduce(function(a, b) {
			return a.concat(b);
		});
	}

	keywords.forEach(function(keyword) {
		if(wrongKeys) {
			typos.push(wrongKeyTypos(keyword));
		}
		if(missedChars) {
			typos.push(missedCharsTypos(keyword));
		}
		if(transposedChars) {
			typos.push(transposedCharTypos(keyword));
		}
		if(doubleChars) {
			typos.push(doubleCharTypos(keyword));
		}
		if(flipBits) {
			typos.push(bitflipping(keyword));
		}
	});

	// Flatten the array of typos
	return typos.reduce(function(a, b) {
		return a.concat(b);
	});
};