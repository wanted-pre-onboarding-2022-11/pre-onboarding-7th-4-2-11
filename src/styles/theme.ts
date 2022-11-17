const COLORS = {
  BLACK: "#3A474E",
  WHITE: "#FFFFFF",
  DARK_BLUE: "#191970",
  BLUE: "#586CF5",
  GRAY: "#94A2AD",
  BORDER: "#D1D8DC",
  BUTTON: "#D1D8DC",
  LIGHT_GRAY: "#F6F7F8",
} as const;

const FONT_SIZE = {
  X_LARGE: "1.3rem",
  LARGE: "1rem",
  MEDIUM: "0.8rem",
  SMALL: "0.9rem",
} as const;

const FONT_WEIGHT = {
  BOLD: "900",
  MEDIUM: "700",
  REGULAR: "500",
  LIGHT: "100",
} as const;

const FONT = {
  SIZE: FONT_SIZE,
  WEIGHT: FONT_WEIGHT,
} as const;

export { COLORS, FONT };
