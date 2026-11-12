import { buttonRecipe } from "./button.recipe";
import { badgeRecipe } from "./badge.recipe";
import { inputRecipe, textareaRecipe, nativeSelectRecipe } from "./field.recipe";
import { cardRecipe } from "./card.recipe";
import { tabsRecipe } from "./tabs.recipe";
import { tableRecipe } from "./table.recipe";
import { alertRecipe } from "./alert.recipe";
import { dialogRecipe } from "./dialog.recipe";

export {
  buttonRecipe,
  badgeRecipe,
  inputRecipe,
  textareaRecipe,
  nativeSelectRecipe,
  cardRecipe,
  tabsRecipe,
  tableRecipe,
  alertRecipe,
  dialogRecipe,
};

export const recipes = {
  button: buttonRecipe,
  badge: badgeRecipe,
  input: inputRecipe,
  textarea: textareaRecipe,
};

export const slotRecipes = {
  card: cardRecipe,
  nativeSelect: nativeSelectRecipe,
  tabs: tabsRecipe,
  table: tableRecipe,
  alert: alertRecipe,
  dialog: dialogRecipe,
};
