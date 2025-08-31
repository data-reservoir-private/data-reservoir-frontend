
# **Documentation**
## **Hayday Effort Score**
-----

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
        To make my data a bit unopinionated, I will include the first and second effort score inside my data. Keep in mind that this calculation is only for processed products. Rest will still stick on usual algorithm.
        
- Others
    - For ores, I will pick `2` arbitrarily, but let me know if you can give me better numbers
    - For supplies, I will give `0` since it doesnt do any contribution towards any processed products.

With that in mind, I will use these Typescript code to calculate all of them:

``` tsx
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

const RAW_DATA = DATA_PRODUCT.filter(x => x.isRaw).map(x => {
  if (x.category === "Crops") {
    x.effort = roundEffort(x.time / 600)
  }
  else if (x.category === "Bushes" || x.category === "Trees") {
    x.effort = roundEffort(x.time * 4 / 13 / 600);
  }
  else if (x.category === "Ores") {
    x.effort = 2
  }
  else if (x.category === "Animals") {
    if (x.name === "Egg") x.effort = 24;
    if (x.name === "Milk") x.effort = 70;
    if (x.name === "Bacon") x.effort = 260;
    if (x.name === "Wool") x.effort = 390;
    if (x.name === "Fish Fillet") x.effort = 90;
    if (x.name === "Goat Milk") x.effort = 520;
    if (x.name === "Honeycomb") x.effort = 35;
    if (x.name === "Lobster Tail") x.effort = 840;
    if (x.name === "Duck Feather") x.effort = 480;
    if (x.name === "Peanuts") x.effort = 300;
  }
  else x.effort = 0;
  return x;
});

// Proccesed product processing (no pun intended)

// Memoization for ID: Effort
const storage: Record<string, number> = {};

// Main function. This is recursive function
function getEffort(product: IProduct): number {
  // If product had been calc before, retrieve
  if (!!storage[product.id]) return storage[product.id]!;
  
  // If it is raw, retrive the effort pts of that raw product
  else if (product.isRaw) {
    const raw = RAW_DATA.find(x => x.id === product.id);
    if (!raw || !raw.effort)
      throw new Error("Raw data not completely calculated");
    return raw.effort;
  }
  
  // Else, get the ingredients
  const ingredients = DATA_INGREDIENT.filter(x => x.productId === product.id);
  
  // Calculate the effort points
  const result: number = ingredients.reduce<number>((acc, curr) => {
  
    // Get the ingredient's effort pts and mult by qty
    const pr = DATA_PRODUCT.find(x => x.id === curr.ingredientId);
    if (!pr) throw new Error("Product not found");
    return acc + (getEffort(pr) * curr.quantity);
    
    // Should be added with effort pts from processing time
    // Remove the Math.log1p for first algorithm
  }, roundEffort(product.time / 600) * Math.log1p(product.time));

  // Store the result for later use
  storage[product.id] = roundEffort(result);
  return roundEffort(result);
}

// Now for processed products
DATA_PRODUCT.filter(x => !x.isRaw).forEach(x => {
  x.effort = getEffort(x);
});

// DATA_PRODUCT should be filled with effort points
```