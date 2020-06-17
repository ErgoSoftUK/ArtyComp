import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('IM Viewer App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('IM Viewer');
  });

  it('should find 4 matches for "hospital"', () => {
    page.search('hospital\n');
    expect(page.getSearchResultRows().count()).toEqual(4);
  });

  it('should open the tree (4 nodes) on selecting a match', () => {
    page.selectSearchResult('Hospital discharge (encounter record)');
    expect(page.getTreeRows().count()).toEqual(4);
  });

  it('should populate info on selecting node', () => {
    page.selectNode(3);
    expect(page.getConceptName()).toEqual('Hospital discharge (encounter record)');
    expect(page.getConceptId()).toEqual('arc:HospitalDischarge');
    expect(page.getConceptDescription()).toEqual('Extended properties for encounter of type hospital discharge');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
