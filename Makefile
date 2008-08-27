all:
	cd chrome && jar cvf muttkeys.jar content
	jar cvf muttkeys-0.1.xpi install.rdf chrome