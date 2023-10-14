from barcode import Code128
from barcode.writer import SVGWriter
import csv
from lxml import etree
from io import BytesIO
from subprocess import check_call
from pathlib import Path
import shutil

# dependencies: lxml and python-barcode python packages, texlive, librsvg

master_svg = etree.parse("master.svg")
barcode_writer = SVGWriter()

cards_dir = Path("cards")
if cards_dir.exists():
  shutil.rmtree(cards_dir)
cards_dir.mkdir()

print("Generating SVGs")
with open('people.csv') as people_csv:
  reader = csv.DictReader(people_csv)
  for row in reader:
    if row["print_set_1"] == "":
      continue

    master_svg.xpath("//*[@id='first_row']")[0].text = row['first_row']
    master_svg.xpath("//*[@id='second_row']")[0].text = row['second_row']

    barcode_stream = BytesIO()
    Code128(row['barcode'][4:], writer=barcode_writer).write(barcode_stream)
    barcode_svg = etree.fromstring(barcode_stream.getvalue())

    barcode_group = master_svg.xpath("//*[@id='barcode_group']")[0]

    for child in barcode_group.getchildren():
      barcode_group.remove(child)

    for barcode_rect in barcode_svg.xpath("//*[@style='fill:black;']"):
      barcode_group.append(barcode_rect)

    master_svg.write(f"cards/{row['first_row']} {row['second_row']}.svg")

print("Converting to PDF")
check_call("rsvg-convert -f pdf -o set1.pdf cards/*.svg", shell=True)

print("N-up")
check_call("pdfjam set1.pdf --nup 3x3 --landscape --paper a4paper --noautoscale true -o set1-nup.pdf", shell=True)