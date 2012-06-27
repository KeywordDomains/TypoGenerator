TypoGenerator
=============

JavaScript based typo generator. Currently supports Wrong Key Typos”, “Missed Characters”, “Transposed Characters”, “Double Characters”, germand and english "Homophonetic Typos" and “flipped Bit Typos” aka “Cosmic Rays”.


Example Usage
-------------

`generateTypos(['bielefeld, münster'], {
	wrongKeys: true,
	missedChars: true,
	transposedChars: true,
	doubleChars: true,
	flipBits: true,
	generateHomophones: true
});`