import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return browser.getTitle() as Promise<string>;
  }

  search(text: string) {
    return browser.findElement(by.id('searchInput')).sendKeys(text + '\n');
  }

  getSearchResultRows() {
    return element.all(by.css('#searchResults tbody tr td'));
  }

  getSearchResultRowValues() {
    return this.getSearchResultRows()
      .map(r => r.getText());
  }

  selectSearchResult(text: string) {
    const row = this.getSearchResultRows()
      .filter(td => td.getText().then(v => v === text))
      .first();
    return row.click();
  }

  getTreeRows() {
    return element.all(by.css('#conceptTree mat-tree-node'));
  }

  getTreeRowValues() {
    return this.getTreeRows()
      .map(r => r.all(by.css('span')).get(1).getText());
  }

  selectNode(text: string) {
    const node = this.getTreeRows()
      .filter(r => r.all(by.css('span')).get(1).getText().then(t => t === text))
      .first();

    return node.click();
  }

  getConceptName() {
    return browser.findElement(by.id('conceptName')).getAttribute('value');
  }

  getConceptId() {
    return browser.findElement(by.id('conceptId')).getAttribute('value');
  }

  getConceptDescription() {
    return browser.findElement(by.id('conceptDescription')).getAttribute('value');
  }

}
