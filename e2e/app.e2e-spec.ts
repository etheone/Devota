import { MeanAppPage } from './app.po';

describe('joemini App', function() {
  let page: MeanAppPage;

  beforeEach(() => {
    page = new MeanAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
