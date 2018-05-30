const puppeteer = require('puppeteer');
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.setViewport({
		width: 1920,
		height: 720
	});
	await page.goto('https://y.qq.com');
	await page.waitFor(500);
	await page.type('.search_input__input', '体面', { delay: 500 });
	await page.click('.icon_search.sprite');
	await page.waitFor(2000);
	const SONG_LIST = await page.$('.songlist__list');

	const songHref = await page.evaluate((list) => {
		const songList = Array.from(list.querySelectorAll('li'));
		const index = songList.findIndex((item, index, songList) => {
			return item.querySelector('.songlist__artist').getAttribute('title') == '于文文';
		});
		return songList[index].querySelector('.js_song').getAttribute('href');
	}, SONG_LIST);
	console.log(songHref);
})();
