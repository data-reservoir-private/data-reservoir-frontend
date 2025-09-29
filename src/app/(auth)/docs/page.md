# **Documentation**

Welcome to Data Reservoir where I present all of my data mined from various sources.

## **Overview**

So, there is a lot to be talked about, especially when you just landed on dashboard. Congrats. The (solo) dev has already trusted you to use this website accordingly. I am keeping my eyes to make sure you are not blowing up my website.

So there are four terms

- Entries = Total entry of master data (not including transactions). For example, 10 products with 5 tags will be counted as 10 entries
- Rows = Actual row count inside a database's table. 10 products with 5 tags each will be considered 10 (products) + 50 (product -> tag) + 5 (tag) = 65 rows
- Datasets = Total datasets that are downloadable
- Tables = Total tables inside database

That's it. More will be added later. But now, I will just document the appendix.

## **Hayday Effort Score**

Effort score is a rough score measuring the difficulty on getting such products. Rules are described as follows:

- General Rule and Crops

  Based on time only, an effort score is equal to 600s

  - Wheat needs 120s to make, so it has `120/600 = 0.2` effort score.
  - Potato needs 13200s (3h40m) to make, so it has `13200/600 = 22.0` effort score

  For crops, we can use this rule since you just need to wait to get one.
- Animal Products

  For this products, we need to account for their feed, so we will sum the time for you to make their feed and the time for your animals to mature. This is easy for eggs, milks, bacons, and wools.
  This also true for lobster tails, fish fillets, and duck feathers (trap + catch + mature).

  However, for honeycombs and peanuts, this is a bit tricky since it factors on how many workers (bees or squirrels) you have. But, for now, I will trust its wiki. So I will take the wiki's number and divide it by 600 as usual.
- Bushes / Trees

  Again, this is not simple since for a time given, you can harvest 2 → 3 → 4 → 4 products. For now, let's just generalize everything. You can harvest 13 products in one cycle. Assuming you will replant the trees/bushes after their death and you will get instant revival help, the calculation goes as follow:

  - There will be 4 cycle of waiting. Define `T` as waiting time. This means `T * 4` waiting time
  - There are 13 fruits that can be harvested
  - So, we can use `T * 4 / 13` as formula
  - For example, an apple tree needs `57600` seconds per interval. This means `T = 57600`, so we can plug that number below:
    $$
    \begin{gather*}
      \begin{split}
      E = \frac{T * 4}{13 * 600} \\\\
      E = \frac{57600 * 4}{13 * 600} \\\\
      E = \frac{230400}{7800} \\\\
      E = 29.5384 \\\\
      E \approx 29.5
      \end{split}
      \end{gather*}
    $$
  - We only care about the first number behind, so we round them.
- Processed

  - Based on previous effort score, processed food's effort score can be calculated using this formula:

    $$
    \begin{equation}
      E = \Sigma_{i=1}^k(E' * n) + \frac{t}{600}
      \end{equation}
    $$

    ```
    E  = Effort score
    E' = Effort score of ingredients
    n  = Quantity
    t  = Time to produce in seconds
    ```

    In short, it is the sum of its ingredient's effort and quantity + time to produce divided by 600. For this case, we need a recursive calculation since a processed product might depend on another, so for sandwiches, you need to calculate the effort score of breads.
  - After some analysis, I realized that jellybeans have a bit off number compared to feta salad. (500 vs 2000). We know Jellybean is exhausting to make, so I introduce a penalty to waiting time. In short, the longer the waiting time, the higher effort becomes.

    After some testing, I discovered a thing that satisfies my personal grudge. Here is the updated formula

    $$
    \begin{equation}
      E = [\Sigma_{i=1}^k(E' * n)] + (\frac{t * ln(1 + t)}{600})
      \end{equation}
    $$

    The change is inside the `t` variable where we will multiple a product's producing time by a penalty that will increase logarithmically. So, jelly beans, which needs a whopping 24 hours will face significant penalty increase. Why am I using ln? because why not lol.

    To make my data a bit unopinionated, I will include the first and second effort score inside my data. Keep in mind that this calculation is only for processed products. Rest will still stick on usual algorithm.
- Others

  - For ores, I will pick `2` arbitrarily, but let me know if you can give me better numbers
  - For supplies, I will give `0` since it doesnt do any contribution towards any processed products.

With that in mind, I will use this Typescript code to calculate all of them:

```tsx
interface IProduct
{
  id: string,
  name: string,
  category: string,
  price: number,
  time: number,
  isRaw: boolean,
  effort?: number
}

interface IProductIngredient
{
  productId: string,
  ingredientId: string,
  quantity: number
}

// Fill your own data
const DATA_PRODUCT: IProduct[] = [];
const DATA_INGREDIENT: IProductIngredient[] = [];

// Raw data processing
function roundEffort(num: number) {
  return Math.round(num * 10) / 10
}

const RAW_STORAGE: Record<string, number> = {};
DATA_PRODUCT.filter(x => x.isRaw).forEach(x => {
  if (x.category === "Crops") {
    RAW_STORAGE[x.id] = roundEffort(x.time / 600);
  }
  else if (x.category === "Bushes" || x.category === "Trees") {
    RAW_STORAGE[x.id] = roundEffort(x.time * 4 / 13 / 600);
  }
  else if (x.category === "Ores") {
    RAW_STORAGE[x.id] = 2
  }
  else if (x.category === "Animals") {
    if (x.name === "Egg") RAW_STORAGE[x.id] = 24;
    if (x.name === "Milk") RAW_STORAGE[x.id] = 70;
    if (x.name === "Bacon") RAW_STORAGE[x.id] = 260;
    if (x.name === "Wool") RAW_STORAGE[x.id] = 390;
    if (x.name === "Fish Fillet") RAW_STORAGE[x.id] = 90;
    if (x.name === "Goat Milk") RAW_STORAGE[x.id] = 520;
    if (x.name === "Honeycomb") RAW_STORAGE[x.id] = 35;
    if (x.name === "Lobster Tail") RAW_STORAGE[x.id] = 840;
    if (x.name === "Duck Feather") RAW_STORAGE[x.id] = 480;
    if (x.name === "Peanuts") RAW_STORAGE[x.id] = 300;
  }
  else RAW_STORAGE[x.id] = 0;
});

function getEfforts(timePenaltyAlg: (time: number) => number) {
  const storage: Record<string, number> = {...RAW_STORAGE};
  const calculator = (product: IProduct): number => {
    // Memoization check
    if (!!storage[product.id]) return storage[product.id]!;

    // Base case: raw product
    if (product.isRaw) throw new Error("Raw product should be in storage first");

    // Recursive case: processed product
    // Get ingredients
    const ingredients = DATA_INGREDIENT.filter(x => x.productId === product.id);

    // Calculate effort
    const result: number = roundEffort(
      ingredients.reduce<number>((acc, curr) => {
        const pr = DATA_PRODUCT.find(x => x.id === curr.ingredientId);
        if (!pr) throw new Error("Product not found");
        return acc + (calculator(pr) * curr.quantity);
      }, roundEffort(product.time / 600) * timePenaltyAlg(product.time))
    );

    // Store for memoization and return value
    storage[product.id] = result;
    return result;
  }

  DATA_PRODUCT.filter(x => !x.isRaw).forEach(calculator);
  return storage;
}

const normalEffort = getEfforts(() => 1);
const lnEffort = getEfforts(Math.log1p);

// Now for processed products
DATA_PRODUCT.map(x => {
  x.effort = normalEffort[x.id];
  x.effortLn = lnEffort[x.id];
  return x;
});
```
