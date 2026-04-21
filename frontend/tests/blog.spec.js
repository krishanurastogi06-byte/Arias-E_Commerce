const { test, expect } = require('@playwright/test');

test.describe('ARIA Blog Section', () => {
  test('should load the blog list page and navigate to a detail page', async ({ page }) => {
    // Go to the blog page
    await page.goto('http://localhost:3000/blog');

    // Check if the hero title exists
    const title = page.locator('h1');
    await expect(title).toContainText('The Journal');

    // Check if at least 5-6 blog cards are visible
    const blogCards = page.locator('article.card-premium');
    await expect(blogCards).toHaveCount(6);

    // Get the title of the first blog
    const firstBlogTitle = await page.locator('h2').first().innerText();

    // Click on the first blog card
    await page.locator('article.card-premium').first().click();

    // Verify navigation to the detail page
    await expect(page).toHaveURL(/.*\/blog\/.*/);

    // Verify the detail page has the correct title
    const detailTitle = page.locator('h1');
    await expect(detailTitle).toContainText(firstBlogTitle);

    // Verify content exists
    const content = page.locator('.prose');
    await expect(content).toBeVisible();
    
    // Verify "You Might Also Like" section exists
    const relatedSection = page.locator('h2:has-text("You Might Also Like")');
    await expect(relatedSection).toBeVisible();
  });
});
