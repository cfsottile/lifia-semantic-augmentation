### dbpedia movies' properties about music
- dbo:musicComposer
- dbp:music

Well, in a first approach, we decided to split the content into two sections:
- IMDb soundtrack data
- DBpedia soundtrack data

Since, according to a general overview, DBpedia just holds information about music composer, we won't insert a youtube link to a search for "composer" + "movie", but we will insert an embedded player for

On the other hand, IMDb doesn't always has information about the soundtrack, so, when it does, we'll generate a list of them, and will include a link to that song at youtube or an embedded player with it.

So:

1. IMDb soundtrack data:
	2. Check *Soundtrack div* existence.
	3. Get list of songs with name and performer from url + soundtrack. **DONE**
	4. Get video ID for song. **DONE**
	5. Insert url or embedded video of the song in DOM. **DONE**
6. DBpedia soundtrack data:
	7. Get list of music composers from DBpedia.
	8. Generate youtube link or embedded player for every "composer + movie".
