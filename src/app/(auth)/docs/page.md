# **Documentation**

Welcome to Data Reservoir where I present all of my data mined from various sources.

## **Overview**

There are lots of points to be talked about, especially when you are newly landed on dashboard. Congrats. The (solo) dev has already trusted you to use this website accordingly. I am keeping my eyes to make sure you are not blowing up my website.

## **Usage**
- Yes, you can look at every data here
- Basically, every visible datasets are free to use as you wish. You cannot see some datasets? No access for you. Please ask the solo dev to give you access.

That's it. No payment needed.

## **Timeline**

Some rough timeline of how this website and data came to be:

- I collected the first every data by my own mining techniques (either mini-script or typing it manually inside spreadsheet). The first ever data I collected were `The Sims Castaway Product` and `The Sims Two Pets Console Product`.
- Ok, I was satisfied with my collection. I was thinking of making some kind of website for display purposes. For the first iteration, it was called `Apify`, Because... it needs API... so, API-fy data???
- I started experimenting with Laravel at 2021 with simple table without authentication. However, as you might know how messy is PHP (sorry, Laravel is good, yet PHP was messier than I hoped). Alas, the project was scrapped.
- 2022, instead of making the website a reality, I was able to mine much more data, including `Pizza Frenzy`, `Farm Frenzy`, and `Hayday` (this was a pain documenting 350+ products with its recipes manually, yet thank goodness they did not really like updating their products frequently or those categories are final, which will have no update).
- 2023 and yet another attempt to make anything but the website although progress was made. Website needs database so I need to focus on how to streamline my raw data (which I will call my datalake) into database.
- Datalake? More like a humble collection of spreadsheet and JSON (not many collections are as simple as rows and columns). So I need to make some kind of ETL (Extract, Transform, Load) process to make my datalake into database. First attempts was using Pentaho (Kettle) and it was heavy and too much learning curve for a simple task. Talend was also suffers the same problem (keep in mind that Talend was [free to use](https://www.talend.com/blog/update-on-the-future-of-talend-open-studio/) until 2024).
- I read that any programming language can be used to make some kind of ETL. So I start experimenting with Bun (newly released) for streamlining my data. I was satisfactory although it feels... kinda lacking. Like, support for Excel, even using third party package was too lacking. My spreadsheets had some sort of INDEX MATCH that needs to be read, which they obviously not gonna support anytime soon.
- Maybe SvelteKit was an option? Nah scrap it!
- My workplace uses C# and .NET for (almost) of their application. Why not trying to use C# for ETL? Originally, I want my ETL to be able to streamline my datalake into three databases (SQL Server, PostgreSQL, and MongoDB), but you will see later why I only use PostgreSQL for now. The end result is satisfactory and I thank `ClosedXML` devs for everything.
- 2024 and I kinda like how NextJS works and it became my pick for my website. It was rough (I also have mature experience with React yet it feels... different). I made it work although with uncanny design using FlowBite, but at least it works well.
- For ORM, I tried to use Prisma and it sucks because it is pretty slow for simple SELECT. Drizzle somehow works better, yet it was still not as fast as I hoped. Both were once used and then scrapped
- So I moved to MongoDB with the promise of no JOINS and better management for complex relations. It did not work well as I need to query too much collections and somehow filtering was a nightmare (name, getting relations) and intellisense was undeniable worse than SQL-based ORM. (I am a strict person in terms of code quality and `any` type is a no-no for me).
- With that in mind, I scrapped the MongoDB integration from my ETL and website. Because SQL Server filtering was too lacking and also there are no free hosting for SQL Server, I came back to PostgreSQL as my main database.
- Ok, maybe having NextJS directly connect to my database was pretty messy since I hate how they were handling form data (no instant binding, no easy-to-config middleware, no ready-to-use swagger-like API docs). Maybe I can use .NET since it was well-equipped with those?
- I feel it was a good to keep sticking with .NET with Clean Architecture since it feels... clean. API docs, middleware, authentication was nice. However, it turns out that I need too much work just for making a simple endpoint (like 3 files for one endpoint and too much boilerplate). Maybe clean architecture was not as good as I hoped (even for enterprise for me).
- 2025 and I found this nice architecture as REPL and it was what I expected on how API should be (you make request, the app do some things, and it returns response). Together, I also discovered FastEndpoints which was lightweight and nicely designed for making simple API. The maintainer(s) were also super nice and everything was well-documented. I build my API and it is finally done. **This is my backend to this very day**.
- Oh, also I have an Azure account from somewhere I cannot tell. Nevertheless, they had free-tier Azure Web App.
- Along with developing the backend, I remade my frontend by scrapping Flowbite (no combobox) with MaterialUI. I kinda satisfied how MUI works although it was rough trying to integrate them with Tailwind because I still want the Tailwind thing.
- Two datasets were added in February 2025. It was worth mentioning because these are the first two **transactional** datasets. Meaning, it had continuous transactions and still adding records to this day. Examples including `Hayday Orders` and `Transactions`. So I need an ETL that can continuously running, but that was for another time.
- Hmm.. I have trust issues and I want to lock my website behind an authentication while somehow making me able to easily allow someone to access my data. Clerk was a great choice back then and still is. The waiting list feature was what I really need so anyone I can trusted (which is... pretty much no one for now) can enter easily.
- 2025 of August approximately, I managed to deploy it fully. The result was satisfactory and I am so happy with the result. The website was public and it even has its own domain. Yay.
- Also around this time, my project was renamed to `Data Reservoir`.
- Previously the ETL was a console app. Because of the continuous sync need. I was thinking of buying new VPS and made them run using cronjob. However, I could not argue to myself if I was willing to spend some dime for making my personal hobby datasets real-time (no, this is not something I can monetize and I will never). Maybe on-demand ETL was a better choice. In the end, I remade the ETL from ground up so it had scalar API documentation as its GUI. Now, I can simply visit the website, upload my spreadsheet, and send the request to update my database. No additional money spent.
- NextJS was great. Moreover their ISR feature was a gamechanger in performance. January 2026, I decided to make most of the page to be statically rendered. Every non-detailed page (page without \[id\] param, although some are still statically rendered) are now statically rendered and revalidated every year (except transactional datasets which still using SSR). The performance boost was worth the time.
- When rendering the list of my master datasets, there was a huge problem of it being slow. It was because every visible link will be prefetched. Imagine if 100+ links were prefetched and someone clicks only one of them. So, every grid of dataset will NOT be prefetched.

Ok that's enough. In short, welcome.

## **Terminologies**

So there are four terms

- Entries = Total entry of master data (not including transactions). For example, 10 products with 5 tags will be counted as 10 entries
- Rows = Actual row count inside a database's table. 10 products with 5 tags each will be considered 10 (products) + 50 (product -> tag) + 5 (tag) = 65 rows
- Datasets = Total datasets that are downloadable
- Tables = Total tables inside database

That's it. More will be added later.

## **Enums**

Some of my data have some kind of enum that must be explained because exported data will not display the enum's definition. Here are all enums that my data have:

### The Sims

- Rarity = Every `rarity` in this category shares the same enum definition.
  - No Rarity = 0
  - Common = 1
  - Uncommon = 2
  - Rare = 3

### Cygnus

- Grade ID = Grade for products
  - Normal = 1
  - Silver = 2
  - Gold = 3
  - Iridium = 4

### Hayday

- Voucher = Type of voucher
  - No Voucher = 0
  - Green Voucher = 1
  - Blue Voucher = 2
  - Purple Voucher = 3
  - Gold Voucher = 4

- Order Status = Status of order
  - Rejected = 0
  - In Progress = 1
  - Completed = 2

- Event = Type of event that will affect the order's payment
  - No Event = 0
  - Double XP = 1
  - Triple XP = 2
  - Double Coins = 3
  - Booster Bonus = 4
  - LEM Bonus = 5
  - BEM_SEM Bonus = 6
  - Voucher Bonus = 7

## **Non-Canonical Data**

Some data that I provided here are non-canonical. Some might be from calculations (for example, Hayday Effort Score), some might be from my own, unbased opinion (for example, Pizza Frenzy price). Data that are non-canonical will be marked with special effects. For example, non-canonical data inside table will be italicized.

However, I will not categorize `ID` as non-canonical for the purpose of primary keys.

Here are every non-canonical data that I provided:

- Hayday Effort Score -> explained below, but it is an educated and calculated guess
- The Sims 2 Pets Console Product Price -> Only for harvested products, since there is no official price for them
- Pizza Frenzy Price -> Based on my own arbitrary opinion

Others are canonical and taken from official sources (either from in-game or wiki).

## **Hayday Effort Score**

Effort score is a rough score measuring the difficulty on getting such products. Rules are described as follows:

- General Rule and Crops

  Based on time only, an effort score is equal to 600s
  - Wheat needs 120s to make, which has `120/600 = 0.2` effort score.
  - Potato needs 13200s (3h40m) to make, which has `13200/600 = 22.0` effort score

  For crops, we can use this rule since you only need to wait to get one.

- Animal Products

  For this products, we need to account for their feed, therefore we will sum the time for you to make their feed and the time for your animals to mature. This is easy for eggs, milks, bacons, and wools. This also true for lobster tails, fish fillets, and duck feathers (trap + catch + mature).

  However, for honeycombs and peanuts, these are a bit tricky since it factors on how many workers (bees or squirrels) you have and the distance between them and flowers or peanut shrubs. Eventually, for now, I will trust its wiki and took the wiki's number and divide them by 600 as usual.

- Bushes / Trees

  Again, these aren't simple since for a time given, you can harvest 2 → 3 → 4 → 4 products. For now, let's generalize everything. You can harvest 13 products in one cycle. Assuming you will replant the trees/bushes after wilting and you will get instant revival help, the calculation goes as follow:
  - There are 4 cycle of waiting. Define `T` as waiting time. This means `T * 4` waiting time
  - There are 13 fruits that can be harvested. This means `T * 4 / 13`
  - For example, an apple tree needs `57600` seconds per interval. This means `T = 57600`. With that, we can calculate the effort score as follow:
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
  - We only care about the first number behind. Therefore, we need to round them.

- Processed
  - Based on previous effort score, processed food's effort score can be calculated using this formula:

    $$
    \begin{equation}
      E_{product} = \Sigma_{i=1}^k(E_i * n) + \frac{T}{600}
    \end{equation}
    $$

    ```
    E_product  = Effort score
    E_i = Effort score of ingredients (i = 1, 2, ..., k)
    k  = Total ingredients
    n  = Quantity
    T  = Time to produce in seconds
    ```

    In short, it is the sum of its ingredient's effort and quantity + time to produce divided by 600. For this case, we need a recursive calculation since a processed product might depend on another. If a product's ingredient is also a processed product, we need to do recursive calculation.

  - After some analysis, I realized that jellybeans have a bit off number compared to feta salad. (500 vs 2000). We know Jellybean is exhausting to make and because of that, I introduce a penalty to waiting time. In short, the longer the waiting time, the higher effort becomes.

    After some testing, I discovered a thing that satisfies my personal grudge. Here is the updated formula

    $$
    \begin{equation}
      E_{product} = [\Sigma_{i=1}^k(E_i * n)] + (\frac{T * ln(1 + T)}{600})
    \end{equation}
    $$

    The change is inside the `T` variable where we will multiple a product's producing time by a penalty that will increase logarithmically. So, jelly beans, which needs a whopping 24 hours will face significant penalty increase. Why am I using ln? because quadratic or exponential penalty will throw much of product's penalty out of the roof. Linear penalty will not do much.

    To make my data a bit unopinionated, I will include the first and second effort score inside my data. Keep in mind that this calculation is only for processed products. Rest will still stick on usual algorithm.

- Others
  - For ores, I will pick `2` arbitrarily, but let me know if you can give me better numbers
  - For supplies, I will give `0` since it doesn't do any contribution towards any processed products.

With that in mind, I will use this Typescript code to calculate all of them (sorry, but I disliked Python so no Python core will be provided):

```ts
interface IProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  time: number;
  isRaw: boolean;
  effort?: number;
}

interface IProductIngredient {
  productId: string;
  ingredientId: string;
  quantity: number;
}

// Fill your own data
const DATA_PRODUCT: IProduct[] = [];
const DATA_INGREDIENT: IProductIngredient[] = [];

// Raw data processing
function roundEffort(num: number) {
  return Math.round(num * 10) / 10;
}

const RAW_STORAGE: Record<string, number> = {};
DATA_PRODUCT.filter((x) => x.isRaw).forEach((x) => {
  if (x.category === "Crops") {
    RAW_STORAGE[x.id] = roundEffort(x.time / 600);
  } else if (x.category === "Bushes" || x.category === "Trees") {
    RAW_STORAGE[x.id] = roundEffort((x.time * 4) / 13 / 600);
  } else if (x.category === "Ores") {
    RAW_STORAGE[x.id] = 2;
  } else if (x.category === "Animals") {
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
  } else RAW_STORAGE[x.id] = 0;
});

function getEfforts(timePenaltyAlg: (time: number) => number) {
  const storage: Record<string, number> = { ...RAW_STORAGE };
  const calculator = (product: IProduct): number => {
    // Memoization check
    if (!!storage[product.id]) return storage[product.id]!;

    // Base case: raw product
    if (product.isRaw)
      throw new Error("Raw product should be in storage first");

    // Recursive case: processed product
    // Get ingredients
    const ingredients = DATA_INGREDIENT.filter(
      (x) => x.productId === product.id,
    );

    // Calculate effort
    const result: number = roundEffort(
      ingredients.reduce<number>(
        (acc, curr) => {
          const pr = DATA_PRODUCT.find((x) => x.id === curr.ingredientId);
          if (!pr) throw new Error("Product not found");
          return acc + calculator(pr) * curr.quantity;
        },
        roundEffort(product.time / 600) * timePenaltyAlg(product.time),
      ),
    );

    // Store for memoization and return value
    storage[product.id] = result;
    return result;
  };

  DATA_PRODUCT.filter((x) => !x.isRaw).forEach(calculator);
  return storage;
}

const normalEffort = getEfforts(() => 1);
const lnEffort = getEfforts(Math.log1p);

// Now for processed products
DATA_PRODUCT.map((x) => {
  x.effort = normalEffort[x.id];
  x.effortLn = lnEffort[x.id];
  return x;
});
```
