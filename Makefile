all:
	fontforge -lang=py -script generate.py
	cp *.otf test

serve: all
	jekyll serve --host 0.0.0.0 --source test &
	when-changed *.sfd -c make

release: all
	rm -rf techna-sans techna-sans.zip
	mkdir techna-sans
	cp *.otf LICENSE.txt techna-sans
	zip -r techna-sans.zip techna-sans
	rm -r techna-sans

# Clean export for the master branch
master: all
	rm -rf master
	mkdir master
	cp -r *.otf *.sfd LICENSE.txt README.md master
	mkdir master/specimen
	cp specimen/*.png master/specimen
clean:
	rm -rf *.otf test/*.otf test/proof.pdf _site techna-sans techna-sans*.zip master
