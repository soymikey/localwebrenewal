import { writeFile, mkdir } from "node:fs/promises";

const MENU_URL =
  "https://pos.chowbus.com/online-ordering/store/fushimi-williamsburg/22125";

const categoryHints = {
  "Soup *": "汤类",
  "Salad *": "沙拉",
  "Hot Appetizers *": "热前菜",
  "Cold Appetizers *": "冷前菜",
  "Sushi Bar Entrees *": "寿司吧主菜",
  "Kitchen Entrees *": "厨房主菜",
  "Signature Roll *": "招牌卷",
  "Classic Roll / Hand Roll *": "经典卷 / 手卷",
  "Vegetarian Roll *": "素食卷",
  "Nigiri Sushi & Sashimi *": "握寿司和刺身",
  "Sharing For Table *": "多人分享",
  "Side *": "配菜",
  "Soda & Beverages": "饮料",
  "Additional Sauce *": "酱料",
};

const chineseNames = new Map([
  ["miso soup", "味噌汤"],
  ["seafood bisque", "海鲜浓汤"],
  ["lobster miso soup", "龙虾味噌汤"],
  ["seafood hot & sour soup", "海鲜酸辣汤"],
  ["lobster bisque", "龙虾浓汤"],
  ["seaweed salad", "海藻沙拉"],
  ["kani salad", "蟹柳沙拉"],
  ["fushimi salad", "Fushimi 沙拉"],
  ["grilled chicken salad", "烤鸡沙拉"],
  ["goat cheese salad", "山羊奶酪沙拉"],
  ["aromatic duck salad", "香鸭沙拉"],
  ["edamame", "毛豆"],
  ["spicy edamame", "辣味毛豆"],
  ["shrimp shumai", "虾烧卖"],
  ["vegetable spring rolls", "蔬菜春卷"],
  ["grilled shishito peppers skewer", "烤狮子椒串"],
  ["homemade gyoza pork", "猪肉煎饺"],
  ["homemade gyoza vegetable", "蔬菜煎饺"],
  ["rock shrimp tempura", "炸岩虾天妇罗"],
  ["crispy calamari", "炸鱿鱼"],
  ["crab & spinach dip", "蟹肉菠菜蘸酱"],
  ["roasted duck", "烤鸭"],
  ["petit filet mignon", "小份菲力牛排"],
  ["short rib", "牛小排"],
  ["crab cakes", "蟹饼"],
  ["truffle avocado crispy sushi", "松露牛油果脆米寿司"],
  ["tuna tapas", "金枪鱼小食"],
  ["salmon tapas", "三文鱼小食"],
  ["spicy tuna gyoza", "辣金枪鱼饺子"],
  ["yellowtail jalapeno", "黄尾鱼墨西哥辣椒"],
  ["bluefin tuna tartare", "蓝鳍金枪鱼塔塔"],
  ["sashimi pizza", "刺身披萨"],
  ["chef's sushi", "主厨寿司"],
  ["chef sashimi", "主厨刺身"],
  ["chicken teriyaki", "照烧鸡"],
  ["wild sea shrimp teriyaki", "照烧海虾"],
  ["rib eye steak 10oz", "10盎司肉眼牛排"],
  ["salmon teriyaki", "照烧三文鱼"],
  ["grilled chilean seabass", "烤智利海鲈鱼"],
  ["duck confit fried rice", "油封鸭炒饭"],
  ["fushimi fried rice", "Fushimi 炒饭"],
  ["sesame crusted ahi tuna", "芝麻裹黄鳍金枪鱼"],
  ["blue fin tuna", "蓝鳍金枪鱼"],
  ["maguro", "金枪鱼"],
  ["octopus", "章鱼"],
  ["tako", "章鱼"],
  ["eel", "鳗鱼"],
  ["unagi", "鳗鱼"],
  ["yellowtail", "黄尾鱼"],
  ["hamachi", "黄尾鱼"],
  ["salmon", "三文鱼"],
  ["sake", "三文鱼"],
  ["scallop", "扇贝"],
  ["hotate", "扇贝"],
  ["red snapper", "红鲷鱼"],
  ["madai", "真鲷"],
  ["shrimp", "虾"],
  ["ebi", "虾"],
  ["flying fish roe", "飞鱼籽"],
  ["tobiko", "飞鱼籽"],
  ["salmon roe", "三文鱼籽"],
  ["ikura", "三文鱼籽"],
  ["sea urchin", "海胆"],
  ["uni", "海胆"],
  ["california roll", "加州卷"],
  ["spicy tuna", "辣金枪鱼卷"],
  ["spicy salmon", "辣三文鱼卷"],
  ["salmon avocado", "三文鱼牛油果卷"],
  ["tuna avocado", "金枪鱼牛油果卷"],
  ["philadelphia roll", "费城卷"],
  ["shrimp tempura roll", "虾天妇罗卷"],
  ["eel avocado", "鳗鱼牛油果卷"],
  ["avocado roll", "牛油果卷"],
  ["cucumber roll", "黄瓜卷"],
  ["sweet potato tempura roll", "红薯天妇罗卷"],
]);

function decodeHtml(value = "") {
  return value
    .replace(/<!-- -->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanName(name) {
  return decodeHtml(name).replace(/\s*\*\s*$/g, "").trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function chineseFor(name) {
  const normalized = name.toLowerCase().replace(/\s*\*\s*$/g, "").trim();
  return chineseNames.get(normalized) ?? "";
}

const response = await fetch(MENU_URL);
if (!response.ok) {
  throw new Error(`Failed to fetch menu: ${response.status}`);
}

const html = await response.text();
const sectionPattern =
  /<div class="Desktop_mealWithCategorySection__[^"]*" id="([^"]+)"[\s\S]*?(?=<div class="Desktop_mealWithCategorySection__|<div class="Desktop_footer|$)/g;
const itemPattern =
  /<span class="MealCard_mealName__[^"]*">([\s\S]*?)<\/span>(?:<span class="MealCard_mealDesc__[^"]*">([\s\S]*?)<\/span>)?[\s\S]*?<span class="MealCard_mealPrice__[^"]*">([\s\S]*?)<\/span>[\s\S]*?<img alt="[^"]*"[^>]*src="([^"]+)"/g;

const categories = [];
const items = [];

for (const sectionMatch of html.matchAll(sectionPattern)) {
  const [, sourceCategoryId] = sectionMatch;
  const sectionHtml = sectionMatch[0];
  const categoryMatch = sectionHtml.match(
    /<div class="MealWithCategorySection_categoryHeader__[^"]*">([\s\S]*?)<\/div>/,
  );
  if (!categoryMatch) continue;

  const category = decodeHtml(categoryMatch[1]);
  categories.push({
    id: slugify(category),
    name: category,
    chinese: categoryHints[category] ?? "",
    sourceCategoryId,
  });

  for (const itemMatch of sectionHtml.matchAll(itemPattern)) {
    const [, rawName, rawDescription = "", rawPrice, imageUrl] = itemMatch;
    const name = cleanName(rawName);

    items.push({
      id: slugify(`${category}-${name}`),
      name,
      chinese: chineseFor(name),
      category,
      categoryChinese: categoryHints[category] ?? "",
      description: decodeHtml(rawDescription),
      price: decodeHtml(rawPrice).replace(/[^\d.+]/g, ""),
      imageUrl: decodeHtml(imageUrl),
      source: "Chowbus POS",
      sourceUrl: MENU_URL,
    });
  }
}

const output = {
  restaurant: {
    name: "Fushimi Williamsburg",
    address: "475 Driggs Avenue, Brooklyn, NY 11211",
    phone: "+1 (718) 963-2555",
    sourceUrl: MENU_URL,
    fetchedAt: new Date().toISOString(),
  },
  categories,
  items,
};

await mkdir("data", { recursive: true });
await writeFile("data/menu-data.json", `${JSON.stringify(output, null, 2)}\n`);

console.log(
  `Saved ${items.length} items in ${categories.length} categories to data/menu-data.json`,
);
