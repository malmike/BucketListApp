import { BucketListAppPage } from './app.po';

describe('bucket-list-app App', () => {
  let page: BucketListAppPage;

  beforeEach(() => {
    page = new BucketListAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
