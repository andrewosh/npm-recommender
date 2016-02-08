# npm-recommender
NPM Recommender recommends Node packages based on the contexts in which they've been frequently used in the past. Under the hood, it constructs a set of "sentences" out of every package's `dependencies` and `devDependencies` and then feeds those to word2vec, an algorithm developed by Google which learns co-occurrence patterns of words in an input corpus. There are tons of awesome packages on NPM, and sometimes the most useful way to find new ones is to look at what those developers who have been in your position already used to solve their problems! NPM's built-in search feature appears to index packages by their names and a set of tags, which often don't describe (at least not uniquely, i.e. "build") their actual functions. Augmenting the info declared in package.json with additional contextual information seems like a good way forward, and if you have ideas for cool enhancements definitely open an issue!

The site is live at http://npmrec.com !

### Usage
An endpoint that serves the top 30 similar packages is publicly available at http://npmrec.com/api/similar

#### Example
```
GET http://npmrec.com/api/similar/<packageName>
[
	{	
		"word": similar-package,
		"dist": 0.9112,
		"description": This package is frequently used alongside packageName

	}
	...
]
```
