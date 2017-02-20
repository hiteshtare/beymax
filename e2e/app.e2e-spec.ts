import { BeymaxPage } from './app.po';

describe('beymax App', () => {
  let page: BeymaxPage;

  beforeEach(() => {
    page = new BeymaxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
