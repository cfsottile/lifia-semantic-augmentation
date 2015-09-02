### dbpedia movies' properties about music
- dbo:musicComposer
- dbp:music

Well, in a first approach, we decided split the content into two sections:
- IMDb soundtrack data
- DBpedia soundtrack data

Since, according to a general overview, DBpedia just holds information about music composer, we won't insert a youtube link to a search for "composer" + "movie", but we will insert an embedded player for 

On the other hand, IMDb not always has information about the soundtrack, so, when it does, we'll generate a list of them, and will include a link to that song at youtube or an embedded player with it.

So:

1. IMDb soundtrack data:
	2. Check *Soundtrack div* existence.
	3. Get list of songs with name and performer from url + locations.
	4. Get song url or embedded video of the song.
5. DBpedia soundtrack data:
	6. Get list of music composers from DBpedia.
	7. Generate youtube link or embedded player for every "composer + movie".