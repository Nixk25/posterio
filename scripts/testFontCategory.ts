import { getFontCategory } from "../lib/fontCategories";

console.log("Testing font category detection:");
console.log("arial ->", getFontCategory("arial"));
console.log("helvetica ->", getFontCategory("helvetica"));
console.log("Arial ->", getFontCategory("Arial"));
console.log("Helvetica ->", getFontCategory("Helvetica"));
console.log("brushscript ->", getFontCategory("brushscript"));
console.log("BrushScript ->", getFontCategory("BrushScript"));
