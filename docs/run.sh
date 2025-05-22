#!/bin/bash

# UTF-8 podešavanje za okruženje
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"

# Ulazni fajlovi - OBAVEZNO da budu u ispravnom redoslijedu prema strukturi rada
input_files=(
	temp.md
	Last.md
)

# Privremeni fajl za naslovnu bez broja stranice
temp_title="naslovna_temp.md"

# Izlazni fajl
output_file="e2e.pdf"

# Pandoc opcije
options=(
  --resource-path=../images
  -o "$output_file"
  --pdf-engine=xelatex
  --number-sections
  --citeproc
  --bibliography=references.bib
  --csl=ieee.csl
  --variable monofontoptions=Scale=0.8
  -V mainfont="Georgia"
  -V monofont="JetBrains Mono"
  -V linestretch=1.3
  -V geometry:top=2.5cm,left=3.5cm,right=2.5cm,bottom=2.5cm
  -V documentclass=article
  -V linkcolor=black
  -V urlcolor=blue
  -V colorlinks=true
  -H header.tex
)

# Uklanjanje broja stranice s naslovne strane (PDF trik)
# Dodaje se LaTeX direktiva da ne broji prvu stranicu
#{
#  echo '\pagenumbering{gobble}'  # Onemogući brojeve stranica
#  cat naslovna.md
#  echo '\newpage\pagenumbering{arabic}'  # Ponovno uključi numeraciju od sljedeće stranice
#} > "$temp_title"

# Zamjena naslovne strane u listi fajlova
#input_files[0]="$temp_title"

# Pokreni Pandoc
pandoc "${input_files[@]}" "${options[@]}"

# Očisti privremene fajlove
rm -f "$temp_title"

