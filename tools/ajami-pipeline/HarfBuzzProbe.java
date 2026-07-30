/*
 * Tooling-only bridge to the HarfBuzz 8.2.2 shaper bundled with the installed
 * JDK. This does not participate in the AJAMIX runtime.
 *
 * Input (stdin):  test-id<TAB>base64-encoded-UTF-8-text
 * Output:         tab-separated glyph records for one RTL run per input line
 */

import java.awt.Font;
import java.awt.font.FontRenderContext;
import java.awt.font.GlyphMetrics;
import java.awt.font.GlyphVector;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Locale;

public final class HarfBuzzProbe {
  private static String number(float value) {
    if (Math.abs(value) < 0.00005f) value = 0;
    return String.format(Locale.ROOT, "%.4f", value);
  }

  public static void main(String[] args) throws Exception {
    if (args.length != 1) {
      throw new IllegalArgumentException("usage: HarfBuzzProbe /path/to/font.ttf");
    }

    Font loaded = Font.createFont(Font.TRUETYPE_FONT, new File(args[0]));
    Font font = loaded.deriveFont(2048f);
    FontRenderContext context = new FontRenderContext(
      new AffineTransform(),
      true,
      true
    );

    try (BufferedReader input = new BufferedReader(
      new InputStreamReader(System.in, StandardCharsets.UTF_8)
    )) {
      String line;
      while ((line = input.readLine()) != null) {
        if (line.isBlank()) continue;
        String[] fields = line.split("\\t", 2);
        String testId = fields[0];
        String text = new String(
          Base64.getDecoder().decode(fields[1]),
          StandardCharsets.UTF_8
        );
        char[] characters = text.toCharArray();
        GlyphVector shaped = font.layoutGlyphVector(
          context,
          characters,
          0,
          characters.length,
          Font.LAYOUT_RIGHT_TO_LEFT
        );
        int count = shaped.getNumGlyphs();
        int[] glyphIds = shaped.getGlyphCodes(0, count, null);
        GlyphVector nominal = font.createGlyphVector(context, glyphIds);
        StringBuilder glyphs = new StringBuilder();

        for (int index = 0; index < count; index += 1) {
          if (index > 0) glyphs.append(';');
          Point2D origin = shaped.getGlyphPosition(index);
          Point2D nextOrigin = shaped.getGlyphPosition(index + 1);
          Point2D nominalOrigin = nominal.getGlyphPosition(index);
          GlyphMetrics metrics = nominal.getGlyphMetrics(index);
          glyphs
            .append(glyphIds[index]).append(',')
            .append(shaped.getGlyphCharIndex(index)).append(',')
            .append(number((float) origin.getX())).append(',')
            .append(number((float) origin.getY())).append(',')
            .append(number((float) (nextOrigin.getX() - origin.getX()))).append(',')
            .append(number((float) (nextOrigin.getY() - origin.getY()))).append(',')
            .append(number(metrics.getAdvanceX())).append(',')
            .append(number((float) (origin.getX() - nominalOrigin.getX()))).append(',')
            .append(number((float) origin.getY()));
        }

        Point2D terminal = shaped.getGlyphPosition(count);
        System.out.println(
          testId + "\t" +
          count + "\t" +
          shaped.getLayoutFlags() + "\t" +
          number((float) terminal.getX()) + "\t" +
          number((float) terminal.getY()) + "\t" +
          glyphs
        );
      }
    }
  }
}
