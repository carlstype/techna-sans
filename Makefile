all:
	fontforge -lang=py -script generate.py

serve: all
	jekyll serve --host 0.0.0.0 &
	when-changed *.sfd -c make

clean:
	rm -rf *.otf _site
