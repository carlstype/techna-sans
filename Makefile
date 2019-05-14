all:
	./generate.py

serve: all
	jekyll serve --host 0.0.0.0 &
	when-changed *.sfd -c ./generate.py

clean:
	rm -rf *.otf _site
