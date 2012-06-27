/**
 *	generateTypos
 *	Generate Typos from keywords
 *
 *	@param array keywords
 *	@param bool wrongKeys
 *	@param bool missedChars
 *	@param bool transposedChars
 *	@param bool doubleChars
 *	@param bool flipBits
 *	@param bool generateHomophones
 *
 *	@todo this script makes heavy use of ES5 features. Shimming is required to run this in "less enabled" browsers
 */
var generateTypos = function(keywords, options) {
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
	
	// Generate a homophone object
	function getHomophones() {
		// German + English Homophones
		var homophones = ["Aale, Ahle","Ai, Ei","Annalen, analen","aß, Aas","Bad, bat","bald, ballt","Bällen, bellen","Band, bannt","Beete, bete","bis, Biss","Block, Blog","Boot, bot","Boote, Bote","Bug, buk","Bund, bunt","Chor, Korps","Code, Kot","das, dass","dehnen, denen","erhält, erhellt","Fähre, faire","Fälle, Felle","fällt, Feld","Färse, Ferse, Verse","fast, fasst","fetter, Vetter","fiel, viel","fließt, fliehst, fliest","frisst, Frist","Fühler, Phyla","Geld, gellt","Gewand, gewandt","Grad, Grat","Graf, Graph","Halt, hallt","hallte, halte","hält, Held, hellt","Hämmer, Hemmer","hängst, Hengst","harrt, hart","hasst, hast","Häute, heute","Heer, hehr, her","Hemd, hemmt","hohl, hol","Hund, Hunt","isst, ist","kannte, Kante","konnten, Konten","Kuh, Coup","küsste, Küste","Laib, Leib","Laie, Leihe","laichen, Leichen","lasst, Last","läuten, Leuten","Lärche, Lerche","Leere, Lehre","leeren, lehren","Leerstelle, Lehrstelle","Leid, leiht","Lid, Lied","lies, ließ","liest, least","Mahl, Mal","Mähre, Märe, Meere","mahlen, malen","man, Mann","Märkte, merkte","Meer, mehr","Miene, Mine","misst, Mist","Mohr, Moor","mühten, Mythen","Mund, Munt","Nachnahme, Nachname","nahmen, Namen","packt, Pakt","pisste, Piste","rächen, Rechen","rächt, Recht","Rad, Rat","Rain, rein","Rede, Reede","Reis, reiß","reist, reißt","ruhte, Rute, Route","säen, sähen","Sämann, Seemann","Sätzen, setzen","Saite, Seite","seid, seit","schafft, Schaft","schallten, schalten","Schänke, schenke","schellte, Schelte","Schlächter, schlechter","Schlämme, schlemme","Schwälle, Schwelle","Schwämme, Schwemme","Seen, sehen","seid, seiht, seit","sie, sieh","Siegel, Sigel","Sohle, Sole","Sold, sollt","späht, spät","Stadt, statt","Städte, Stätte","Ställe, Stelle","starrt, Start","stehlen, Stelen","stiehl, Stiel, Stil","Tod, tot","Trend, trennt","Uhrzeit, Urzeit","Verband, verbannt","Verben, werben","verließ, Verlies","verwaist, verweist","Villen, Willen","Waage, vage","Waagen, wagen","Wahl, Wal","wahr, war","wahre, Ware","Waise, Weise","Wald, wallt","Wälle, Welle","Wände, Wende","Weck, weg","Wehr, wer","wehrt, Wert","weiht, weit","weis, weiß","weist, weißt","wieder, wider","wird, Wirt","Zunahme, Zuname","accept,except","acclamation,acclimation","acts,ax,axe","adolescence,adolescents","aeration,erration","aerie,airy","affect,effect","aid,aide","ail,ale","air,heir,err,ere","aisle,isle,I'll","all,awl","allowed,aloud","allude,elude","altar,alter","appose,oppose","arc,ark","are,our","ascent,assent","ate,eight","away,aweigh","aye,I,eye","bade,bayed","bail,bale","bait,bate","bald,bawled,balled","ball,bawl","band,banned","bard,barred","bare,bear","baron,barren","base,bass","based,baste","bazaar,bizarre","be,bee","beach,beech","bean,been","beat,beet","been,bin","beer,bier","bell,belle","berry,bury","berth,birth","better,bettor","bight,bite","billed,build","bird,burred","blew,blue","boar,bore,boor","board,bored","boarder,border","bode,bowed","bold,bowled","bolder,boulder,bowlder","bole,bowl","boos,booze","bough,bow","boy,buoy","braid,brayed","braise,braze,brays,braize","brake,break","breach,breech","bread,bred","brewed,brood","brews,bruise","bridal,bridle","burro,burrow","bus,buss","bused,bust","but,butt","buy,bye,by","cache,cash","callous,callus","can't,cant","cannon,canon","canter,cantor","carat,carrot,caret","caries,carries","cast,caste","cede,seed","cell,sell","cellar,seller","censor,sensor","cent,sent,scent","cents,sense,scents","cereal,serial","cession,session","chaise,chase","chalk,chock","chance,chants","chased,chaste","cheap,cheep","chews,choose","chic,sheik","choir,quire","chord,cored,cord","chute,shoot","cite,site,sight","clause,claws","click,clique","close,clothes","coal,cole","coaled,cold","coarse,course","coated,coded","cocks,cox","complement,compliment","contingence,contingents","coo,coup","coop,coupe","correspondence,correspondents","cosign,cosine","council,counsel","councilor,counselor","creak,creek","crewed,crude","crews,cruise","cue,queue","currant,current","curser,cursor","dam,damn","Dane,deign","days,daze","dear,deer","dense,dents","dependence,dependents","dew,due,do","die,dye","dire,dyer","discreet,discrete","doe,dough","does,doze,doughs","done,dun","dual,duel","ducked,duct","earn,urn","either,ether","emigrant,immigrant","eutopia,utopia","ewe,you,yew","eyed,I'd","fain,feign","faint,feint","fair,fare","fairy,ferry","fate,fete","faze,phase","feat,feet","feudal,futile","find,fined","finish,Finnish","fir,fur","flair,flare","flea,flee","flecks,flex","flew,flue","flour,flower","foaled,fold","for,four,fore","forego,forgo","foreword,forward","forth,fourth","foul,fowl","frees,frieze,freeze","friar,fryer","gage,gauge","gait,gate","gel,jell","gene,jean","gild,guild","gneiss,nice","gored,gourd","grade,grayed,greyed","grate,great","grays,greys,graze","grisly,grizzly","groan,grown","guessed,guest","guide,guyed","guise,guys","hail,hale","hair,hare","hairy,harry","hall,haul","halve,have","hangar,hanger","hay,hey","hays,haze","he'd,heed","he'll,heel,heal","hear,here","heard,herd","heated,heeded","hew,hue","hi,high","higher,hire","him,hymn","ho,hoe","hoar,whore","hoard,horde","hoarse,horse","hoes,hose","hold,holed","hole,whole","holey,wholly,holy","hostel,hostile","hour,our","idle,idol","immanent,imminent","in,inn","incidence,incidents","incite,insight","instance,instants","intense,intents","intension,intention","it's,its","jam,jamb","knave,nave","knead,need,kneed","knew,new","knight,night","knit,nit","knot,not,naught","know,no","knows,nose","lacks,lax","lade,laid","lain,lane","lair,layer","lam,lamb","laps,lapse","lay,lei","lays,laze","leach,leech","lead,led","leak,leek","lean,lien","leased,least","lends,lens","lessen,lesson","lesser,lessor","let's,lets","levee,levy","liar,lyre","lichen,liken","lickerish,licorice","lie,lye","links,lynx","lo,low","load,lode","loan,lone","loch,lock","locks,lox","loop,loupe","loos,lose","lose,loose","made,maid","mail,male","main,mane","maize,maze,Mays","mall,maul","manner,manor","marshal,martial","massed,mast","mat,matte","mean,mien","meat,mete,meet","medal,mettle,meddle,metal","might,mite","mince,mints","mind,mined","miner,minor","missed,mist","moat,mote","mood,mooed","moor,more","morning,mourning","muscle,mussel","mussed,must","naval,navel","nay,neigh","nicks,nix","none,nun","oar,ore,or","ode,owed","oh,owe","once,wants","one,won","oohs,ooze","overseas,oversees","paced,paste","packed,pact","pail,pale","pain,pane","pair,pear,pare","palate,pallet,palette","parish,perish","passed,past","patience,patients","pause,paws","peace,piece","peak,pique,peek","peal,peel","pearl,purl","pedal,petal,peddle","peer,pier","penance,pennants","per,purr","pi,pie","plain,plane","plainer,planer,planar","plait,plate","pleas,please","pole,poll","poor,pour,pore","populace,populous","praise,preys,prays","pray,prey","precedence,precedents","premier,premiere","presence,presents","pride,pried","prier,prior","pries,prize","prince,prints","principal,principle","profit,prophet","rack,wrack","raid,rayed","rail,rale","rain,rein,reign","raise,raze,rays","rap,wrap","rapt,wrapped,wrapt","re-cover,recover","re-lay,relay","read,red","read,reed","real,reel","recede,reseed","reek,wreak","residence,residents","rest,wrest","retch,wretch","rhyme,rime","right,write,rite,wright","ring,wring","ringer,wringer","rise,ryes","road,rowed,rode","roe,row","roil,royal","role,roll","roomer,rumor,rumour","root,route","rose,rows","rote,wrote","rude,rued","rues,ruse","rung,wrung","rye,wry","sail,sale","scene,seen","sea,see","seam,seem","sear,seer","seas,seize,sees","sects,sex","sew,sow,so","shake,sheik","shear,sheer","shoe,shoo","sic,sick","sics,six","side,sighed","sighs,size","sign,sine","slay,sleigh","sleight,slight","slew,slough","soar,sore","soared,sword","sold,soled","sole,soul","some,sum","son,sun","stair,stare","stake,steak","steal,steel","step,steppe","storey,story","straight,strait","suite,sweet","tacked,tact","tacks,tax","tail,tale","taper,tapir","tarry,terry","taught,taut","tea,tee","team,teem","tears,tiers","teas,tees,tease","tense,tents","than,then","there,they're,their","threw,through","throne,thrown","thyme,time","tide,tied","tier,tire","tighten,titan","to,two,too","toad,towed,toed","toe,tow","told,tolled","tracked,tract","tray,trey","udder,utter","vain,vein,vane","vale,veil","vial,vile","vice,vise","wade,weighed","wail,whale","waist,waste","wait,weight","waive,wave","waiver,waver","wale,whale","war,wore","ward,warred","ware,where,wear","warn,worn","wax,whacks","way,whey,weigh","we,wee","we'd,weed","we'll,wheel,weal,wheal","we're,weir,were","we're,whir","we've,weave","weak,week","wearer,where're","weather,whether","wet,whet","wheeled,wield","which,witch","while,wile","whiled,wild","whine,wine","whined,wined,wind","whirled,world","whit,wit","whither,wither","who's,whose","whoa,woe","wood,would","yack,yak","yaw,your,yore,you're","yoke,yolk","yore,your,you're","you'll,Yule","aahed,odd","adieu,ado","ant,aunt","aural,oral","marry,merry","rout,route","seated,seeded","shone,shown","tidal,title","trader,traitor","vary and very"];
		var word_sets = homophones.map(function(x) {
			return x.toLocaleLowerCase().trim().split(',');
		}),
			dictionary = {};
		word_sets.forEach(function(set) {
			set.forEach(function(word) {
				dictionary[word] = set;
			});
		});

		return dictionary;
	}

	// Generate wrong key typos
	function wrongKeyTypos(word) {
		var word = word.toLocaleLowerCase(),
			typos = [],
			length = word.length;

		for(var i = 0; i < length; i++ ) {
			if(keyboard[word[i]]) {
				var tempWord = word;
				keyboard[word[i]].forEach(function(character) {
					typos.push(tempWord.replaceAt(i, character).trim());
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

	// Get bit-squatting typos
	// Inspired by http://www.morningstarsecurity.com/research/urlcrazy
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

	// Genereate Homephone Typos
	function homophoneTypos(word) {
		var homophones = getHomophones(),
			word = word.toLocaleLowerCase(),
			typos = [];

		for(var key in homophones) {
			if(word.indexOf(key) !== -1) {
				homophones[key].forEach(function(homophone) {
					if(word.replace(new RegExp(key, "g"), homophone).replace(/ /g, '') !== word) {
						typos.push(word.replace(new RegExp(key, "g"), homophone).replace(/ /g, ''));
					}
				});
			}
		}

		return typos;
	}

	keywords.forEach(function(keyword) {
		if(options.wrongKeys) {
			typos.push(wrongKeyTypos(keyword));
		}
		if(options.missedChars) {
			typos.push(missedCharsTypos(keyword));
		}
		if(options.transposedChars) {
			typos.push(transposedCharTypos(keyword));
		}
		if(options.doubleChars) {
			typos.push(doubleCharTypos(keyword));
		}
		if(options.flipBits) {
			typos.push(bitflipping(keyword));
		}
		if(options.generateHomophones) {
			typos.push(homophoneTypos(keyword));
		}
	});

	// Flatten the array of typos
	return typos.reduce(function(a, b) {
		return a.concat(b);
	});
};