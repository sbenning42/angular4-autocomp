import { AutocompPage } from './app.po';

describe('autocomp App', () => {
  let page: AutocompPage;

  beforeEach(() => {
    page = new AutocompPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
