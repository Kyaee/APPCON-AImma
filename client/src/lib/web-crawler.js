import { PlaywrightCrawler } from "crawlee";

export async function runCrawler(job, location) {
  const encodedJob = encodeURIComponent(job);
  const encodedLocation = encodeURIComponent(location);

  const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks, parseWithCheerio }) => {
      const $ = await parseWithCheerio();
      
      if (request.label !== "CARD") {
        await page.waitForSelector(".job_seen_beacon");
        $(".job_seen_beacon").each((i, el) => {
          const title = $(el).find(".jobTitle > span").text().trim();
          const link = $(el).find("a").attr("href"); 
          console.log(`card ${i}: ${title} - ${link}`); 
        });

        await enqueueLinks({
          selector: ".job_seen_beacon a", 
          baseUrl: "https://ph.indeed.com",
          label: "CARD",
        });

      } else {
        await page.waitForSelector(".jobsearch-JobComponent")
        $(".jobsearch-JobComponent").each((i, el) => {
          const title = $(el).find(".jobsearch-JobInfoHeader-title").text().trim();
          const company = $(el).find("[data-testid='inlineHeader-companyName']").text().trim();
          const location = $(el).find("[data-testid='inlineHeader-companyLocation']").text().trim();
          const description = $(el).find("#jobDescriptionText").text();
          const link = $(el).find("a").attr("href"); 
          console.log(`card ${i}: ${title} - ${link}`); 
        })

        await enqueueLinks({
          selector: ".jobsearch-JobComponent a", 
          strategy: "same-domain",
        });
      }
    },
  });

  await crawler.run([`https://ph.indeed.com/jobs?q=${encodedJob}&l=${encodedLocation}`]);
}

runCrawler("Software engineer", "Manila")
