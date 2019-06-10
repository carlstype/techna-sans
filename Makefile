all:
	fontforge -lang=py -script generate.py
	cp *.otf test

serve: all
	jekyll serve --host 0.0.0.0 --source test &
	when-changed *.sfd -c make

clean:
	rm -rf *.otf test/*.pdf _site
