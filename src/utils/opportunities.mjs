import puppeteer from "puppeteer";

/**
 * @param {puppeteer.Page} page
 */
export default async function opportunities(page) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  await page.waitForSelector("div.row.cell-candidate-matching");

  const opportunitiesCount = (await page.$$("div.row.cell-candidate-matching"))
    .length;

  const searchOpportunity = async () => {
    const data = await page.$eval("div.row.cell-candidate-matching", (e) => {
      const title = e.querySelector("h3").textContent;
      const salaryIcon = e.querySelector(".far.fa-money-bill-alt");
      const salary = salaryIcon ? salaryIcon.parentElement.textContent : null;
      const formattedSalary = salary && salary.split("Até R$")[1];

      return { title, salary: formattedSalary };
    });
    return data;
  };

  for (let i = 0; i < opportunitiesCount + 99999; i++) {
    const opportunity = await searchOpportunity();

    console.log(
      "OPORTUNIDADE INDICE ",
      i,
      "COM TITULO ",
      opportunity.title,
      "COM SALÁRIO ",
      opportunity.salary
    );

    if (Number(opportunity.salary) < 10) {
      console.log("aceitaaa!!!");
      await delay(5000);
      await page.click(
        "div.row.cell-candidate-matching .cell-candidate-matching-btn a"
      );
      await page.waitForSelector("div.candidate-matching-header");

      await delay(5000);
      await page.goBack();
      await page.reload();
    } else {
      console.log("recusada =(((");
      await delay(5000);
      await page.click(
        "div.row.cell-candidate-matching .cell-candidate-matching-btn a.btn.btn-primary.btn-block"
      );
      await page.waitForSelector("div.candidate-matching-header");

      await delay(5000);
      await page.goBack();
      await page.reload();
    }
  }
}
