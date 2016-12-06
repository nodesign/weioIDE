import { WeioIDEPage } from './app.po';

describe('weio-ide App', function() {
  let page: WeioIDEPage;

  beforeEach(() => {
    page = new WeioIDEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
