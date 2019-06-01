#!/usr/bin/python

import fontforge
import os
import sys

sources = [
    'TechnaSans-Regular.sfd'
    ]

raw = len(sys.argv) > 1 and sys.argv[1] == 'raw'

for source in sources:
    output = os.path.splitext(source)[0] + '.otf'
    print('Generating {}{}'.format(('raw ' if raw else ''), output))
    font = fontforge.open(source)
    font.selection.all()
    # TODO: Keep anchors for all letters and diacritics.
    font.unlinkReferences()
    if not raw:
        font.removeOverlap()
        font.simplify()
    #      font.autoHint()
    #  if raw:
    #      font.generate(output, flags=('no-hints', 'no-flex', 'opentype'))
    #  else:
    #      font.generate(output, flags=('opentype'))
    font.round()
    font.addExtrema()

    # TODO: Copy e.g. space to nbspace automatically.

    # TODO: Automatically generate accented characters?
    # Watch out for combos that need extra spacing, e.g. lcaron.

    # Since we're using simplified encoding for design in FontForge
    font.encoding = 'unicode'
    font.generate(output, flags=('no-hints', 'no-flex', 'opentype'))
