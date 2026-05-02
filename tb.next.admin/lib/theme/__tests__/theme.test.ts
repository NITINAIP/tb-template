import theme from "@/lib/theme";

describe("MUI theme", () => {
  it("exports a theme object", () => {
    expect(theme).toBeDefined();
    expect(typeof theme).toBe("object");
  });

  it("has a palette property", () => {
    expect(theme.palette).toBeDefined();
  });

  it("has the correct primary brand color", () => {
    expect(theme.palette.primary.main).toBe("#fe9a00");
  });

  it("has the correct primary light and dark shades", () => {
    expect(theme.palette.primary.light).toBe("#ffb84d");
    expect(theme.palette.primary.dark).toBe("#cc7700");
  });

  it("has the correct secondary palette color", () => {
    expect(theme.palette.secondary.main).toBe("#757575");
  });

  it("uses Segoe UI as the base font family", () => {
    expect(theme.typography.fontFamily).toContain("Segoe UI");
  });

  it("has h1 typography with font weight 600", () => {
    expect(theme.typography.h1).toMatchObject({ fontWeight: 600 });
  });

  it("has the correct error color", () => {
    expect(theme.palette.error.main).toBe("#c4373e");
  });

  it("has the correct background default color", () => {
    expect(theme.palette.background.default).toBe("#ffffff");
  });
});
