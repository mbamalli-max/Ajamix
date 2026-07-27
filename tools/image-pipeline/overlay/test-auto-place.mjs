import { autoPlaceLabels } from "./auto-place-labels.mjs";
import { compose } from "./compositor.mjs";

const cases = [
  {
    name: "Case A",
    outputPath: "tools/image-pipeline/output/overlay-test/auto-place-case-a.png",
    input: {
      baseArtwork: "tools/image-pipeline/output/raw/style-b-p3-socs-01.png",
      canvas: { width: 1536, height: 1024 },
      title: { textHa: "Ma’ana da Muhimmancin Nazarin Zamantakewa" },
      labels: [
        { id: "hadin-kai", text: "Hadɗin kai", targetPoint: { x: 260, y: 560 } },
        { id: "kayan-jamaa", text: "Kayan jama’a", targetPoint: { x: 700, y: 820 } },
      ],
      font: {
        latinFamily: "DejaVu Sans",
        ajamiFamily: "DejaVu Sans",
        size: 28,
        lineHeight: 1.2,
      },
    },
  },
  {
    name: "Case B",
    outputPath: "tools/image-pipeline/output/overlay-test/auto-place-case-b.png",
    input: {
      baseArtwork: "tools/image-pipeline/output/raw/style-b-p3-socs-02.png",
      canvas: { width: 1536, height: 1024 },
      title: { textHa: "Yankin Ǝaramar Hukumarmu" },
      labels: [
        { id: "ofishin", text: "Ofishin Ǝaramar Hukuma", targetPoint: { x: 770, y: 250 } },
        { id: "kasuwa", text: "Kasuwa", targetPoint: { x: 250, y: 250 } },
        { id: "wurin-ruwa", text: "Wurin ruwa", targetPoint: { x: 1280, y: 200 } },
        { id: "makaranta", text: "Makaranta", targetPoint: { x: 250, y: 780 } },
        { id: "cibiyar-lafiya", text: "Cibiyar lafiya", targetPoint: { x: 1280, y: 780 } },
      ],
      font: {
        latinFamily: "DejaVu Sans",
        ajamiFamily: "DejaVu Sans",
        size: 28,
        lineHeight: 1.2,
      },
    },
  },
];

for (const testCase of cases) {
  const result = await autoPlaceLabels(testCase.input);
  await compose(result.record, testCase.outputPath);
  console.log(`${testCase.name} unplaceable: ${JSON.stringify(result.unplaceable)}`);
  console.log(`${testCase.name} output: ${testCase.outputPath}`);
}
