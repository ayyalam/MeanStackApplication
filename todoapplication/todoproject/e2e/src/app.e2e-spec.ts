import {browser, by, element, protractor} from 'protractor';

describe('Validate Title Of The APP', () => {
  it('Title should be Todoproject', () => {
    browser.get('http://localhost:4200/');
    // element(by.model('yourName')).sendKeys('GURU99');
    // const guru = element(by.xpath('html/body/div[2]/div[1]/div[2]/div[2]/div/h1'));
    expect(browser.getTitle()).toEqual('Todoproject');
  });
});

describe('Add An Item', () => {
  it('Added item should be present in ToDoApp', () => {
    browser.get('http://localhost:4200/');
    element(by.css('.form-control.input-lg')).sendKeys('Bread');
    element(by.css('.btn.btn-primary.btn-block')).click();
    const addedItem = element(by.css('span:nth-child(1)')).getText();
    browser.sleep(3000);
    expect(addedItem).toEqual('Bread');
  });
});

describe('Edit An Item', () => {
  it('Item should be editable in the ToDoApp', () => {
    browser.get('http://localhost:4200/');
    element(by.css("[value='Edit']")).click();
    element(by.xpath("//div[@class='wrapper col-md-8']//input[@type='text']")).clear();
    element(by.xpath("//div[@class='wrapper col-md-8']//input[@type='text']")).sendKeys('Milk');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.sleep(3000);
    const addedItem = element(by.css('span:nth-child(1)')).getText();
    browser.sleep(3000);
    expect(addedItem).toEqual('Milk');
  });
});

describe('Deleting An Item', () => {
  it('Item should be deletable in the ToDoApp', () => {
    browser.get('http://localhost:4200/');
    element(by.css("[value='Delete']")).click();
    const deleteButton = element(by.css("[value='Delete']"));
    expect(browser.isElementPresent(deleteButton)).toBe(false);
  });
});

