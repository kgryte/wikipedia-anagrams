TODO
====

1. CLI
2. web server
3. bootstrap ui
4. create a middleware style pipeline for testing
5. make language an additional `option` (3rd argument)
6. analytics
	-	between anagram comparison
		-	frequency
		-	how freq is one anagram (word) compared to another anagram (word) having the same characters
		-	requires keeping track of occurrence; although, this is solved by keeping track of index, as required below
	-	anagram frequency as a function of word length
		-	more letters, more possible (spurious) combinations
	-	anagram frequency on page
		-	relative measure
		-	e.g., `dog` is more freq than `god`
		-	this is similar to above!
	-	anagram frequency between pages
		-	this seq of chars more frequent than another set of chars
			-	set of characters has higher prob of generating anagrams
	-	breakdown of anagram composition
		-	x a's, y t's, etc.
		-	what is the most frequent letter in found anagrams
	-	edit distance between anagrams
		-	avg distance
	-	distance between anagram occurrence
		-	requires keeping track of index where anagram occurred
7. parse URLs
	-	allow either topic or url input
8. option
	-	treat multiple pages as a single corpus or as separate corpus
	-	for separate case, ability to either merge the results into a single array or create a hash listing the anagrams for each page separately
9. modules
	-	compute-anagram-hash
	-	compute-find-anagrams
		-	use anagram-hash
	-	wikipedia-anagrams
10.  
