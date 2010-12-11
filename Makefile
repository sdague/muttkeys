all:
	cd chrome && jar cvf muttkeys.jar content
	jar cvf muttkeys-0.3.xpi install.rdf chrome

clean:
	rm -f chrome/muttkeys.jar
	rm -f muttkeys-*.xpi
