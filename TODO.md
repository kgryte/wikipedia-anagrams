TODO
====

1. CLI
2. web server
3. bootstrap ui
4. create a middleware style pipeline for testing
5. 
6. 
7. parse URLs
	-	basic support is there but needs to be polished
8. 
9. modules
	-	compute-anagram-hash
	-	wikipedia-anagrams
10. create custom method to request page from Wikipedia
	-	detect non-existent page, etc
		-	provide feedback to user
	-	currently, a non-existent page and a page without anagrams return the same result
		-	should this be the case, or some other feedback?
	- 	could make the module an event emitter and emit warnings, errors, etc.
11. two analyses
	-	sep pages, sep anagram output
	-	sep pages, but treat a single corpus
12. change fcn name to `analyze`???
13. 



### Analytics

1.	between anagram comparison
	-	frequency
	-	how freq is one anagram (word) relative to another anagram (word) having the same characters
	-	requires keeping track of occurrence; although, this is solved by keeping track of index, as required below
2.	anagram frequency as a function of word length
	-	more letters, more possible (spurious) combinations
3.	anagram frequency on page
	-	relative measure
	-	e.g., `dog` is more freq than `god`
	-	this is similar to above!
4.	anagram frequency between pages
	-	this seq of chars more frequent than another set of chars
		-	set of characters has higher prob of generating anagrams
5.	breakdown of anagram composition
	-	x a's, y t's, etc.
	-	what is the most frequent letter in found anagrams
6.	edit distance between anagrams
	-	avg distance
7.	distance between anagram occurrence
	-	requires keeping track of index where anagram occurred
8. 
