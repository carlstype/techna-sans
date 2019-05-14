#!/usr/bin/python

import fontforge
import os
import sys

sources = [
    'TTUU-Regular.sfd'
    ]

raw = len(sys.argv) > 1 and sys.argv[1] == 'raw'

for source in sources:
    output = os.path.splitext(source)[0] + '.otf'
    print('Generating {}{}'.format(('raw ' if raw else ''), output))
    font = fontforge.open(source)
    font.selection.all()
    font.round()
    font.unlinkReferences()
    if not raw:
        font.removeOverlap()
        font.simplify()
    #      font.autoHint()
    #  if raw:
    #      font.generate(output, flags=('no-hints', 'no-flex', 'opentype'))
    #  else:
    #      font.generate(output, flags=('opentype'))
    font.generate(output, flags=('no-hints', 'no-flex', 'opentype'))
