const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Kaisa Hakola',
                username: 'khakola',
                password: 'salainen'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'khakola', 'salainen')
            await expect(page.getByText('khakola logged in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'khakola', 'väärä')

            const errorDiv = page.locator('.errorMessage')
            await expect(errorDiv).toContainText('wrong username or password')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            await expect(page.getByText('khakola logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'khakola', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'Playwright test', 'Kaisa Hakola', 'https://playwright.dev', '0', true)

            const successDiv = page.locator('.successMessage')
            await expect(successDiv).toContainText('a new blog Playwright test added')
            await expect(successDiv).toHaveCSS('border-style', 'solid')
            await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

            const newBlog = page.locator('.blogTitle')
            await expect(newBlog).toBeVisible()
            await expect(newBlog).toContainText('Playwright test')
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'Playwright testing', 'Kaisa Hakola', 'https://playwright.dev', '0', true)
            })

            test('blog information can be opened', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.locator('.blogInfo')).toBeVisible()
            })

            test('blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.locator('.blogInfo')).toBeVisible()

                await page.getByRole('button', { name: 'like' }).click()

                // Opening the blog again because it closes when like button is clicked.
                // Avataan bogin tiedot uudestaan, koska se sulkeutuu, kun blogia tykätään.
                await page.getByRole('button', { name: 'view' }).click()
                const likedBlog = page.locator('.blogInfo')
                await expect(likedBlog).toContainText('likes: 1')
            })

            // User can only see blog that they have added themselves so they can't delete
            // others blogs.
            // Käyttäjä näkee vain itse lisäämänsä blogit, joten hän ei pysty myöskään
            // poistamaan toisten lisäämiä blogeja.
            test('blog can be deleted by authorized person', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                const blogToDelete = page.locator('.blogInfo')
                await expect(blogToDelete).toBeVisible()

                page.on('dialog', async dialog => {
                    expect(dialog.message()).toContain('Delete Playwright testing?')
                    await dialog.accept()
                })
                await page.getByRole('button', { name: 'delete' }).click()

                const successDiv = page.locator('.successMessage')
                await expect(successDiv).toContainText('Blog deleted succesfully')
                await expect(successDiv).toHaveCSS('border-style', 'solid')
                await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

                const newBlog = page.locator('.blogTitle')
                await expect(newBlog).not.toBeVisible()
            })
        })

        describe('and several Blogs exists', () => {
            beforeEach(async ({ page }) => {
                const blogs = await page.locator('.blogList')

                await createBlog(page, 'first blog', 'kaisa hakola', 'https://playwright.dev', '0', true)
                await expect(blogs).toContainText('first blog')

                await createBlog(page, 'second blog', 'kaisa hakola', 'https://playwright.dev', '30', true)
                await expect(blogs).toContainText('second blog')

                await createBlog(page, 'third blog', 'kaisa hakola', 'https://playwright.dev', '5', true)
                await expect(blogs).toContainText('third blog')

                await expect(blogs).toBeVisible()
            })
        
            test('blogs are in the right order', async ({ page }) => {
                const blogs = page.locator('.blogList')
                await expect(blogs).toBeVisible()

                const blogElements = await page.$$('.blogList > div.blog');

                const firstBlogTitle = await blogElements[0].innerText()
                const secondBlogTitle = await blogElements[1].innerText()
                const thirdBlogTitle = await blogElements[2].innerText()

                expect(firstBlogTitle).toContain('second blog')
                expect(secondBlogTitle).toContain('third blog')
                expect(thirdBlogTitle).toContain('first blog')
            })
        })
    })
})